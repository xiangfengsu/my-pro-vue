export function menuDataPathToArray(menuData) {
  const list = [];
  const exceptionPath = [
    {
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
    },
  ];
  (function dataFormater(menuDatas) {
    menuDatas.forEach((item) => {
      list.push({ path: `/${item.path}`, name: item.name, menutype: item.menutype });
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
export function formatter(data = [], parentPath = '') {
  const newData = data.map((item) => {
    let { path } = item;
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
/* eslint no-useless-escape:0 */
const reg = /(((^https?:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)$/g;

export function isUrl(path) {
  return reg.test(path);
}
