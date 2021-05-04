import { Fragment } from 'react';
import Nomination from './Nomination';

interface Props {
  nominations: object[];
  setNominations: React.Dispatch<React.SetStateAction<object[]>>;
  setSearchFocus: React.Dispatch<React.SetStateAction<boolean>>;
}

const Content: React.FC<Props> = ({
  nominations,
  setNominations,
  setSearchFocus,
}) => {
  return (
    <main role="main" id="Main">
      <div className="title-container">
        <h1>My Nominations</h1>
        <h3>Welcome to the Shoppies! The doors open at 8pm on May 9th.</h3>
      </div>
      {nominations.length === 0
        ? 
        <div className="no-nominations">
          <img src="./award_show.svg" alt="Two people winning awards at an award show" />
          <p>You currently have zero nominations. Click <button 
            className="focus-search-btn"
            onClick={() => {
              setSearchFocus(true);
            }}>here</button> to start nominating.</p>
        </div>
        : 
        <Fragment>
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
          <div className="bottom-nomination-info">
            {5 - nominations.length !== 0 
              ? <p>You have {5 - nominations.length} nomination{5 - nominations.length !== 1 && 's'} left. Click <button 
                className="focus-search-btn"
                onClick={() => {
                  setSearchFocus(true);
                }}>here</button> to nominate{5 - nominations.length !== 1 ? ' them.' : '.'}</p>
              : <button className="submit-nominations">Submit Nominations</button>
            }
          </div>
        </Fragment>
      }
    </main>
  )
}

export default Content;