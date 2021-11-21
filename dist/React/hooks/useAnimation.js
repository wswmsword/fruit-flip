"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _useAnimationTimer = _interopRequireDefault(require("./useAnimationTimer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

// https://usehooks.com/useAnimation/
function useAnimation(easingFn) {
  var duration = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 500;
  var delay = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var deps = arguments.length > 3 ? arguments[3] : undefined;
  var elapsed = (0, _useAnimationTimer["default"])(duration, delay, deps); // Amount of specified duration elapsed on a scale from 0 - 1

  var n = Math.min(1, elapsed / duration); // Return altered value based on our specified easing function

  return easingFn(n);
}

var _default = useAnimation;
exports["default"] = _default;