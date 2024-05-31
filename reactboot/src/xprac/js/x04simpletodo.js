import style from "prac/css/x04useEffect.module.css";
import { useState, useEffect } from "react";

function App() {
  const [todo, setTodo] = useState("");
  const [todolist, setTodolist] = useState([]);


  const onChange = (event) => setTodo(event.target.value);
  const onSubmit = (event) => {
    event.preventDefault();
    if (todo === "") {
      return;
      // todo가 ""일때 함수가 작동하지 않도록 한다.
    }
    setTodolist((currentArray) => [...currentArray, todo]);
    setTodo("");
    console.log(todolist.map((item, index) => (<li key={index}>{item}</li>)));
  }

  return (
    <div>
      <h1>To Do List({todolist.length})</h1>
      <form onSubmit={onSubmit}>
        <input
          value={todo}
          onChange={onChange}
          type="text"
        />
        <button className={style.btn}>Add To Do</button>
        <button className={style.btn} onClick={() => console.log(todolist)}>console.log(todolist)</button>
      </form>
      <hr />
      <ul>
        {todolist.map((item, index) => (<li key={index}>{item}<br/> date: {Date()}</li>))}
      </ul>
    </div>
  );
}

export default App;
