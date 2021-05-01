import React, { useState, useEffect } from 'react';
import axios from 'axios';

/* 
  TODO: 
  - create dynamic dialogbox
  - implement cache, total results, and pagination feature
  - implement see more feature
*/

interface Props {
  nominations: object[];
  setNominations: React.Dispatch<React.SetStateAction<object[]>>;
}

type Results = object[];

const Search: React.FC<Props> = ({
  nominations,
  setNominations
}) => {
  const [userInput, setUserInput] = useState<String>('');
  const [results, setResults] = useState<Results>([]);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState<number>(0);
  const [dialogBox, setDialogBox] = useState<String>('Enter any movie name here');

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setUserInput(e.currentTarget.value);
  }

  const handleNomination = (index: number): void => {
    if (nominations.length <= 5) {
      setNominations([...nominations, results[index]]);
    } else {
      
    }
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
          setTotalNumberOfResults(res.data.totalResults);
        } else {
          setResults([]);
          setTotalNumberOfResults(0);
        }
      })
    } else {
      setDialogBox('Enter any movie name here');
      setResults([]);
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
          results.map((item: any, index: number) => {
            return (
              <div className="item" key={index}>
                <p>{item.Title}</p>
                <button
                  onClick={() => handleNomination(index)}
                >Nominate</button>
              </div>
            )
          })
        )}
      </div>
    </div>
  )
}

export default Search;