<style lang="scss" >
@import "../../assets/css/function";
</style>
<style lang="scss" scoped>
@import "../../assets/css/function";
.wbody-box {
  padding: px2rem(12px);
}

.work-list-item-box {
  width: 100%;
  margin-bottom: px2rem(12px);
}

.work-list-item {
  width: 100%;
  height: px2rem(192px);
  padding: px2rem(12px);
}

.work-item-box {
  flex-grow: 2;
  padding-left: px2rem(12px);
  padding-right: px2rem(12px);
  h2 {
    font-size: 20px;
    font-weight: bold;
    width: 100%;
    line-height: 1.4;
  }
  h4 {
    font-size: 12px;
    color: #7e848c;
  }
}

.work-item-foot {
  padding-left: px2rem(24px);
  padding-right: px2rem(24px);
}

.item-foot-btns {
  color: #7e848c;
}

.person-status {
  margin-top: px2rem(32px);
  color: #7e848c;
  font-size: 12px;
  span {
    flex-grow: 1;
  }
}

.work-student-list {
  width: 100%;
  overflow: auto;
  flex-grow: 2;
  padding: px2rem(12px);
}

.wc-table {
  min-width: 100%;
  cellspacing: 0;
  cellpadding: 0;
  white-space: nowrap;
  border-collapse: collapse;
  border-spacing: 0;
  .table-check {
    width: 0;
    height: 0;
    cellspacing: 0;
    cellpadding: 0;
  }
  th > div,
  td > div {
    width: 48px;
    height: 48px;
    overflow: hidden;
    padding: 12px;
  }
  tr:nth-of-type(odd) {
    background-color: #f5f5f5;
  }
  tr:nth-of-type(even) {
    background-color: #fafafa;
  }
  th:not(:first-child),
  tr > td:not(:first-child) {
    padding-left: 12px;
    padding-right: 12px;
  }
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="详情" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <mu-icon-button icon="sync" slot="right" @click="getDetail(true)&&getStudentes(true)" />
        </mu-appbar>
        <div class="main-box-body wbody-box flex-box flex-col">
            <mu-paper class="work-list-item-box" :zDepth="1">
                <div class="work-list-item flex-box flex-betwn item-center">
                    <mu-icon-button icon="timer" @click="start" />
                    <div class="work-item-box">
                        <h2>{{lession.name}}</h2>
                        <h4>{{lession.startTime||'----/--/-- --:--:--'}}</h4>
                        <div class="flex-box flex-betwn item-center person-status">
                            <mu-icon value="people" :size="16" />
                            <span> ：{{lession.total||0}}</span>
                            <mu-icon value="person_add" :size="16" />
                            <span> ：{{lession.signed||0}}</span>
                            <mu-icon value="person" :size="16" />
                            <span> ：{{lession.checked||0}}</span>
                        </div>
                    </div>
                </div>
                <div class="work-item-foot">
                    <mu-divider/>
                    <div class="item-foot-btns flex-box layout-center item-center">
                        <mu-icon-button icon="add_circle_outline" @click="add" />
                        <mu-icon-button icon="remove_circle_outline" @click="del" />
                        <mu-icon-button icon="file_download" />
                        <mu-icon-button icon="print" @click="print" />
                        <mu-icon-button icon="share" @click="share" />
                    </div>
                </div>
            </mu-paper>
            <mu-paper class="work-student-list" :zDepth="1">
                <div>
                    <table class="wc-table">
                        <thead>
                            <th class="table-check">
                                <div>
                                    <mu-checkbox v-model="selectAll" @change="toggleSelectAll()"/>
                                </div>
                            </th>
                            <th>学员编号</th>
                            <th>学员姓名</th>
                            <th>是否提交</th>
                            <th>是否签到</th>
                            <th>联系方式</th>
                            <th>所属公司</th>

                        </thead>
                        <tbody>
                            <tr v-for="(s,i) in lession.students" :key="i">
                                <td class="table-check">
                                    <div>
                                        <mu-checkbox name="student" @change="toggleSelectItem()" :nativeValue="String(s.id)" v-model="list"/>
                                    </div>
                                </td>
                                <td>{{s.id}}</td>
                                <td>{{s.name}}</td>
                                <td>{{s.submited||'否'}}</td>
                                <td>{{s.checked||'否'}}</td>
                                <td>{{s.phone}}</td>
                                <td>{{s.company}}</td>
                            </tr>

                        </tbody>
                    </table>
                </div>
            </mu-paper>
        </div>
    </div>
</template>
<script>
import * as AdminServer from "../../server/admin";
import * as Util from "../../util";

export default {
  data() {
    return {
      selectAll: false,
      list: [],
      lessionId: "",
      lession: {}
    };
  },

  mounted() {
    if (this.$route.params && this.$route.params.id) {
      this.lessionId = this.$route.params.id;

      this.getDetail(false);
      this.getStudentes(false);
    } else {
      this.goBack();
    }
  },

  methods: {
    goBack() {
      this.$router.replace("/admin/home");
    },

    getDetail(type) {
      let promise = new Promise((reolve, reject) => {
        let user = JSON.parse(sessionStorage.getItem("accessToken"));

        let params = {
          user: user,
          lessionId: this.lessionId
        };

        AdminServer.getLesson(params)
          .then(
            res => {
              if (res.success) {
                this.lession = res.data.lession;

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

    addStudent(type, user) {
      let promise = new Promise((reolve, reject) => {
        let admin = JSON.parse(sessionStorage.getItem("accessToken"));

        let params = {
          admin: admin,
          student: user,
          lessionId: this.lessionId
        };

        AdminServer.AddStudents(params)
          .then(
            res => {
              if (res.success) {
                this.$set(this.lession, "students", res.data.students);
                reolve({ text: "添加成功" });
              } else {
                reject({ text: "添加失败" });
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

    getStudentes(type) {
      let promise = new Promise((reolve, reject) => {
        let user = JSON.parse(sessionStorage.getItem("accessToken"));

        let params = {
          user: user,
          lessionId: this.lessionId
        };

        AdminServer.getStudentList(params)
          .then(
            res => {
              if (res.success) {
                this.$set(this.lession, "students", res.data.students);

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

    start() {
      if (this.lession.lessionId && !this.lession.startTime) {
        let date = new Date();

        let time = date.getTime();

        time = new Date(time + 28800000).toJSON().replace(/[A-Za-z]/g, " ");

        this.$set(this.lession, "startTime", time);

        let user = JSON.parse(sessionStorage.getItem("accessToken"));

        let params = {
          user: user,
          lessionId: this.lessionId,
          lession: this.lession
        };

        this.update(params, true);
      }
    },

    update(params, type) {
      let promise = new Promise((reolve, reject) => {
        AdminServer.setLesson(params)
          .then(
            res => {
              if (res.success) {
                this.lessiones = res.data;

                reolve({ text: "开启成功" });
              } else {
                reject({ text: "开启失败" });
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

      if (type) this.$toast({ mode: "load", text: "开启中..." }, promise);
    },

    add() {
      this.$dialog({
        title: "添加学员",
        YBtnText: "添加",
        NBtnText: "取消",
        showYBtn: true,
        showNBtn: true,
        currentView: resolve => require(["../com/addStudent.vue"], resolve)
      })
        .then(data => {
          if (data.name && data.no) {
            this.addStudent(true, { name: data.name, idCard: data.no });
          }
        })
        .catch(err => {
          console.log(err);
        });
    },

    del() {
      let vm = this;
      if (this.list.length) {
        this.$dialog({
          title: "删除学员",
          YBtnText: "删除",
          NBtnText: "取消",
          showYBtn: true,
          showNBtn: true,
          context: "是否删除选中的学员？"
        })
          .then(
            data => {
              console.log(vm.list);
            },
            () => {
              console.log("用户取消操作");
            }
          )
          .catch(err => {
            console.log(err);
          });
      }
    },

    print() {
      this.$dialog({
        title: "注意事项",
        YBtnText: "导出数据",
        NBtnText: "取消导出",
        showYBtn: true,
        showNBtn: true,
        context: "默认导出选中，否则导出全部！"
      })
        .then(
          data => {
            this.exportData();
          },
          () => {
            console.log("用户取消操作");
          }
        )
        .catch(err => {
          console.log(err);
        });
    },

    exportData() {
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

    share() {
      this.$router.push({
        name: "share",
        params: { page: `guest/${this.lessionId}/index` }
      });
    },

    toggleSelectAll() {
      let vm = this;
      if (!this.selectAll) {
        vm.list = [];
        this.lession.students.forEach((v, i) => {
          vm.list.push(v.id);
        });
      } else {
        this.list = [];
      }
    },

    toggleSelectItem() {
      let vm = this;
      vm.$nextTick(() => {
        vm.selectAll = vm.list.length === vm.lession.students.length;
      });
    }
  }
};
</script>
