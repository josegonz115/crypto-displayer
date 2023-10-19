import { useState, useEffect } from 'react'
import './App.css'
import CoinInfo from './components/CoinInfo'
const API_KEY = import.meta.env.VITE_APP_API_KEY

function App() {
  const [list, setList] = useState(null)
  useEffect(()=>{
    const fetchAllCoinData = async() => {
      const request = await fetch('https://min-api.cryptocompare.com/data/all/coinlist?api_key=' + API_KEY)
      const jsonResponse = await request.json()
      setList(jsonResponse)
    }
    fetchAllCoinData().catch(console.error)
  }, [])


  // Searchbar feature
  const [filteredResults, setFilteredResults] = useState([]);
  const [searchInput, setSearchInput] = useState("");

  const searchItems = searchValue => {
    setSearchInput(searchValue);
    if (searchValue !== "") {
    const filteredData = Object.entries(list.Data).filter(([coin, coinData]) => 
      coin.toLowerCase().includes(searchValue.toLowerCase()) ||
      coinData.FullName.toLowerCase().includes(searchValue.toLowerCase())
    )
      setFilteredResults(filteredData);
    } else {
      setFilteredResults(Object.entries(list.Data));
    }
  };

  return (
    <div className='whole-page'>
      <h1>My Crypto List</h1>
      <input type="text" placeholder='Search...' onChange={(inputString)=> searchItems(inputString.target.value) }/>
        <ul>
          {searchInput.length > 0 ? 
          filteredResults.map(([coin, coinData]) => {
            return coinData.PlatformType==='blockchain' ?
            <CoinInfo
              key={coinData.Symbol}
              image={coinData.ImageUrl}
              name={coinData.FullName}
              symbol={coinData.Symbol}
            /> : null
          })
          : list && Object.entries(list.Data).map(([coin, coinData])=>{
            return coinData.PlatformType === "blockchain" ?
            <CoinInfo
              key={coinData.Symbol}
              image={coinData.ImageUrl}
              name={coinData.FullName}
              symbol={coinData.Symbol}
            /> : 
            null
          })}
        </ul>
    </div>
  )
}

export default App
