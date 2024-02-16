import  { useState } from 'react'
import SingleCardResult from './SingleCardResult'
import SearchForm from './SearchForm'
import Api from '../utils/Api'

function Home() {
  const [searchData, setSearchData] = useState({
    search: '',
    results: '', 
    apiState: undefined
  })

  const searchMovie = ( queryString ,isAdultContent) => {
 Api.search(queryString, isAdultContent)
    .then(res => {
      // console.log(res.data.results[0]);
      setSearchData({ 
      ...searchData, 
      results: (res.data.results[0]) ? res.data.results[0] : '' ,
      apiState: res.data.results[0]
    
    }
      )})
  }

  // searchMovie('matrix', 'true')

  const handleInputChange = (event) => {
    const { name, value } = event.target;
 console.log(event.target);
 console.log([name]);

    setSearchData({
      ...searchData,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    searchMovie(searchData.search);
  };

  return (
    <div className='flex flex-col mx-auto justify-start home'>
      <SearchForm  
            search={searchData.search}
            handleFormSubmit={handleFormSubmit}
            handleInputChange={handleInputChange}
      />
      <div className='grid'>
        <h3 className='text-left text-yellow-50'>Results:</h3>
        <SingleCardResult
        results={searchData.results}
        apiState={searchData.apiState}
        />
      </div>
    </div>
  )
}

export default Home