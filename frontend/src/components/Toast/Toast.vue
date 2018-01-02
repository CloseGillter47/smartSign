<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.toast-box {

    border-radius: px2rem(12px);
    min-width: px2rem(520px);
    background: rgba(3, 3, 3, .5);
    padding: px2rem(24px);
    .icon-box {
        padding: px2rem(42px);
    }
    p {
        padding: px2rem(12px);
        color: #FFF;
    }
}
</style>
<template>
    <div class="containter flex-box flex-col layout-center" v-show="show">
        <div class="flex-box flex-col toast-box layout-center">
            <div class="icon-box">
                <mu-circular-progress :size="72" :strokeWidth="6" color="#FFF" v-if="loadingMode" />
                <mu-icon :value="icon" :size="72" color="#FFF" v-else/>
            </div>
            <p v-show="content">{{content}}</p>
        </div>
    </div>
</template>
<script>


export default {
    data() {
        return {
            show: true,
            loadingMode: true,
            icon: 'check',
            defaultIcons: { check: 'check', help: 'help_outline', error: 'highlight_off', info: 'info_outline', warn: 'block' },
            content: ''
        }
    },

    methods: {
        getIcon(type) {
            return this.defaultIcons[type] ? this.defaultIcons[type] : this.defaultIcons['check'];
        }
    }
}
</script>
