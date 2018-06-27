<template>
    <div class="custom-upload">
        <el-upload :accept="item.acceptType || '*'" :file-list="fileList" :action="item.action" :list-type="listType" :before-upload="beforeUpload" :on-change="handleChange" :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-error="handleError" :multiple="item.multiple || false" :limit="item.maxFileCounts||5" :on-exceed="handleExceed">
            <i v-if="item.listType === 'picture-card'" class="el-icon-plus"></i>
            <el-button v-else size="small" type="primary">点击上传</el-button>
        </el-upload>
        <el-dialog :visible.sync="dialogVisible" :fullscreen="false">
            <light-box v-if="dialogVisible" :carouselList="carouselList" :currentIndex="currentIndex"></light-box>
            <!-- <img width="100%" :src="dialogImageUrl" alt> -->
        </el-dialog>
    </div>
</template>
<script>
import Vue from "vue";
import { Upload, Dialog } from "element-ui";
import LightBox from "@/components/LightBox/index.vue";
Vue.component(Upload.name, Upload);
Vue.component(Dialog.name, Dialog);

export default {
  name: "custom-upload",
  data() {
    return {
      dialogVisible: false,
      carouselList: [],
      currentIndex: 0,
      fileList: Array.isArray(this.value) ? this.value : []
    };
  },
  components: {
    LightBox
  },
  props: {
    item: Object,
    value: null
  },
  computed: {
    listType() {
      return this.item.listType || "text";
    }
  },
  methods: {
    handleChange(file, fileList) {
      this.fileList = fileList.slice(0);
      this.$emit("input", fileList);
    },
    handleRemove(file, fileList) {
      this.fileList = fileList.slice(0);
      this.$emit("input", fileList);
    },
    handlePreview(file) {
      const url = file.response ? file.response.url : file.url;
      if (this.listType === "text") {
        window.open(url);
      } else {
        const regpHandle = text => {
          return /^https?.*(gif|png|jpe?g|GIF|PNG|JPE?G)$/.test(text);
        };
        if(!regpHandle(url)){
            this.$message.error(`该文件不是图片类型，无法预览!`);
            return ;
        }   
        const index = this.fileList.findIndex(item => {
          return item.uid === file.uid;
        });
        this.carouselList = this.formaterFileList();
        this.currentIndex = index === -1 ? 0 : index;
        this.dialogVisible = true;
      }
    },
    formaterFileList() {
      return this.fileList.map(file => {
        return {
          uid:file.uid,
          name: file.name || "no name",
          url: file.response ? file.response.url : file.url
        };
      });
    },
    handleError(err, file, fileList) {
      this.$message.error(`${file.name} 上传失败!`);
    },
    handleExceed(files, fileList) {
      this.$message.warning(
        `当前限制选择 ${this.item.maxFileCounts} 个文件，本次选择了 ${
          files.length
        } 个文件，共选择了 ${files.length + fileList.length} 个文件`
      );
    },
    beforeUpload(file) {
      const { maxFileSize = 1 } = this.item;
      const maxSize = maxFileSize * 1024 * 1024;
      const ltSize = maxSize > file.size;
      if (!ltSize) {
        this.$message.error(`${file.name} 文件大小不能超过 ${maxFileSize}M`);
      }
      return ltSize;
    },
    beforeRemove(file, fileList) {
      if (file.status !== "ready") {
        return this.$confirm(`确定移除 ${file.name}？`);
      }
    }
  }
};
</script>

