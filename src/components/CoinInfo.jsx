import React, { useState, useEffect } from 'react'
const API_KEY = import.meta.env.VITE_APP_API_KEY

const CoinInfo = ({ image, name, symbol }) => {
    const [price, setPrice] = useState(null)

    useEffect(() => {
        const getCoinPrice = async () => {
            const request = await fetch(`https://min-api.cryptocompare.com/data/price?fsym=${symbol}&tsyms=USD&api_key=${API_KEY}`)
            const jsonResponse = await request.json()
            setPrice(jsonResponse)
        }

    getCoinPrice().catch(console.error)
    }, [symbol])
    
    
    return (        
        <div>
            {price ? (
                <li className='main-list' key={symbol}>
                    <img className='icons' src={`https://www.cryptocompare.com${image}`} alt={`Small icon for ${name} crypto coin`} />
                    {name} {/*  &lt;  */} <span className='tab'></span>${price.USD} USD
                </li>
            ) : 
            null }
        </div>)

}

export default CoinInfo