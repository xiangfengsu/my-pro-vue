<template>
  <div class="tableList">
    <el-table :data="dataSource"
              v-loading="loading"
              :row-key="rowKeyHandle"
              style="width: 100%">
      <el-table-column v-for="(item,index) in columns"
                       :prop="item.dataIndex"
                       :key="index"
                       :formatter="item.formatter"
                       :sortable="item.sortable"
                       :width="item.width"
                       :label="item.title">
        <template slot-scope="scope">
          <table-customcolumn :renderContent="item.render" :scope="scope" :prop="item.dataIndex"></table-customcolumn>
          <!-- {{ scope.row[item.dataIndex] }} -->
        </template>
      </el-table-column>
      <el-table-column label="操作"
                       width="100">
        <template slot-scope="scope">
          <el-button type="text"
                     @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
          <el-button type="text"
                     @click="handleDelete(scope.$index, scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="clearfix">
      <div class="pagination">
        <el-pagination background
                       layout="prev, pager, next"
                       :current-page="current"
                       :page-size="pageSize"
                       @current-change="currentChange"
                       :total="total    ">
        </el-pagination>
      </div>
    </div>
   
  </div>
</template>

<script>
import Vue from "vue";
import { Button, Table, Dialog, TableColumn, Pagination,  } from "element-ui";
import TableCustomcolumn from './table-customcolumn';

Vue.component(Button.name, Button);
Vue.component(Table.name, Table);
Vue.component(TableColumn.name, TableColumn);
Vue.component(Pagination.name, Pagination);
Vue.component(Dialog.name, Dialog);


export default {
  name: "table-list",
  props: {
    tableProps: Object
  },
  data() {
    return {
      visible2: false,
      visibleIndex:-1
    };
  },
  components:{
    TableCustomcolumn
  },
  computed: {
    loading() {
      return this.tableProps.loading;
    },
    dataSource() {
      return this.tableProps.dataSource;
    },
    columns() {
      return this.tableProps.columns;
    },
    current() {
      return this.tableProps.pagination.current || 1;
    },
    total() {
      return this.tableProps.pagination.total || 0;
    },
    pageSize() {
      return this.tableProps.pagination.pageSize || 10;
    }
  },
  methods: {
    rowKeyHandle(row) {
      return row.id;
    },
    handleEdit(index, row) {
      // console.log(index, row);
      this.$emit("handle-edit-row", row);
    },
    handleDelete(index, row) {
      // console.log(index, row);
      this.$confirm('确定删除该文件?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          this.$emit("handle-delete-row", row);
        }).catch(() => {
            
        });
      
    },
    currentChange(page) {
      this.$emit("handle-table-change", page);
    }
  }
};
</script>
<style lang="scss" >
.tableList {
  // padding: 0 12px;
  .pagination {
    float: right;
    margin: 16px 0;
  }
}
</style>

