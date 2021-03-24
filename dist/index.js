"use strict";

var _express = _interopRequireDefault(require("express"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var PORT = process.env.PORT || 3001;
var app = (0, _express["default"])();
app.listen(PORT, function () {
  return console.log("Server listening on ".concat(PORT));
});