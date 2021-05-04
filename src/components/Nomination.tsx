import { useState, Fragment } from 'react';

interface Props {
  nominations: any[];
  setNominations: React.Dispatch<React.SetStateAction<object[]>>;
  index: number;
}

const Nomination: React.FC<Props> = ({
  nominations,
  setNominations,
  index
}) => {
  const [isHovering, setIsHovering] = useState<boolean>(false);

  const removeNomination = (): void => {
    if (nominations.length === 1) {
      setNominations([]);
    } else {
      const newNominations = [...nominations];
      newNominations.splice(index, 1)
      setNominations(newNominations);
    }
    setIsHovering(false);
  }

  if (nominations.length <= index) {
    return <article className="nomination"></article>;
  } else {
    const { Title, Poster } = nominations[index];
    return (
      <article 
        className={"nomination " + (isHovering && "hovering")}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}  
      >
        <div className="poster-container">
          {Poster !== "N/A"
            ? <img src={Poster} alt={`Poster of ${Title}`} />
            : <p>none</p>
          }
        </div>
        {isHovering && (
          <Fragment>
             <button
              onClick={removeNomination}
              className="remove-nomination"
            >Remove</button>
            <div className="darken"></div>
          </Fragment>
        )}
      </article>
    )
  }
}

export default Nomination;