import style from './Button.module.css';

export const ButtonClearField = ({ setText }) => {

  const handleAction = () => {
    setText('');
  }

  return (
    <button className={style.button} onClick={handleAction}>clear</button>
  )
}