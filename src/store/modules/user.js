import {
  getUser,
  accountLogin,
  accountLoginOut,
} from '@/services/user';
import router from '@/common/router';

const user = {
  state: {
    currentUser: {},
    status: undefined,
    errorMessage: '',
    loginLoading: false,
  },
  mutations: {
    saveCurrentUser(state, {
      payload,
    }) {
      const {
        menu = [], btn = [],
      } = payload;
      Object.assign(state, {
        currentUser: {
          menuData: menu,
          btnAuth: btn,
          ...payload.user,
        },
      });
    },
    changeLoginLoading(state, {
      payload,
    }) {
      Object.assign(state, payload);
    },
    changeLoginStatus(state, {
      payload,
    }) {
      Object.assign(state, payload);
    },
  },
  actions: {
    async login({
      commit,
    }, {
      payload,
    }) {
      commit({
        type: 'changeLoginLoading',
        payload: {
          loginLoading: true,
        },
      });
      const response = await accountLogin(payload, '/sys/doLogin');
      commit({
        type: 'changeLoginLoading',
        payload: {
          loginLoading: false,
        },
      });
      if (response) {
        const {
          code,
        } = response;
        const errorMessage = {
          200: '登录成功',
          100: '验证码错误',
          101: '用户名或密码错误',
        };
        commit({
          type: 'changeLoginStatus',
          payload: {
            status: code !== 200 ? 'error' : 'ok',
            errorMessage: errorMessage[code],
          },
        });
        if (code === 200) {
          router.push({
            path: '/',
          });
        }
      }
    },
    async loginOut({
      commit,
    }) {
      try {
        await accountLoginOut('/sys/logout');
        commit({
          type: 'changeLoginStatus',
          payload: {
            status: false,
            errorMessage: '',
          },
        });
      } finally {
        router.push({
          path: '/user/login',
        });
      }
    },
    async getUserInfo({
      commit,
    }) {
      const response = await getUser('/sys/currentUser');
      if (response) {
        const {
          code,
          body,
        } = response;
        if (code === 200) {
          commit({
            type: 'saveCurrentUser',
            payload: body,
          });
        }
      }
    },
  },
};

export default user;
