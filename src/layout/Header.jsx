import React from 'react';
import { Row, Col } from 'antd/lib/layout';
import Icon from 'antd/lib/icon';
import { Link } from 'react-router';

const Header = React.createClass({
  render() {
    return (
      <Row className="header">
        <Col span="8">
          {/* 这里是左侧的内容 */}&nbsp;
        </Col>
        <Col span="16" style={{textAlign: 'right'}}>
          {/* 这里是右侧内容 */}
          <ul className="header-nav">
            <li><Icon type="question-circle-o"/><Link to="/help" style={{marginLeft: 8}}>帮助</Link></li>
            <li>xiaoge
            </li>
          </ul>
        </Col>
      </Row>
    );
  }
});

export default Header;


 