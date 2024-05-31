// import style from "./App.module.css";
import { useState, useEffect } from "react";

function App() {
  const [loading, setLoading] = useState(true);
  const [coins, setCoins] = useState([]);

  const [id, setId] = useState(0);
  const onChange = (event) => {
    setId(event.target.value);
    console.log(event.target.value);
  }

  const [number, setNumber] = useState(0);
  const onSelect = (event) => {
    setNumber(event.target.value);
    // console.log(event);
  }

  const [dollar, setDallar] = useState(0);
  const money = (event) => setDallar(event.target.value);
  const [res, setRes] = useState(0);

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
      <input onChange={money} />
      {loading ? <strong>Loading...</strong> : (
        <>
          <select key={id} value={id} onChange={onChange}>
            {coins.map((coin, index) => (
              <option key={coin.id} value={index}>
                {coin.name} ({coin.symbol})
              </option>
            ))}
          </select>
          <hr />
          {coins.map((coin, kingdex) => (
            <div>
              {kingdex == id ? 
                <>
                  <h2>{coin.name}</h2>
                  <span>{coin.id} {coin.symbol}</span> <br /><br />
                  <span>가격은 {coin.quotes.USD.price}USD 입니다.</span><br />
                  <span>지금 가지신 {dollar} 달러로는<br /> {Math.min(dollar/coin.quotes.USD.price)}개의 {coin.symbol}코인을 살 수 있습니다.</span>
                </>
                : null}
            </div>))}
        </>
      )}
    </div>
  );
}

export default App;
