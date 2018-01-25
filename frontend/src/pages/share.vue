<style lang="scss" scoped>
@import "../assets/css/function";
.main-box-body {
  width: 100%;
  height: 0;
  flex-grow: 2;
  overflow-y: auto;
  overflow-x: hidden;
}

.qrcode-box {
  width: 100%;
}

.qrcode-title {
  font-size: 18px;
  line-height: 4;
}

.qrcode {
  width: px2rem(320px);
  height: px2rem(320px);
}

.tips-box {
  color: #7e848c;
  padding: px2rem(32px);
  span {
    color: #ff5252;
  }
  h5 {
    font-size: 16px;
  }
  p {
    line-height: 1.6;
  }
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar :title="title" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <mu-icon-button icon="sync" slot="right" @click="getAddress" />
        </mu-appbar>
        <div class="main-box-body">
            <h2 class="center-text qrcode-title">扫码使用</h2>
            <div class="qrcode-box flex-box layout-center">
                <qrcode :value="value" class="qrcode" :fg-color="fgColor" @click.native="goLink"></qrcode>
            </div>
            <div class="tips-box">
                <h5>温馨提示：</h5>
                <p>1、请在
                    <span>WIFI</span>环境下使用；</p>

                <p>2、请使用手机
                    <span>浏览器</span>扫描该二维码，推荐使用
                    <span>微信</span>扫码；</p>
                <p>3、首次加载需要点时间，期间页面可能空白，请耐心等待；</p>
            </div>
        </div>
    </div>
</template>

<script>
import Qrcode from "../components/Qrcode";
import * as AdminServer from "../server/admin";

export default {
  data() {
    return {
      title: "分享二维码",
      value: "http://10.10.10.31:4200",
      fgColor: "#000000"
    };
  },
  mounted() {
    if (this.$route.params.page) {
      // this.getAddress(false);
      this.value = `http://localhost:4200` + "/#/" + this.$route.params.page;
    } else {
      this.$router.go(-1);
    }
  },
  components: {
    Qrcode
  },
  methods: {
    goBack() {
      this.$router.go(-1);
    },
    goLink() {
      window.open(this.value);
    },

    getAddress(type) {
      let promise = new Promise((reolve, reject) => {
        let user = JSON.parse(sessionStorage.getItem("accessToken"));

        let params = {
          user: user
        };

        AdminServer.getAdminQrCode(params)
          .then(
            res => {
              if (res.success) {
                // this.value = 'http://' + res.data.ip;

                this.value = "http://192.168.31.231:4200";

                this.value = this.value + "/#/" + this.$route.params.page;

                console.log(this.value);

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

      !type || this.$toast({ mode: "load", text: "请稍等..." }, promise);
    }
  }
};
</script>

