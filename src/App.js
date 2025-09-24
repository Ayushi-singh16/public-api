import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [coins, setCoins] = useState([]);      // store API data
  const [page, setPage] = useState(1);         // current page
  const [loading, setLoading] = useState(true);// show loading text

  // fetch data whenever 'page' changes
  useEffect(() => {
    async function fetchCoins() {
      setLoading(true);
      try {
        const response = await fetch(
          `https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=5&page=${page}`
        );
        const data = await response.json();
        setCoins(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    }
    fetchCoins();
  }, [page]); // runs when page changes

  return (
    <div className="App">
      <header className="header">
        <h1>Live Crypto Prices</h1>
        <p>Page {page}</p>
      </header>

      {loading ? (
        <p className="loading">Loading...</p>
      ) : (
        <>
          <div className="grid">
            {coins.map((coin) => (
              <div className="card" key={coin.id}>
                <img src={coin.image} alt={coin.name} />
                <h2>{coin.name} ({coin.symbol.toUpperCase()})</h2>
                <p>Price: ${coin.current_price.toLocaleString()}</p>
                <p>Market Cap: ${coin.market_cap.toLocaleString()}</p>
                <p>24h Change: {coin.price_change_percentage_24h.toFixed(2)}%</p>
              </div>
            ))}
          </div>

          <div className="pagination">
            <button
              onClick={() => setPage((p) => Math.max(p - 1, 1))}
              disabled={page === 1}
            >
              Previous
            </button>
            <button onClick={() => setPage((p) => p + 1)}>Next</button>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
