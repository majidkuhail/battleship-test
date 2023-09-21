export type Position = number[]
export type ShipLayout = {
  ship: string
  positions: Array<number[]>
}

export type BoardBoxProps = {
  position: Position
  onSelect: () => void
  isSelected?: boolean
  isHit?: boolean
}
