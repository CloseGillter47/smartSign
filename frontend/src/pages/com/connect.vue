<style lang="scss" >
@import '../../assets/css/function';
.main-box-body {
    width: 100%;
    height: 0;
    flex-grow: 2;
    overflow-y: auto;
    overflow-x: hidden;
}

.c-text-padding {
    padding: px2rem(64px);
}

.btn {
    margin-top: px2rem(64px);
}
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="联系我们" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <mu-icon-button icon="lightbulb_outline" slot="right" />
        </mu-appbar>
        <div class="main-box-body c-text-padding">
            <mu-text-field hintText="问题描述" multiLine :rows="10" :rowsMax="20" icon="adb" fullWidth />
            <mu-text-field hintText="您的联系方式" type="text" icon="email" fullWidth/>
            <mu-raised-button label="反馈给我" class="btn" primary fullWidth @click="connect" />
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

    methods: {
        goBack() {
            this.$router.go(-1);
        },

        connect() {

        }
    }
}
</script>
