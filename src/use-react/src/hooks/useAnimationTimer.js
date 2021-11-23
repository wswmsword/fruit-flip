import { useState, useEffect } from "react";

// https://usehooks.com/useAnimation/
function useAnimationTimer(duration = 1000, delay = 0, deps) {
  const [elapsed, setTime] = useState(0);
  useEffect(
    () => {
      let animationFrame, timerStop, start;
      setTime(0);
      // Function to be executed on each animation frame
      function onFrame() {
        setTime(Date.now() - start);
        loop();
      }
      // Call onFrame() on next animation frame
      function loop() {
        animationFrame = requestAnimationFrame(onFrame);
      }
      function onStart() {
        // Set a timeout to stop things when duration time elapses
        timerStop = setTimeout(() => {
          cancelAnimationFrame(animationFrame);
          setTime(Date.now() - start);
        }, duration);
        // Start the loop
        start = Date.now();
        loop();
      }
      // Start after specified delay (defaults to 0)
      const timerDelay = setTimeout(onStart, delay);
      // Clean things up
      return () => {
        clearTimeout(timerStop);
        clearTimeout(timerDelay);
        cancelAnimationFrame(animationFrame);
      };
    },
    [duration, delay, deps] // Only re-run effect if duration or delay changes
  );
  return elapsed;
}

export default useAnimationTimer;