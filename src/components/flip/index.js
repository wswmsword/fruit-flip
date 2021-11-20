import React, { useState, useEffect } from "react";
import './index.css'

import { shuffle } from "../../utils/tools";
import useColsTransform from "../../hooks/useColsTransform";
import usePrevious from "../../hooks/usePrevious";

export default function Flip(props) {
  const {
    initIdx, nextIdx,
    width, height,
    data,
    separator,
    easingFn,
    duration, delay,
  } = props;
  const [shuffledIndexData, setShuffledIndexData] = useState([]);
  const [colsTranslateY, setColsTranslateY] = useState([]);

  const prevIdx = usePrevious(nextIdx);

  useEffect(() => {
    const startIdx = prevIdx || initIdx;
    const endIdx = nextIdx;

    const shuffledIndexData = data
      .map(colData =>
        colData.map((itemData, idx) => ({
          value: itemData,
          index: idx,
        }))
      )
      .map(colData => shuffle(colData));
    setShuffledIndexData(shuffledIndexData);

    const endIdxCommon = endIdx.map(item => item - 1);
    const startIdxCommon = startIdx.map(item => item - 1);

    const rollInfo = shuffledIndexData.map((shuffledColData, idx) => {
      const colEndIdxCommon = endIdxCommon[idx];
      const colStartIdxCommon = startIdxCommon[idx];
      let shuffledStartIdx = 0, shuffledEndIdx = 0;
      let i = 0;
      for (i; i < shuffledColData.length; ++ i) {
        if (shuffledColData[i].index === colEndIdxCommon) { shuffledEndIdx = i; }
        if (shuffledColData[i].index === colStartIdxCommon) { shuffledStartIdx = i; }
      }
      return { rollLength: shuffledEndIdx - shuffledStartIdx, rollStartIdx: shuffledStartIdx };
    });
    const colsTranslateY = rollInfo.map(info => ({
      initTranslateY: info.rollStartIdx * height * -1,
      offsetTranslateY: info.rollLength * height * -1,
    }));
    setColsTranslateY(colsTranslateY);
  }, [data, height, initIdx, nextIdx]);

  const colsTransition = useColsTransform(colsTranslateY, duration, delay, easingFn);

  return (
    <div className="flip_wrapper">
    {shuffledIndexData.map((shuffledColData, idx) =>
      <React.Fragment key={idx}>
        <div className="col_wrapper overflow_layer" style={{width: width + 'px', height: height + 'px'}}>
          <div className="col_group" style={ colsTransition[idx] }>
          {shuffledColData.map(fruitItem =>
            <div
              className="digit"
              key={ fruitItem.index }
              style={{width: width + 'px', height: height + 'px'}}>
              { fruitItem.value }
            </div>)}
          </div>
        </div>
        {idx !== shuffledIndexData.length - 1 && <div className="separator">{ separator }</div>}
      </React.Fragment>)}
    </div>
  );
}