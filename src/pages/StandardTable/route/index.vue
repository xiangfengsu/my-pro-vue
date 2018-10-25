<template>
  <div class="standard-table">
    <page-header>
      <el-card shadow="never">
        <div class="search-form">
          <search-form :searchFormItems="searchFormItems"
                       @handle-search-reset="handleSearchReset"
                       @handle-search-submit="handleSearchSubmit"></search-form>
        </div>
        <div class="actions">
          <el-button type="primary"
                     icon="el-icon-plus"
                     size="small"
                     @click="handleAddRow">新 建</el-button>
        </div>
        <div class="table-list">
          <table-list :tableProps="tableProps"
                      @handle-delete-row="handleDeleteRow"
                      @handle-table-change="handleTableChange"
                      @handle-edit-row="handleEditRow"></table-list>
        </div>
        <el-dialog width="40%"
                   v-if="dialogVisible"
                   :visible="dialogVisible"
                   @close="changeModalVisibel(false)">
          <div>
            <modal-detail-form ref="modalForm"
                               :detailFormItemList="detailFormItems"></modal-detail-form>
          </div>
          <div slot="footer"
               class="dialog-footer">
            <el-button size="small"
                       @click="changeModalVisibel(false)">取 消</el-button>
            <el-button type="primary"
                       size="small"
                       :loading="confirmLoading"
                       @click="modalOkHandle">确 定</el-button>
          </div>
        </el-dialog>
      </el-card>
    </page-header>
  </div>
</template>

<script>
import Vue from "vue";
import { mapState } from "vuex";
import { Card, Dialog, Tag } from "element-ui";
import cloneDeep from "lodash/cloneDeep";
import { formItemAddInitValue, formaterObjectValue } from "@/core/utils/utils";
import PageHeader from "@/components/PageHeader/index";
import SearchForm from "@/components/GeneralSearchForm/index";
import TableList from "@/components/GeneralTableList/index";
import ModalDetailForm from "./modalDetailForm";
import pageConfig from "./pageConfig";
Vue.component(Card.name, Card);
Vue.component(Dialog.name, Dialog);
Vue.component(Tag.name, Tag);

export default {
  name: "standard-table",
  components: {
    PageHeader,
    SearchForm,
    TableList,
    ModalDetailForm
  },
  data() {
    const { searchForms } = pageConfig;
    return {
      showModalType: "",
      queryValues: {},
      current: 1,
      searchFormItems: searchForms,
      detailFormItems: []
    };
  },
  computed: {
    ...mapState("standardtable", [
      "loading",
      "dialogVisible",
      "confirmLoading",
      "data"
    ]),
    tableProps() {
      const { list, pagination } = this.data;
      return {
        loading: this.loading,
        dataSource: list,
        columns: pageConfig.tableColumns,
        pagination
      };
    }
  },
  mounted() {
    this.$store.dispatch({
      type: "standardtable/query",
      payload: this.queryParamsFormater()
    });
  },
  methods: {
    updateFormItems(record) {
      const detailFormItems = cloneDeep(pageConfig.detailFormItems);
      this.detailFormItems = formItemAddInitValue(detailFormItems, record);
    },
    handleSearchSubmit(formValues) {
      // console.log("formValues", formValues);
      this.queryValues = formValues;
      this.$store.dispatch({
        type: "standardtable/query",
        payload: this.queryParamsFormater(formaterObjectValue(formValues), 1)
      });
    },
    changeModalVisibel(flag, type) {
      this.showModalType = type;
      this.$store.commit({
        type: "standardtable/changeDialogVisible",
        payload: flag
      });
    },
    handleSearchReset() {
      this.queryValues = {};
      this.$store.dispatch({
        type: "standardtable/query",
        payload: this.queryParamsFormater()
      });
    },
    handleAddRow() {
      this.updateFormItems({});
      this.changeModalVisibel(true, "create");
    },
    handleEditRow(row) {
      this.updateFormItems(row);
      this.changeModalVisibel(true, "update");
    },
    handleDeleteRow(row) {
      this.$store.dispatch({
        type: "standardtable/remove",
        payload: this.queryParamsFormater({ id: row.id }, 2)
      });
    },
    handleTableChange(current) {
      const payload = {
        page: current,
        pageSize: 10
      };
      this.current = current;
      this.$store.dispatch({
        type: "standardtable/query",
        payload: {
          query: { ...this.queryValues },
          pagination: payload,
          form: {}
        }
      });
    },
    modalOkHandle() {
      this.$refs["modalForm"].validateFields(fieldsValue => {
        console.log("fieldsValue", fieldsValue);
        const fields = formaterObjectValue(fieldsValue);
        if (this.showModalType === "create") {
          this.$store.dispatch({
            type: "standardtable/create",
            payload: this.queryParamsFormater(fields, 3)
          });
        } else {
          this.$store.dispatch({
            type: "standardtable/update",
            payload: this.queryParamsFormater(fields, 2)
          });
        }
      });
    },
    queryParamsFormater(fields, type) {
      // type 1:查询  2:update|delete  3:save
      const { pagination } = this.data;
      delete pagination.total;
      const params = {
        form: {},
        query: {},
        pagination: {
          current: 1,
          pageSize: 10
        }
      };
      switch (type) {
        case 1:
          Object.assign(params, {
            query: { ...fields }
          });
          break;
        case 2:
          Object.assign(params, {
            query: { ...this.queryValues },
            form: { ...fields },
            pagination: {
              current: this.current,
              pageSize: 10
            }
          });
          break;
        case 3:
          Object.assign(params, {
            form: { ...fields }
          });
          break;
        default:
          Object.assign(params, {});
      }
      return params;
    }
  }
};
</script>
<style lang="scss" scoped>
.standard-table {
  .actions {
    // margin-top: 8px;
    margin-bottom: 18px;
  }
}
</style>


