import { v1 } from 'uuid';
import style from './Button.module.css';

export const ButtonAdd = ({ newArray, text, setText, setNewArray, sliceBrackets }) => {

  function addBlock(enter) {

    const randomColor = '#F' + (Math.random().toString(16) + '00000').substring(3, 8).toUpperCase()
    const idBlock = v1()
    const splitedEnter = enter.split('')

    const addedObject = (el, symbol) => {
      return {
        ...el,
        value: symbol,
        leftBracket: true,
        rightBracket: true,
        block: idBlock,
        colorBlock: randomColor,
      }
    }

    let isEmptyInterval = false
    const baldSpot = newArray.reduce((arr, el, index) => {
      if (el.block !== null) {
        isEmptyInterval = false;
        return arr
      }
      if (!isEmptyInterval) {
        isEmptyInterval = true
        return arr.concat({
          start: index,
          end: index
        })
      }

      const lastElement = arr.pop()
      lastElement.end = index

      return arr.concat(lastElement)
    }, [])

    const equalSpace = baldSpot.find(el => el.end - el.start + 1 === enter.length)
    const biggerSpace = baldSpot.find(el => el.end - el.start + 1 > enter.length)

    if (equalSpace) {
      splitedEnter.forEach(symbol => {

        setNewArray(arr => arr.map((el, index) => {
          if (index >= equalSpace.start && index <= equalSpace.end) {
            return addedObject(el, symbol)
          }
          return el;
        }))
      })
    }

    else if (biggerSpace) {
      splitedEnter.forEach(symbol => {
        let pasted = false;
        setNewArray(arr => arr.map((el, index) => {
          if (index >= biggerSpace.start && index <= biggerSpace.end && el.value === '_' && !pasted) {
            pasted = true;
            return addedObject(el, symbol)
          }
          return el;
        }))
      })
    }

    else {
      splitedEnter.forEach(symbol => {
        let pasted = false;
        setNewArray(arr => arr.map(el => {
          if (el.value === '_' && !pasted) {
            pasted = true;
            return addedObject(el, symbol)
          }
          return el;
        }))
      })
    }

    sliceBrackets()
  }

  const handleAdd = () => {
    const emptyFields = newArray.filter(el => el.value === "_").length
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
    <button className={style.button} onClick={handleAdd}>add</button>
  )
}