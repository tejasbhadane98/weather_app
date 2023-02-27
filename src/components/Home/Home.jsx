import React from "react"
import { useState, useEffect } from "react"
import { useContext } from "react"
import "../Home/Home.css"

export default function Home() {
    const [error, setError] = useState(false)
    const [threeEntries, setThreeEntries] = useState([])
    const [city, setCity] = useState([])
    const [searchData, setSearchData] = useState([])

    function fetchDetails(e) {
        e.preventDefault()
        fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=5b9c019d7edd4edbd46f3dc27a267bce`)
            .then(res => res.json())
            .then(json => {
                console.log(json)
                if (json.message === 'city not found' || json.cod[0] === "4") {
                    return setError(true)
                }
                setError(false)
                setSearchData([json])
                if (threeEntries.length <= 3) {
                    if (threeEntries.length === 3) {
                        threeEntries.shift()
                    }
                    threeEntries.push(json.name)
                }

            })
    }
    return (
        <div className='content'>
            <div className="data-content">
                <div className="heading">
                    <h1>Weather App</h1>
                </div>

                <div className="input-city">
                    <input type="search" className="ipt" value={city} placeholder="Enter City Name " onChange={(e) => { setError(false); setSearchData([]); setCity(e.target.value); }} />
                </div>

                <div className="btn">
                    <button onClick={(e) => fetchDetails(e)} >Search</button>
                </div>

                {
                    (error === false && city !== "" && searchData.length !== 0) ?

                        <div className="fetched-data">
                            <h3>Weather Details Of City: {searchData[0].name}</h3>
                            <h3>Current Temperature : {searchData[0].main.temp} °C</h3>
                            <h3>Temperature result : {searchData[0].main.temp_min} °C to {searchData[0].main.temp_max} °C</h3>
                            <h3>Humidity: {searchData[0].main.humidity}</h3>
                            <h3>Sea Level : {searchData[0].main.sea_level} {searchData[0].main.sea_level === undefined && <span>Data Not Found</span>} </h3>
                            <h3>Ground Level : {searchData[0].main.grnd_level} {searchData[0].main.grnd_level === undefined && <span>Data Not Found</span>}</h3>
                        </div>

                        :
                        <div>
                        </div>
                }

                {
                    error &&
                    <div>
                        <h2 className="sub-heading">Enter A Valid City Name</h2>
                    </div>
                }

                {
                    city === "" &&
                    <ol className="output">
                        <h2 >Last 3 City Entries</h2>
                        {
                            threeEntries.map((each) => {
                                return (
                                    <h3> <li>{each}</li></h3>
                                )
                            })
                        }
                    </ol>
                }
            </div>

        </div>
    );
}