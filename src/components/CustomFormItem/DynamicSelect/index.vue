<template>
    <el-select :multiple="item.multiple" :placeholder="item.placeholder || `请选择${item.label}`" :disabled="item.disabled" :value="value" @input="$emit('input', $event)">
        <el-option v-for="selectItem in dictionaryList" :key="selectItem.key" :label="selectItem.value" :value="selectItem.key">
        </el-option>
    </el-select>
</template>
<script>
import Vue from "vue";
import { Select, Option } from "element-ui";
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
export default {
  name: "dynamic-select",
  props: {
    item: Object,
    value: null
  },
  computed: {
    dictionaryList() {
      return this.$store.state.dictionary[this.item.dictionaryKey];
    }
  },
  mounted() {
    const { dictionaryKey, fetchUrl } = this.item;
    this.$store.dispatch({
      type: "queryDictionary",
      payload: {
        fetchUrl,
        dictionaryKey
      }
    });
  }
};
</script>

