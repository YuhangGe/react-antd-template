import React from 'react';
import { Icon, Alert } from 'antd';

const DEFAULT_LOADING_TIP = (
  <div style={{textAlign: 'center'}}>
    <Icon type="loading" />
  </div>
);

const Loading = React.createClass({
  propTypes: {
    showError: React.PropTypes.bool,
    errorTip: React.PropTypes.any,
    loadingTip: React.PropTypes.any,
    status: React.PropTypes.object.isRequired
  },
  getDefaultProps() {
    return {
      showError: true
    }
  },
  _getErrorTip($) {
    return (
      <Alert message={$.error.message || $.error || ''} type="error" showIcon/>
    )
  },
  render() {
    let props = this.props;
    let $ = this.props.status;
    let loadingTip = $.loading ? (props.loadingTip || DEFAULT_LOADING_TIP) : undefined;
    let errorTip = (props.showError  && $.error) ? (props.errorTip || this._getErrorTip($)) : undefined;
    return (
      <div>
        {loadingTip}
        {($.loaded && !$.error) ? props.children : undefined}
        {errorTip}
      </div>
    )
  }
});

export default Loading;