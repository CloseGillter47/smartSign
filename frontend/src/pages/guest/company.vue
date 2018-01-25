<style lang="scss" >
@import "../../assets/css/function";
</style>
<style lang="scss" scoped>
@import "../../assets/css/function";
.form-class {
  padding: px2rem(42px);
  padding-right: px2rem(66px);
  h2 {
    padding: px2rem(36px) 0 px2rem(36px) px2rem(12px);
    width: 100%;
    font-weight: 700;
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
        <mu-appbar class="main-box-head" title="填写公司信息" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <mu-icon-button icon="lightbulb_outline" slot="right" />
        </mu-appbar>
        <div class="main-box-body flex-box flex-col flex-betwn form-class">
            <div style="width:100%;">
                <h2>公司性质：</h2>
                <mu-divider class="w-divider" />
                <mu-list>
                    <mu-list-item @click="handleRadio('1')" title="国有">
                        <mu-radio nativeValue="1" v-model="company" slot="right" />
                    </mu-list-item>
                    <mu-list-item @click="handleRadio('2')" title="股份制">
                        <mu-radio nativeValue="2" v-model="company" slot="right" />
                    </mu-list-item>
                    <mu-list-item @click="handleRadio('3')" title="三资企业">
                        <mu-radio nativeValue="3" v-model="company" slot="right" />
                    </mu-list-item>
                    <mu-list-item @click="handleRadio('4')" title="私营">
                        <mu-radio nativeValue="4" v-model="company" slot="right" />
                    </mu-list-item>
                    <mu-list-item @click="handleRadio('5')" title="其他">
                        <mu-radio nativeValue="5" v-model="company" slot="right" />
                    </mu-list-item>
                </mu-list>
            </div>

            <div class="btn-group">
                <mu-raised-button label="下一步" class="next-btn" primary fullWidth backgroundColor="#4caf50" @click="next" />
            </div>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      classId: "",
      user: new Object(),
      company: "1"
    };
  },

  components: {},

  mounted() {
    if (this.$route.params.id) {
      this.classId = this.$route.params.id;
    } else {
      this.$router.push({ name: "NotFount" });
    }

    this.user = this.$store.state.user.user;

    switch (this.user.company) {
      case "国有":
        this.company = "1";
        break;
      case "股份制":
        this.company = "2";
        break;
      case "三资企业":
        this.company = "3";
        break;
      case "私营":
        this.company = "4";
        break;
      case "其他":
        this.company = "5";
        break;

      default:
        this.company = "1";
        break;
    }
  },

  methods: {
    goBack() {
      this.$router.go(-1);
    },

    next() {
      if (this.company) {
        switch (this.company) {
          case "1":
            this.user.company = "国有";
            break;
          case "2":
            this.user.company = "股份制";
            break;
          case "3":
            this.user.company = "三资企业";
            break;
          case "4":
            this.user.company = "私营";
            break;
          case "5":
            this.user.company = "其他";
            break;
        }

        this.$store.commit("SET_USER_INFO", this.user);

        this.$router.push(`/guest/${this.classId}/roboto`);
      } else {
        this.$dialog({
          title: "信息不完整",
          YBtnText: "确定",
          showYBtn: true,
          showNBtn: false,
          context: "请填写完整信息！"
        })
          .then(
            data => {
              console.log("用户取消操作");
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
    handleRadio(val) {
      this.company = val;
    }
  }
};
</script>
