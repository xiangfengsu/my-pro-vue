import Vue from 'vue';
import VueRouter from 'vue-router';
import Main from '@/layouts/BasicLayout';

Vue.use(VueRouter);
export const otherRouter = {
  path: '/',
  name: 'otherRouter',
  redirect: '/member/membermanage',
  component: Main,
};
export const exceptionRouter = {
  path: '/exception',
  name: 'exception',
  title: 'exception',
  component: Main,
  children: [{
    path: '403',
    name: '403',
    title: '403',
    component: () =>
            import('@/views/Exception/403'),
  }, {
    path: '404',
    name: '404',
    title: '404',
    component: () =>
            import('@/views/Exception/404'),
  }, {
    path: '500',
    name: '500',
    title: '500',
    component: () =>
            import('@/views/Exception/500'),
  }],
};
export const appRouter = [{
  path: '/member',
  name: 'member',
  title: 'member',
  component: Main,
  children: [{
    path: 'membermanage',
    name: 'membermanage',
    title: 'membermanage',
    component: () =>
            import('@/views/Home'),
  }, {
    path: 'membertags',
    name: 'membertags',
    title: 'membertags',
    component: () =>
            import('@/views/About'),
  }],
}];

export const basicRouter = [{
  path: '/',
  name: 'home',
  component: () =>
        import('../layouts/BasicLayout'),
  children: appRouter,
}];
export const routers = [
  otherRouter,
  exceptionRouter,
  ...appRouter,

];
// 路由配置
const RouterConfig = {
  routes: routers,
};
export default new VueRouter(RouterConfig);
