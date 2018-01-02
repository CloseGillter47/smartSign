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
</style>
<template>
    <div class="wbody-box">
        <mu-paper class="work-list-item-box" :zDepth="1" v-for="(lession,idx) in lessiones" :key="idx">
            <div class="work-list-item flex-box flex-betwn item-center">
                <mu-icon-button icon="alarm_on" @click="detail(lession.id)" />
                <div class="work-item-box">
                    <h2>{{lession.name||'未知'}}</h2>
                    <h4>{{lession.startTime||'----/--/-- --:--:--'}}</h4>
                    <div class="flex-box flex-betwn item-center person-status">
                        <mu-icon value="people" :size="16" />
                        <span> ：{{lession.total||0}}</span>
                        <mu-icon value="person_add" :size="16" />
                        <span> ：{{lession.checked||0}}</span>
                        <mu-icon value="person" :size="16" />
                        <span> ：{{lession.signed||0}}</span>
                    </div>
                </div>
                <mu-icon-button :icon="lession.micon||'expand_more'" @click="toggleMoreTool(idx)" />
            </div>
            <div class="work-item-foot" v-show="lession.show||false">
                <mu-divider/>
                <div class="item-foot-btns flex-box layout-center item-center">
                    <mu-icon-button icon="add_circle_outline" @click="addStudent" />
                    <mu-icon-button icon="delete_forever" @click="deleteClass"/>
                    <mu-icon-button icon="file_download" @click="downloadFile"/>
                    <mu-icon-button icon="print" @click="exportData"/>
                    <mu-icon-button icon="share" @click="share(lession.id)" />
                </div>
            </div>
        </mu-paper>
    </div>
</template>
<script>
import * as AdminServer from "../../server/admin";
import * as Util from "../../util";

import Event from "../../main";

export default {
  data() {
    return {
      show: false,
      micon: "expand_more",
      lessiones: []
    };
  },

  created() {
    Event.$on("refreshData", config => {
      if (config.page === "work") this.getList(true);
    });
  },
  mounted() {
    this.getList(false);
  },

  methods: {
    toggleMoreTool(idx) {
      let lession = this.lessiones[idx];

      lession.show = !lession.show;

      lession.micon = lession.show ? "expand_less" : "expand_more";

      this.$set(this.lessiones, idx, lession);
    },
    detail(id) {
      this.$router.push({ name: "LessionDetail", params: { id: id } });
    },

    getList(type) {
      let promise = new Promise((reolve, reject) => {
        let user = JSON.parse(sessionStorage.getItem("accessToken"));

        let params = {
          user: user
        };

        AdminServer.getLessonList(params)
          .then(
            res => {
              if (res.success) {
                this.lessiones = res.data;

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

    addStudent() {
      this.$dialog({
        title: "添加学员",
        YBtnText: "添加",
        NBtnText: "取消",
        showYBtn: true,
        showNBtn: true,
        currentView: resolve => require(["../com/addStudent.vue"], resolve)
      })
        .then(data => {
          console.log(data);
        })
        .catch(err => {
          console.log(err);
        });
    },

    share(id) {
      this.$router.push({
        name: "share",
        params: { page: `guest/${id}/index` }
      });
    },

    deleteClass() {},

    downloadFile() {},

    exportData() {}
  }
};
</script>
