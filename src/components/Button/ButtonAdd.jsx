import { v1 } from 'uuid';
import style from './Button.module.css';

export const ButtonAdd = ({ objArr, text, setText, setValue, sliceBrackets }) => {

  function addBlock(enter) {

    const color = '#F' + (Math.random().toString(16) + '00000').substring(3, 8).toUpperCase()
    const idBlock = v1()
    const splitedEnter = enter.split('')

    let isEmptyInterval = false
    const baldSpot = objArr.reduce((arr, el, index) => {
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

        setValue(arr => arr.map((el, index) => {
          if (index >= equalSpace.start && index <= equalSpace.end) {
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
    }

    else if (biggerSpace) {
      splitedEnter.forEach(symbol => {
        let pasted = false;
        setValue(arr => arr.map((el, index) => {
          if (index >= biggerSpace.start && index <= biggerSpace.end && el.value === '_' && !pasted) {
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
    }

    else {
      splitedEnter.forEach(symbol => {
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
    }

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
    <button className={style.button} onClick={handleAction}>add</button>
  )
}