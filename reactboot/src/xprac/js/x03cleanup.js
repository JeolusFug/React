// import style from "./App.module.css";
import { useState, useEffect } from "react";

function Hello() {
  useEffect(() => {
    console.log("hi :)");
    return () => console.log("bye :(");
    // return은 해당 함수 or component가 파괴될때 실행된다.
  }, [])

  return <h2>Hello</h2>
}
function App() {
  const [show, setShow] = useState(false);
  const onClick = () => setShow((prev) => !prev);

  return (
    <div>
      <button onClick={onClick}>{show ? "Hide" : "Show"}</button>
      {show ? <Hello /> : null}
      {/* 생성과 파괴를 반복하는 것 */}
    </div>
  );
}

export default App;
