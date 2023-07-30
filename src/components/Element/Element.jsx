import { useCallback } from 'react';
import style from './Element.module.css';

export const Element = ({ sign, group, color, isClick, singleClick, doubleClick, left, right }) => {

  const styleSingleClick = `${style.element} ${isClick ? style.active : ""}`
  const backgroundStyleActive = isClick ? {} : { background: color }

  const handleClick = useCallback(() => {
    singleClick(group);
  }, [group, singleClick])

  const handleDoubleClick = useCallback(() => {
    doubleClick(group);
  }, [group, doubleClick])

  return (
    <div className={styleSingleClick}
      style={backgroundStyleActive}
      onClick={handleClick}
      onDoubleClick={handleDoubleClick}
    >{`${left ? "[" : ""} ${sign} ${right ? "]" : ""}`}</div>
  )
}