<template>
  <page-header>
    <el-card shadow="never">
      <div class="formitem">
        <!-- <custom-form :searchFormItemList="searchFormItemList" ref="form"></custom-form>
                <el-button type="primary" @click="submitForm('form')">立即创建</el-button> -->
        <el-form ref="form"
                 :model="searchForms"
                 label-position="top"
                 :inline="false">
          <el-row>
            <el-col v-for="item in searchFormItemList"
                    :key="item.key"
                    :span="item.colSpan || 8">
              <el-card class="box-card">
                <div slot="header">
                  <span>{{item.label}}</span>
                </div>
                <div>
                  <custom-form-item :item="item"
                                    v-model="searchForms[item.key]"></custom-form-item>
                </div>
              </el-card>
            </el-col>
            <el-col>
              <el-form-item>
                <el-button type="primary"
                           @click="submitForm1('form')">立即创建</el-button>
              </el-form-item>
            </el-col>
          </el-row>
        </el-form>
      </div>
    </el-card>
  </page-header>

</template>
<script>
import Vue from "vue";
import { Row, Col, Form, FormItem, Card, Input, Button } from "element-ui";
import PageHeader from "@/components/PageHeader/index";
import pageConfig from "./pageConfig.js";
import CustomFormItem from "@/components/CustomFormItem/formitem.vue";

Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Card.name, Card);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);

export default {
  name: "form-item",
  components: { PageHeader, CustomFormItem },
  data() {
    return {
      searchFormItemList: pageConfig.searchForms,
      searchForms: {
      }
    };
  },

  methods: {
    submitForm(formName) {
      this.$refs[formName].validate((valid, values) => {
        if (valid) {
          console.log(values);
        }
      });
    },
    submitForm1(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log(this.searchForms);
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.box-card {
  margin: 12px;
}
.formitem {
  //   width: 300px;
}
</style>

