// import style from './Button.module.css';

export const ButtonSort = ({ objArr, setValue, sliceBrackets }) => {

  const handleSort = () => {

    const arrBlock = objArr.map(id => id.block)
    const sortBlock = arrBlock.filter((item, index) =>
      item !== null && index === arrBlock.indexOf(item)
    )
    sortBlock.push(null)

    setValue(arr => arr.toSorted((prev, next) => {
      if (sortBlock.indexOf(prev.block) < sortBlock.indexOf(next.block)) return -1;
      if (sortBlock.indexOf(prev.block) > sortBlock.indexOf(next.block)) return 1;
      return 0
    }))
    sliceBrackets()
  }

  return (
    <button onClick={handleSort}>SORT</button>
  )
}