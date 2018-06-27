/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;
export function isUrl(path) {
  return reg.test(path);
}
export function formatter(data = [], parentPath = '') {
  const newData = data.map((item) => {
    let {
      path,
    } = item;
    if (!isUrl(path)) {
      path = parentPath + item.path;
    }
    const result = {
      ...item,
      path,
    };
    if (item.children) {
      result.children = formatter(
        item.children,
        `${parentPath}${item.path}/`,
        item.authority,
      );
    }
    return result;
  });
  return newData;
}
export function menuDataPathToArray(menuData) {
  const list = [];
  const exceptionPath = [{
    path: '/exception/403',
    name: '403',
    menutype: 2,
  }, {
    path: '/exception/404',
    name: '404',
    menutype: 2,
  }, {
    path: '/exception/500',
    name: '500',
    menutype: 2,
  }];
  (function dataFormater(menuDatas) {
    menuDatas.forEach((item) => {
      list.push({
        path: `/${item.path}`,
        name: item.name,
        menutype: item.menutype,
      });
      if (item.children) {
        dataFormater(item.children);
      }
    });
  }(menuData));
  // 添加白名单页面访问权限
  return [
    ...list,
    ...exceptionPath,
  ];
}
export function authorityMenu(currentPath = '', menuData = []) {
  const index = menuData.findIndex(item => item.path === currentPath || `${item.path}/` === currentPath);
  return index > -1;
}
export function getRedirectData(menuData) {
  /**
   * 根据菜单取得重定向地址.
   */
  const redirectData = [];
  const getRedirect = (item) => {
    if (item && item.children) {
      if (item.children[0] && item.children[0].path) {
        redirectData.push({
          from: `/${item.path}`,
          to: `/${item.children[0].path}`,
        });
        item.children.forEach((children) => {
          getRedirect(children);
        });
      }
    }
  };
  formatter(menuData).forEach(getRedirect);
  return redirectData;
}

