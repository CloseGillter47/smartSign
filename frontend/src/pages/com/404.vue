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
    font-size: 28px;
    color: #ccc;
}

h2 {
    font-size: 16px;
    line-height: 2.0;
}

.wc-s-btn {
    font-size: 16px;
    height: px2rem(96px);
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="找不到页面" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <mu-icon-button icon="lightbulb_outline" slot="right" />
        </mu-appbar>
        <div class="main-box-body flex-box flex-col flex-betwn">
            <div class="logo-box flex-box flex-col">
                <mu-icon value="mood_bad" :size="128" color="#ccc" />
                <h1 class="title">404</h1>
                <h2>{{url}}页面不存在？！</h2>
                <h2>大惊失色</h2>
                <h2>请联系工作人员</h2>
            </div>
            <div class="btn-boxs">
                <mu-raised-button label="好的" class="wc-s-btn" backgroundColor="#4caf50" primary fullWidth @click="goBack" />
            </div>
        </div>
    </div>
</template>
<script>


export default {
    data() {
        return {
            url: ''
        }
    },
    mounted() {
        if (!this.$route.params.url) {
            this.url = this.$route.params.url;
        }
    },
    components: {

    },

    methods: {
        goBack() {
            this.$router.go(-1);
        }
    }
}
</script>
