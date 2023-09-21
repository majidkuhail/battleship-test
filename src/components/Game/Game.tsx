import React, { useEffect, useState } from 'react'
import { compareArrays, range } from '../../utils'
import { GAME_BOARD_SIZE, SHIP_LAYOUT_DATA } from '../../constants'
import _map from 'lodash/map'
import { Position, ShipLayout } from './types'
import { BoardBox } from './children/BoardBox'

const Game = () => {
  // Constants
  const shipTypes = SHIP_LAYOUT_DATA.shipTypes
  const otherPlayerShips: Array<ShipLayout> = SHIP_LAYOUT_DATA.layout

  // Used to record player selections
  const [selectedBoxes, setSelectedBoxes] = useState<Array<Position>>([])

  // Used to record hits
  const [hitList, setHitList] = useState<Array<{ pos: Position; type: string }>>([])

  // Use to showcase scores
  const [scores, setScores] = useState({
    player_1: 0,
    player_2: 0,
  })
  // Use to show alert when won
  const [hasWon, setHasWon] = useState(false)

  const handleBoxSelect = (x: number, y: number) => () => {
    if(hasWon) return
    // Add box to selected boxes
    setSelectedBoxes([...selectedBoxes, [x, y]])
  }

  // This effect will calculate the hits and scores
  useEffect(() => {
    const hits: Array<{ pos: Position; type: string }> = []
    otherPlayerShips.forEach((layout) => {
      layout.positions.forEach((p) => {
        if (selectedBoxes.filter((i) => compareArrays(i, p)).length > 0) {
          hits.push({ pos: p, type: layout.ship })
        }
      })
    })
    setHitList(hits)

    setScores({
      player_1: hits.length,
      player_2: selectedBoxes.length - hits.length,
    })

    //TODO: calculate if won and show alert
    let completedShips = 0;
    _map(shipTypes, (type, index)=>{
      if(type.size === hitList.filter((h)=>h.type === index).length){
        completedShips++;
      }
    })
    if(completedShips === Object.keys(shipTypes).length){
      setHasWon(true)
    }
    console.log({completedShips, sh: Object.keys(shipTypes).length})
  }, [selectedBoxes])

  return (
    <div className='md:p-4 lg:max-w-[46rem] lg:mx-auto'>
      <div className='lg:flex lg:flex-nowrap lg:flex-row-reverse'>
        <div className='w-full border-8 border-orange-300 lg:w-4/6'>
          {range(0, GAME_BOARD_SIZE - 1).map((j) => (
            <div className='flex flex-nowrap ' key={j}>
              {range(0, GAME_BOARD_SIZE - 1).map((i) => {
                const isSelected = selectedBoxes.filter((s) => compareArrays(s, [i, j])).length > 0
                const isHit =
                  isSelected && hitList.filter((s) => compareArrays(s.pos, [i, j])).length > 0
                return (
                  <BoardBox
                    key={i}
                    position={[i, j]}
                    onSelect={handleBoxSelect(i, j)}
                    isSelected={isSelected}
                    isHit={isHit}
                  />
                )
              })}
            </div>
          ))}
        </div>

        <div className='md:flex md:mt-6 lg:block lg:mt-0 lg:w-2/6 lg:pr-4'>
          <div className='flex flex-nowrap md:w-4/12 lg:w-full'>
            <div className='bg-orange-300 flex flex-col justify-center items-center space-y-1 w-1/2 py-4'>
              <p className='text-2xl font-bold'>{String(scores.player_1).padStart(2, '0')}</p>
              <div className='h-px w-full bg-black max-w-[70%]'></div>
              <p className='font-bold'>player 1</p>
            </div>
            <div className='bg-emerald-300 flex flex-col justify-center items-center space-y-1 w-1/2 py-4'>
              <p className='text-2xl font-bold'>{String(scores.player_2).padStart(2, '0')}</p>
              <div className='h-px w-full bg-black max-w-[90%]'></div>
              <p className='font-bold'>player 2</p>
            </div>
          </div>
          <div className='grid grid-cols-2 gap-4 mt-6 md:mt-0 md:w-8/12 md:pl-5 lg:w-full lg:pl-0 lg:grid-cols-1 lg:mt-4'>
            {_map(shipTypes, (type, index) => {
              const numberOfHits = hitList.filter((s) => s.type == index).length
              return (
                <div className='flex flex-nowrap items-center'>
                  <div className='w-1/2'>
                    <img
                      src={`/assets/ships/${index}.png`}
                      className={type.size === numberOfHits ? 'opacity-50' : ''}
                    />
                  </div>
                  <div className='grid grid-cols-5 gap-2 w-1/2 pl-2'>
                    {range(1, type.size).map((s) => {
                      return (
                        <span
                          key={s}

                        >
                             <img className="w-3 h-3" src={numberOfHits >= s ? '/assets/Hit-small.png':'/assets/Miss-small.png'}/>
                        </span>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
      {hasWon && (
          <div className="shadow-xl bg-green-500   rounded-xl p-5 text-2xl fixed top-20 left-1/2 -translate-x-1/2">
            <p>You sunk them all!</p>
          </div>
      )}
    </div>
  )
}

export default Game
