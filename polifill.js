// check to add ES6 fetch
if (typeof fetch === "undefined") {
    global.fetch = require('node-fetch');
}

// check to add Promise
if (typeof Promise === "undefined") {
    global.Promise = require('bluebird');
}

// ========================================================
// Check to support on all devices
// ========================================================
if (typeof Object.keys === 'undefined') {
  Object.keys = (obj) => {
    var keys = [];

   for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        keys.push(i);
      }
    }

   return keys;
  };
}
if (typeof Object.values === 'undefined') {
  Object.values = (obj) => {
    var values = [];

   for (var i in obj) {
      if (obj.hasOwnProperty(i)) {
        values.push(obj[i]);
      }
    }

   return values;
  };
}