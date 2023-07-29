import style from './Element.module.css';

export const Element = ({el}) => {

  return (
    <div className={style.element}>{el}</div>
  )
}