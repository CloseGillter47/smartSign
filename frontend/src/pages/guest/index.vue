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
}

.wc-s-btn {
    font-size: 16px;
    height: px2rem(96px);
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="欢迎使用" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" v-if="showNav" />
            <mu-icon-button icon="lightbulb_outline" slot="right" v-if="showNav" />
        </mu-appbar>
        <div class="main-box-body flex-box flex-col flex-betwn">
            <div class="logo-box flex-box flex-col">
                <mu-icon value="tv" :size="128" />
                <h1 class="title">自动签到系统</h1>

            </div>
            <div class="btn-boxs">
                <mu-raised-button label="开始" class="wc-s-btn" backgroundColor="#4caf50" primary fullWidth @click="start" />
            </div>
        </div>
    </div>
</template>
<script>
import * as AdminServer from '../../server/admin'
import * as Util from "../../util"


export default {
    data() {
        return {
            showNav: true,
            classId: '',
        }
    },

    mounted() {
        if (this.$route.params.id) {

            this.classId = this.$route.params.id;

        } else {

            this.$router.push({ name: 'NotFount' });
        }

        if (!this.$route.params.nav) {
            this.showNav = false;
        }
    },

    components: {

    },

    methods: {
        goBack() {
            this.$router.go(-1);
        },
        
        start() {
            this.$router.push(`/guest/${this.classId}/check`);
        }
    }
}
</script>
