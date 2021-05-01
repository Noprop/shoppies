import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';

/* 
  TODO: 
  - create dynamic dialogbox: DONE
  - fix static height bug
  - implement cache, total results, and pagination feature
  - implement see more feature
*/

interface Props {
  nominations: object[];
  setNominations: React.Dispatch<React.SetStateAction<object[]>>;
  nominationCache: {
    [key: string]: boolean;
  };
  searchFocus: boolean;
  setSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
  searchInputRef: React.RefObject<HTMLInputElement>;
}
interface Dialog {
  output: string,
  tip: string
}

type Results = object[];

const Search: React.FC<Props> = ({
  nominations,
  setNominations,
  nominationCache,
  searchFocus,
  setSearchFocus,
  searchInputRef
}) => {
  const [userInput, setUserInput] = useState<string>('');
  const [results, setResults] = useState<Results>([]);
  const [totalNumberOfResults, setTotalNumberOfResults] = useState<number>(0);
  const [dialogBox, setDialogBox] = useState<Dialog>({ output: 'Enter any movie you want to nominate.', tip: 'Search by the movie name, not actor or year.' });

  const handleChange = (e: React.FormEvent<HTMLInputElement>): void => {
    setUserInput(e.currentTarget.value);
  }

  const handleNomination = (index: number): void => {
    if (nominations.length < 5) {
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
            setDialogBox({
              output: 'Too many search results.',
              tip: 'Keep typing and use an entire movie name.'
            })
          } else {
            setDialogBox({
              output: 'No movie found!',
              tip: 'Search only for movie titles; not actors or TV shows.'
            })
          }
          setResults([]);
          setTotalNumberOfResults(0);
        }
      })
    } else {
      setDialogBox({ 
        output: 'Enter any movie you want to nominate.',
        tip: 'Search by the movie name, not actor or year.'
      });
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
          onFocus={() => setSearchFocus(true)}
          ref={searchInputRef}
          // onBlur={() => setSearchFocus(false)}
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
      {searchFocus && (
        <Fragment>
          <ul className="output">
            {results.length > 0 ? (
              <Fragment>
                {results.map((movie: any, index: number) => {
                  const { Poster, Title, Year, imdbID } = movie;
                  const len = nominations.length;
                  return (
                    <li 
                      className={"movie " + ((nominationCache[imdbID] || len === 5) && "disabled")}
                      key={imdbID}
                    >
                      <div className="poster-container">
                        {Poster !== "N/A"
                          ? <img src={Poster} alt={`Poster of ${Title}`} />
                          : <p>none</p>
                        }
                      </div>
                      <div className="info-container">
                        <p>{Title}</p>
                        <p>{Year}</p>
                      </div>
                      <button
                        onClick={() => handleNomination(index)}
                        disabled={nominationCache[imdbID] || len === 5}
                      >Nominate</button>
                    </li>
                  )
                })}
              </Fragment>
            ) : (
              <li className="dialog-box">
                <p>{dialogBox.output}</p>
                <p className="dialog-tip">{dialogBox.tip}</p>
              </li>
            )}
          </ul>
          <div className="output-controls">
            <button>Clear 10 movie results</button>
          </div>
        </Fragment>
      )}
    </div>
  )
}

export default Search;