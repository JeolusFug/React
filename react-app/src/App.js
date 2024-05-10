import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// 컴포넌트(사용자정의태그)는 대문자로 시작해야한다.
function Header(props) {
  return <header>
    <h1><a href="/" onClick={(event) => {
      // event.preventDefault는 기본 동작을 방지한다.
      event.preventDefault();
      props.onChangeMode();
    }}>{props.title}</a></h1>
  </header>
}
function Nav(props) {
  const lis = []
  for (let i = 0; i < props.topics.length; i++) {
    let t = props.topics[i]
    lis.push(<li key={t.id}>
      <a id={t.id} href={'/read/' + t.id} onClick={event => {
        event.preventDefault();
        // event.target은 이벤트를 유발시킨 태그를 의미한다. 여기서는 a태그
        props.onChangeMode(Number(event.target.id));
      }}>{t.title}</a>
    </li>)
  }
  return <nav>
    <ol>
      {lis}
    </ol>
  </nav>
}
function Article(props) {
  return <article>
    <h2>{props.title}</h2>
    {props.body}
  </article>
}
function Create(props) {
  return <article>
    <h2>Create</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onCreate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' /></p>
      <p><textarea name='body' placeholder='body'></textarea></p>
      <p><input type='submit' value="Create"></input></p>
    </form>
  </article>
}
function Update(props) {
  const [title, setTitle] = useState(props.title);
  const [body, setBody] = useState(props.title);
  return <article>
    <h2>Update</h2>
    <form onSubmit={event => {
      event.preventDefault();
      const title = event.target.title.value;
      const body = event.target.body.value;
      props.onUpdate(title, body);
    }}>
      <p><input type='text' name='title' placeholder='title' value={title} onChange={event => {
        // console.log(event.target.value);
        setTitle(event.target.value);
      }} /></p>
      <p><textarea name='body' placeholder='body' value={body} onChange={event => {
        setBody(event.target.value);
      }}></textarea></p>
      <p><input type='submit' value="Update"></input></p>
    </form>
  </article>

}

function App() {
  // const _mode = useState("WELCOME");
  // const mode = _mode[0];
  // const setMode = _mode[1];
  // 위의 세줄을 줄여서 작성한 것이 밑에 한줄
  // 밑의 mode, setMode는 이름 바뀌어도 상관 없음
  // 사용된 곳과 동일하게만 해주면 됨
  const [mode, setMode] = useState('WELCOME');
  const [id, setId] = useState(null);
  const [nextId, setNextId] = useState(4);

  const [topics, setTopics] = useState([
    { id: 1, title: 'html', body: "Link to html" },
    { id: 2, title: 'css', body: "Link to css" },
    { id: 3, title: 'javascript', body: "Link to javascript" }
  ]);

  let content = null;
  let contextControl = null;
  if (mode === "WELCOME") {
    content = <Article title="Welcome" body="Hello, WEB"></Article>
  } else if (mode === "read") {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Article title={title} body={body}></Article>
    contextControl = <><li><a href={'/update/' + id} onClick={event => {
      event.preventDefault();
      setMode('update');
    }}>Update</a></li>
      <li><input type='button' value="Delete" onClick={()=> {
        const newTopics = []
        for(let i = 0; i < topics.length; i++) {
          if(topics[i].id !== id) {
            newTopics.push(topics[i])
          }
        }
        setTopics(newTopics);
        setMode("WELCOME");
      }} /></li></>
  } else if (mode === "create") {
    content = <Create onCreate={(_title, _body) => {
      const newTopic = { id: nextId, title: _title, body: _body }
      // ...topics는 기존에 html, css등의 배열인 topics의 복제본을 만드는 것
      const newTopics = [...topics]
      newTopics.push(newTopic);
      // 오리지널인 topics와 복제품인 newTopics가 다르다면 그때 컴포넌트를 다시 실행해준다
      // 오리지널 데이터를 수정하지 않고 새로운 데이터를 추가하기 위함
      setTopics(newTopics);
      setMode("read");
      setId(nextId);
      setNextId(nextId + 1);
    }}></Create>
  } else if (mode === 'update') {
    let title, body = null;
    for (let i = 0; i < topics.length; i++) {
      if (topics[i].id === id) {
        title = topics[i].title;
        body = topics[i].body;
      }
    }
    content = <Update title={title} body={body} onUpdate={(title, body) => {
      const newTopics = [...topics];
      const updatedTopic = { id: id, title: title, body: body }
      for (let i = 0; i < newTopics.length; i++) {
        if (newTopics[i].id === id) {
          newTopics[i] = updatedTopic;
          break;
        }
      }
      setTopics(newTopics);
      setMode('read');
    }}></Update>
  }

  return (
    <div>
      <Header title="WEB" onChangeMode={() => {
        setMode("WELCOME");
      }}></Header>
      <Nav topics={topics} onChangeMode={(_id) => {
        setMode("read");
        setId(_id);
      }}></Nav>
      {content}
      <ul>
        <li><a href='/create' onClick={event => {
          event.preventDefault();
          setMode("create");
        }}>create</a></li>
        {contextControl}
      </ul>
    </div>
  );
}

export default App;
