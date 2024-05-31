import Button from "./x01Button";
import style from "prac/css/x02useEffect.module.css";
import { useState, useEffect } from "react";

function App() {
  const [counter, setCounter] = useState(0);
  const [keyword, setKeyword] = useState("");
  const onClick = () => setCounter((prev) => prev + 1);
  const onChange = (event) => setKeyword(event.target.value);
  useEffect(() => {
    if (keyword !== "" && keyword.length > 5) {
      console.log("search")
    }
  }, [keyword]);

  useEffect(() => {
    console.log("loading");
  }, []);
  useEffect(() => {
    console.log("searching and click");
  }, [keyword, counter]);

  return (
    <div>
      <h1 className={style.title}>NEW REACT</h1>
      <h2>{counter}</h2>
      <input value={keyword} type="text" onChange={onChange} />
      <h2>{keyword}</h2>
      <button className={style.btn} onClick={onClick}>click</button>
    </div>
  );
}

export default App;
