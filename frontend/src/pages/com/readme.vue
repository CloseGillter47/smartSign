<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.text-box {
    padding: px2rem(24px);
    min-height: 164px;
    font-size: 14px;
    line-height: 2.0;
    ul {
        list-style: none;
        li {
            font-size: 12px !important;
        }
    }
}
</style>
<template>
    <div class="main-box-body text-box">
        <div>
            <div v-html="content"></div>
        </div>
    </div>
</template>
<script>
import Event from '../../main'

export default {
    data() {
        return {
            content: '<li>文本</li>'
        }
    },

    components: {

    },

    methods: {

    },

    mounted() {

        let vm = this;

        Event.$on('DialogI', data => {

            Event.$off('DialogI');

            // console.log(data);

            this.content = data;

        });

        Event.$on('dialogClose', () => {

            Event.$emit('DialogO', {});
        });
    }
}
</script>
