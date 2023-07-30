import { v1 } from 'uuid';
// import style from './Button.module.css';

export const ButtonAdd = ({ objArr, text, setText, setValue, sliceBrackets }) => {

  function addBlock(enter) {

    const color = '#F' + (Math.random().toString(16) + '00000').substring(3, 8).toUpperCase()
    const idBlock = v1()

    enter.split('').forEach(symbol => {
      let pasted = false;

      setValue(arr => arr.map(el => {
        if (el.value === '_' && !pasted) {
          pasted = true;
          return {
            ...el,
            value: symbol,
            leftBracket: true,
            rightBracket: true,
            block: idBlock,
            colorBlock: color,
          }
        }
        return el;
      }))
    })
    sliceBrackets()
  }

  const handleAction = () => {
    const emptyFields = objArr.filter(el => el.value === "_").length
    if (text.trim().length > emptyFields) {
      alert('Нет места. Удалите какой-либо блок')
      return
    }
    if (text.trim().length) {
      addBlock(text.trim())
      setText('');
    }
  }

  return (
    <button onClick={handleAction}>ADD</button>
  )
}