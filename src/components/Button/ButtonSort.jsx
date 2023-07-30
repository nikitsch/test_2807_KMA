import style from './Button.module.css';

export const ButtonSort = ({ newArray, setNewArray, sliceBrackets }) => {

  const handleSort = () => {

    const arrBlock = newArray.map(id => id.block)
    const sortBlock = arrBlock.filter((item, index) =>
      item !== null && index === arrBlock.indexOf(item)
    )
    sortBlock.push(null)

    setNewArray(arr => arr.toSorted((prev, next) => {
      if (sortBlock.indexOf(prev.block) < sortBlock.indexOf(next.block)) return -1;
      if (sortBlock.indexOf(prev.block) > sortBlock.indexOf(next.block)) return 1;
      return 0
    }))
    sliceBrackets()
  }

  return (
    <button className={style.button } onClick={handleSort}>sort</button>
  )
}