<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.add-box {
    padding-left: px2rem(56px);
    padding-right: px2rem(56px);
    padding-bottom: px2rem(56px);
}
</style>
<template>
    <div class="add-box">
        <mu-text-field label="学员编号" labelFloat fullWidth v-model="studentNo" />
        <mu-text-field label="学员姓名" labelFloat fullWidth v-model="studentNa" />
    </div>
</template>
<script>

import Event from '../../main'

export default {
    data() {
        return {
            studentNo: '',
            studentNa: ''
        }
    },


    mounted() {
        let vm = this;

        Event.$on('DialogI', data => {
            
        });

        Event.$on('dialogClose', () => {

            let name = vm.studentNa;

            let no = vm.studentNo;

            Event.$emit('DialogO', { name: name, no: no });
        });
    },

    methods: {

    }
}
</script>
