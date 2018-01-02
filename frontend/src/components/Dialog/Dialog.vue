<style lang="scss" >
@import '../../assets/css/function';
.title-class {
    padding: px2rem(32px);
}

.body-class {
    padding: 0;
}

.no-border {
    border: none !important;
}
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.wc-dialog-body {
    padding: px2rem(32px);
    padding-top: 0;
    color: #7e848c;
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-dialog :open="show" @close="cancel" :title="title" scrollable dialogClass="dialog-box" :titleClass="'title-class'+ (currentView!=='default'?'':' no-border')" bodyClass="body-class" :actionsContainerClass="'body-class'+ (currentView!=='default'?'':' no-border')">
            <component :is="currentView">{{context}}</component>
            <mu-flat-button v-if="showYBtn" primary :label="YBtnText" @click="success" slot="actions" />
            <mu-flat-button v-if="showNBtn" primary :label="NBtnText" @click="cancel" slot="actions" />
        </mu-dialog>
    </div>
</template>
<script>
import * as AdminServer from '../../server/admin'
import * as Util from "../../util"

import Event from '../../main'

let RESULT = undefined;

export default {
    data() {
        return {
            show: true,
            title: '对话框',
            YBtnText: '确定',
            NBtnText: '取消',
            showYBtn: true,
            showNBtn: true,
            context: '对话框内容',
            currentView: 'default',
            input: {},
            output: {}
        }
    },

    components: {
        'default': { template: `<div class="wc-dialog-body"><slot></slot></div>` }
    },

    methods: {
        success() {
            Event.$emit('dialogClose');

            if (this.currentView === 'default') {

                RESULT = true;
            }
        },
        cancel() {
            Event.$emit('dialogClose');

            if (this.currentView === 'default') {

                RESULT = true;
            }
        },
        getResult() {
            return RESULT;
        },
        setParams(config) {
            this.input = config;
        }
    },

    created() {
        Event.$on('DialogO', data => {
            if (data) RESULT = data;
        });
    },
    updated() {
        Event.$emit('DialogI', this.input);
    }
}
</script>
