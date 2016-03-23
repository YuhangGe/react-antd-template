import './layout.less';
import React from 'react';
import Nav from './Nav';
import Header from './Header';
import Breadcrumb from 'antd/lib/breadcrumb';
import { Link } from 'react-router';
import { getMenuItemByKey } from './util.js';

const App = React.createClass({
  render() {
    let breads = [];
    let navKeys = [];
    let openKeys = [];
    /*
     * 通过 url 查找需要展开/选中的导航菜单, 以及
     */
    let ps = this.props.location.pathname.split('/');
    for (let i = 1; i < ps.length; i++) {
      if (i === ps.length - 1) {
        navKeys.push(ps[i]);
      } else {
        openKeys.push(ps[i]);
      }
      breads.push(getMenuItemByKey(ps[i]));
    }

    return (
      <div className="antd-layout-3">
        <Nav onChange={ this.onNavChange } openKeys={openKeys} selectedKeys={navKeys}/>
        <div className="main">
          <Header />
          {breads.length > 0 ? (
            <div className="breadcrumb">
              <Breadcrumb>
                {breads.map((breadItem, idx) => (
                  <Breadcrumb.Item key={idx}>
                    <Link to={breadItem.link}>{breadItem.name}</Link>
                  </Breadcrumb.Item>
                ))}
              </Breadcrumb>
            </div>
          ) : null}
          <div className="content" style={{paddingTop: breads.length > 0 ? 0 : 24}}>
            {this.props.children}
          </div>
        </div>
      </div>
    );
  }
});

export default App;
