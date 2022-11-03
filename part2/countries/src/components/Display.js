import ListofCountries from "./ListofCountries"
import SingleCountry from "./SingleCountry"
import Button from "./Button"

const Display = ({showCountry, setShowCountry, showOne, setShowOne, filter, weather, loaded, countriesToShow}) => {
    
    // generates keys for arrays to be mapped
    let idCounter = 0
    
    // one country comes up in search -> display all info neccesary on it
    if (countriesToShow.length === 1 && loaded === true){
        return (
            <div>
                {countriesToShow.map(country =>
                    <SingleCountry name={country.name.common} capital={country.capital} 
                    area={country.area} languages={country.languages} flags={country.flags} key={idCounter ++} 
                    weather={weather} />
                )}
            </div>
        )
    }

    // 10 or less countries show up on search, display a list of names, send data for button functions for list component
    else if (countriesToShow.length <= 10){
        return (
            <div>
          {countriesToShow.map(country =>
            <ListofCountries key={idCounter ++} name={country.name.common}
            setShowOne={setShowOne} setShowCountry={setShowCountry} showOne={showOne} country={country} />
            )}
          </div>
        )
    }

    // if user chose to view one country with button, returns info on one country, also makes return button for going back to list view
    else if(showOne === false && loaded === true){
        return (
            <div>
                <Button onClick={()=>{setShowOne(!showOne); setShowCountry(filter);}} text='return' />
                <SingleCountry name={countriesToShow.name.common} capital={countriesToShow.capital} 
                area={countriesToShow.area} languages={countriesToShow.languages} flags={countriesToShow.flags} 
                weather={weather} />
            </div>
        )
    }

    // all other times, tell user to specify their search
    else {
        return <p>Too many countries, specify filter</p>
    }
}

export default Display