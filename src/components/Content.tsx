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
    <div className="content">
      {nominations.length === 0
        ? <div></div>
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
    </div>
  )
}

export default Content;