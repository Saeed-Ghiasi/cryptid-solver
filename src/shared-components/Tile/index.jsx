import React, { useState } from 'react';

import Modal from '../Modal';
import { PLAYERS, ANSWERS, ANIMALS, STRUCTURES } from '../../data/substances';

import './Tile.css';

function Tile({ game, setAvailableConditions, type, colIndex, rowIndex }) {
  const [showModal, setShowModal] = useState(false);
  const [player, setPlayer] = useState(PLAYERS.RED);
  const [answer, setAnswer] = useState(ANSWERS.NO);
  const [territory, setTerritory] = useState(ANIMALS.BEAR);
  const [structure, setStructure] = useState(STRUCTURES.BLUE_STONE);
  const [moves, setMoves] = useState(game.getMoves());
  const [tilesData, setTilesData] = useState(game.getTilesData());

  function handleAddAnswer(e) {
    const coordinate = `${colIndex}${rowIndex}`;

    e.preventDefault();
    game.addAnswer(player, coordinate, answer);
    setAvailableConditions(game.getAvailableConditions());

    setMoves(game.getMoves())
    setTilesData(game.getTilesData());
  }

  function handleAddTerritory(e) {
    const coordinate = `${colIndex}${rowIndex}`;

    e.preventDefault();
    game.addTerritory(territory, coordinate);

    setMoves(game.getMoves())
    setTilesData(game.getTilesData());
  }

  function handleAddStructure(e) {
    const coordinate = `${colIndex}${rowIndex}`;

    e.preventDefault();
    game.addStructure(structure, coordinate);

    setMoves(game.getMoves())
    setTilesData(game.getTilesData());
  }

  function handleThings() {
    const classNames = [];
    let playerAnswers = [];

    for (let dataKey in tilesData) {
      if (tilesData[dataKey].includes(`${colIndex}${rowIndex}`)) {
        classNames.push(dataKey)
      }
    }

    for (let player in moves) {
      for (let playerMove of moves[player]) {
        if (playerMove.coordinate === `${colIndex}${rowIndex}`) {
          playerAnswers = `${player[0]}${player[1]}${playerMove.answer[0]}`;
        }
      }
    }

    return (
      <div className={`tile ${classNames.join(' ')}`}>
        {playerAnswers}
      </div>
    );
  }

  return (
    <>
      <Modal showModal={showModal} setShowModal={setShowModal} >
        <h5>{colIndex} - {rowIndex}</h5>
        <form onSubmit={handleAddAnswer}>
          <select
            name="player"
            id={`${colIndex}${rowIndex}-select`}
            value={player}
            onChange={(e) => setPlayer(e.target.value)}
          >
            <option value={PLAYERS.RED}>{PLAYERS.RED}</option>
            <option value={PLAYERS.BLUE}>{PLAYERS.BLUE}</option>
            <option value={PLAYERS.PURPLE}>{PLAYERS.PURPLE}</option>
            <option value={PLAYERS.GREEN}>{PLAYERS.GREEN}</option>
            <option value={PLAYERS.BROWN}>{PLAYERS.BROWN}</option>
          </select>
          <select
            name="answer"
            id={`${colIndex}${rowIndex}-answer`}
            value={answer}
            onChange={(e) => setAnswer(e.target.value)}
          >
            <option value={ANSWERS.NO}>{ANSWERS.NO}</option>
            <option value={ANSWERS.YES}>{ANSWERS.YES}</option>
          </select>
          <input type="submit" />
        </form>
        <form onSubmit={handleAddTerritory}>
          <select
          name="territory"
          id={`${colIndex}${rowIndex}-territory`}
          value={territory}
          onChange={(e) => setTerritory(e.target.value)}
          >
            <option value={ANIMALS.BEAR}>{ANIMALS.BEAR}</option>
            <option value={ANIMALS.COUGAR}>{ANIMALS.COUGAR}</option>
          </select>
          <input type="submit" value="Add Territory" />
        </form>
        <form onSubmit={handleAddStructure}>
          <select
            name="structure"
            id={`${colIndex}${rowIndex}-structure`}
            value={structure}
            onChange={(e) => setStructure(e.target.value)}
            >
              <option value={STRUCTURES.BLUE_STONE}>{STRUCTURES.BLUE_STONE}</option>
              <option value={STRUCTURES.GREEN_STONE}>{STRUCTURES.GREEN_STONE}</option>
              <option value={STRUCTURES.WHITE_STONE}>{STRUCTURES.WHITE_STONE}</option>
              <option value={STRUCTURES.BLUE_SHACK}>{STRUCTURES.BLUE_SHACK}</option>
              <option value={STRUCTURES.GREEN_SHACK}>{STRUCTURES.GREEN_SHACK}</option>
              <option value={STRUCTURES.WHITE_SHACK}>{STRUCTURES.WHITE_SHACK}</option>
            </select>
            <input type="submit" value="Add Structure" />
        </form>
      </Modal>
      <div
        className={`six-sided ${type}`}
        onClick={() => {
          setShowModal(true);
          console.log(colIndex, rowIndex)
        }}
      >
        {handleThings()}
      </div>
    </>
  )
}

export default Tile;