<template>
    <div class="custom-form">
        <el-form ref="form" :model="searchForms" label-position="right" :inline="false" label-width="100px">
            <el-row>
                <el-col v-for="item in searchFormItemList" :key="item.key" :span="item.colSpan || 8">
                    <el-form-item v-if="item.formType === 'input'" :prop="item.key" :label="item.label" :rules="[{ required: item.isRequired, message: item.errorText || `${item.label}不能为空`,trigger:'change'}]">
                        <el-input type="text" :placeholder="item.placeholder || `请输入${item.label}`" :disabled="item.disabled" v-model="searchForms[item.key]"></el-input>
                    </el-form-item>
                    <el-form-item v-if="item.formType === 'inputNumber'" :prop="item.key" :label="item.label" :rules="[{ required: item.isRequired, message: item.errorText || `${item.label}不能为空`,trigger:'change'},{ type:'number', message: `${item.label}必须为数字`,trigger:'change'}]">
                        <el-input type="text" :placeholder="item.placeholder || `请输入${item.label}`" :disabled="item.disabled" v-model.number="searchForms[item.key]"></el-input>
                    </el-form-item>
                    <el-form-item v-if="item.formType === 'inputPhone'" :prop="item.key" :label="item.label" :rules="[{ required: item.isRequired, message: item.errorText || `${item.label}不能为空`,trigger:'change'},{ pattern: item.pattern || /^1[34578]\d{9}$/, message: `手机号码格式不正确`,trigger:'change'}]">
                        <el-input type="text" :placeholder="item.placeholder || `请输入${item.label}`" :disabled="item.disabled" :maxlength="11" v-model="searchForms[item.key]"></el-input>
                    </el-form-item>
                    <el-form-item v-if="item.formType === 'inputMail'" :prop="item.key" :label="item.label" :rules="[{ required: item.isRequired, message: item.errorText || `${item.label}不能为空`,trigger:'change'},{ pattern: item.pattern || /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: `邮箱格式不正确`,trigger:'change'}]">
                        <el-input type="text" :placeholder="item.placeholder || `请输入${item.label}`" :disabled="item.disabled" v-model="searchForms[item.key]"></el-input>
                    </el-form-item>
                    <el-form-item v-if="item.formType === 'inputUnit'" :prop="item.key" :label="item.label" :rules="[{ required: item.isRequired, message: item.errorText || `${item.label}不能为空`,trigger:'change'},{ type:'number', message: `${item.label}必须为数字`,trigger:'change'}]">
                        <el-input type="text" :placeholder="item.placeholder || `请输入${item.label}`" :disabled="item.disabled" v-model.number="searchForms[item.key]">
                            <template slot="append">{{item.unit}}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="item.formType === 'inputUnit'" :prop="item.key" :label="item.label" :rules="[{ required: item.isRequired, message: item.errorText || `${item.label}不能为空`,trigger:'change'},{ type:'number', message: `${item.label}必须为数字`,trigger:'change'}]">
                        <el-input type="text" :placeholder="item.placeholder || `请输入${item.label}`" :disabled="item.disabled" v-model.number="searchForms[item.key]">
                            <template slot="append">{{item.unit}}</template>
                        </el-input>
                    </el-form-item>
                    <el-form-item v-if="item.formType === 'textArea'" :prop="item.key" :label="item.label" :rules="[{ required: item.isRequired, message: item.errorText || `${item.label}不能为空`,trigger:'change'}]">
                        <el-input type="textarea" :placeholder="item.placeholder || `请输入${item.label}`" :disabled="item.disabled" :rows="item.rows || 2" v-model="searchForms[item.key]"></el-input>
                    </el-form-item>
                    <el-form-item v-if="item.formType === 'select'" :prop="item.key" :label="item.label" :rules="[{ required: item.isRequired, message: item.errorText || `${item.label}不能为空`,trigger:'change'}]">
                        <el-select :multiple="item.multiple" :placeholder="item.placeholder || `请选择${item.label}`" :disabled="item.disabled" v-model="searchForms[item.key]">
                            <el-option v-for="selectItem in item.selectOptions" :key="selectItem.key" :label="selectItem.value" :value="selectItem.key">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item v-if="item.formType === 'selectDynamic'" :prop="item.key" :label="item.label" :rules="[{ required: item.isRequired, message: item.errorText || `${item.label}不能为空`,trigger:'change'}]">
                        <dynamic-select :itemTest="item" v-model="searchForms[item.key]"></dynamic-select>
                    </el-form-item>
                </el-col>
                <!-- <el-col>
                    <el-form-item>
                        <el-button type="primary" @click="submitForm('form')">立即创建</el-button>
                    </el-form-item>
                </el-col> -->
            </el-row>

        </el-form>
    </div>
</template>
<script>
import Vue from "vue";
import {
  Row,
  Col,
  Form,
  Card,
  FormItem,
  Input,
  Select,
  Option,
  OptionGroup,
  Button
} from "element-ui";
import DynamicSelect from '@/components/CustomFormItem/DynamicSelect/index.vue';

Vue.component(Card.name, Card);
Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(Button.name, Button);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);

export default {
  name: "custom-form",
  components:{
      DynamicSelect
  },
  props: {
    searchFormItemList: {
      type: Array,
      required: true
    }
  },
  data() {
    // let searchForms = this.searchFormItemList
    return {
      searchForms: {}
    };
  },
  methods: {
    validatorNumber(rule, value, callback) {
      console.log(value);
      if (!/^\d+$/.test(value)) {
        callback(new Error("请输入数字"));
      }

      callback();
    },
    validate(validate) {
      this.$refs["form"].validate((valid, object) => {
        if (valid) {
          validate && validate(true, this.searchForms);
        } else {
          return false;
        }
      });
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 32px;
}
.el-select{
    width: 100%;
}
</style>


