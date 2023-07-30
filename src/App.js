import { useCallback, useState } from 'react';
import { Element } from './components/Element/Element';
import style from './App.module.css';
import { ButtonAdd } from './components/Button/ButtonAdd';
import { ButtonSort } from './components/Button/ButtonSort';

const arr = new Array(100).fill({ "value": "_", "leftBracket": false, "rightBracket": false, "block": null, "colorBlock": "#D0D0D0", "isClick": false })

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
    }))
  }, []);

  // function addBlock(enter) {

  //   const color = '#F' + (Math.random().toString(16) + '00000').substring(3, 8).toUpperCase()
  //   const idBlock = v1()

  //   enter.split('').forEach(symbol => {
  //     let pasted = false;

  //     setValue(arr => arr.map(el => {
  //       if (el.value === '_' && !pasted) {
  //         pasted = true;
  //         return {
  //           ...el,
  //           value: symbol,
  //           leftBracket: true,
  //           rightBracket: true,
  //           block: idBlock,
  //           colorBlock: color,
  //         }
  //       }
  //       return el;
  //     }))
  //   })
  //   sliceBrackets()
  // }

  // const handleAction = () => {
  //   const emptyFields = objArr.filter(el => el.value === "_").length
  //   if (text.trim().length > emptyFields) {
  //     alert('Нет места. Удалите какой-либо блок')
  //     return
  //   }
  //   if (text.trim().length) {
  //     addBlock(text.trim())
  //     setText('');
  //   }
  // }

  const handleSubmit = (e) => {
    setText(e.target.value)
  }

  // const handleSort = () => {

  //   const arrBlock = objArr.map(id => id.block)
  //   const sortBlock = arrBlock.filter((item, index) =>
  //     item !== null && index === arrBlock.indexOf(item)
  //   )
  //   sortBlock.push(null)
  //   console.log(sortBlock);
  //   setValue(arr => arr.toSorted((prev, next) => {
  //     if (sortBlock.indexOf(prev.block) < sortBlock.indexOf(next.block)) return -1;
  //     if (sortBlock.indexOf(prev.block) > sortBlock.indexOf(next.block)) return 1;
  //     return 0
  //   }))
  //   sliceBrackets()
  // }

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
      block: null,
      colorBlock: "#D0D0D0",
      isClick: false
    }) : el))
  }

  return (
    <>
      <div className={style.manual}>
        <input
          placeholder='Entry field'
          value={text}
          onChange={handleSubmit}
        />
        <ButtonAdd objArr={objArr} text={text} setText={setText} setValue={setValue} sliceBrackets={sliceBrackets} />
        <ButtonSort objArr={objArr} setValue={setValue} sliceBrackets={sliceBrackets} />
      </div>
      <div className={style.elements}>
        {objArr.map((el) => {
          return <Element
            key={el.block}
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