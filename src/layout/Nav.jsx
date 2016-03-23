import React from 'react';
import { Link } from 'react-router';
import Icon from 'antd/lib/icon';
import { default as Menu, SubMenu } from 'antd/lib/menu';
import { menus } from '../entry/config.jsx';

function createMenus(menuItems, parentUrl = '/') {
  return menuItems.map(item => {
    if (item.sub && item.sub.length > 0) {
      return (
        <SubMenu key={item.key} title={item.icon ? <span><Icon type={item.icon}/><span>{item.name}</span></span> : item.name}>
          {createMenus(item.sub, parentUrl + item.key + '/')}
        </SubMenu>
      );
    } else {
      let link = <Link to={parentUrl + item.key}>{item.name}</Link>;
      return (
        <Menu.Item key={item.key}>{item.icon ? <span><Icon type={item.icon}/><span>{link}</span></span> : link}</Menu.Item>
      );
    }
  });
}
const Nav = React.createClass({
  getDefaultProps() {
    return {
      openKeys: [],
      selectedKeys: [],
      onChange() {}
    }
  },
  render() {
    return (
      <div className='nav'>
        <div className='logo-header'>
          <i className='logo'>Logo</i>
        </div>
        <Menu theme="dark"
              defaultOpenKeys={this.props.openKeys}
              defaultSelectedKeys={this.props.selectedKeys}
              mode="inline">
          {createMenus(menus)}
        </Menu>
      </div>
    );
  }
});

export default Nav;


 