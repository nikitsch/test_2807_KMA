import { Element } from './Element';
import style from './App.module.css';

function App() {
  
  let arr = [
    { "value": "f", "blok": "f" },
    { "value": "_", "blok": "empty" },
    { "value": "d", "blok": "dd" },
    { "value": "d", "blok": "dd" },
    { "value": "_", "blok": "empty" },
    { "value": "_", "blok": "empty" },
    { "value": "_", "blok": "empty" },
    { "value": "_", "blok": "empty" },
    { "value": "_", "blok": "empty" },
    { "value": "_", "blok": "empty" },
  ]
  
  function addBlok(enter) {
  
    let arrEnter = enter.split("")
  
    arrEnter.map(el => {
      let post = arr.find((post) => post.value === "_")
      post.value = el
      post.blok = enter
      return el
    })
  }
  
  addBlok("AAA")

  let bracket
  let arrNew = arr.map(p => {
    

    if (p.blok === bracket) {
      bracket = p.blok
      return {...p}
    } else {
      bracket = p.blok
      return {...p, value:  "|" + p.value}
    }
  })

  // console.log(arrNew.map(e => e.value).reduce((prev, curr) => prev + curr))

  return (
    <div className={style.app}>
      {arr.map((el) => {
        return <Element el={el.value} />
      })}
    </div>
  );
}

export default App;
