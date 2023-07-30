import style from './Button.module.css';

export const ButtonClearField = ({ setText }) => {

  const handleClearField = () => {
    setText('');
  }

  return (
    <button className={style.button} onClick={handleClearField}>clear</button>
  )
}