<template>
    <div class="modalDetailForm">
        <el-form ref="detailForm"
                 :model="detailForms"
                 label-position="right"
                 label-width="100px"
                 size="small"
                 :inline="false">
            <el-row>
                <el-col v-for="item in detailFormItemList"
                        :key="item.key"
                        :span="item.colSpan === 0 ? 0 : item.colSpan || 24">
                    <custom-form-item :item="item"
                                      v-model="detailForms[item.key]"></custom-form-item>
                </el-col>

            </el-row>
        </el-form>
    </div>
</template>
<script>
import Vue from "vue";
import { Row, Col, Form, FormItem } from "element-ui";
import CustomFormItem from "@/components/CustomFormItem/formitem.vue";

Vue.component(Row.name, Row);
Vue.component(Col.name, Col);
Vue.component(Form.name, Form);
Vue.component(FormItem.name, FormItem);

export default {
  name: "modal-detail-form",
  props: {
    detailFormItemList: Array
  },
  data() {
    return {
      detailForms: {}
    };
  },
  methods: {
    validateFields(cb) {
      this.$refs["detailForm"].validate(valid => {
        if (valid) {
          cb && cb(this.detailForms);
        } else {
          return false;
        }
      });
    }
  },
  components: {
    CustomFormItem
  }
};
</script>

