import { useState, useEffect } from 'react';
import Nomination from './Nomination';

interface Props {
  nominations: object[];
  setNominations: React.Dispatch<React.SetStateAction<object[]>>;
}

const Content: React.FC<Props> = ({
  nominations,
  setNominations
}) => {
  return (
    <main role="main" id="Main">
      {nominations.length === 0
        ? <div><h2>no nominations</h2></div>
        : 
        <div>
          <Nomination 
            nominations={nominations}
            setNominations={setNominations}
            index={0}
          />
          <Nomination 
            nominations={nominations}
            setNominations={setNominations}
            index={1}
          />
          <Nomination 
            nominations={nominations}
            setNominations={setNominations}
            index={2}
          />
          <Nomination 
            nominations={nominations}
            setNominations={setNominations}
            index={3}
          />
          <Nomination 
            nominations={nominations}
            setNominations={setNominations}
            index={4}
          />
        </div>
      }
    </main>
  )
}

export default Content;