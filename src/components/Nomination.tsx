import { useState, useEffect } from 'react';

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
  const removeNomination = (): void => {

  }

  if (nominations.length <= index) {
    return <div>
      <p>empty</p>
    </div>
  } else {
    const { Title } = nominations[index];
    return (
      <article className="nomination">
        <h2>{Title}</h2>
        <button
          onClick={removeNomination}
        >Remove</button>
      </article>
    )
  }
}

export default Nomination;