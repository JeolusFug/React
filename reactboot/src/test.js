// import style from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);
  const [id, setId] = useState("");
  const onSelect = (event) => {setId(event.target.value);
    console.log(id);
    console.log(coins);
  }
  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/tickers")
      .then((response) => response.json())
      .then((json) => setCoins(json));
    setLoading(false);
    console.log(coins.id);
  }, [])
  // 첫 로딩시 한번만 실행

  return (
    <div>
      <h1>Coin Market {loading ? "" : `(${coins.length})`}</h1>
      {loading ? <strong>Loading...</strong> : (
        <>
          <select value={id} onChange={onSelect}>
            {coins.map((coin) => (
              <option key={coin.id} value={coin.id}>
                {coin.name} ({coin.symbol}) : {coin.quotes.USD.price}USD
              </option>
            ))}
          </select>
          {coins.map((coin, index) => {
            {index.id === id ? (<h2>{coin.id}</h2>) : null}
          })}
          <hr />
          {coins.id ? <h2>coins.name</h2> : null}
        </>
      )}
    </div>
  );
}

export default App;
