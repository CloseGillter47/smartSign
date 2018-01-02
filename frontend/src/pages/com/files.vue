<style lang="scss" >
@import "../../assets/css/function";
</style>
<style lang="scss" scoped>
@import "../../assets/css/function";
.list-box {
  min-height: 300px;
}
</style>
<template>
    <div class="main-box-body list-box">
        <mu-list>
            <mu-sub-header>文件列表</mu-sub-header>
            <mu-list-item disableRipple v-for="(file,idx) in files" :key="idx" @click="handleToggle(idx)" :title="file.name">
                <mu-checkbox v-model="file.selected" slot="left" />
            </mu-list-item>
        </mu-list>
    </div>
</template>
<script>
import Event from "../../main";

export default {
  data() {
    return {
      files: []
    };
  },

  components: {},

  methods: {
    handleToggle(idx) {
      let file = this.files[idx];
      file.selected = !file.selected;
      this.$set(this.files, idx, file);
    }
  },

  mounted() {
    let vm = this;
    Event.$on("DialogI", data => {
      Event.$off("DialogI");
      vm.files = data;
      vm.files.forEach((v, i) => {
        v.selected = false;
        vm.$set(vm.files, i, v);
      });
    });

    Event.$on("dialogClose", () => {
      let files = new Array();
      vm.files.forEach((v, i) => {
        if (v.selected) files.push(v);
      });
      Event.$emit("DialogO", { files: files });
    });
  }
};
</script>
