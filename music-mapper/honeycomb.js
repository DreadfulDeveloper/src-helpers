(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("Honeycomb", [], factory);
	else if(typeof exports === 'object')
		exports["Honeycomb"] = factory();
	else
		root["Honeycomb"] = factory();
})(this, function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 10);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
var DIRECTION_COORDINATES = exports.DIRECTION_COORDINATES = [{ x: 1, y: -1, z: 0 }, { x: 1, y: 0, z: -1 }, { x: 0, y: 1, z: -1 }, { x: -1, y: 1, z: 0 }, { x: -1, y: 0, z: 1 }, { x: 0, y: -1, z: 1 }];

var DIAGONAL_DIRECTION_COORDINATES = exports.DIAGONAL_DIRECTION_COORDINATES = [{ x: 2, y: -1, z: -1 }, { x: 1, y: 1, z: -2 }, { x: -1, y: 2, z: -1 }, { x: -2, y: 1, z: 1 }, { x: -1, y: -1, z: 2 }, { x: 1, y: -2, z: 1 }];

/**
 * The different orientations hexes can have.
 *
 * @constant
 * @type {Object}
 */
var ORIENTATIONS = exports.ORIENTATIONS = {
    /**
     * @enum {string} POINTY ⬢
     */
    POINTY: 'POINTY',
    /**
     * @enum {string} FLAT ⬣.
     */
    FLAT: 'FLAT'
};

var EPSILON = exports.EPSILON = { x: 1e-6, y: 1e-6, z: -2e-6 };

/***/ }),
/* 1 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = Point;

var _axis = __webpack_require__(2);

var _prototype = __webpack_require__(11);

var methods = _interopRequireWildcard(_prototype);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

/**
 * @function Point
 *
 * @description
 * Factory function for creating 2-dimensional points. Accepts a **point-like** and returns a point instance. A point-like can be an object with an `x` and `y` property (e.g. `{ x: 0, y: 0 }`) or an array with 2 items (e.g. `[0, 0]`) that correspond to `x` and `y` respectively.
 *
 * @param {(number|number[]|Object)} [coordinatesOrX=0] The x coordinate or a point-like.
 * @param {number} [coordinatesOrX.x=0]                 The x coordinate.
 * @param {number} [coordinatesOrX.y=0]                 The y coordinate.
 * @param {number} [y=0]                                The y coordinate.
 *
 * @returns {Point}                                     A point object.
 *
 * @example
 * import { Point } from 'Honeycomb'
 *
 * Point()                  // { x: 0, y: 0 }
 * Point(1)                 // { x: 1, y: 1 }
 * Point(1, 2)              // { x: 1, y: 2 }
 *
 * Point([1, 2])            // { x: 1, y: 2 }
 * Point([1])               // { x: 1, y: 1 }
 *
 * Point({ x: 1, y: 2 })    // { x: 1, y: 2 }
 * Point({ x: 1 })          // { x: 1, y: 1 }
 * Point({ y: 2 })          // { x: 2, y: 2 }
 */
function Point(coordinatesOrX, y) {
    var coordinates = void 0;

    if ((0, _axis.isNumber)(coordinatesOrX)) {
        coordinates = _setMissingCoordinate(coordinatesOrX, y);
    } else if ((0, _axis.isArray)(coordinatesOrX)) {
        coordinates = _setMissingCoordinate.apply(undefined, _toConsumableArray(coordinatesOrX));
    } else if ((0, _axis.isObject)(coordinatesOrX)) {
        coordinates = _setMissingCoordinate(coordinatesOrX.x, coordinatesOrX.y);
    } else {
        coordinates = _setMissingCoordinate(0);
    }

    function _setMissingCoordinate(x, y) {
        return {
            x: (0, _axis.isNumber)(x) ? x : y,
            y: (0, _axis.isNumber)(y) ? y : x
        };
    }

    return Object.assign(Object.create(methods), coordinates);
}

/***/ }),
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";
var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

/*! axis.js v1.2.1 | (c) 2016 @toddmotto | https://github.com/toddmotto/axis */
(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else if ((typeof exports === 'undefined' ? 'undefined' : _typeof(exports)) === 'object') {
    module.exports = factory();
  } else {
    root.axis = factory();
  }
})(undefined, function () {

  'use strict';

  var axis = {};

  var types = 'Array Object String Date RegExp Function Boolean Number Null Undefined'.split(' ');

  function type() {
    return Object.prototype.toString.call(this).slice(8, -1);
  }

  for (var i = types.length; i--;) {
    axis['is' + types[i]] = function (self) {
      return function (elem) {
        return type.call(elem) === self;
      };
    }(types[i]);
  }

  return axis;
});

/***/ }),
/* 3 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

module.exports = isNode;

function isNode(val) {
  return !val || (typeof val === 'undefined' ? 'undefined' : _typeof(val)) !== 'object' ? false : (typeof window === 'undefined' ? 'undefined' : _typeof(window)) === 'object' && _typeof(window.Node) === 'object' ? val instanceof window.Node : typeof val.nodeType === 'number' && typeof val.nodeName === 'string';
}

/***/ }),
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = GridFactory;

var _point = __webpack_require__(1);

var _point2 = _interopRequireDefault(_point);

var _methods = __webpack_require__(7);

var methods = _interopRequireWildcard(_methods);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function GridFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        HexFactory = _ref.HexFactory;

    /**
     * @module src/grid
     * @function Grid
     *
     * @description
     * Factory function for creating grids. It accepts optional hex settings that apply to all hexes in the grid. Several "shape" methods are exposed that return an array of hexes in a certain shape.
     *
     * A grid is *viewless*, i.e.: it's a virtual grid with undefined dimensions. If you want to render a tangible grid, use {@link View}.
     *
     * @param {Object} [hexSettings]                            Optional settings that apply to *all* hexes in the grid.
     * @param {number} [hexSettings.size=1]                     Size of all hexes.
     * @param {(FLAT|POINTY)} [hexSettings.orientation=POINTY]  All hexes are either POINTY ⬢ or FLAT ⬣.
     * @param {Point} [hexSettings.origin=Point(0,0)]           Used to convert a hex to a point. Defaults to the hex's center at `Point(0, 0)`.
     *
     * @returns {Grid}                                          A grid instance containing a {@link Hex} factory and several methods. Use the {@link Hex} factory for creating individual hexes or using any of the {@link Hex}'s methods.
     *
     * @example
     * import { Grid, HEX_ORIENTATIONS } from 'Honeycomb'
     *
     * const grid = Grid({
     *     size: 50,
     *     orientation: HEX_ORIENTATIONS.FLAT,
     *     customProperty: `I'm custom 😃`
     * })
     *
     * const singleHex = grid.Hex(5, -1, -4)
     * singleHex.coordinates()      // { x: 5, y: -1, z: -4 }
     * singleHex.size               // 50
     * singleHex.customProperty     // I'm custom 😃
     *
     * grid.triangle(3)             // [ { x: 0, y: 0, z: 0 },
     *                              //   { x: 0, y: 1, z: -1 },
     *                              //   { x: 0, y: 2, z: -2 },
     *                              //   { x: 1, y: 0, z: -1 },
     *                              //   { x: 1, y: 1, z: -2 },
     *                              //   { x: 2, y: 0, z: -2 } ]
     */
    return function Grid(hexSettings) {
        // TODO: validate hexSettings
        var Hex = HexFactory(hexSettings);

        return {
            Hex: Hex,
            pointToHex: methods.pointToHexFactory({ Point: _point2.default, Hex: Hex }),
            hexToPoint: methods.hexToPoint,
            colSize: methods.colSizeFactory({ Hex: Hex }),
            rowSize: methods.rowSizeFactory({ Hex: Hex }),
            parallelogram: methods.parallelogramFactory({ Hex: Hex }),
            triangle: methods.triangleFactory({ Hex: Hex }),
            hexagon: methods.hexagonFactory({ Hex: Hex }),
            rectangle: methods.rectangleFactory({ Hex: Hex })
        };
    };
}

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.default = HexFactory;

var _axis = __webpack_require__(2);

var _utils = __webpack_require__(12);

var _constants = __webpack_require__(0);

var _point = __webpack_require__(1);

var _point2 = _interopRequireDefault(_point);

var _statics = __webpack_require__(9);

var statics = _interopRequireWildcard(_statics);

var _prototype = __webpack_require__(8);

var methods = _interopRequireWildcard(_prototype);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @function HexFactory
 * @private
 *
 * @description
 * Factory that produces a {@link Hex} function to create hexes with. It accepts optional hex settings that are used to create a "family" of hexes that can be used in a grid (or individually). This "family" of hexes all share the same `prototype`.
 *
 * @todo validate orientation, size, origin
 * @todo warn when properties are overriden
 *
 * @param {Object} [customPrototype={}] An object that's used as the prototype for all hexes in the grid. **Warning:** properties with the same name as the default prototype will be overwritten. These properties are: `orientation`, `size`, `origin`, `coordinates`, `isPointy`, `isFlat`, `oppositeCornerDistance`, `oppositeSideDistance`, `width`, `height`, `corners`, `topLeft` and `toPoint`.
 *
 * @returns {Hex}                       A function to produce hexes, all sharing the same `prototype`.
 */
function HexFactory() {
    var customPrototype = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    var defaultPrototype = {
        // settings:
        orientation: _constants.ORIENTATIONS.POINTY,
        size: 1,
        origin: 0,

        // methods:
        coordinates: methods.coordinates,
        isPointy: methods.isPointy,
        isFlat: methods.isFlat,
        oppositeCornerDistance: methods.oppositeCornerDistance,
        oppositeSideDistance: methods.oppositeSideDistance,
        width: methods.width,
        height: methods.height,
        corners: methods.cornersFactory({ Point: _point2.default }),
        topLeft: methods.topLeftFactory({ Point: _point2.default }),
        toPoint: methods.toPointFactory({ Point: _point2.default })
    };
    var prototype = Object.assign(defaultPrototype, customPrototype);
    // ensure origin is a point
    prototype.origin = (0, _point2.default)(prototype.origin);

    /**
     * @function Hex
     *
     * @description
     * Factory function for creating hexes. It can only be accessed by creating a {@link Grid} (see the example).
     *
     * Coordinates not passed to the factory are inferred using the other coordinates:
     * * When two coordinates are passed, the third coordinate is set to the result of {@link Hex.thirdCoordinate|Hex.thirdCoordinate(firstCoordinate, secondCoordinate)}.
     * * When one coordinate is passed, the second coordinate is set to the first and the third coordinate is set to the result of {@link Hex.thirdCoordinate|Hex.thirdCoordinate(firstCoordinate, secondCoordinate)}.
     * * When nothing or a falsy value is passed, all coordinates are set to `0`.
     *
     * @see {@link redblobgames.com|http://www.redblobgames.com/grids/hexagons/#coordinates}
     *
     * @param {(number|Object)} [coordinates=0] The x coordinate or an object containing any of the x, y and z coordinates.
     * @param {number} [coordinates.x=0]        The x coordinate.
     * @param {number} [coordinates.y=0]        The y coordinate.
     * @param {number} [coordinates.z=0]        The z coordinate.
     * @param {number} [y=0]                    The y coordinate.
     * @param {number} [z=0]                    The z coordinate.
     *
     * @returns {Hex}                           A hex object. It has all three coordinates (`x`, `y` and `z`) as its own properties and various methods in its prototype.
     *
     * @example
     * import { Grid } from 'Honeycomb'
     * // `Hex()` is not exposed on `Honeycomb`, but on a grid instance instead:
     * const Hex = Grid().Hex
     *
     * Hex()            // returns hex( x: 0, y: 0, z: 0 )
     * Hex(1)           // returns hex( x: 1, y: 1, z: -2 )
     * Hex(1, 2)        // returns hex( x: 1, y: 2, z: -3 )
     * Hex(1, 2, -3)    // returns hex( x: 1, y: 2, z: -3 )
     * Hex(1, 2, 5)     // coordinates don't sum up to 0; throws an error
     *
     * Hex({ x: 3 })    // returns hex( x: 3, y: 3, z: -3 )
     * Hex({ y: 3 })    // returns hex( x: 3, y: 3, z: -6 )
     * Hex({ z: 3 })    // returns hex( x: 3, y: -6, z: 3 )
     */
    function Hex() {
        for (var _len = arguments.length, coordinates = Array(_len), _key = 0; _key < _len; _key++) {
            coordinates[_key] = arguments[_key];
        }

        // if an object is passed, extract coordinates and call self
        if ((0, _axis.isObject)(coordinates[0])) {
            var _coordinates$ = coordinates[0],
                _x2 = _coordinates$.x,
                _y = _coordinates$.y,
                _z = _coordinates$.z;

            return Hex(_x2, _y, _z);
        }

        var _coordinates$map = coordinates.map(_utils.unsignNegativeZero),
            _coordinates$map2 = _slicedToArray(_coordinates$map, 3),
            x = _coordinates$map2[0],
            y = _coordinates$map2[1],
            z = _coordinates$map2[2];

        switch (coordinates.filter(_axis.isNumber).length) {
            case 3:
                break;
            case 2:
                x = (0, _axis.isNumber)(x) ? x : Hex.thirdCoordinate(y, z);
                y = (0, _axis.isNumber)(y) ? y : Hex.thirdCoordinate(x, z);
                z = (0, _axis.isNumber)(z) ? z : Hex.thirdCoordinate(x, y);
                break;
            case 1:
                if ((0, _axis.isNumber)(x)) {
                    y = x;
                    z = Hex.thirdCoordinate(x, y);
                } else if ((0, _axis.isNumber)(y)) {
                    x = y;
                    z = Hex.thirdCoordinate(x, y);
                } else {
                    x = z;
                    y = Hex.thirdCoordinate(x, z);
                }
                break;
            default:
                x = y = z = 0;
        }

        if (Math.round(x + y + z) !== 0) {
            throw new Error('Coordinates don\'t sum to 0: { x: ' + x + ', y: ' + y + ', z: ' + z + ' }.');
        }

        // return an object containing the coordinates that's prototype-linked to the prototype created in HexFactory
        return Object.assign(Object.create(prototype), { x: x, y: y, z: z });
    }

    Object.assign(Hex, {
        thirdCoordinate: statics.thirdCoordinateFactory({ unsignNegativeZero: _utils.unsignNegativeZero }),
        hexesBetween: statics.hexesBetweenFactory({ Hex: Hex }),
        add: statics.addFactory({ Hex: Hex }),
        subtract: statics.subtractFactory({ Hex: Hex }),
        neighbor: statics.neighborFactory({ Hex: Hex }),
        neighbors: statics.neighborsFactory({ Hex: Hex }),
        distance: statics.distanceFactory({ Hex: Hex }),
        round: statics.roundFactory({ Hex: Hex }),
        lerp: statics.lerpFactory({ Hex: Hex }),
        nudge: statics.nudgeFactory({ Hex: Hex })
    });

    return Hex;
}

/***/ }),
/* 6 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.default = ViewFactory;
// Methods aren't imported from a separate file, because it makes things too complicated.

function ViewFactory() {
    var _ref = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
        Point = _ref.Point,
        isDom = _ref.isDom;

    /**
     * @function View
     *
     * @description
     * Factory function for creating views. A view instance can be used to render (a grid of) hexes. This function expects _raw_ DOM elements, i.e. it lacks helpers to convert strings to DOM elements. You can use other libraries (e.g. [jQuery](https://jquery.com/), [svg.js](http://svgjs.com/)) to help create these DOM elements.
     *
     * @param {Object} [options={}]                 Options to instantiate the view with.
     * @param {Grid} options.grid                   A grid instance.
     * @param {Function} options.template           Template function that should return a DOM element. When hexes are rendered (e.g. by calling {@link View#renderGrid} or {@link View#renderHexes}), the template function is called with each hex. In the template function `this` refers to the view instance, so any view method can be called.
     * @param {Node} options.container              The container in which hexes are to be rendered. Should be an existing DOM element (e.g. a `<div>` or `<svg>`) in the `document`.
     * @param {Point} [options.origin=Point(0,0)]   Pixel origin where the start hex (`Hex(0, 0, 0)`) is placed. Defaults to `Point(0, 0)`, i.e.: the top left corner of the container. The origin is relative to the container (not to the document).
     *
     * @returns {View}                              A view instance to render hexes in.
     *
     * @example
     * const { Grid, View } from 'Honeycomb'
     *
     * const container = document.getElementById('my-container')
     * const rect = container.getBoundingClientRect()
     *
     * const view = View({
     *     grid: Grid({ size: 20 }),
     *     template: hex => {
     *         // `this` refers to the view instance
     *         const position = this.hexToPixel(hex)
     *         const div = document.createElement('div')
     *
     *         div.classList.add('hex')
     *         div.style.left = position.x + 'px'
     *         div.style.top = position.y + 'px'
     *
     *         return div
     *     },
     *     container,
     *     // set the view's origin to the container's center
     *     origin: {
     *         x: rect.width / 2,
     *         y: rect.height / 2
     *     }
     * })
     *
     * // The view instance can now be used to render hexes as divs with dimensions that
     * // would fit pointy hexes with a radius of 20px. Each div having the class 'hex'
     * // and a `style` attribute with a `left` and `top` property. The start hex
     * // (`Hex(0, 0, 0)`) would be placed in the center of the container.
     */
    return function View() {
        var _ref2 = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {},
            grid = _ref2.grid,
            template = _ref2.template,
            container = _ref2.container,
            _ref2$origin = _ref2.origin,
            origin = _ref2$origin === undefined ? 0 : _ref2$origin;

        if (!isDom(container)) {
            throw new Error("Container is not a valid DOM element: " + container + ".");
        }

        var containerRect = container.getBoundingClientRect();

        origin = Point(origin);

        return {
            grid: grid,
            template: template,
            container: container,
            origin: origin,
            hexes: [],

            /**
             * @method View#renderGrid
             *
             * @description
             * Renders all hexes that fit in the container, plus the optional padding. This padding defaults to 3 (hexes), so that the container is completely covered in hexes.
             *
             * @todo validate `grid`
             *
             * @param {number} [padding=3]  Number of hexes to add to all 4 sides of the container. Can be used to guarantee the container is completely covered in hexes.
             *
             * @returns {View}              The view instance, for chaining.
             *
             * @example
             * const { View } from 'Honeycomb'
             * const view = View() // view creation truncated for brevity
             *
             * // This renders all hexes that fit in the container, plus an extra layer of 3 hexes:
             * view.renderGrid()
             */
            renderGrid: function renderGrid() {
                var padding = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 3;

                var Hex = this.grid.Hex;
                var hexes = this.grid.rectangle({
                    width: this.width() + padding,
                    height: this.height() + padding,
                    start: Hex.subtract(this.pixelToHex(0), Hex(Math.floor(padding / 2)))
                });

                this.renderHexes(hexes);

                return this;
            },


            /**
             * @method View#renderHexes
             *
             * @description
             * Renders the passed array of hexes in the container.
             *
             * @param   {Hex[]} hexes   An array of hexes to render. {@link Grid}'s shape methods ({@link Grid#parallelogram}, {@link Grid#triangle}, {@link Grid#hexagon} and {@link Grid#rectangle}) can be used to generate this array.
             *
             * @returns {View}          The view instance, for chaining.
             *
             * @example
             * const { Grid, View } from 'Honeycomb'
             *
             * const grid = Grid({ size: 20 })
             * const view = View() // view creation truncated for brevity
             *
             * // This renders hexes in the shape of a hexagon with a radius of 3 hexes
             * // and the start hex (`Hex(0, 0, 0)`) as its center:
             * view.renderHexes(grid.hexagon(3))
             */
            renderHexes: function renderHexes(hexes) {
                var _this = this;

                var fragment = hexes.reduce(function (fragment, hex) {
                    fragment.appendChild(_this.template(hex));
                    return fragment;
                }, document.createDocumentFragment());

                this.container.appendChild(fragment);
                this.hexes = hexes;

                return this;
            },


            /**
             * @method View#hexToPixel
             *
             * @description
             * Converts the passed hex to a pixel position relative to the container's origin. The hex's {@link Hex#topLeft|top left corner} is used (instead of its origin) to render the hex as a DOM node. DOM nodes have their top left corner defined as their origin.
             *
             * @param  {Hex} hex    The hex to convert to a pixel position.
             * @returns {Point}     The pixel position.
             */
            hexToPixel: function hexToPixel(hex) {
                // Grid#hexToPoint returns the hex's origin relative to the start Hex (Hex(0))
                return this.grid.hexToPoint(hex)
                // translate the hex's center-originating point to a top-left-originating point
                .add(hex.topLeft())
                // add the view's origin
                .add(this.origin);
            },


            /**
             * @method View#pixelToHex
             *
             * @description
             * Converts the passed pixel position (relative to the container) to the corresponding hex.
             *
             * @param  {Point} pixel    The pixel position to convert to a hex.
             * @returns {Hex}           The corresponding (rounded) hex.
             */
            pixelToHex: function pixelToHex(pixel) {
                return this.grid.pointToHex(Point(pixel).subtract(this.origin));
            },


            /**
             * @method View#width
             *
             * @returns {number} The rounded amount of hexes that fit in the container horizontally ↔.
             */
            width: function width() {
                return Math.round(containerRect.width / this.grid.colSize());
            },


            /**
             * @method View#height
             *
             * @returns {number} The rounded amount of hexes that fit in the container vertically ↕.
             */
            height: function height() {
                return Math.round(containerRect.height / this.grid.rowSize());
            }
        };
    };
}

/***/ }),
/* 7 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

exports.pointToHexFactory = pointToHexFactory;
exports.hexToPoint = hexToPoint;
exports.colSizeFactory = colSizeFactory;
exports.rowSizeFactory = rowSizeFactory;
exports.parallelogramFactory = parallelogramFactory;
exports.triangleFactory = triangleFactory;
exports.hexagonFactory = hexagonFactory;
exports.rectangleFactory = rectangleFactory;

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function pointToHexFactory(_ref) {
    var Point = _ref.Point,
        Hex = _ref.Hex;

    /**
     * @method Grid#pointToHex
     *
     * @description
     * Converts the passed 2-dimensional {@link Point|point} to a hex.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#pixel-to-hex|redblobgames.com}
     *
     * @param   {Point} point   The {@link Point|point-like} to convert from.
     *
     * @returns {Hex}           The hex (with rounded coordinates) that contains the passed point.
     *
     * @example
     * import { Grid, Point } from 'Honeycomb'
     *
     * const grid = Grid({ size: 50 })
     *
     * grid.pointToHex(Point(120, 300))     // { x: -1, y: 4, z: -3 }
     * // also accepts a point-like:
     * grid.pointToHex({ x: 120, y: 300 })  // { x: -1, y: 4, z: -3 }
     * grid.pointToHex([ 120, 300 ])        // { x: -1, y: 4, z: -3 }
     */
    return function pointToHex(point) {
        var hex = Hex();
        var size = hex.size;
        var x = void 0,
            y = void 0;

        // guarantee point is an actual Point instance
        point = Point(point);

        if (hex.isPointy()) {
            x = (point.x * Math.sqrt(3) / 3 - point.y / 3) / size;
            y = point.y * 2 / 3 / size;
        } else {
            x = point.x * 2 / 3 / size;
            y = (-point.x / 3 + Math.sqrt(3) / 3 * point.y) / size;
        }

        return Hex.round(Hex(x, y));
    };
}

/**
 * @method Grid#hexToPoint
 *
 * @description
 * Translates a hex to a point.
 *
 * @see {@link http://www.redblobgames.com/grids/hexagons/#hex-to-pixel|redblobgames.com}
 *
 * @borrows Hex#toPoint as Grid#hexToPoint
 *
 * @param   {Hex} hex   The hex to translate from.
 *
 * @returns {Point}     The point to translate to.
 *
 * @example
 * import { Grid } from 'Honeycomb'
 *
 * const grid = Grid({ size: 50 })
 * const hex = grid.Hex(-1, 4, -3)
 * grid.hexToPoint(hex) // { x: 86.60254037844386, y: 300 }
 *
 * // a different origin...
 * const grid = Grid({ size: 50, origin: [50, 50] })
 * const hex = grid.Hex(-1, 4, -3)
 * // ...corresponds to a different point:
 * grid.hexToPoint(hex) // { x: 36.60254037844386, y: 250 }
 */
function hexToPoint(hex) {
    return hex.toPoint();
}

function colSizeFactory(_ref2) {
    var Hex = _ref2.Hex;

    /**
     * @method Grid#colSize
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#size-and-spacing|redblobgames.com}
     *
     * @returns {number} The width of a (vertical) column of hexes in the grid.
     */
    return function colSize() {
        var hex = Hex();
        return hex.isPointy() ? hex.width() : hex.width() * 3 / 4;
    };
}

function rowSizeFactory(_ref3) {
    var Hex = _ref3.Hex;

    /**
     * @method Grid#rowSize
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#size-and-spacing|redblobgames.com}
     *
     * @returns {number} The height of a (horizontal) row of hexes in the grid.
     */
    return function rowSize() {
        var hex = Hex();
        return hex.isPointy() ? hex.height() * 3 / 4 : hex.height();
    };
}

function parallelogramFactory(_ref4) {
    var Hex = _ref4.Hex;

    /**
     * @method Grid#parallelogram
     *
     * @description
     * Creates a grid in the shape of a [parallelogram](https://en.wikipedia.org/wiki/Parallelogram).
     *
     * @todo Validate the direction param
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @param   {Object} options                    An options object.
     * @param   {number} options.width              The width (in hexes).
     * @param   {number} options.height             The height (in hexes).
     * @param   {Hex} [options.start=Hex(0,0,0)]    The start hex.
     * @param   {(1|3|5)} [options.direction=1]     The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes.
     *
     * @returns {Hex[]}                             Array of hexes in a parallelogram arrangement.
     */
    return function parallelogram(_ref5) {
        var width = _ref5.width,
            height = _ref5.height,
            _ref5$start = _ref5.start,
            start = _ref5$start === undefined ? Hex() : _ref5$start,
            _ref5$direction = _ref5.direction,
            direction = _ref5$direction === undefined ? 1 : _ref5$direction;

        // TODO: validate direction
        var DIRECTIONS = {
            1: ['x', 'y'],
            3: ['y', 'z'],
            5: ['z', 'x']
        };

        var _DIRECTIONS$direction = _slicedToArray(DIRECTIONS[direction], 2),
            firstCoordinate = _DIRECTIONS$direction[0],
            secondCoordinate = _DIRECTIONS$direction[1];

        var hexes = [];

        for (var first = 0; first < width; first++) {
            for (var second = 0; second < height; second++) {
                var _Hex;

                hexes.push(Hex.add(Hex((_Hex = {}, _defineProperty(_Hex, firstCoordinate, first), _defineProperty(_Hex, secondCoordinate, second), _Hex)), Hex(start)));
            }
        }

        return hexes;
    };
}

function triangleFactory(_ref6) {
    var Hex = _ref6.Hex;

    /**
     * @method Grid#triangle
     *
     * @description
     * Creates a grid in the shape of a [(equilateral) triangle](https://en.wikipedia.org/wiki/Equilateral_triangle).
     *
     * @todo Validate the direction param
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @param   {Object} options                    An options object.
     * @param   {number} options.size               The side length (in hexes).
     * @param   {Hex} [options.start=Hex(0,0,0)]    The start hex. **Note**: it's not the first hex, but rather a hex relative to the triangle.
     * @param   {(1|5)} [options.direction=1]       The direction in which to create the shape. Each direction corresponds to a different arrangement of hexes. In this case a triangle pointing up (`direction: 1`) or down (`direction: 5`) (with pointy hexes) or right (`direction: 1`) or left (`direction: 5`) (with flat hexes).
     *
     * @returns {Hex[]}                             Array of hexes in a triangular arrangement.
     */
    return function triangle(_ref7) {
        var size = _ref7.size,
            _ref7$start = _ref7.start,
            start = _ref7$start === undefined ? Hex() : _ref7$start,
            _ref7$direction = _ref7.direction,
            direction = _ref7$direction === undefined ? 1 : _ref7$direction;

        // TODO: validate direction
        var DIRECTIONS = {
            1: {
                yStart: function yStart() {
                    return 0;
                },
                yEnd: function yEnd(x) {
                    return size - x;
                }
            },
            5: {
                yStart: function yStart(x) {
                    return size - x;
                },
                yEnd: function yEnd() {
                    return size + 1;
                }
            }
        };

        var _DIRECTIONS$direction2 = DIRECTIONS[direction],
            yStart = _DIRECTIONS$direction2.yStart,
            yEnd = _DIRECTIONS$direction2.yEnd;

        var hexes = [];

        for (var x = 0; x < size; x++) {
            for (var y = yStart(x); y < yEnd(x); y++) {
                hexes.push(Hex.add(Hex(x, y), Hex(start)));
            }
        }

        return hexes;
    };
}

function hexagonFactory(_ref8) {
    var Hex = _ref8.Hex;

    /**
     * @method Grid#hexagon
     *
     * @description
     * Creates a grid in the shape of a [hexagon](https://en.wikipedia.org/wiki/Hexagon).
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @param   {Object} options                    An options object.
     * @param   {number} options.radius             The radius (in hexes).
     * @param   {Hex} [options.center=Hex(0,0,0)]   The center hex.
     *
     * @returns {Hex[]}                             Array of hexes in a hexagon arrangement (very meta 😎).
     */
    return function hexagon(_ref9) {
        var radius = _ref9.radius,
            _ref9$center = _ref9.center,
            center = _ref9$center === undefined ? Hex() : _ref9$center;

        var hexes = [];
        // radius includes the center hex
        radius -= 1;

        for (var x = -radius; x <= radius; x++) {
            var startY = Math.max(-radius, -x - radius);
            var endY = Math.min(radius, -x + radius);

            for (var y = startY; y <= endY; y++) {
                hexes.push(Hex.add(Hex(x, y), Hex(center)));
            }
        }

        return hexes;
    };
}

function rectangleFactory(_ref10) {
    var Hex = _ref10.Hex;

    /**
     * @method Grid#rectangle
     *
     * @description
     * Creates a grid in the shape of a [rectangle](https://en.wikipedia.org/wiki/Rectangle).
     *
     * @todo Validate the direction param
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/implementation.html#map-shapes|redblobgames.com}
     *
     * @param   {Object} options                        An options object.
     * @param   {number} options.width                  The width (in hexes).
     * @param   {number} options.height                 The height (in hexes).
     * @param   {Hex} [options.start=Hex(0,0,0)]        The start hex.
     * @param   {(0|1|2|3|4|5)} [options.direction=0]   The direction (from the start hex) in which to create the shape. Each direction corresponds to a different arrangement of hexes.
     *
     * @returns {Hex[]}                                 Array of hexes in a rectengular arrangement.
     */
    return function rectangle(_ref11) {
        var width = _ref11.width,
            height = _ref11.height,
            _ref11$start = _ref11.start,
            start = _ref11$start === undefined ? Hex() : _ref11$start,
            _ref11$direction = _ref11.direction,
            direction = _ref11$direction === undefined ? 0 : _ref11$direction;

        var DIRECTIONS = {
            0: ['x', 'y'],
            1: ['y', 'x'],
            2: ['y', 'z'],
            3: ['z', 'y'],
            4: ['z', 'x'],
            5: ['x', 'z']
        };
        var hex = Hex();

        var _DIRECTIONS$direction3 = _slicedToArray(DIRECTIONS[direction], 2),
            firstCoordinate = _DIRECTIONS$direction3[0],
            secondCoordinate = _DIRECTIONS$direction3[1];

        var firstStop = hex.isPointy() ? width : height;
        var secondStop = hex.isPointy() ? height : width;
        var hexes = [];

        for (var second = 0; second < secondStop; second++) {
            var secondOffset = Math.floor(second / 2);

            for (var first = -secondOffset; first < firstStop - secondOffset; first++) {
                var _Hex2;

                hexes.push(Hex.add(Hex((_Hex2 = {}, _defineProperty(_Hex2, firstCoordinate, first), _defineProperty(_Hex2, secondCoordinate, second), _Hex2)), Hex(start)));
            }
        }

        return hexes;
    };
}

/***/ }),
/* 8 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.coordinates = coordinates;
exports.isPointy = isPointy;
exports.isFlat = isFlat;
exports.oppositeCornerDistance = oppositeCornerDistance;
exports.oppositeSideDistance = oppositeSideDistance;
exports.width = width;
exports.height = height;
exports.cornersFactory = cornersFactory;
exports.topLeftFactory = topLeftFactory;
exports.toPointFactory = toPointFactory;

var _constants = __webpack_require__(0);

/**
 * @method Hex#coordinates
 * @returns {Object}    The hex's x, y and z coordinates.
 */
function coordinates() {
    return {
        x: this.x,
        y: this.y,
        z: this.z
    };
}

/**
 * @method Hex#isPointy
 * @returns {boolean}   Whether hexes have a pointy ⬢ orientation.
 */
function isPointy() {
    return this.orientation === _constants.ORIENTATIONS.POINTY;
}

/**
 * @method Hex#isFlat
 * @returns {boolean}   Whether hexes have a flat ⬣ orientation.
 */
function isFlat() {
    return this.orientation === _constants.ORIENTATIONS.FLAT;
}

/**
 * @method Hex#oppositeCornerDistance
 * @returns {number}    The distance between opposite corners of a hex.
 */
function oppositeCornerDistance() {
    return this.size * 2;
}

/**
 * @method Hex#oppositeSideDistance
 * @returns {number}    The distance between opposite sides of a hex.
 */
function oppositeSideDistance() {
    return Math.sqrt(3) / 2 * this.oppositeCornerDistance();
}

/**
 * @method Hex#width
 * @returns {number}    The (horizontal) width of any hex.
 */
function width() {
    return this.isPointy() ? this.oppositeSideDistance() : this.oppositeCornerDistance();
}

/**
 * @method Hex#height
 * @returns {number}    The (vertical) height of any hex.
 */
function height() {
    return this.isPointy() ? this.oppositeCornerDistance() : this.oppositeSideDistance();
}

function cornersFactory(_ref) {
    var Point = _ref.Point;

    /**
     * @method Hex#corners
     * @returns {Point[]}   Array of corner points. Starting at the top right corner for pointy hexes and the right corner for flat hexes.
     */
    return function corners() {
        var width = this.width();
        var height = this.height();

        if (this.isPointy()) {
            return [Point(width, height * 0.25), Point(width, height * 0.75), Point(width * 0.5, height), Point(0, height * 0.75), Point(0, height * 0.25), Point(width * 0.5, 0)];
        } else {
            return [Point(width, height * 0.5), Point(width * 0.75, height), Point(width * 0.25, height), Point(0, height * 0.5), Point(width * 0.25, 0), Point(width * 0.75, 0)];
        }
    };
}

function topLeftFactory(_ref2) {
    var Point = _ref2.Point;

    /**
     * @method Hex#topLeft
     *
     * @description
     * A hex's origin is relative to its center point, but a browser positions a DOM node relative to its top left point. This method can be used to translate the center-originating hex to a top-left-originating hex.
     *
     * @returns {Point} The vector relative to the hex's center.
     */
    return function topLeft() {
        return Point(-this.width() / 2, -this.height() / 2);
    };
}

function toPointFactory(_ref3) {
    var Point = _ref3.Point;

    /**
     * @method Hex#toPoint
     *
     * @description
     * Converts the current hex to its origin {@link Point|point} relative to the start hex.
     *
     * @returns {Point} The 2D point the hex corresponds to.
     */
    return function toPoint() {
        var x = void 0,
            y = void 0;

        if (this.isPointy()) {
            x = this.size * Math.sqrt(3) * (this.x + this.y / 2);
            y = this.size * 3 / 2 * this.y;
        } else {
            x = this.size * 3 / 2 * this.x;
            y = this.size * Math.sqrt(3) * (this.y + this.x / 2);
        }

        // `x` and `y` are always the hex's center, so the origin needs to be subtracted
        return Point(x, y).subtract(this.origin);
    };
}

/***/ }),
/* 9 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.thirdCoordinateFactory = thirdCoordinateFactory;
exports.hexesBetweenFactory = hexesBetweenFactory;
exports.addFactory = addFactory;
exports.subtractFactory = subtractFactory;
exports.neighborFactory = neighborFactory;
exports.neighborsFactory = neighborsFactory;
exports.distanceFactory = distanceFactory;
exports.roundFactory = roundFactory;
exports.lerpFactory = lerpFactory;
exports.nudgeFactory = nudgeFactory;

var _constants = __webpack_require__(0);

function thirdCoordinateFactory(_ref) {
    var unsignNegativeZero = _ref.unsignNegativeZero;

    /**
     * @method Hex.thirdCoordinate
     *
     * @description
     * Calculates the third coordinate from the other two. The sum of all three coordinates must be 0.
     *
     * @param   {number} firstCoordinate  The first other coordinate.
     * @param   {number} secondCoordinate The second other coordinate.
     *
     * @returns {number}                  The third coordinate.
     */
    return function thirdCoordinate(firstCoordinate, secondCoordinate) {
        return unsignNegativeZero(-firstCoordinate - secondCoordinate);
    };
}

function hexesBetweenFactory(_ref2) {
    var Hex = _ref2.Hex;

    /**
     * @method Hex.hexesBetween
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#line-drawing|redblobgames.com}
     *
     * @param {Hex} startHex    The first hex.
     * @param {Hex} endHex      The second hex.
     *
     * @returns {Hex[]}         Array of hexes starting at the passed `startHex` and ending with the passed `endHex`.
     */
    return function hexesBetween(startHex, endHex) {
        var _distance = Hex.distance(startHex, endHex);

        if (_distance === 1) {
            return [startHex, endHex];
        }

        var step = 1.0 / Math.max(_distance, 1);
        var hexes = [];

        for (var i = 0; i <= _distance; i++) {
            hexes.push(Hex.round(Hex.lerp(Hex.nudge(startHex), Hex.nudge(endHex), step * i)));
        }

        return hexes;
    };
}

function addFactory(_ref3) {
    var Hex = _ref3.Hex;

    /**
     * @method Hex.add
     * @param {Hex} firstHex    A hex.
     * @param {Hex} secondHex   The hex that will be added to the first.
     *
     * @todo Accept any number of hexes to add.
     *
     * @returns {Hex}   The sum of the passed hexes coordinates.
     */
    return function add(firstHex, secondHex) {
        return Hex(firstHex.x + secondHex.x, firstHex.y + secondHex.y, firstHex.z + secondHex.z);
    };
}

function subtractFactory(_ref4) {
    var Hex = _ref4.Hex;

    /**
     * @method Hex.subtract
     * @param {Hex} firstHex    A hex.
     * @param {Hex} secondHex   The hex that will be subtracted from the first.
     *
     * @todo Accept any number of hexes to subtract.
     *
     * @returns {Hex}   The difference between the passed hexes coordinates.
     */
    return function subtract(firstHex, secondHex) {
        return Hex(firstHex.x - secondHex.x, firstHex.y - secondHex.y, firstHex.z - secondHex.z);
    };
}

function neighborFactory(_ref5) {
    var Hex = _ref5.Hex;

    /**
     * @method Hex.neighbor
     *
     * @description
     * Returns the neighboring hex in the given direction.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#neighbors|redblobgames.com}
     *
     * @param {Hex} hex                         The hex to get the neighboring hex from.
     * @param {(0|1|2|3|4|5)}  [direction=0]    Any of the 6 directions. `0` is the Eastern direction (East-southeast when the hex is flat), `1` corresponds to 60° clockwise, `2` to 120° clockwise and so forth.
     * @param {boolean} [diagonal=false]        Whether to look for a neighbor opposite the hex's corner instead of its side. A direction of `0` means the top corner of the hex's right side when the hex is pointy and the right corner when the hex is flat.
     *
     * @returns {Hex}                           The neighboring hex.
     *
     * @example
     * import { Grid } from 'Honeycomb'
     * const Hex = Grid().Hex
     *
     * const targetHex = Hex()
     * Hex.neighbor(targetHex)          // { x: 1, y: -1, z: 0 }, the hex across the 0th (right) side of targetHex
     * Hex.neighbor(targetHex, 2)       // { x: 0, y: 1, z: -1 }, the hex across the 3rd (South West) side of targetHex
     * Hex.neighbor(targetHex, 3, true) // { x: -2, y: 1, z: 1 }, the hex opposite the 4th corner of targetHex
     */
    return function neighbor(hex) {
        var direction = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
        var diagonal = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

        direction = Math.abs(direction % 6);
        var coordinates = diagonal ? _constants.DIAGONAL_DIRECTION_COORDINATES[direction] : _constants.DIRECTION_COORDINATES[direction];

        return Hex.add(hex, coordinates);
    };
}

function neighborsFactory(_ref6) {
    var Hex = _ref6.Hex;

    /**
     * @method Hex.neighbors
     *
     * @description
     * Returns **all** neighboring hexes of the given hex.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#neighbors|redblobgames.com}
     *
     * @param {Hex} hex The hex to get all neighbors from.
     *
     * @returns {Hex[]} An array of the 6 neighboring hexes.
     */
    return function neighbors(hex) {
        return _constants.DIRECTION_COORDINATES.map(function (coordinates) {
            return Hex.add(hex, coordinates);
        });
    };
}

function distanceFactory(_ref7) {
    var Hex = _ref7.Hex;

    /**
     * @method Hex.distance
     *
     * @description
     * Returns the amount of hexes between the current and the given hex.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#distances|redblobgames.com}
     *
     * @param   {Hex} startHex  The start hex.
     * @param   {Hex} endHex    The end hex.
     *
     * @returns {number}        The amount of hexes between the passed `startHex` and `endHex`.
     *
     * @example
     * import { Grid } from 'Honeycomb'
     * const Hex = Grid().Hex
     *
     * Hex.distance(Hex(0, 0, 0), Hex(1, 0, -1))    // 1
     * Hex.distance(Hex(-3, -3, 6), Hex(-1, 4, -3)) // 9
     */
    return function distance(startHex, endHex) {
        var relativeHex = Hex.subtract(startHex, endHex);
        return Math.max(Math.abs(relativeHex.x), Math.abs(relativeHex.y), Math.abs(relativeHex.z));
    };
}

function roundFactory(_ref8) {
    var Hex = _ref8.Hex;

    /**
     * @method Hex.round
     *
     * @description
     * Rounds the passed floating point hex coordinates to their nearest integer hex coordinates.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#rounding|redblobgames.com}
     *
     * @param {Hex} hex The hex to be rounded.
     *
     * @returns {Hex}   A new hex with rounded coordinates.
     */
    return function round(hex) {
        var roundedX = Math.round(hex.x);
        var roundedY = Math.round(hex.y);
        var roundedZ = Math.round(hex.z);
        var diffX = Math.abs(hex.x - roundedX);
        var diffY = Math.abs(hex.y - roundedY);
        var diffZ = Math.abs(hex.z - roundedZ);

        if (diffX > diffY && diffX > diffZ) {
            roundedX = Hex.thirdCoordinate(roundedY, roundedZ);
        } else if (diffY > diffZ) {
            roundedY = Hex.thirdCoordinate(roundedX, roundedZ);
        } else {
            roundedZ = Hex.thirdCoordinate(roundedX, roundedY);
        }

        return Hex(roundedX, roundedY, roundedZ);
    };
}

function lerpFactory(_ref9) {
    var Hex = _ref9.Hex;

    /**
     * @method Hex.lerp
     *
     * @description
     * Returns an interpolation between the current hex and the passed hex for a `t` between 0 and 1.
     * More info on [wikipedia](https://en.wikipedia.org/wiki/Linear_interpolation).
     *
     * @param   {Hex} firstHex  The first hex.
     * @param   {Hex} secondHex The second hex.
     * @param   {number} t      A "parameter" between 0 and 1.
     *
     * @returns {Hex}           A new hex (with possibly fractional coordinates).
     */
    return function lerp(firstHex, secondHex, t) {
        return Hex(firstHex.x * (1 - t) + secondHex.x * t, firstHex.y * (1 - t) + secondHex.y * t, firstHex.z * (1 - t) + secondHex.z * t);
    };
}

function nudgeFactory(_ref10) {
    var Hex = _ref10.Hex;

    /**
     * @method Hex.nudge
     *
     * @description
     * Returns a new hex with a tiny offset from the passed hex. Useful for interpolating in a consistent direction.
     *
     * @see {@link http://www.redblobgames.com/grids/hexagons/#line-drawing|redblobgames.com}
     *
     * @param {Hex} hex The hex to nudge.
     *
     * @returns {Hex}   A new hex with a minute offset.
     */
    return function nudge(hex) {
        return Hex.add(hex, Hex(_constants.EPSILON));
    };
}

/***/ }),
/* 10 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.View = exports.Point = exports.Grid = exports.HEX_ORIENTATIONS = undefined;

var _isDom = __webpack_require__(3);

var _isDom2 = _interopRequireDefault(_isDom);

var _constants = __webpack_require__(0);

var _grid = __webpack_require__(4);

var _grid2 = _interopRequireDefault(_grid);

var _hex = __webpack_require__(5);

var _hex2 = _interopRequireDefault(_hex);

var _point = __webpack_require__(1);

var _point2 = _interopRequireDefault(_point);

var _view = __webpack_require__(6);

var _view2 = _interopRequireDefault(_view);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Grid = (0, _grid2.default)({ HexFactory: _hex2.default });
var View = (0, _view2.default)({ Point: _point2.default, isDom: _isDom2.default });

exports.HEX_ORIENTATIONS = _constants.ORIENTATIONS;
exports.Grid = Grid;
exports.Point = _point2.default;
exports.View = View;

/***/ }),
/* 11 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.add = add;
exports.subtract = subtract;
exports.multiply = multiply;
exports.divide = divide;

var _ = __webpack_require__(1);

var _2 = _interopRequireDefault(_);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

/**
 * @method Point#add
 * @param {Point} point The point to add to the current point.
 *
 * @returns {Point}     The sum of the passed point's coordinates to the current point's.
 */
function add(point) {
  point = (0, _2.default)(point);
  return (0, _2.default)(this.x + point.x, this.y + point.y);
}

/**
 * @method Point#subtract
 * @param   {Point} point   The point to subtract from the current point.
 *
 * @returns {Point}         The difference between the passed point's coordinates and the current point's.
 */
function subtract(point) {
  point = (0, _2.default)(point);
  return (0, _2.default)(this.x - point.x, this.y - point.y);
}

/**
 * @method Point#multiply
 * @param   {Point} point   The point to multiply with the current point.
 *
 * @returns {Point}         The multiplication of the passed point's coordinates and the current point's.
 */
function multiply(point) {
  point = (0, _2.default)(point);
  return (0, _2.default)(this.x * point.x, this.y * point.y);
}

/**
 * @method Point#divide
 * @param   {Point} point   The point where the current point is divided by.
 *
 * @returns {Point}         The division of the current point's coordinates and the passed point's.
 */
function divide(point) {
  point = (0, _2.default)(point);
  return (0, _2.default)(this.x / point.x, this.y / point.y);
}

/***/ }),
/* 12 */
/***/ (function(module, exports, __webpack_require__) {

"use strict";


Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.unsignNegativeZero = unsignNegativeZero;

var _axis = __webpack_require__(2);

function unsignNegativeZero(value) {
    return (0, _axis.isNumber)(value) ? value || 0 : value;
}

/***/ })
/******/ ]);
});
//# sourceMappingURL=honeycomb.js.map