<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="使用说明" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <div slot="right" style="width:48px;"></div>
        </mu-appbar>
        <div class="main-box-body">
            随便点点？
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
            this.$router.go(-1);
        }
    }
}
</script>
