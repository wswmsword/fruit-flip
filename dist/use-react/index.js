"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof = function _typeof(obj) { return typeof obj; }; } else { _typeof = function _typeof(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = Flip;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _tools = require("./utils/tools");

var _useColsTransform = _interopRequireDefault(require("./hooks/useColsTransform"));

var _usePrevious = _interopRequireDefault(require("./hooks/usePrevious"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { "default": obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj["default"] = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function Flip(props) {
  var initIdx = props.initIdx,
      nextIdx = props.nextIdx,
      width = props.width,
      height = props.height,
      data = props.data,
      separator = props.separator,
      easingFn = props.easingFn,
      duration = props.duration,
      delay = props.delay;

  var _useState = (0, _react.useState)([]),
      _useState2 = _slicedToArray(_useState, 2),
      shuffledIndexData = _useState2[0],
      setShuffledIndexData = _useState2[1];

  var _useState3 = (0, _react.useState)([]),
      _useState4 = _slicedToArray(_useState3, 2),
      colsTranslateY = _useState4[0],
      setColsTranslateY = _useState4[1];

  var prevIdx = (0, _usePrevious["default"])(nextIdx);
  (0, _react.useEffect)(function () {
    var startIdx = prevIdx || initIdx;
    var endIdx = nextIdx;
    var shuffledIndexData = data.map(function (colData) {
      return colData.map(function (itemData, idx) {
        return {
          value: itemData,
          index: idx
        };
      });
    }).map(function (colData) {
      return (0, _tools.shuffle)(colData);
    });
    setShuffledIndexData(shuffledIndexData);
    var endIdxCommon = endIdx.map(function (item) {
      return item - 1;
    });
    var startIdxCommon = startIdx.map(function (item) {
      return item - 1;
    });
    var rollInfo = shuffledIndexData.map(function (shuffledColData, idx) {
      var colEndIdxCommon = endIdxCommon[idx];
      var colStartIdxCommon = startIdxCommon[idx];
      var shuffledStartIdx = 0,
          shuffledEndIdx = 0;
      var i = 0;

      for (i; i < shuffledColData.length; ++i) {
        if (shuffledColData[i].index === colEndIdxCommon) {
          shuffledEndIdx = i;
        }

        if (shuffledColData[i].index === colStartIdxCommon) {
          shuffledStartIdx = i;
        }
      }

      return {
        rollLength: shuffledEndIdx - shuffledStartIdx,
        rollStartIdx: shuffledStartIdx
      };
    });
    var colsTranslateY = rollInfo.map(function (info) {
      return {
        initTranslateY: info.rollStartIdx * height * -1,
        offsetTranslateY: info.rollLength * height * -1
      };
    });
    setColsTranslateY(colsTranslateY);
  }, [data, height, initIdx, nextIdx]);
  var colsTransition = (0, _useColsTransform["default"])(colsTranslateY, duration, delay, easingFn);
  return /*#__PURE__*/_react["default"].createElement("div", {
    className: "flip_wrapper"
  }, shuffledIndexData.map(function (shuffledColData, idx) {
    return /*#__PURE__*/_react["default"].createElement(_react["default"].Fragment, {
      key: idx
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "col_wrapper overflow_layer",
      style: {
        width: width + 'px',
        height: height + 'px'
      }
    }, /*#__PURE__*/_react["default"].createElement("div", {
      className: "col_group",
      style: colsTransition[idx]
    }, shuffledColData.map(function (fruitItem) {
      return /*#__PURE__*/_react["default"].createElement("div", {
        className: "digit",
        key: fruitItem.index,
        style: {
          width: width + 'px',
          height: height + 'px'
        }
      }, fruitItem.value);
    }))), idx !== shuffledIndexData.length - 1 && /*#__PURE__*/_react["default"].createElement("div", {
      className: "separator"
    }, separator));
  }));
}