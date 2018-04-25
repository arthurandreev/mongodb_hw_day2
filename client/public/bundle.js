/******/ (function(modules) { // webpackBootstrap
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
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
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
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./client/src/app.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./client/src/app.js":
/*!***************************!*\
  !*** ./client/src/app.js ***!
  \***************************/
/*! no static exports found */
/***/ (function(module, exports, __webpack_require__) {

eval("const QuoteView = __webpack_require__(/*! ./views/quoteView */ \"./client/src/views/quoteView.js\");\nconst Request = __webpack_require__(/*! ./services/request.js */ \"./client/src/services/request.js\");\n\nconst quoteView = new QuoteView();\nconst request = new Request('http://localhost:3000/api/quotes');\n\n//where does allQuotes come from??\nconst getQuotesRequestComplete = function(allQuotes){\n  //console.log(allQuotes);\n\n  allQuotes.forEach((quote) => quoteView.addQuote(quote) )\n}\n\nconst createQuoteRequestComplete = function(addedQuote) {\n  // console.log(addedQuote);\n  quoteView.addQuote(addedQuote);\n}\n\n//third step\nconst deleteAllRequestComplete = function(){\n  quoteView.clear();\n}\n\n//second step\nconst onFormDelete = function() {\n  console.log('delete');\n  request.deleteAll(deleteAllRequestComplete);\n  // console.log('form deleted');\n}\n\n//how can it see name and quote in onFormSubmit??\nconst onFormSubmit = function (event) {\n  //preventDefault is important to avoid only html code being submitted and for asynchronous operation\n  event.preventDefault();\n  console.log('form submitted');\n\n  const nameInput = event.target.name;\n  const quoteInput = event.target.quote;\n\n  const newQuote = {\n    name: nameInput.value,\n    quote: quoteInput.value\n  };\n\n  request.post(createQuoteRequestComplete, newQuote);\n}\n\nconst appStart = function(){\n  //getQuotesRequestComplete is a function that we are passing in\n  request.get(getQuotesRequestComplete);\n\n  const addQuoteForm = document.querySelector('form');\n  addQuoteForm.addEventListener('submit', onFormSubmit);\n\n//first step is to add event listener to the button\n  const deleteQuoteForm = document.querySelector('#deleteButton');\n  deleteQuoteForm.addEventListener('click', onFormDelete);\n}\n\ndocument.addEventListener('DOMContentLoaded', appStart);\n\n\n//# sourceURL=webpack:///./client/src/app.js?");

/***/ }),

/***/ "./client/src/services/request.js":
/*!****************************************!*\
  !*** ./client/src/services/request.js ***!
  \****************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("const Request = function(url) {\n  this.url = url;\n}\n\n//request.get activates on complete of\nRequest.prototype.get = function(onComplete){\n  const request = new XMLHttpRequest();\n  request.open('GET', this.url);\n\n  request.addEventListener('load', function () {\n    //if statement for error handling\n    if (request.status !== 200) return;\n\n    //request is in JSON format that is parsed in JS\n    const response = JSON.parse( request.responseText );\n\n    onComplete( response );\n  });\n\n  request.send();\n}\n\n//payload as the name of this parameter needs to be kept generic\nRequest.prototype.post = function(onComplete, payload){\n  const request = new XMLHttpRequest();\n  request.open('POST', this.url);\n\n  //setRequestHeader is a built in method on request object\n  request.setRequestHeader('Content-Type', 'application/json');\n\n  request.addEventListener('load', function () {\n    if (request.status !== 201) return;\n\n    const response = JSON.parse(request.responseText);\n\n    onComplete( response );\n  });\n  const jsonPayload = JSON.stringify(payload);\n  request.send( jsonPayload );\n}\n\n//last step\nRequest.prototype.deleteAll = function(onComplete){\n  const request = new XMLHttpRequest();\n  request.open('DELETE', this.url);\n  request.addEventListener('load', function () {\n    if (request.status !== 200) return;\n\n    onComplete();\n  });\n  request.send();\n}\n\n\nmodule.exports = Request;\n\n\n//# sourceURL=webpack:///./client/src/services/request.js?");

/***/ }),

/***/ "./client/src/views/quoteView.js":
/*!***************************************!*\
  !*** ./client/src/views/quoteView.js ***!
  \***************************************/
/*! no static exports found */
/***/ (function(module, exports) {

eval("var QuoteView = function(){\n  this.quotes = [];\n}\n\nQuoteView.prototype.addQuote = function(quote) {\n  this.quotes.push(quote);\n  this.render(quote);\n}\n\nQuoteView.prototype.clear = function() {\n  this.quotes = [];\n  const ul = document.querySelector('#quotes');\n  ul.innerHTML = '';\n}\n\nQuoteView.prototype.render = function(quote){\n    const ul = document.querySelector('#quotes');\n    const li = document.createElement('li');\n    const text = document.createElement('p');\n    text.innerText = `${quote.name} - \"${quote.quote}\"`;\n    li.appendChild(text);\n    ul.appendChild(li);\n}\n\n module.exports = QuoteView;\n\n\n//# sourceURL=webpack:///./client/src/views/quoteView.js?");

/***/ })

/******/ });