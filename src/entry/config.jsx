/**
 * 导航数据配置
 */
const menus = [{
  key: 'home',
  name: '主 页',
  icon: 'home'
}, {
  key: 'setting',
  name: '设 置',
  icon: 'setting',
  sub: [{
    key: 'a1',
    name: '导航 2-1'
  }, {
    key: 'a2',
    name: '导航 2-2',
    sub: [{
      key: 'b1',
      name: '导航 2-2-1'
    }, {
      key: 'b2',
      name: '导航 2-2-2'
    }, {
      key: 'b3',
      name: '导航 2-2-3'
    }]
  }]
}, {
  key: 'download',
  name: '下 载',
  icon: 'cloud-download-o',
  sub: [{
    key: 'a',
    name: '二级导航321'
  }, {
    key: 'b',
    name: '二级导航322'
  }]
}];

export {
  menus
};
