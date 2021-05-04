import React, { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimesCircle } from '@fortawesome/free-solid-svg-icons';
import { getMovies } from './queries';

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
interface ResultsCache {
  [key: number]: any[]
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
  const [resultsCache, setResultsCache] = useState<ResultsCache>({});
  const [dialogBox, setDialogBox] = useState<Dialog>({ output: 'Enter any movie you want to nominate.', tip: 'Search by the movie name, not actor or year.' });
  const [paginationButtons, setPaginationButtons] = useState<number[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(1);
  const [loading, setLoading] = useState<boolean>(false);

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
      if (pageNumber !== 1) setPageNumber(1);
      axios({
        method: 'GET',
        url: `https://www.omdbapi.com/?apikey=${process.env.REACT_APP_API_KEY}&s=${userInput}&type=movie&page=1`
      }).then(res => {
        console.log(res);
        if (res.data.Response === "True") {
          setResults(res.data.Search);
          setResultsCache({
            1: res.data.Search
          })
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
          setResultsCache([]);
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

  useEffect(() => {
    const paginate = totalNumberOfResults / 10
    if (paginate > 1) {
      const pagArray: number[] = [];
      for (let i = 0; i < paginate && i < 6; i++) {
        pagArray.push(i);
      }
      setPaginationButtons(pagArray);
    }
  }, [totalNumberOfResults])
  
  const handlePageChange = async (pageNum: number) => {
    if (!loading) {
      setPageNumber(pageNum);
      setLoading(true);
      if (resultsCache[pageNum]) {
        setResults(resultsCache[pageNum]);
      } else {
        const movies = await getMovies(userInput, pageNum);
        console.log(movies);
        if (movies.Response === 'True') {
          console.log(movies.Search);
          setResults(movies.Search);
          setResultsCache({
            ...resultsCache,
            [pageNum]: movies.Search
          })
        }
      }
      setLoading(false);
    }
  }

  return (
    <div className="search">
      <div className="search-container">
        <FontAwesomeIcon 
          icon={faSearch}
          className="search-icon"
          onClick={() => setSearchFocus(true)}
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
        />
        {userInput.length > 0 && (
          <FontAwesomeIcon 
            icon={faTimesCircle}
            className="clear-icon"
            onClick={() => {
              setUserInput('');
              setResults([]);
              setTotalNumberOfResults(0);
              if (!searchFocus) setSearchFocus(true);
            }}
          />
        )}
      </div>
      {searchFocus && (
        <Fragment>
          <ul className={"output " + (results.length === 0 && "dialog")}>
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
                      >Nominate{nominationCache[imdbID] && 'd'}</button>
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
          {results.length > 0 && (
            <div className="output-controls">
              <button
                onClick={() => {
                  setUserInput('');
                  setResults([]);
                  setTotalNumberOfResults(0);
                  setDialogBox({
                    output: 'Enter any movie you want to nominate.', 
                    tip: 'Search by the movie name, not actor or year.' 
                  });
                  setSearchFocus(true);
                }}
                className="clear-btn"
              >Clear {paginationButtons.length}0 movie results</button>
              {paginationButtons.length > 1 && (
                <div className="pagination">
                  {paginationButtons.map(pageNum => {
                    return (<button 
                      onClick={() => handlePageChange(pageNum + 1)}
                      className={"pagination-btn " + (pageNumber === pageNum + 1 && "selected")}
                    ></button>)
                  })}
                </div>
              )}
            </div>
          )}
        </Fragment>
      )}
    </div>
  )
}

export default Search;