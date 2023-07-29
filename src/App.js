import { useCallback, useState } from 'react';
import { Element } from './Element';
import style from './App.module.css';
import { v1 } from 'uuid';

const arr = new Array(100).fill({ "value": "_", "leftBracket": false, "rightBracket": false, "block": "empty", "colorBlock": "#D0D0D0", "isClick": false })

function App() {
  const [objArr, setValue] = useState(arr);
  const [text, setText] = useState('');

  const sliceBrackets = useCallback(() => {
    setValue(arr => arr.map((el, index, array) => {
      if (el.value === "_") return el
      return {
        ...el,
        leftBracket: el.block !== array[index - 1]?.block,
        rightBracket: el.block !== array[index + 1]?.block
      }
      //   if (el.value === "_") return el
      //   if (el.block === array[index + 1].block) {
      //     return {
      //       ...el,
      //       rightBracket: false
      //     }
      //   }
    }))
  }, []);

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

  // function sliceBrackets() {
  //   for (let i = 0; i < objArr.length; i++) {
  //     if (objArr[i].value === "_") continue
  //     if (objArr[i].block === objArr[i + 1].block) {
  //       objArr[i].value = objArr[i].value.slice(0, 2)
  //       objArr[i + 1].value = objArr[i + 1].value.slice(1)
  //     }

  //   }
  // }

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

  const handleSubmit = (e) => {
    setText(e.target.value)
  }

  const singleClick = (group) => {
    setValue((symbols) => symbols.map(({ isClick, ...props }) => ({
      ...props,
      isClick: group === props.block && props.value !== '_' ? !isClick : false,
    })))
  }

  const doubleClick = (group) => {
    setValue((symbols) => symbols.map((el) => group === el.block ? ({
      ...el,
      value: '_',
      leftBracket: false,
      rightBracket: false,
      block: 'empty',
      colorBlock: "#D0D0D0",
      isClick: false
    }) : el))
  }

  return (
    <>
      <div>
        <input
          placeholder='Entry field'
          value={text}
          onChange={handleSubmit}
        />
        <button
          onClick={handleAction}
        >ADD</button>
      </div>
      <div className={style.app}>
        {objArr.map((el) => {
          return <Element
            sign={el.value}
            left={el.leftBracket}
            right={el.rightBracket}
            group={el.block}
            color={el.colorBlock}
            isClick={el.isClick}
            singleClick={singleClick}
            doubleClick={doubleClick}
          />
        })}
      </div>
    </>
  )
}

export default App;
