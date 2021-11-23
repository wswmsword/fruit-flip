"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

// https://usehooks.com/useAnimation/
function useAnimationTimer() {
  var duration = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 1000;
  var delay = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var deps = arguments.length > 2 ? arguments[2] : undefined;

  var _useState = (0, _react.useState)(0),
      _useState2 = _slicedToArray(_useState, 2),
      elapsed = _useState2[0],
      setTime = _useState2[1];

  (0, _react.useEffect)(function () {
    var animationFrame, timerStop, start;
    setTime(0); // Function to be executed on each animation frame

    function onFrame() {
      setTime(Date.now() - start);
      loop();
    } // Call onFrame() on next animation frame


    function loop() {
      animationFrame = requestAnimationFrame(onFrame);
    }

    function onStart() {
      // Set a timeout to stop things when duration time elapses
      timerStop = setTimeout(function () {
        cancelAnimationFrame(animationFrame);
        setTime(Date.now() - start);
      }, duration); // Start the loop

      start = Date.now();
      loop();
    } // Start after specified delay (defaults to 0)


    var timerDelay = setTimeout(onStart, delay); // Clean things up

    return function () {
      clearTimeout(timerStop);
      clearTimeout(timerDelay);
      cancelAnimationFrame(animationFrame);
    };
  }, [duration, delay, deps] // Only re-run effect if duration or delay changes
  );
  return elapsed;
}

var _default = useAnimationTimer;
exports["default"] = _default;