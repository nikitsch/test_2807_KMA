import style from './Button.module.css';

export const ButtonClearBlocks = ({ newArray, setNewArray }) => {

  const handleClearBlocks = () => {
    setNewArray(newArray.map((el) => {
      return {
        ...el,
        value: "_",
        leftBracket: false,
        rightBracket: false,
        block: null,
        colorBlock: "#D0D0D0",
        isClick: false
      }
    }))
  }

  return (
    <button style={{width: "140px", marginLeft: "0px"}} className={style.button} onClick={handleClearBlocks}>clear table</button>
  )
}