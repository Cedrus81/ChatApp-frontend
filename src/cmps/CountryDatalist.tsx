import { memo } from "react"
import { countries } from "../data"


function CountryDatalist(){
    return (
            <datalist id="country-codes" >
                {countries.map( country => 
                  <option key={country.code} value={country.dial_code}>
                    {country.flag + ' ' + country.name}
                  </option>  
                )}
            </datalist>
    )
}

export default memo(CountryDatalist)