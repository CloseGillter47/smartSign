<style lang="scss" >
@import "../../assets/css/function";
</style>
<style lang="scss" scoped>
@import "../../assets/css/function";
.form-class {
  width: 100%;
  padding: px2rem(42px);
}

.form-box {
  width: 100%;
}

.robo-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  .r-title {
    padding-left: px2rem(42px);
    padding-right: px2rem(42px);
    flex-grow: 2;
    font-size: 16px;
    p {
      color: #7e848c;
      font-size: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      span {
        flex-grow: 2;
      }
    }
  }
}

.none-list {
  height: 48px;
  color: #7e848c;
  .r-title {
    text-align: center;
    flex-grow: 2;
    font-size: 16px;
  }
}

.btn-group {
  width: 100%;
  padding: px2rem(72px);
  padding-left: px2rem(24px);
  padding-right: 0;
}

.next-btn {
  font-size: 16px;
  height: px2rem(96px);
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="设备信息（选填）" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <mu-icon-button icon="add" slot="right" @click="add" />
        </mu-appbar>
        <div class="main-box-body flex-box flex-col flex-betwn form-class">
            <div class="form-box">
                <mu-list>
                    <mu-sub-header>机器人：</mu-sub-header>
                    <mu-divider class="w-divider" />

                    <mu-list-item disableRipple v-show="!typeA.length">
                        <div class="none-list robo-item">
                            <div class="r-title">请添加</div>
                        </div>
                    </mu-list-item>

                    <mu-list-item v-for="(robo,idx) in typeA" :key="idx">
                        <div class="robo-item">
                            <mu-icon value="developer_board" />
                            <div class="r-title">
                                <h2>{{robo.name}}</h2>
                                <p>
                                    <span>型号：</span>
                                    <span>{{robo.mode}}</span>
                                    <span>控制器：</span>
                                    <span>{{robo.controller}}</span>
                                </p>
                            </div>
                            <mu-icon-button icon="highlight_off" @click="remove('1',idx)" />
                        </div>
                    </mu-list-item>

                </mu-list>

                <mu-divider class="w-divider" />
                <mu-list>
                    <mu-sub-header>智能机器：</mu-sub-header>
                    <mu-divider class="w-divider" />

                    <mu-list-item disableRipple v-show="!typeB.length">
                        <div class="none-list robo-item">
                            <div class="r-title">请添加</div>
                        </div>
                    </mu-list-item>

                    <mu-list-item v-for="(robo,idx) in typeB" :key="idx">
                        <div class="robo-item">
                            <mu-icon value="memory" />
                            <div class="r-title">
                                <h2>{{robo.name}}</h2>
                                <p>
                                    <span>型号：</span>
                                    <span>{{robo.mode}}</span>
                                    <span>数量：</span>
                                    <span>{{robo.number}}</span>
                                </p>
                            </div>
                            <mu-icon-button icon="highlight_off" @click="remove('2',idx)" />
                        </div>
                    </mu-list-item>

                </mu-list>
                <mu-divider class="w-divider" />
            </div>
            <div class="btn-group">
                <mu-raised-button label="提交信息" class="next-btn" primary fullWidth backgroundColor="#4caf50" @click="next" />
            </div>
        </div>
    </div>
</template>
<script>
import * as GuestServer from "../../server/guest";

export default {
  data() {
    return {
      typeA: [],
      typeB: [],
      classId: "",
      user: new Object()
    };
  },

  mounted() {
    if (this.$route.params.id) {
      this.classId = this.$route.params.id;
    } else {
      this.$router.push({ name: "NotFount" });
    }

    this.user = this.$store.state.user.user;
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },
    next() {
      this.$dialog({
        title: "提交确认",
        YBtnText: "确定",
        showYBtn: true,
        showNBtn: false,
        context: "确认提交信息吗？"
      })
        .then(
          data => {
            this.submit(true);
          },
          () => {
            console.log("用户取消操作");
          }
        )
        .catch(err => {
          console.log(err);
        });
    },
    add() {
      let vm = this;

      this.$dialog({
        title: "添加机器",
        YBtnText: "添加",
        NBtnText: "取消",
        showYBtn: true,
        showNBtn: true,
        currentView: resolve => require(["../com/addRoboto.vue"], resolve)
      })
        .then(data => {
          if (data) {
            if (data.type === "1") {
              vm.typeA.push(data);
              return;
            }

            if (data.type === "2") {
              vm.typeB.push(data);
              return;
            }
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    remove(type, index) {
      if (type === "1") {
        this.typeA.splice(index, 1);
        return;
      }
      if (type === "2") {
        this.typeB.splice(index, 1);
        return;
      }
    },
    submit(type) {
      let promise = new Promise((reolve, reject) => {
        let params = {
          lessionId: this.classId,
          user: this.user
        };

        GuestServer.submitStudent(params)
          .then(
            res => {
              if (res.success) {
                reolve({ text: res.message });
                this.$store.commit("SET_USER_INFO", this.user);
                this.$router.push(`/guest/${this.classId}/finally`);
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

      !type || this.$toast({ mode: "load", text: "正在提交..." }, promise);
    }
  }
};
</script>
