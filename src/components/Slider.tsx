
import { memo } from 'react'

interface SliderTypes {
  min: number,
  max: number,
  currentValue: number
  onChange: React.ChangeEventHandler<HTMLInputElement>
}

export default memo(function Slider({ min, max, currentValue, onChange }: SliderTypes) {
  return (<input onChange={onChange} type="range" min={min} max={max} value={currentValue} />)
});