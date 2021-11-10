import { useState } from 'react';

import './App.css';
import Flip from './components/flip';
import { randomIntInclusive } from './utils/tools';

function App() {

  const [flipData] = useState([
    ['frozen'],
    ['🍏', '🍇', '🍍', '🥃', '🍒', '🧄', '🥝', '🫐', 'work'],
    ['frozen'],
    ['🍏', '🍇', '🍍', '🥃', '🍒', '🧄', '🥝', '🫐', 'sleep'],
    ['🍏', '🍇', '🍍', '🥃', '🍒', '🧄', '🥝', '🫐', 'eat'],
  ]);
  const [nextIdx, setNextIdx] = useState([1, 9, 1, 9, 9]);
  const [easeFn, setEaseFn] = useState(() => ({fn: pos => ((pos /= 0.5) < 1 ? 0.5 * Math.pow(pos, 3) : 0.5 * (Math.pow(pos - 2, 3) + 2))}));
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
        initIdx={[1, 5, 1, 5, 5]}
        easeFn={easeFn}
      />
      <button className="btn_next" onClick={next}>click to shuffle</button>
    </div>
  );
}

export default App;
