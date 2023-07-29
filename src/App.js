import { useState } from 'react';
import { Element } from './Element';
import style from './App.module.css';
import { v1 } from 'uuid';

const arr = [
  { "value": "[1]", "blok": "925115218", "colorBlok": "#FF4715", "isClick": false },
  { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
  { "value": "[2]", "blok": "512310252", "colorBlok": "#FF1020", "isClick": false },
  { "value": "[2]", "blok": "512310252", "colorBlok": "#FF1020", "isClick": false },
  { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
  { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
  { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
  { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
  { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
  { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
]

function App() {
  const [objArr, setValue] = useState(arr);
  const [text, setText] = useState('');

  function addBlok(enter) {

    const color = '#F' + (Math.random().toString(16) + '00000').substring(3, 8).toUpperCase()
    const idBlock = v1()

    enter.split('').forEach(symbol => {
      let pasted = false;

      setValue(arr => arr.map(el => {
        if (el.value === '_' && !pasted) {
          pasted = true;
          return {
            ...el,
            value: "[" + symbol + "]",
            blok: idBlock,
            colorBlok: color,
          }
        }

        return el;
      }))
    })
  }



  const handleAction = () => {
    const emptyFields = objArr.filter(el => el.value === "_").length
    if (text.trim().length > emptyFields) {
      alert('Нет места. Удалите какой-либо блок')
      return
    }
    if (text.trim().length) {
      addBlok(text.trim())
      setText('');
    }
  }

  const handleSubmit = (e) => {
    setText(e.target.value)
  }

  const singleClick = (group) => {
    setValue((symbols) => symbols.map(({ isClick, ...props }) => ({
      ...props,
      isClick: group === props.blok && props.value !== '_' ? !isClick : false,
    })))
  }

  const doubleClick = (group) => {
    setValue((symbols) => symbols.map((el) => group === el.blok ? ({
      ...el,
      value: '_',
      blok: 'empty',
      colorBlok: "#D0D0D0",
      isClick: false
    }) : el))
  }

  // for (let i = 0; i < objArr.length; i++) {
  //   if (objArr[i].value === "_") continue
  //   if (objArr[i].blok === objArr[i + 1].blok) {
  //     objArr[i].value = objArr[i].value.slice(0, 2)
  //     objArr[i + 1].value = objArr[i + 1].value.slice(1)
  //   }

  // }

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
            group={el.blok}
            color={el.colorBlok}
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
