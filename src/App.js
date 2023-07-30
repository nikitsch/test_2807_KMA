import { useCallback, useState } from 'react';
import { Element } from './components/Element/Element';
import { ButtonAdd } from './components/Button/ButtonAdd';
import { ButtonSort } from './components/Button/ButtonSort';
import style from './App.module.css';
import { ButtonClearField } from './components/Button/ButtonClearField';
import { ButtonClearBlocks } from './components/Button/ButtonClearBlocks';
import { InputText } from './components/Input/InputText';

const arr = new Array(100).fill({ "value": "_", "leftBracket": false, "rightBracket": false, "block": null, "colorBlock": "#D0D0D0", "isClick": false })

function App() {
  const [newArray, setNewArray] = useState(arr);
  const [text, setText] = useState('');

  const sliceBrackets = useCallback(() => {
    setNewArray(arr => arr.map((el, index, array) => {
      if (el.value === "_") return el
      return {
        ...el,
        leftBracket: el.block !== array[index - 1]?.block,
        rightBracket: el.block !== array[index + 1]?.block
      }
    }))
  }, []);

  const singleClick = (group) => {
    setNewArray((symbols) => symbols.map(({ isClick, ...props }) => ({
      ...props,
      isClick: group === props.block && props.value !== '_' ? !isClick : false,
    })))
  }

  const doubleClick = (group) => {
    setNewArray((symbols) => symbols.map((el) => group === el.block ? ({
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
      <div className={style.inputСontrol}>
        <InputText text={text} setText={setText} />
        <ButtonAdd newArray={newArray} text={text} setText={setText} setNewArray={setNewArray} sliceBrackets={sliceBrackets} />
        <ButtonClearField setText={setText} />
      </div>
      <div className={style.elements}>
        {newArray.map((el) => {
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
      <div className={style.tableСontrol}>
        <ButtonClearBlocks newArray={newArray} setNewArray={setNewArray} />
        <ButtonSort newArray={newArray} setNewArray={setNewArray} sliceBrackets={sliceBrackets} />
      </div>
    </>
  )
}

export default App;