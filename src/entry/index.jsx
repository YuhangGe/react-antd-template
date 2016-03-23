import 'antd/lib/index.css';

import React from 'react';
import ReactDom from 'react-dom';
import { Router, Route, Redirect, browserHistory } from 'react-router';
import Remote from '../common/Remote.js';
import { handleQuery, handleCToken} from '../common/util.js';
import App from '../layout/App.jsx';
import Home from '../component/Home.jsx';
import Setting from '../component/Setting.jsx';
import Download from '../component/Download.jsx';
import Message from 'antd/lib/message';
import jQuery from 'jquery-ajax';

Remote.registerRequest(jQuery.ajax, {
  beforeSend: function(opts) {
    handleQuery(opts);
    handleCToken(opts);
    opts.url = global.myServer + opts.url;
  },
  onData: function(res) {
    // 这儿可以根据不同系统的情况进行统一处理.
    // 如果返回了 error , 则 Roof 会通过 receiveRoofMessage 传递 $request-error 事件.
    if (!res.success) {
      if (res.code === 403) {
        location.href = '/login'
      }
      return {
        error: {
          message: res.result
        }
      }
    } else {
      return {
        data: Array.isArray(res.result) ? { // 如果是数组, 则通过 .list 来访问数据, 如果是 object, 则会把所有字段附到该 Model 上.
          list: res.result,
          pagination: res.pagination
        } : (typeof res.result === 'object' ? res.result : {data: res.result})
      }
    }
  },
  /*
   * 全局统一处理错误. 如果局部有 onError 参数, 则不调用全局的.
   */
  onError: function(err) {
    Message.error(err.message || err);
  }
});

ReactDom.render((
  <Router history={browserHistory}>
    <Redirect from="/" to="/home" />
    <Route path="/" component={App}>
      <Route path="home" component={Home} />
      <Redirect from="setting" to="setting/a1" />
      <Route path="setting">
        <Route path="a1" component={Setting} />
        <Redirect from="a1" to="a2/b1" />
        <Route path="a2">
          <Route path="b1" component={Setting} />
          <Route path="b2" component={Setting} />
          <Route path="b3" component={Setting} />
        </Route>
      </Route>
      <Redirect from="download" to="download/a" />
      <Route path="download">
        <Route path="a" component={Download}/>
        <Route path="b" component={Download}/>
      </Route>
    </Route>
  </Router>
), document.getElementById('react-content'));