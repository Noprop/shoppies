import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Search = () => {
  const [userInput, setUserInput] = useState<String>('');
  const [results, setResults] = useState<object[]>([]);
  const [totalResults, setTotalResults] = useState<number>(0);
  const [dialogBox, setDialogBox] = useState<String>('Enter any movie name here');

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setUserInput(e.currentTarget.value);
  }

  useEffect(() => {
    if (userInput.length > 0) {
      axios({
        method: 'GET',
        url: `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${userInput}&type=movie&page=1`
      }).then(res => {
        console.log(res);
        if (res.data.Response === "True") {
          setResults(res.data.Search);
          setTotalResults(res.data.totalResults);
        } else {
          setResults([]);
          setTotalResults(0);
        }
      })
    } else {
      setDialogBox('Enter any movie name here');
    }
  }, [userInput])

  return (
    <div>
      <input 
        type="text"
        onChange={handleChange}
      />
      <div className="output">
        {results.length > 0 && (
          results.map((item: any) => {
            return <p>{item.Title}</p>
          })
        )}
      </div>
    </div>
  )
}

export default Search;