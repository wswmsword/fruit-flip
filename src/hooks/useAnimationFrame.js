import { useEffect, useRef } from "react";

const useAnimationFrame = (callback, running) => {
  const savedCallback = useRef(callback); // 传进来的callback
  const requestId = useRef(0); // 当前正在执行的requestId

  useEffect(() => {
      savedCallback.current = callback;
  });

  useEffect(() => {
    function tick() {
        savedCallback.current();
        if (running) {
            // 当running为true时，才启动下一个，并拿到最新的requestId
            requestId.current = window.requestAnimationFrame(tick);
        }
    }
    if (running) {
        const animationFrame =
            window.requestAnimationFrame ||
            window.webkitRequestAnimationFrame;
        const cancelAnimationFrame =
            window.cancelAnimationFrame ||
            window.webkitCancelAnimationFrame;
        requestId.current = animationFrame(tick);

        return () => cancelAnimationFrame(requestId.current);
    }
  }, [running]);
};

export default useAnimationFrame;