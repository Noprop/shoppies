import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

/* 
  TODO: 
  - create dynamic dialogbox
  - implement cache, total results, and pagination feature
  - implement see more feature
*/

interface Props {
  nominations: object[];
  setNominations: React.Dispatch<React.SetStateAction<object[]>>;
  nominationCache: {
    [key: string]: boolean;
  };
}

type Results = object[];

const Search: React.FC<Props> = ({
  nominations,
  setNominations,
  nominationCache
}) => {
  const [userInput, setUserInput] = useState<string>('');
  const [results, setResults] = useState<Results>([]);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState<number>(0);
  const [dialogBox, setDialogBox] = useState<string>('Enter any movie name here');

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
          if (res.data.Error === "Too many results.") {
            setDialogBox('Too many search results, keep typing');
          } else {
            setDialogBox('No movie found!');
          }
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
    <div className="search">
      <div className="search-container">
        <FontAwesomeIcon 
          icon={faSearch}
          className="search-icon"
        />
        <input 
          type="text"
          className="search"
          onChange={handleChange}
          value={userInput}
          autoComplete="off"
          placeholder="Search for movies here"
        />
        {userInput.length > 0 && (
          <FontAwesomeIcon 
            icon={faTimesCircle}
            className="clear-icon"
            onClick={() => {
              setUserInput('');
              setResults([]);
              setTotalNumberOfResults(0);
            }}
          />
        )}
      </div>
      <div className="output">
        {results.length > 0 ? (
          results.map((item: any, index: number) => {
            return (
              <div className="item" key={item.imdbID}>
                <p>{item.Title}</p>
                <button
                  onClick={() => handleNomination(index)}
                  disabled={nominationCache[item.imdbID]}
                >Nominate</button>
              </div>
            )
          })
        ) : (
          <div className="dialog-box">
            <p>{dialogBox}</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default Search;