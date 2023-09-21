import React from 'react'
import { BoardBoxProps } from '../types'

export const BoardBox = (props: BoardBoxProps) => {
  const { position, isSelected, isHit, onSelect } = props

  const handleSelect = () => {
    // Ignore if already selected
    if (!isSelected) {
      onSelect()
    }
  }
  return (
    <button
      type='button'
      className='flex-auto bg-white border border-gray-500'
      onClick={handleSelect}
    >
      <div className='h-0 pt-[100%] relative'>
        {isSelected && (
          <img
            alt={`Box ${position[0]},${position[1]}`}
            src={isHit ? 'assets/Hit.png' : 'assets/Miss.png'}
            className='absolute inset-0 object-cover w-full h-full'
          />
        )}
      </div>
    </button>
  )
}
