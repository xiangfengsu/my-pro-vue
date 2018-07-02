import {
  query
} from '@/services/api';
import Vue from 'vue';

const dictionary = {
  namespaced: true,
  state: {
    dictionaryList: {},
  },
  mutations: {
    queryDictionarySuccess(state, {
      payload,
    }) {
      const {
        dictionaryKey,
        body,
      } = payload;
      Vue.set(state, dictionaryKey, body);
    },
  },
  actions: {
    async queryDictionary({
      commit,
    }, {
      payload,
    }) {
      const {
        dictionaryKey,
        fetchUrl,
      } = payload;
      const response = await query(fetchUrl);
      if (response) {
        const {
          code,
          body,
        } = response;
        if (code === 200) {
          commit({
            type: 'queryDictionarySuccess',
            payload: {
              body,
              dictionaryKey,
            },
          });
        }
      }
    },
  },
};

export default dictionary;