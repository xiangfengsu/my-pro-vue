import {
    query,
    queryPost
} from '@/services/api';
import showStautsMessageHandle from '@/utils/statusCode';
import { formatterTableListPic } from '@/utils/utils';

const standardtable = {
    namespaced: true,
    state: {
        data: {
            list: [],
            pagination: {
            }
        },
        loading: false,
        dialogVisible: false,
        confirmLoading: false
    },
    mutations: {
        changeTableLoading(state, {
            payload
        }) {
            state.loading = payload
        },
        changeDialogVisible(state, {
            payload
        }) {
            state.dialogVisible = payload;
        },
        changgeConfirmLoading(state, {
            payload
        }) {
            state.confirmLoading = payload;
        },
        save(state, {
            payload
        }) {
            Object.assign(state, {
                ...formatterTableListPic(payload.data,['picUrl']),
                loading: false,
                dialogVisible: false
            });
        }
    },
    actions: {
        async query({
            commit
        }, {
            payload
        }) {
            commit({
                type: 'changeTableLoading',
                payload: true
            });

            const response = await queryPost(payload, '/crm/shop/list');
            if (response) {
                const {
                    code,
                    body,
                } = response;
                if (code === 200) {
                    commit({
                        type: 'save',
                        payload: {
                            data: body
                        }
                    });
                }
            }
        },
        async update({
            commit
        }, {
            payload
        }) {
            commit({
                type: 'changgeConfirmLoading',
                payload: true
            });
            const response = await queryPost(payload, '/crm/shop/update');
            if (response) {
                const {
                    code,
                    body,
                } = response;
                if (code === 200) {
                    commit({
                        type: 'save',
                        payload: {
                            data: body
                        }
                    });
                }
                showStautsMessageHandle('general','update',code);
            }
            commit({
                type: 'changgeConfirmLoading',
                payload: false
            });
        },
        async create({
            commit
        }, {
            payload
        }) {
            commit({
                type: 'changgeConfirmLoading',
                payload: true
            });
            const response = await queryPost(payload, '/crm/shop/save');
            if (response) {
                const {
                    code,
                    body,
                } = response;
                if (code === 200) {
                    commit({
                        type: 'save',
                        payload: {
                            data: body
                        }
                    });
                    showStautsMessageHandle('general','add',code);
                }
            }
            commit({
                type: 'changgeConfirmLoading',
                payload: false
            });
        },
        async remove({
            commit
        }, {
            payload
        }) {
            const response = await queryPost(payload, '/crm/shop/del');
            if (response) {
                const {
                    code,
                    body,
                } = response;
                if (code === 200) {
                    commit({
                        type: 'save',
                        payload: {
                            data: body
                        }
                    });
                }
                showStautsMessageHandle('general','delete',code);
            }
            
        }
    },
};

export default standardtable;