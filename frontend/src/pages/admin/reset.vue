<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.btn-box {
    padding: px2rem(96px) px2rem(64px) px2rem(64px) px2rem(64px);
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="初始化系统" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <mu-icon-button icon="lightbulb_outline" slot="right" />
        </mu-appbar>
        <div class="main-box-body">
            <div class="btn-box">
                <mu-raised-button label="确认修改" class="btn" backgroundColor="#4caf50" fullWidth @click="update" />
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

        }
    },

    components: {

    },

    methods: {
        goBack() {
            this.$router.replace('/admin/home');
        }
    }
}
</script>
