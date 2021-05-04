import { useState, useEffect, useRef } from 'react';
import './App.scss';
import Search from './components/Search';
import Content from './components/Content';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTimes } from '@fortawesome/free-solid-svg-icons';

interface Cache {
  [key: string]: boolean;
}

const App = () => {
  const [nominations, setNominations] = useState<object[]>([]);
  const [nominationCache, setNominationCache] = useState<Cache>({});
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
  const [displayBanner, setDisplayBanner] = useState<boolean>(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const newCache: Cache = {};
    nominations.forEach((item: any) => {
      newCache[item.imdbID] = true;
    })
    setNominationCache(newCache);
  }, [nominations]);

  useEffect(() => {
    // could potentially be null (see initial declaration) so TS requires checks
    if (searchFocus && searchInputRef && searchInputRef.current) searchInputRef.current.focus();
  }, [searchFocus]);

  return (<>
    <div className="App">
      <header>
        <div className="logo-container">
          <img src="./shoppies-logo-popcorn.svg" alt="Shoppies popcorn"/>
          <img src="./shoppies-text.svg" alt="Shoppies"/>
        </div>
        <Search
          nominations={nominations}
          setNominations={setNominations}
          nominationCache={nominationCache}
          searchFocus={searchFocus}
          setSearchFocus={setSearchFocus}
          searchInputRef={searchInputRef}
          setDisplayBanner={setDisplayBanner}
        />
      </header>
      <Content 
        nominations={nominations}
        setNominations={setNominations}
        setSearchFocus={setSearchFocus}
      />
    </div>

    <div 
      className={"cover-screen " + (searchFocus ? "true" : "false")}
      onClick={() => {
        setSearchFocus(!searchFocus);
      }}
    ></div>

    {(displayBanner && nominations.length === 5) && (
      <div className="banner">
        <div className="wrapper">
          <h2>Well done, you've selected five nominations!</h2>
          <p>When you're confident with your selection please click the button below. You have until May 7th at 12pm to finalize your choices.</p>
          <FontAwesomeIcon 
            icon={faTimes}
            className="close-banner"
            onClick={() => setDisplayBanner(false)}
          />
          <button className="submit-nominations">Submit Nominations</button>
        </div>
      </div>
    )}
  </>);
}

export default App;
