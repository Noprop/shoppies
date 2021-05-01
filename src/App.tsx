import { useState, useEffect, Fragment, useRef } from 'react';
import './App.scss';
import Search from './components/Search';
import Content from './components/Content';

interface Cache {
  [key: string]: boolean;
}

const App = () => {
  const [nominations, setNominations] = useState<object[]>([]);
  const [nominationCache, setNominationCache] = useState<Cache>({});
  const [searchFocus, setSearchFocus] = useState<boolean>(false);
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

  return (
    <Fragment>
      <div className="App">
        <header>
          <div className="logo-container">
            <img src="./shoppies-logo.svg" alt="Shoppies logo"/>
          </div>
          <Search
            nominations={nominations}
            setNominations={setNominations}
            nominationCache={nominationCache}
            searchFocus={searchFocus}
            setSearchFocus={setSearchFocus}
            searchInputRef={searchInputRef}
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
    </Fragment>
  );
}

export default App;
