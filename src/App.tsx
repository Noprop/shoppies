import React from 'react';
import { useState } from 'react';
import './App.css';
import Search from './components/Search';
import Content from './components/Content';

const App = () => {
  const [nominations, setNominations] = useState<object[]>([]);

  return (
    <div className="App">
      <header>
        <Search
          nominations={nominations}
          setNominations={setNominations}
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
