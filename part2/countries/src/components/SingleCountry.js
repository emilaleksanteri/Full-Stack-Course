const SingleCountry = (props) => {

    // displays info on single country

    // makes an arrya out of languages spoken in set country
    const countries = Object.values(props.languages)

    // creates keys for each value in language array
    let counter = 0

    // weather api returns kelvin, turns kelvin to C
    const temeprature = (props.weather.main.temp - 273.15).toPrecision(3)

    // setting icon url based on weather data
    const icon_id = props.weather.weather[0].icon
    const icon ='http://openweathermap.org/img/wn/'+icon_id+'@2x.png'

    return (
        <div>
            <h2>{props.name}</h2>
            <p>capital: {props.capital}</p>
            <p>area: {props.area}</p>
            <h3>languages</h3>
            <ul>
                {countries.map(language=>
                <li key={counter ++} >{language}</li>
                )}
            </ul>
            <div>
                <img src={props.flags.png} alt='Country Flag' />
            </div>
            <h2>Weather in {props.name}</h2>
            <p>temperature {temeprature} Celcius</p>
            <div>
                <img src={icon} alt='State of weather' />
            </div>
            <p>wind {props.weather.wind.speed} m/s</p>
        </div>
    )
}

export default SingleCountry