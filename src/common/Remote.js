'use strict';

import Model from './Model.js';
import { addHiddenProperty, isObject, isFunction } from './util.js';

let ajax = function() {
  throw new Error('Please registerRequest first.');
};

let onError = function() {
};

let beforeSend = function() {

};

let onData = function(res) {
  if (Array.isArray(res)) {
    res = {
      list: res
    };
  } else if (!isObject(res)) {
    res = {
      data: res
    }
  }
  return {
    data: res,
    error: null
  }
};

function $abort() {
  if (this.$.xhr) {
    this.$.xhr.abort();
    this.$.xhr = null;
  }
}

function $request(method, data, options = {}) {
  let $ = this.$;
  let copyOpts = Object.assign({}, options);
  let opts = {
    data: data,
    url: getUrl(copyOpts.url || $.opt.url, copyOpts.params),
    method: copyOpts.method || method || 'GET'
  };

  delete copyOpts.url;
  delete copyOpts.method;
  delete copyOpts.params;

  Object.assign(opts, copyOpts);

  $.loaded = false;
  $.loading = true;
  $.error = null;
  $.emit('$request-start', opts);

  if ($.xhr) {
    $.abort();
  }

  let onDataHandler = options.onData || $.opt.onData || onData;
  let onSuccessHandler = options.onSuccess || $.opt.onSuccess || function(){};
  let onErrorHandler = options.onError || $.opt.onError || onError;

  return new Promise((resolve, reject) => {
    $.xhr = ajax(opts);
    $.xhr.then(res => {
      var result = onDataHandler(res);
      if (result.error) {
        handleErr(result.error);
      } else {
        for(var k in result.data) {
          this[k] = result.data[k];
        }
        $.loaded = true;
        $.loading = false;
        $.error = null;
        onSuccessHandler(res);
        $.emit('$request-finish', res);
        resolve(res);
      }
      $.xhr = null;
    }, err => {
      if (err.statusText === 'abort') {
        $.loading = false;
        $.xhr = null;
        $.emit('$request-abort');
      } else {
        handleErr({
          originError: err,
          message: '网络错误：' + err.statusText + '，请重试。'
        });
      }
    });
    function handleErr(err) {
      $.error = err;
      $.loading = false;
      $.xhr = null;
      onErrorHandler($.error);
      $.emit('$request-error', $.error);
      reject(err);
    }
  });
}

function getUrl(url, params) {
  if (!url.indexOf(':') < 0 || !isObject(params) || Object.keys(params).length === 0) {
    return url;
  }
  return url.replace(/\/:([^\/]+)/g, function(m, n) {
    return params[n] ? '/' + params[n] : '';
  });
}



function registerRequest(ajaxFunc, opt) {
  if (opt.onData) {
    onData = opt.onData;
  }
  if (opt.onError) {
    onError = opt.onError;
  }
  if (opt.beforeSend) {
    beforeSend = opt.beforeSend;
  }
  ajax = function(options) {
    beforeSend(options);
    return ajaxFunc.call(this, options);
  }
}

function Remote(options = {}, props = {}) {
  class RemoteModel extends Model {
    constructor(opt = {}, initProps = {}) {
      opt = Object.assign({}, options, opt);
      super(Object.assign(props, initProps));
      if (opt.list && !this.list) {
        this.list = [];
      }
      ['get', 'post', 'put', 'delete'].forEach(med => {
        addHiddenProperty(this.$, med, $request.bind(this, med.toUpperCase()));
      });
      addHiddenProperty(this.$, 'request', $request.bind(this, opt.method || 'GET'));
      addHiddenProperty(this.$, 'abort', $abort.bind(this));
      addHiddenProperty(this.$, 'opt', opt);
      this.$.xhr = null;
      this.$.loaded = false;
      this.$.loading = false;
      this.$.error = null;
    }
  }

  return RemoteModel;
}

Remote.create = function(options, props) {
  return new (Remote(options, props))();
};

Remote.registerRequest = registerRequest;

export default Remote;