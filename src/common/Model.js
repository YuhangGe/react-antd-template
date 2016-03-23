'use strict';

import { addHiddenProperty } from './util.js';

function bind(lis) {
  var arr = this.$.listeners;
  if (arr.indexOf(lis) < 0) {
    arr.push(lis);
  }
  if (!lis.receiveRoofMessage) {
    lis.receiveRoofMessage = () => {
      lis.setState({});
    }
  }

  let cwu;
  if (lis.componentWillUnmount) {
    let old = lis.componentWillUnmount.bind(lis);
    cwu = () => {
      old();
      this.$.unbind(lis);
    }
  } else {
    cwu = () => {
      this.$.unbind(lis);
    };
  }
  lis.componentWillUnmount = cwu;
  return this;
}

function unbind(lis) {
  var arr = this.$.listeners;
  var i = arr.indexOf(lis);
  if (i >= 0) {
    arr.splice(i, 1);
  }
}

function emit(...args) {
  this.$.listeners.forEach(lis => {
    lis.receiveRoofMessage && lis.receiveRoofMessage(this, ...args);
  });
}


class Model {
  constructor(initProps) {
    var $ = Object.create(null);
    [bind, unbind, emit].forEach(fn => addHiddenProperty($, fn.name, fn.bind(this)));
    addHiddenProperty($, 'listeners', []);
    addHiddenProperty(this, '$', $);
    for(var k in (initProps || {})) {
      this[k] = initProps[k];
    }
  }
}

export default Model;