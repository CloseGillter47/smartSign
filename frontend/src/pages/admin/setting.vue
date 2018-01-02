<style lang="scss" >
.font-12 {
  font-size: 12px;
}
</style>
<style lang="scss" scoped>
@import "../../assets/css/function";
</style>
<template>
    <div class="body-box">
        <mu-list>
            <mu-sub-header>系统设置</mu-sub-header>
            <mu-list-item title="初始化系统" describeText="重新读取表格文件中的数据（慎用）" @click="resetSystem" describeTextClass="font-12">
                <mu-icon slot="left" value="hourglass_empty" />
                <mu-icon slot="right" value="keyboard_arrow_right" />
            </mu-list-item>
            <mu-list-item title="清理系统缓存" describeText="选择清理临时文件" @click="clearTemp" describeTextClass="font-12">
                <mu-icon slot="left" value="history" />
                <mu-icon slot="right" value="keyboard_arrow_right" />
            </mu-list-item>
            <mu-list-item title="设置导出表头" describeText="与导出的表格文件表头相关" describeTextClass="font-12">
                <mu-icon slot="left" value="text_format" />
                <mu-icon slot="right" value="keyboard_arrow_right" />
            </mu-list-item>

        </mu-list>
        <mu-divider />
        <mu-list>
            <mu-sub-header>管理员设置</mu-sub-header>
            <mu-list-item title="修改管理员密码" @click="updatePassword">
                <mu-icon slot="left" value="lock_outline" />
                <mu-icon slot="right" value="keyboard_arrow_right" />
            </mu-list-item>
            <mu-list-item title="重置管理员密码" describeText="恢复默认管理密码" @click="resetPassword" describeTextClass="font-12">
                <mu-icon slot="left" value="lightbulb_outline" />
                <mu-icon slot="right" value="keyboard_arrow_right" />
            </mu-list-item>

        </mu-list>
    </div>
</template>
<script>
import * as AdminServer from "../../server/admin";
import * as Util from "../../util";

export default {
  data() {
    return {
      events: false,
      calls: false,
      messages: false,
      notifications: false,
      sounds: false,
      videoSounds: false
    };
  },
  methods: {
    resetSystem() {
      this.$dialog({
        title: "初始化系统",
        YBtnText: "确定",
        NBtnText: "取消",
        showYBtn: true,
        showNBtn: true,
        context: "这将会清理现有缓存以及重建数据"
      })
        .then(
          data => {
            this.initSystem();
          },
          () => {
            console.log("用户已取消初始化操作");
          }
        )
        .catch(err => {
          console.log(err);
        });
    },

    clearTemp() {
      this.$dialog({
        title: "清理系统缓存",
        YBtnText: "确定",
        NBtnText: "取消",
        showYBtn: true,
        showNBtn: true,
        context: "是否确定该操作？"
      })
        .then(
          data => {
            this.clearSystem();
          },
          () => {
            console.log("用户已取消清理缓存操作");
          }
        )
        .catch(err => {
          console.log(err);
        });
    },

    updatePassword() {
      this.$router.push("/admin/set/password");
    },

    resetPassword() {
      this.$dialog({
        title: "重置管理员密码",
        YBtnText: "确定",
        NBtnText: "取消",
        showYBtn: true,
        showNBtn: true,
        context: "是否确定该操作？"
      })
        .then(
          data => {
            this.resetAdminPassword(true);
          },
          () => {
            console.log("用户取消操作");
          }
        )
        .catch(err => {
          console.log(err);
        });
    },

    clearSystem() {
      let promise = new Promise((reolve, reject) => {
        let user = JSON.parse(sessionStorage.getItem("accessToken"));

        let params = {
          user: user
        };

        AdminServer.clearSystem(params)
          .then(
            res => {
              if (res.success) {
                reolve({ text: res.message });
              } else {
                reject({ text: res.message });
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

      this.$toast({ mode: "load", text: "进行中..." }, promise);
    },

    initSystem() {
      let promise = new Promise((reolve, reject) => {
        let user = JSON.parse(sessionStorage.getItem("accessToken"));

        let params = {
          user: user
        };

        AdminServer.initSystem(params)
          .then(
            res => {
              if (res.success) {
                reolve({ text: res.message });
              } else {
                reject({ text: res.message });
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

      this.$toast({ mode: "load", text: "进行中..." }, promise);
    },

    resetAdminPassword(type) {
      let promise = new Promise((reolve, reject) => {
        let user = JSON.parse(sessionStorage.getItem("accessToken"));

        let params = {
          user: user
        };

        AdminServer.initAdminPassword(params)
          .then(
            res => {
              if (res.success) {
                reolve({ text: res.message });

                sessionStorage.removeItem("accessToken");

                this.$router.replace("/admin/login");
              } else {
                reject({ text: res.message });
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

      !type || this.$toast({ mode: "load", text: "重置中..." }, promise);
    }
  }
};
</script>
