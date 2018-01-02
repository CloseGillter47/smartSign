<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.add-box {
    width: 100%;
    padding: px2rem(24px);
}

.list-box {
    width: 100%;
}

.input-box {
    padding-left: px2rem(42px);
    padding-right: px2rem(42px);
}
</style>
<template>
    <div class="add-box">
        <mu-dropDown-menu :value="type" @change="select" class="list-box">
            <mu-menu-item value="0" title="请选择" />
            <mu-menu-item value="1" title="机器人" />
            <mu-menu-item value="2" title="智能机器" />
        </mu-dropDown-menu>
        <div class="input-box">
            <mu-text-field label="名称" labelFloat fullWidth v-model="name" />
            <mu-text-field label="型号" labelFloat fullWidth v-model="mode" />
            <mu-text-field label="控制器" labelFloat fullWidth v-model="controller" v-show="type==='1'" />
            <mu-text-field label="数量" labelFloat fullWidth v-model="number" v-show="type==='2'" />
        </div>
    </div>
</template>
<script>
import Event from '../../main'

export default {
    data() {
        return {
            type: '0',
            name: '',
            mode: '',
            controller: '',
            number: ''
        }
    },

    mounted() {
        let vm = this;

        Event.$on('dialogClose', () => {

            if (!vm.type || !vm.name || !vm.mode) {

                Event.$emit('DialogO', undefined);

            } else {
                Event.$emit('DialogO', {
                    type: vm.type,
                    name: vm.name,
                    mode: vm.mode,
                    controller: vm.controller,
                    number: vm.number
                });
            }
        });
    },

    methods: {
        select(value) {
            this.type = value;
        }
    }
}
</script>
