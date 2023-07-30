import style from './InputText.module.css';

export const InputText = ({ text, setText }) => {

  const handleSubmit = (e) => {
    setText(e.target.value)
  }

  return (
    <input
      className={style.input}
      placeholder='Entry field'
      value={text}
      maxLength="100"
      onChange={handleSubmit}
    />
  )
}