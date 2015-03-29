'use strict';

function getType(type) {
  if (typeof type === 'string') {
    return type;
  }
  if (typeof type === 'function' && type.name) {
    return type.name.toLowerCase();
  }
}

function hasType(item, type) {
  if (type === 'array') {
    return item instanceof Array;
  }
  if (type === 'date') {
    return item instanceof Date;
  }
  if (type === 'regexp') {
    return item instanceof RegExp;
  }
  return typeof item === type;
}

function def() {
  var self = this;
  var fn = arguments[arguments.length - 1];
  var params = [];
  
  if (typeof fn !== 'function') {
    throw new Error('No function provided.');
  }

  for (var i = 0; i < arguments.length - 1; i++) {
    var param = {
      optional: arguments[i] instanceof Array
    };
    if (param.optional) {
      param.type = getType(arguments[i][0]);
      param.default = arguments[i][1];
    } else {
      param.type = getType(arguments[i]);
    }
    params.push(param);
  }

  return function () {
    var args = [];
    var j = 0;
    for (var i = 0; i < params.length; i++) {
      var typesMatch = hasType(arguments[j], params[i].type);
      if (!params[i].optional) {
        if (!typesMatch) {
          throw new Error('The argument number ' + (j + 1) +
            ' is invalid. Expected ' + params[i].type +
            ' instead of ' + typeof arguments[j]);
        } else {
          args.push(arguments[j]);
          j++;
        }
      } else if (!typesMatch) {
        args.push(params[i].default);
      } else {
        args.push(arguments[j]);
        j++;
      }
    }
    
    fn.apply(self, args);
  };
}

module.exports = def;