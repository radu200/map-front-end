import { memo } from 'react'
import './Button.css';

interface ButtonTypes {
  title: string,
  onClick: React.MouseEventHandler<HTMLButtonElement>
}

export default memo(function Button({ title, onClick }: ButtonTypes) {
  return (<button className="button" onClick={onClick}>{title}</button>)
});