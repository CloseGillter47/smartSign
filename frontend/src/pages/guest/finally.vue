<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.logo-box {
    padding-top: px2rem(96px);
}

.btn-boxs {
    width: 100%;
    padding: px2rem(42px) px2rem(42px) px2rem(256px) px2rem(42px);
}

.title {
    margin: 0;
    font-size: 16px;
    margin-top: px2rem(36px);
}

.wc-s-btn {
    font-size: 16px;
    height: px2rem(96px);
    margin-top: px2rem(16px);
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="签到完成" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="start" />
            <mu-icon-button icon="lightbulb_outline" slot="right" />
        </mu-appbar>

        <div class="main-box-body flex-box flex-col flex-betwn">
            <div class="logo-box flex-box flex-col">
                <mu-icon value="done" :size="128" />
                <h1 class="title">感谢您的配合</h1>

            </div>
            <div class="btn-boxs">
                <mu-raised-button label="新签到" class="wc-s-btn" backgroundColor="#4caf50" primary fullWidth @click="start" />

                <mu-raised-button label="结束程序" class="wc-s-btn" backgroundColor="#e57373" primary fullWidth @click="finash" />
            </div>
        </div>
    </div>
</template>
<script>

export default {
    data() {
        return {
            classId: ''
        }
    },

    mounted() {
        if (this.$route.params.id) {

            this.classId = this.$route.params.id;

        } else {

            this.$router.push({ name: 'NotFount' });
        }

    },

    methods: {
        start() {
            this.$store.commit('SET_USER_INFO', new Object());

            this.$router.replace(`/guest/${this.classId}/index`);
        },
        finash() {

            // 退出微信内置浏览器
            if (WeixinJSBridge) {
                WeixinJSBridge.call('closeWindow');
            }
        }

    }
}
</script>
