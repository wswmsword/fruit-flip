import { useEffect, useState } from 'react';
import useAnimation from './useAnimation';

function useColsTransition(translateY, duration, delay, easingFn) {
  const [colsTransition, setColsTransition] = useState([]);

  const percentDistance = useAnimation(easingFn, duration, delay, translateY);

  useEffect(() => {
    let d = translateY.map(colTranslateY => {
      const baseLen = colTranslateY.initTranslateY;
      const addLen = colTranslateY.offsetTranslateY * percentDistance;
      const allLen = baseLen + addLen;
      return {
        transform: 'translateY(' + allLen + 'px)',
      };
    });
    setColsTransition(d);
  }, [percentDistance, translateY]);

  return colsTransition;
}

export default useColsTransition;