import React, { useState } from 'react';

import Tile from './shared-components/Tile';
import SectionInput from './shared-components/SectionInputs';
import ConditionList from './shared-components/ConditionList';

import { StartGame } from './utils/game.js';
import { PLAYERS, ANSWERS } from './data/substances.js';

import './App.css';

function App() {
  const [sections, setSections] = useState({
    first: { value: 1, dir: 'N'},
    second: { value: 2, dir: 'N'},
    third: { value: 3, dir: 'N'},
    fourth: { value: 4, dir: 'N'},
    fifth: { value: 5, dir: 'N'},
    sixth: { value: 6, dir: 'N'},
  });
  const [board, setBoard] = useState([]);
  const [game, setGame] = useState('')
  const [availableConditions, setAvailableConditions] = useState()

  function handleSection(e) {
    const { name, value, type } = e.target;

    setSections((prevSections) => ({ ...prevSections, [name]: { dir: prevSections[name].dir, value }}))
  }

  function handleSelect(e) {
    const { name, value } = e.target;

    setSections((prevSections) => ({ ...prevSections, [name]: { value: prevSections[name].value, dir: value }}))
  }

  function createBoard() {
    if (!game) {
      const { first, second, third, fourth, fifth, sixth } = sections;
      const game = new StartGame(first, second, third, fourth, fifth, sixth, 5);
      setGame(game);
      setBoard(game.getBoard());
    }
  }

  function visualize() {
    return (
      <div className="board">
        {board.map((col, colIndex) => (
          <div key={colIndex} className="each-col">
            {col.map((item, rowIndex) => (
              <Tile
                key={`${colIndex}_${rowIndex}`}
                game={game}
                setAvailableConditions={setAvailableConditions}
                type={item}
                colIndex={colIndex}
                rowIndex={rowIndex}
              />
            ))}
          </div>
        ))}
      </div>
    )
  }

  function showConditions() {
    const conditions = game && availableConditions;
    return (
      <>
        {
        conditions && 
          <div>
          <ConditionList conditions={conditions[PLAYERS.RED]} color={PLAYERS.RED} />
          <ConditionList conditions={conditions[PLAYERS.BLUE]} color={PLAYERS.BLUE} />
          <ConditionList conditions={conditions[PLAYERS.PURPLE]} color={PLAYERS.PURPLE} />
          <ConditionList conditions={conditions[PLAYERS.GREEN]} color={PLAYERS.GREEN} />
          <ConditionList conditions={conditions[PLAYERS.BROWN]} color={PLAYERS.BROWN} />
        </div>
        }
      </>
    )
  } 

  return (
    <div className="App">
      <div className="sections-inputs">
        <SectionInput sections={sections} name="first" handleSection={handleSection} handleSelect={handleSelect} />
        <SectionInput sections={sections} name="second" handleSection={handleSection} handleSelect={handleSelect} />
        <SectionInput sections={sections} name="third" handleSection={handleSection} handleSelect={handleSelect} />
        <SectionInput sections={sections} name="fourth" handleSection={handleSection} handleSelect={handleSelect} />
        <SectionInput sections={sections} name="fifth" handleSection={handleSection} handleSelect={handleSelect} />
        <SectionInput sections={sections} name="sixth" handleSection={handleSection} handleSelect={handleSelect} />
        <div>
          <input type="button" onClick={createBoard} value="create" />
        </div>
      </div>

      {visualize()}

      {game && showConditions()}
    </div>
  );
}

export default App;
