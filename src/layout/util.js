import { menus } from '../entry/config.jsx';

const menuIndexes = {};

(function generateMenuIndexes(menuArray, keyUrl = '/') {
  menuArray.forEach(m => {
    menuIndexes[m.key] = m;
    m.link = keyUrl + m.key;
    if (m.sub && m.sub.length > 0) {
      generateMenuIndexes(m.sub, m.link + '/');
    }
  });
})(menus);

function getMenuItemByKey(key) {
  return menuIndexes[key];
}

export {
  getMenuItemByKey
}
