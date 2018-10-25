import Vue from "vue";
import Vuex from "vuex";
import VueRouter from "vue-router";
import loadable from '@/core/utils/loadable';
import app from "@/pages/Sys/Global/module/app";
import Main from "@/core/layouts/BasicLayout.vue";
import UserLayout from "@/core/layouts/UserLayout.vue";

Vue.use(Vuex);
Vue.use(VueRouter);

export const store = new Vuex.Store({
  state: {
    //
  },
  mutations: {
    //
  },
  actions: {},
  modules: {
    app
  }
});

const dynamicWrapper = (modules, component) => {
  modules.length > 0 &&
    modules.forEach(module => {
      const m = require(`@/pages/${module}`).default;
      const { name = "default" } = m;
      store.registerModule(name, m);
    });
    return loadable(component)
  // return {
  //   render(h) {
  //     return h(component, {});
  //   }
  // };
};
export const page404 = {
  path: "/*",
  name: "e-404",
  title: "404",
  redirect: "/exception/404"
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
  path: "/exception",
  name: "exception",
  title: "exception",
  redirect: "/exception/404",
  component: Main,
  children: [
    {
      path: "404",
      name: "404",
      meta:{
        title:'404'
      },
      component: dynamicWrapper([], () =>
        import("@/pages/Sys/Exception/route/404")
      )
    },
    {
      path: "403",
      name: "403",
      meta:{
        title:'403'
      },
      component: dynamicWrapper([], () =>
        import("@/pages/Sys/Exception/route/403")
      )
    },
    {
      path: "500",
      name: "500",
      meta:{
        title:'500'
      },
      component: dynamicWrapper([], () =>
        import("@/pages/Sys/Exception/route/500")
      )
    }
  ]
};

export const userRouter = [
  {
    path: "/user",
    name: "user",
    title: "user",
    redirect: "/user/login",
    component: UserLayout,
    children: [
      {
        path: "login",
        name: "login",
        meta:{
          title:'登录'
        },
        component: dynamicWrapper(["Sys/User/module/user"], () =>
          import("@/pages/Sys/User/route/Login.vue")
        )
      }
    ]
  }
];
export const basicRouter = [
  {
    path: "/",
    name: "home",
    component: Main
  }
];
export const appRouter = [
  {
    path: "/standardTable",
    name: "standardTable",
    title: "standardTable",
    component: Main,
    children: [
      {
        path: "standardTablePage",
        name: "standardTablePage",
        meta:{
          title:'标准table'
        },
        component: dynamicWrapper(
          [
            "Sys/Dictionary/module/dictionary",
            "StandardTable/module/standardtable"
          ],
          () => import("@/pages/StandardTable/route/index")
        )
      }
    ]
  },
  {
    path: "/formItemType",
    name: "formItemType",
    title: "formItemType",
    component: Main,
    children: [
      {
        path: "formItemTypePage",
        name: "formItemTypePage",
        meta:{
          title:'formItemType'
        },
        component: dynamicWrapper(["Sys/Dictionary/module/dictionary"], () =>
          import("@/pages/Sys/FormType/route/index")
        )
      }
    ]
  }
];

export const routers = [
  ...userRouter,
  ...basicRouter,
  ...appRouter,
  exceptionRouter,
  // ...exceptionRouter1,
  page404
];
// 路由配置
const RouterConfig = {
  routes: routers
};
const router = new VueRouter(RouterConfig);
router.beforeEach((to, from, next) => {
  document.title = to.meta.title;
  next();
})
export default router;
