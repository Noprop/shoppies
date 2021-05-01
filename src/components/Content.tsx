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
      <div className="title-container">
        <h1>My Nominations</h1>
        <h3>You currently have 5 nominations</h3>
      </div>
      {nominations.length === 0
        ? 
        <div className="no-nominations">
          <img src="./award_show.svg" alt="Two people winning awards at an award show" />
        </div>
        : 
        <div className="nomination-display">
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