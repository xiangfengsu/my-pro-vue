import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/layouts/BasicLayout.vue';
import UserLayout from '@/layouts/UserLayout.vue';

Vue.use(VueRouter);

export const page404 = {
  path: '/*',
  name: 'e-404',
  title: '404',
  redirect: '/exception/404',
};
// const exceptionRouter1 = [{
//   path: '/exception/403',
//   name: '403',
//   title: '403',
//   component: () =>
//     import ('@/views/Exception/403'),
// }, {
//   path: '/exception/404',
//   name: '404',
//   title: '404',
//   component: () =>
//     import ('@/views/Exception/404'),
// }, {
//   path: '/exception/500',
//   name: '500',
//   title: '500',
//   component: () =>
//     import ('@/views/Exception/500'),
// }, ];
export const exceptionRouter = {
  path: '/exception',
  name: 'exception',
  title: 'exception',
  redirect: '/exception/404',
  component: Main,
  children: [{
    path: '404',
    name: '404',
    title: '404',
    component: () =>
      import('@/views/Exception/404'),
  }, {
    path: '403',
    name: '403',
    title: '403',
    component: () =>
      import('@/views/Exception/403'),
  }, {
    path: '500',
    name: '500',
    title: '500',
    component: () =>
      import('@/views/Exception/500'),
  }],
};

export const userRouter = [{
  path: '/user',
  name: 'user',
  title: 'user',
  redirect: '/user/login',
  component: UserLayout,
  children: [{
    path: 'login',
    name: 'login',
    title: '登录',
    component: () => import('@/views/User/Login.vue'),
  }],
}];

export const mainRouter = [{
  path: '/member/membermanage',
  name: 'membermanage',
  title: 'membermanage',
  component: () =>
    import('@/views/Home'),
}, {
  path: '/member/membertags',
  name: 'membertags',
  title: 'membertags',
  component: () =>
    import('@/views/About'),
}];
export const basicRouter = [{
  path: '/',
  name: 'home',
  component: Main,
}];
export const appRouter = [{
  path: '/standardTable',
  name: 'standardTable',
  title: 'standardTable',
  component: Main,
  children: [{
    path: 'standardTablePage',
    name: 'standardTablePage',
    title: '标准table',
    component: () =>
      import('@/views/StandardTable/index'),
  }],
}, {
  path: '/formItemType',
  name: 'formItemType',
  title: 'formItemType',
  component: Main,
  children: [{
    path: 'formItemTypePage',
    name: 'formItemTypePage',
    title: '表单类型',
    component: () =>
      import('@/views/FormItem/index'),
  }],
}, {
  path: '/member',
  name: 'member',
  title: 'member',
  component: Main,
  children: [{
    path: 'membermanage',
    name: 'membermanage',
    title: '会员管理',
    component: () =>
      import('@/views/Home'),
  }, {
    path: 'membertags',
    name: 'membertags',
    title: '标签设置',
    component: () =>
      import('@/views/About'),
  }],
}];

export const routers = [
  ...userRouter,
  ...basicRouter,
  ...appRouter,
  exceptionRouter,
  // ...exceptionRouter1,
  page404,

];
// 路由配置
const RouterConfig = {
  routes: routers,
};
export default new VueRouter(RouterConfig);
