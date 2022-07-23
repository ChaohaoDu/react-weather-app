import {AsyncPaginate} from "react-select-async-paginate";
import React, {useState} from "react";
import {GEO_API_URL, geoApiOptions} from "../../api";

let  Search = ({onSearchChange}) => {
  let  [search, setSearch] = useState(null);

  let  loadOptions = (inputValue) => {
    let apiUrl = `${GEO_API_URL}/cities?minPopulation=1000000&namePrefix=${inputValue}`;
    return fetch(apiUrl, geoApiOptions)
    .then(response => response.json())
    .then(response => {
      return {
        options: response.data.map((city) => {
          return {
            value: `${city.latitude} ${city.longitude}`,
            label: `${city.name}, ${city.countryCode}`,
          }
        })
      }
    })
    .catch(err => console.error(err));
  }

  let handleOnChange = (searchData) => {
    setSearch(searchData);
    onSearchChange(searchData);
  };

  return (
      <AsyncPaginate
          placeholder="search for city"
          debounceTimeout={800}
          value={search}
          onChange={handleOnChange}
          loadOptions={loadOptions}
      />
  )
}

export default Search;