import { useState } from 'react';
import { Element } from './Element';
import style from './App.module.css';

function App() {

  const arr = [
    { "value": "1", "blok": "1", "colorBlok": "#FF4715", "isClick": false },
    { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
    { "value": "2", "blok": "22", "colorBlok": "#FF1020", "isClick": false },
    { "value": "2", "blok": "22", "colorBlok": "#FF1020", "isClick": false },
    { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
    { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
    { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
    { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
    { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
    { "value": "_", "blok": "empty", "colorBlok": "#D0D0D0", "isClick": false },
  ]
  const [objArr, setValue] = useState(arr);
  const [text, setText] = useState('');

  function addBlok(enter) {

    const color = '#F' + (Math.random().toString(16) + '00000').substring(3, 8).toUpperCase()

    const arrEnter = enter.split("")
    arrEnter.map(el => {
      const underscore = objArr.find(emptyField => emptyField.value === "_")
      underscore.value = el
      underscore.blok = enter
      underscore.colorBlok = color
      return el
    })
  }


  // let bracket
  // const arrNew = arr.map(p => {

  //   if (p.blok === bracket) {
  //     bracket = p.blok
  //     return { ...p }
  //   } else {
  //     bracket = p.blok
  //     return { ...p, value: "|" + p.value }
  //   }
  // })
  // console.log(arrNew.map(e => e.value).reduce((prev, curr) => prev + curr))

  const handleAction = () => {
    if (text.trim().length) {

      addBlok(text.trim())
      setText('');
    }
    // console.log(arr);
  }

  const handleSubmit = (e) => {
    setText(e.target.value)
  }
  // console.log("objArr:", objArr);
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
          return <Element sign={el.value} group={el.blok} color={el.colorBlok} />
        })}
      </div>
    </>
  )
}

export default App;
