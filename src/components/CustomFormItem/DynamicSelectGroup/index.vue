<template>
    <el-select :multiple="item.multiple" :placeholder="item.placeholder || `请选择${item.label}`" :disabled="item.disabled" :value="value" @input="$emit('input', $event)">
        <el-option-group v-for="selectItem in dictionaryList" :key="selectItem.key" :label="selectItem.label">
            <el-option v-for="childItem in selectItem.childrenOptions" :key="childItem.key" :label="childItem.value" :value="childItem.key">
            </el-option>
        </el-option-group>
    </el-select>
</template>
<script>
import Vue from 'vue';
import { Select, Option, OptionGroup } from 'element-ui';

Vue.component(OptionGroup.name, OptionGroup);
Vue.component(Select.name, Select);
Vue.component(Option.name, Option);
export default {
  name: 'dynamic-select-group',
  props: {
    item: Object,
    value: null,
  },
  computed: {
    dictionaryList() {
      return this.$store.state.dictionary[this.item.dictionaryKey];
    },
  },
  mounted() {
    const { dictionaryKey, fetchUrl } = this.item;
    this.$store.dispatch({
      type: 'dictionary/queryDictionary',
      payload: {
        fetchUrl,
        dictionaryKey,
      },
    });
  },
};
</script>

