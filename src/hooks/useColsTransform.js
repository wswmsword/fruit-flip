import { useEffect, useState } from 'react';
import useAnimationFrame from './useAnimationFrame';

function useColsTransition(translateY, duration, easeFnManual) {
  const [colsTransition, setColsTransition] = useState([]);
  const [start, setStart] = useState(() => Date.now());

  const easeFn = easeFnManual.fn;
  const elapsed = Date.now() - start;
  const percentDistance = easeFn(elapsed / duration);
  useEffect(() => {
    setStart(Date.now());
  }, [translateY]);
  useAnimationFrame(() => {
    let d = translateY.map(colTranslateY => {
      const baseLen = colTranslateY.initTranslateY;
      const addLen = colTranslateY.activeTranslateY * percentDistance;
      const allLen = baseLen + addLen
      return {
        transform: 'translateY(' + allLen + 'px)',
      };
    });
    setColsTransition(d);
  }, elapsed < duration);

  return colsTransition;
}

export default useColsTransition;