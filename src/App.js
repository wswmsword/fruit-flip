import { useState } from 'react';

import './App.css';
import Flip from './components/flip';
import { randomIntInclusive } from './utils/tools';
import easing from "./utils/easing";

function App() {

  const [flipData] = useState([
    ['🍍', '🔔', '🌲', '🥃', '🍉', '🧄', '🍌', '🍅', 'work'],
    ['frozen'],
    ['🍍', '🔔', '🌲', '🥃', '🍉', '🧄', '🍌', '🍅', 'sleep'],
    ['🍍', '🔔', '🌲', '🥃', '🍉', '🧄', '🍌', '🍅', 'eat'],
  ]);
  const [nextIdx, setNextIdx] = useState([9, 1, 9, 9]);
  const next = () => {
    const flipLength = flipData.map(col => col.length);
    const nextIdx = flipLength.map(colLength => randomIntInclusive(1, colLength));
    setNextIdx(nextIdx);
  };
  return (
    <div className="App">
      <Flip
        separator={','}
        width={88}
        height={42}
        data={flipData}
        nextIdx={nextIdx}
        initIdx={[5, 1, 5, 5]}
        easingFn={easing.custom}
        duration={811}
        delay={217}
      />
      <button className="btn_next" onClick={next}>click to shuffle</button>
    </div>
  );
}

export default App;
