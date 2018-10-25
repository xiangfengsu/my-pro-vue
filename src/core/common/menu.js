export default [{
  name: '标准table',
  icon: 'el-icon-picture',
  path: 'standardTable/standardTablePage',
  children: [],
  menutype: 2,
}, {
  name: '表单类型',
  icon: 'el-icon-tickets',
  path: 'formItemType/formItemTypePage',
  children: [],
  menutype: 2,
},
{
  name: '权限管理',
  icon: 'el-icon-printer',
  path: 'permission',
  menutype: 1,
  children: [{
    name: '部门管理',
    path: 'department',
    menutype: 2,
  },
  {
    name: '菜单管理',
    path: 'menumanage',
    menutype: 2,
  },
  {
    name: '角色管理',
    path: 'rolemanage',
    menutype: 2,
  },
  {
    name: '用户管理',
    path: 'usermanage',
    menutype: 2,
  },
  {
    name: '系统日志',
    path: 'systemlog',
    menutype: 2,
  },
  ],
}
];
