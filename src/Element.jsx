import { useCallback } from 'react';
import style from './Element.module.css';

export const Element = ({ sign, group, color, isClick, singleClick, doubleClick }) => {

  const styleSingleClick = isClick ? "scale(1.2)" : "scale(1)"

  const handleClick = useCallback(() => {
    singleClick(group);
  }, [group])

  const handleDoubleClick = useCallback(() => {
    doubleClick(group);
  }, [group])

  return (
    <div className={style.element}
      style={{ background: color, transform: styleSingleClick }}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >{sign}</div>
  )
}