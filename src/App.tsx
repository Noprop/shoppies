import React from 'react';
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const newCache: Cache = {};
    nominations.forEach((item: any) => {
      newCache[item.imdbID] = true;
    })
    setNominationCache(newCache);
  }, [nominations]);

  return (
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
        />
      </header>
      <Content 
        nominations={nominations}
        setNominations={setNominations}
      />
    </div>
  );
}

export default App;
