import useAnimationTimer from "./useAnimationTimer";

// https://usehooks.com/useAnimation/
function useAnimation(easingFn, duration = 500, delay = 0, deps) {
  const elapsed = useAnimationTimer(duration, delay, deps);
  // Amount of specified duration elapsed on a scale from 0 - 1
  const n = Math.min(1, elapsed / duration);
  // Return altered value based on our specified easing function
  return easingFn(n);
}

export default useAnimation;