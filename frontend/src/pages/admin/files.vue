<style lang="scss" >
@import "../../assets/css/function";
</style>
<style lang="scss" scoped>
@import "../../assets/css/function";
.file-con-box {
  position: relative;
}

.file-list-box {
  width: 100%;
  padding: px2rem(12px);
  .file-list-item {
    width: 100%;
    margin-bottom: px2rem(12px);
    height: px2rem(144px);
    padding: px2rem(12px);
  }
}

.file-item-left {
  flex-grow: 2;
  padding-left: px2rem(12px);
  padding-right: px2rem(12px);
  h2 {
    font-size: 18px;
    font-weight: bold;
    width: 100%;
    line-height: 2.4;
  }
  h4 {
    font-size: 12px;
    color: #7e848c;
  }
}

.edit-btn-group {
  // position: absolute;
  position: fixed;
  bottom: px2rem(148px);
  right: 0;
  left: 0;
}

.edit-btn {
  margin: px2rem(12px);
}

.slide-fade-enter-active {
  animation: rotateIn 0.8s ease;
}

.slide-fade-leave-active {
  animation: rotateOut 0.3s ease;
}

.slide-fade-enter,
.slide-fade-leave-to {
  opacity: 0;
}

.file-button {
  position: absolute;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
  z-index: -1;
}
</style>
<template>
    <div class="body-box file-con-box">
        <div class="file-list-box">
            <mu-paper class="file-list-item flex-box flex-betwn item-center" :zDepth="1" v-for="(file, idx) in files" :key="idx">
                <mu-icon-button icon="cloud_done" />
                <div class="file-item-left">
                    <h2>{{file.name}}</h2>
                    <h4>{{file.time}}</h4>
                </div>
                <mu-icon-button icon="open_in_new" />
            </mu-paper>

        </div>
        <div class="edit-btn-group flex-box layout-center">
            <transition name="slide-fade">
                <mu-float-button icon="backup" secondary mini class="edit-btn" v-show="showMoreBtn" @click="addFile">
                </mu-float-button>
            </transition>
            <mu-float-button :icon="moreBtn" :secondary="!showMoreBtn" mini class="edit-btn" @click="toggleBtnGroup" />
            <transition name="slide-fade">
                <mu-float-button icon="delete" secondary mini class="edit-btn" v-show="showMoreBtn" @click="delFile" />
            </transition>
            <input type="file" id="file_btn" class="file-button" accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel" multiple="multiple" @change="getFiles">
        </div>
    </div>
</template>
<script>
import * as AdminServer from "../../server/admin";
import * as Util from "../../util";

import Event from "../../main";

export default {
  data() {
    return {
      moreBtn: "apps",
      showMoreBtn: false,
      files: []
    };
  },

  created() {
    Event.$on("refreshData", config => {
      if (config.page === "file") this.getFileList(true);
    });

    Event.$on("readme", config => {
      if (config.page === "file") {
        this.readme();
      }
    });
  },

  mounted() {
    this.getFileList(false);
  },

  methods: {
    toggleBtnGroup() {
      this.showMoreBtn = !this.showMoreBtn;
      this.moreBtn = !this.showMoreBtn ? "apps" : "close";
    },

    addFile() {
      this.$el.querySelector("#file_btn").click();
    },

    delFile() {
      let list = this.files;
      this.$dialog(
        {
          title: "请选择文件",
          YBtnText: "删除",
          NBtnText: "取消",
          showYBtn: true,
          showNBtn: true,
          currentView: resolve => require(["../com/files.vue"], resolve)
        },
        list
      )
        .then(
          data => {
            let user = JSON.parse(sessionStorage.getItem("accessToken"));

            let params = {
              user: user
            };

            Object.assign(params, data);

            this.delete(params, true);
          },
          () => {
            console.log("用户取消操作");
          }
        )
        .catch(err => {
          console.log(err);
        });
    },

    readme() {
      let text = `<ul>
                      <li>1. 删除文件是指删除数据源文件；</li>
                      <li>2. 已经读取进系统的数据不会对应删除；</li>
                      <li>3. 未读取的表文件不会出现在该删除列表上；</li>
                      <li>4. 删除文件后、建议在设置里面初始化系统；</li>
                 </ul>
                `;

      this.$dialog(
        {
          title: "注意事项",
          NBtnText: "好的",
          showYBtn: false,
          showNBtn: true,
          currentView: resolve => require(["../com/readme.vue"], resolve)
        },
        text
      )
        .then(
          data => {
            console.log("用户确定操作");
          },
          () => {
            console.log("用户取消操作");
          }
        )
        .catch(err => {
          console.log(err);
        });
    },

    getFileList(type) {
      let promise = new Promise((reolve, reject) => {
        let user = JSON.parse(sessionStorage.getItem("accessToken"));

        let params = {
          user: user
        };

        AdminServer.getFileList(params)
          .then(
            res => {
              if (res.success) {
                this.files = res.data;

                reolve({ text: "获取数据成功" });
              } else {
                reject({ text: "获取数据失败" });
              }
            },
            err => {
              reject({ text: "服务器错误" });
            }
          )
          .catch(err => {
            reject({ text: "程序错误" });
          });
      });

      if (type) this.$toast({ mode: "load", text: "加载中..." }, promise);
    },

    getFiles(event) {
      let files = event.target.files;

      let excels = new FormData();

      if (files.length) {
        for (let i = 0; i < files.length; i++) {
          excels.append(i, files[i]);
        }
      }

      this.upload(excels, true);
    },

    upload(params, type) {
      let promise = new Promise((reolve, reject) => {
        AdminServer.uploadFile(params)
          .then(
            res => {
              if (res.success) {
                this.files = res.data;

                reolve({ text: "获取数据成功" });
              } else {
                reject({ text: "获取数据失败" });
              }
            },
            err => {
              reject({ text: "服务器错误" });
            }
          )
          .catch(err => {
            reject({ text: "程序错误" });
          });
      });

      if (type) this.$toast({ mode: "load", text: "上传中..." }, promise);
    },

    delete(params, type) {
      let promise = new Promise((reolve, reject) => {
        AdminServer.delectFile(params)
          .then(
            res => {
              if (res.success) {
                this.files = res.data;

                reolve({ text: "删除成功" });
              } else {
                reject({ text: "删除失败" });
              }
            },
            err => {
              reject({ text: "服务器错误" });
            }
          )
          .catch(err => {
            reject({ text: "程序错误" });
          });
      });

      if (type) this.$toast({ mode: "load", text: "操作中..." }, promise);
    }
  }
};
</script>
