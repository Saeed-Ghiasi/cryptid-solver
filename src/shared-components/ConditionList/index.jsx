import React from 'react';

import './ConditionList.css';

function ConditionList({ conditions, color}) {
  return (
    <div className="conditions__container">
      <div className={`conditions__header ${color}`}></div>
      <div className="conditions__content">
        <div>
          <h5>THIS OR THAT</h5>
          <ul>
            {conditions.thisOrThat.map((item) => <li key={`${color}-${item}`}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h5>ONE DISTANCE</h5>
          <ul>
            {conditions.oneDistance.map((item) => <li key={`${color}-${item}`}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h5>TWO DISTANCE</h5>
          <ul>
            {conditions.twoDistance.map((item) => <li key={`${color}-${item}`}>{item}</li>)}
          </ul>
        </div>
        <div>
          <h5>THREE DISTANCE</h5>
          <ul>
            {conditions.threeDistance.map((item) => <li key={`${color}-${item}`}>{item}</li>)}
          </ul>
        </div>
      </div>
    </div>
  );
}

export default ConditionList;