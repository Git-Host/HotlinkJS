(function(){
var r=function(){var e="function"==typeof require&&require,r=function(i,o,u){o||(o=0);var n=r.resolve(i,o),t=r.m[o][n];if(!t&&e){if(t=e(n))return t}else if(t&&t.c&&(o=t.c,n=t.m,t=r.m[o][t.m],!t))throw new Error('failed to require "'+n+'" from '+o);if(!t)throw new Error('failed to require "'+i+'" from '+u);return t.exports||(t.exports={},t.call(t.exports,t,t.exports,r.relative(n,o))),t.exports};return r.resolve=function(e,n){var i=e,t=e+".js",o=e+"/index.js";return r.m[n][t]&&t?t:r.m[n][o]&&o?o:i},r.relative=function(e,t){return function(n){if("."!=n.charAt(0))return r(n,t,e);var o=e.split("/"),f=n.split("/");o.pop();for(var i=0;i<f.length;i++){var u=f[i];".."==u?o.pop():"."!=u&&o.push(u)}return r(o.join("/"),t,e)}},r}();r.m = [];
r.m[0] = {
"index.js": function(module, exports, require){
function FormController(selector) {
  this.inputCallbacks = [];
  this.listener = null;
  this.model = null;
  this.modelChangedCallbacks = [];
  this.rules = [];
  this.view = document.querySelector(selector);
  this.submitButton = this.view.querySelector('button[type=submit]');

  var self = this;
  this.view.onsubmit = function(event) {
    self.onSubmit.bind(self)(event);

    if (self.submitButton !== null) {
      self.submitButton.disabled = true;
    }

    return false;
  };
};

FormController.prototype.addInputCallback = function(cb) {
  this.inputCallbacks.push(cb);
};

FormController.prototype.addModelChangedCallback = function(cb) {
  this.modelChangedCallbacks.push(cb);
};

FormController.prototype.getInput = function(property) { // This function should return a view for a given property
  return null;
};

FormController.prototype.getProperty = function(input) { // This function should return a property for a given input (the one it is supposed to modify)
  return null;
};

FormController.prototype.getRules = function(property) {
  var rules = this.rules[property];

  if (rules instanceof Array) {
    return rules;
  }
  else if (rules instanceof Function) {
    return [rules];
  }
  else {
    return [];
  }
};

FormController.prototype.getValues = function() { // This function returns a clone of 'model', with the new values from the form
  var obj = Object.create(this.model);

  for (var property in obj) {
    var input = this.getInput(property);

    if (input !== null) {
      obj[property] = input.value;
    }
  }

  return obj;
}

FormController.prototype.isValid = function() { // This function returns 'true' when all values are valid, otherwise returns 'false'
  for (var property in this.model) {
    var input = this.getInput(property);

    if (input !== null
      && ! this.valueMatchesRules(input.value, this.getRules(property))) {
      return false;
    }
  }

  return true;
}

FormController.prototype.notifyInputCallbacks = function(event) {
  this.onInput(event);
  this.inputCallbacks.forEach(function(cb) {
    cb(event);
  });
}

FormController.prototype.notifyModelChangedCallbacks = function() {
  this.onModelChanged();
  this.modelChangedCallbacks.forEach(function(cb) {
    cb(event);
  });
}

FormController.prototype.onKeyUp = function(event) {
  if (event.target.nodeName == 'INPUT') {
    var property = this.getProperty(event.target);

    if (property === null) {
      return;
    }

    var value = event.target.value;
    var rules = this.getRules(property);
    var valueIsValid = this.valueMatchesRules(event.target.value, rules);

    this.notifyInputCallbacks({
      input: event.target,
      property: property,
      valueIsValid: valueIsValid
    });
  }
}

FormController.prototype.onInput = function(event) {};

FormController.prototype.onModelChanged = function() {};

FormController.prototype.onSubmit = function(event) {};

FormController.prototype.setModel = function(object) { // This function loads "object"'s values into the form
  this.model = object;

  for (var property in object) {
    var input = this.getInput(property);

    if (input !== null) {
      input.value = object[property];
    }
  }

  this.notifyModelChangedCallbacks();
};

FormController.prototype.setRules = function(rules) { // This function saves the rules for further input validation
  this.rules = rules;
};

FormController.prototype.setUp = function() { // This function add a listener to validate input
  this.listener = this.onKeyUp.bind(this); // We want 'this' to refer to our 'FormController' object in our listener
  this.view.addEventListener('keyup', this.listener, true);
};

FormController.prototype.valueMatchesRule = function(value, rule) {
  var matches = rule(value);
  return matches;
};

FormController.prototype.valueMatchesRules = function(value, rules) {
  var self = this;
  return rules.every(function(rule) {
    var matches = self.valueMatchesRule(value, rule);
    return matches;
  });
};

module.exports = FormController;

}
};
FormController = r("index.js");}());
