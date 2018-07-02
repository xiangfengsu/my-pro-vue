<template>
  <div class="search-form">
    <el-form ref="searchForm"
             :model="searchForms"
             label-position="right"
             size="small"
             :inline="true">
      <el-row :gutter="8">
        <el-col v-for="(item, index) in searchFormItems"
                :key="item.key"
                :span="index<count?(item.colSpan === 0?0:item.colSpan || 8):0">
          <custom-form-item :item="item"
                            v-model="searchForms[item.key]"></custom-form-item>
        </el-col>
        <el-col :span="expandForm ? 24 : 8">
          <div :style="{float:leftOrRight}">
            <el-button type="primary"
                       :style="{marginLeft:'10px'}"
                       size="small"
                       @click="submitForm('searchForm')">查询</el-button>
            <el-button plain
                       size="small"
                       @click="resetForm('searchForm')">重置</el-button>
            <el-button type="text"
                       size="small"
                       v-if="count>2"
                       @click.prevent="expandHandle">{{expandText}}
              <i :class="expandIcon"></i>
            </el-button>
          </div>
        </el-col>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import Vue from "vue";
import { Row, Col, Form, FormItem, Button } from "element-ui";
import CustomFormItem from "@/components/CustomFormItem/formitem.vue";
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Button.name, Button);

export default {
  name: "search-form",
  components: {
    CustomFormItem
  },
  data() {
    return {
      searchForms: {},
      expandForm: false,
      maxCount: 2
    };
  },
  computed: {
    count() {
      return this.expandForm ? this.searchFormItems.length : this.maxCount;
    },
    leftOrRight() {
      return this.expandForm ? "right" : "left";
    },
    expandText() {
      return this.expandForm ? "收起" : "展开";
    },
    expandIcon() {
      return this.expandForm ? "el-icon-arrow-up" : "el-icon-arrow-down";
    }
  },
  props: {
    searchFormItems: Array
  },
  methods: {
    expandHandle() {
      this.expandForm = !this.expandForm;
    },
    submitForm(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$emit("handle-search-submit", this.searchForms);
        }
      });
    },
    resetForm(formName) {
      this.$refs[formName].resetFields();
      this.$emit("handle-search-reset");
    }
  }
};
</script>
<style lang="scss" >
.search-form {
  .el-form--inline .el-form-item__label {
    width: 20%;
  }
  .el-form--inline .el-form-item__content {
    width: 75%;
  }
  .el-form-item {
    width: 100%;
  }
  .collapseBtn {
    color: #1890ff;
    background-color: transparent;
    text-decoration: none;
    outline: none;
    cursor: pointer;
    margin-left: 10px;
  }
}
</style>


