<template>
  <div class="custom-form-item">
    <el-form-item v-if="item.formType === 'input'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: inputErrorText,trigger:'change'}]">
      <el-input :placeholder="placeholder"
                :disabled="disabled"
                :value="value"
                @input="$emit('input', $event)"></el-input>
    </el-form-item>
    <el-form-item v-if="item.formType === 'inputNumber'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: inputErrorText,trigger:'change'},{ pattern: item.pattern || /^[0-9]*$/, message: `${item.label}必须为数字`,trigger:'change'}]">
      <el-input type="text"
                :placeholder="placeholder"
                :disabled="disabled"
                :value="value"
                @input="$emit('input', $event)"></el-input>
    </el-form-item>
    <el-form-item v-if="item.formType === 'inputPhone'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: inputErrorText,trigger:'change'},{ pattern: item.pattern || /^1[34578]\d{9}$/, message: `手机号码格式不正确`,trigger:'change'}]">
      <el-input type="text"
                :placeholder="placeholder"
                :disabled="disabled"
                :maxlength="11"
                :value="value"
                @input="$emit('input', $event)"></el-input>
    </el-form-item>
    <el-form-item v-if="item.formType === 'inputMail'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: inputErrorText,trigger:'change'},{ pattern: item.pattern || /^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/, message: `邮箱格式不正确`,trigger:'change'}]">
      <el-input type="text"
                :placeholder="placeholder"
                :disabled="disabled"
                :value="value"
                @input="$emit('input', $event)"></el-input>
    </el-form-item>
    <el-form-item v-if="item.formType === 'inputUnit'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: inputErrorText,trigger:'change'},{ pattern: item.pattern || /^[0-9]*$/, message: `${item.label}必须为数字`,trigger:'change'}]">
      <el-input type="text"
                :placeholder="placeholder"
                :disabled="disabled"
                :value="value"
                @input="$emit('input', $event)">
        <template slot="append">{{item.unit}}</template>
      </el-input>
    </el-form-item>
    <el-form-item v-if="item.formType === 'textArea'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: inputErrorText,trigger:'change'}]">
      <el-input type="textarea"
                :placeholder="placeholder"
                :disabled="disabled"
                :rows="item.rows || 2"
                :value="value"
                @input="$emit('input', $event)"></el-input>
    </el-form-item>
    <el-form-item v-if="item.formType === 'select'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <el-select :multiple="item.multiple"
                 :placeholder="placeholderSelect"
                 :disabled="disabled"
                 :value="value"
                 @input="$emit('input', $event)">
        <el-option v-for="selectItem in item.selectOptions"
                   :key="selectItem.key"
                   :label="selectItem.value"
                   :value="selectItem.key">
        </el-option>
      </el-select>
    </el-form-item>
    <el-form-item v-if="item.formType === 'selectDynamic'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <dynamic-select :item="item"
                      :value="value"
                      @input="$emit('input', $event)"></dynamic-select>
    </el-form-item>
    <el-form-item v-if="item.formType === 'selectGroup'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <el-select :multiple="item.multiple"
                 :placeholder="placeholderSelect"
                 :disabled="disabled"
                 :value="value"
                 @input="$emit('input', $event)">
        <el-option-group v-for="selectItem in item.selectOptions"
                         :key="selectItem.key"
                         :label="selectItem.label">
          <el-option v-for="childItem in selectItem.childrenOptions"
                     :key="childItem.key"
                     :label="childItem.value"
                     :value="childItem.key">
          </el-option>
        </el-option-group>
      </el-select>
    </el-form-item>
    <el-form-item v-if="item.formType === 'selectDynamicGroup'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <dynamic-select-group :item="item"
                            :value="value"
                            @input="$emit('input', $event)"></dynamic-select-group>
    </el-form-item>
    <el-form-item v-if="item.formType === 'datePicker'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <el-date-picker :type="item.showTime?'datetime':'date'"
                      :value-format="item.showTime? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd' "
                      :editable="false"
                      :placeholder="placeholder"
                      :disabled="disabled"
                      :value="value"
                      @input="$emit('input', $event)">
      </el-date-picker>
    </el-form-item>
    <el-form-item v-if="item.formType === 'rangePicker'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <el-date-picker :type="item.showTime?'datetimerange':'daterange'"
                      :value-format="item.showTime? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd' "
                      :editable="false"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :placeholder="placeholder"
                      :disabled="disabled"
                      :value="value"
                      @input="$emit('input', $event)">
      </el-date-picker>
    </el-form-item>
    <el-form-item v-if="item.formType === 'monthPicker'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <el-date-picker type="month"
                      value-format="yyyy-MM-dd"
                      :editable="false"
                      range-separator="~"
                      start-placeholder="开始日期"
                      end-placeholder="结束日期"
                      :placeholder="placeholder"
                      :disabled="disabled"
                      :value="value"
                      @input="$emit('input', $event)">
      </el-date-picker>
    </el-form-item>
    <el-form-item v-if="item.formType === 'timePicker'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <el-time-picker :editable="false"
                      :placeholder="placeholder"
                      :disabled="disabled"
                      :value="value"
                      value-format="HH:mm:ss"
                      @input="$emit('input', $event)">
      </el-time-picker>
    </el-form-item>
    <el-form-item v-if="item.formType === 'checkboxGroup'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <el-checkbox-group :placeholder="placeholderSelect"
                         :disabled="disabled"
                         :value="value"
                         @input="$emit('input', $event)">
        <el-checkbox v-for="option in item.options"
                     :label="option.value"
                     :key="option.value">{{option.label}}</el-checkbox>
      </el-checkbox-group>
    </el-form-item>
    <el-form-item v-if="item.formType === 'radioGroup'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <el-radio-group :placeholder="placeholderSelect"
                      :disabled="disabled"
                      :value="value"
                      @input="$emit('input', $event)">
        <el-radio v-for="option in item.options"
                  :label="option.value"
                  :key="option.value">{{option.label}}</el-radio>
      </el-radio-group>
    </el-form-item>
    <el-form-item v-if="item.formType === 'upload'"
                  :prop="item.key"
                  :label="item.label"
                  :rules="[{ required: isRequired, message: selectErrorText,trigger:'change'}]">
      <custom-upload :item="item"
                     :value="value"
                     @input="$emit('input', $event)"></custom-upload>
    </el-form-item>
  </div>
</template>
<script>
import Vue from "vue";
import {
  FormItem,
  Input,
  InputNumber,
  Select,
  Option,
  OptionGroup,
  DatePicker,
  TimePicker,
  Checkbox,
  CheckboxGroup,
  Radio,
  RadioGroup
} from "element-ui";
import DynamicSelect from "@/components/CustomFormItem/DynamicSelect/index.vue";
import DynamicSelectGroup from "@/components/CustomFormItem/DynamicSelectGroup/index.vue";
import CustomUpload from "@/components/CustomFormItem/CustomUpload/index.vue";

Vue.component(FormItem.name, FormItem);
Vue.component(Input.name, Input);
Vue.component(InputNumber.name, InputNumber);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
Vue.component(OptionGroup.name, OptionGroup);
Vue.component(DatePicker.name, DatePicker);
Vue.component(TimePicker.name, TimePicker);
Vue.component(Checkbox.name, Checkbox);
Vue.component(CheckboxGroup.name, CheckboxGroup);
Vue.component(Radio.name, Radio);
Vue.component(RadioGroup.name, RadioGroup);

export default {
  name: "custom-form-item",
  props: {
    item: Object,
    value: {
      type: [String, Number, Array, Date],
      default() {
        const { formType, initialValue } = this.item;
        this.$emit("input", initialValue);
        switch (formType) {
          case "checkboxGroup":
            return initialValue || [];
            break;
          default:
            return initialValue;
        }
      }
    }
  },
  components: {
    DynamicSelect,
    CustomUpload,
    DynamicSelectGroup
  },
  methods: {},
  computed: {
    disabled() {
      return this.item.disabled;
    },
    isRequired() {
      return this.item.isRequired || false;
    },
    placeholder() {
      return this.item.placeholder || `请输入${this.item.label}`;
    },
    placeholderSelect() {
      return this.item.placeholder || `请选择${this.item.label}`;
    },
    inputErrorText() {
      return this.item.errorText || `${this.item.label}不能为空`;
    },
    selectErrorText() {
      return this.item.errorText || `请选择${this.item.label}`;
    }
  },
  watch:{
    item(value){
      this.$emit("input",value &&value.initialValue); // 当表单内容修改时，更新表单内容
    }
  }
};
</script>
<style lang="scss" scoped>
.el-form-item {
  margin-bottom: 32px;
}
.el-select {
  width: 100%;
}
.el-date-editor.el-input,
.el-date-editor.el-input__inner {
  width: 100%;
}
</style>
