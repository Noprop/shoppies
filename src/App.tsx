import React from 'react';
import { useState, useEffect } from 'react';
import './App.css';
import Search from './components/Search';
import Content from './components/Content';

interface Cache {
  [key: string]: boolean;
}

const App = () => {
  const [nominations, setNominations] = useState<object[]>([]);
  const [nominationCache, setNominationCache] = useState<Cache>({});

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
        <Search
          nominations={nominations}
          setNominations={setNominations}
          nominationCache={nominationCache}
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
