<style>
.main-box-body {
    width: 100%;
    height: 0;
    flex-grow: 2;
    overflow-y: auto;
    overflow-x: hidden;
}
</style>

<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.main-box-head {
    width: 100%;
}

.main-box-foot {
    width: 100%;
}

.user-info {
    height: 128px;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    background: -webkit-gradient(linear, left top, right bottom, from(#678DF9), to(#8241B7));
    div {
        padding-left: 24px;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: flex-start;
        flex-direction: row;
        h2 {
            color: #FFF;
            margin-left: 24px;
            font-size: 1.6em;
        }
    }
}
</style>
<template>
    <!--这个根元素不能加类，否则下面的mu-drawer有问题，信我，不骗你！-->
    <div>
        <div class="containter flex-box flex-col">
            <mu-appbar class="main-box-head" :title="mainTitle" titleClass="center-text">
                <mu-icon-button icon="menu" slot="left" @click="toggle(true)" />
                <mu-icon-menu icon="expand_more" slot="right">
                    <mu-menu-item title="刷新" @click="refresh" />
                    <mu-menu-item title="说明" @click="readme" />
                </mu-icon-menu>
            </mu-appbar>
            <div class="main-box-body">
                <keep-alive>
                    <component :is="currentView"></component>
                </keep-alive>
            </div>
            <mu-paper class="main-box-foot">
                <mu-bottom-nav :value="bottomNav" shift @change="handleChange">
                    <mu-bottom-nav-item value="home" title="主页" icon="home" />
                    <mu-bottom-nav-item value="work" title="任务" icon="palette" />
                    <mu-bottom-nav-item value="file" title="文件" icon="storage" />
                    <mu-bottom-nav-item value="setting" title="配置" icon="settings" />
                </mu-bottom-nav>
            </mu-paper>
        </div>
        <mu-drawer :open="open" :docked="docked" @close="toggle()">
            <div class="user-info">
                <div>
                    <mu-icon value="account_circle" color="#FFF" :size="64" />
                    <h2>管理员</h2>
                </div>
            </div>
            <mu-list>
                <mu-list-item title="分享二维码" @click="shareQrcode">
                    <mu-icon slot="left" value="tap_and_play" />
                </mu-list-item>
                <mu-list-item title="问题反馈" @click="facebackToMe">
                    <mu-icon slot="left" value="mail_outline" />
                </mu-list-item>
                <mu-list-item title="使用说明" @click="howToUseIt">
                    <mu-icon slot="left" value="help_outline" />
                </mu-list-item>
            </mu-list>
            <mu-divider />
            <mu-list>
                <mu-list-item title="退出登陆" @click="loginOut">
                    <mu-icon slot="left" value="power_settings_new" />
                </mu-list-item>
                <mu-list-item title="退出程序" @click="exitApp">
                    <mu-icon slot="left" value="exit_to_app" />
                </mu-list-item>
            </mu-list>
        </mu-drawer>
    </div>
</template>
<script>
import * as AdminServer from '../../server/admin'
import * as Util from "../../util"

import Event from '../../main'

import home from './home'
import work from './work'
import file from './files'
import setting from './setting'

export default {
    data() {
        return {
            username: '',
            password: '',

            mainTitle: '管理面板',
            bottomNav: 'home',
            open: false,
            docked: true,
            currentView: home
        }
    },

    beforeRouteEnter(to, from, next) {

        next(vm => {

            let current = vm.$store.state.com.current;

            vm.handleChange(current);

        });
    },

    components: {
        home,
        work,
        file,
        setting
    },

    methods: {

        goBack() {
            this.$router.go(-1);
        },

        login() {
            this.$router.push('/');
        },
        // 导航事件
        handleChange(val) {

            this.bottomNav = val;

            this.$store.commit('SET_MIAN_PAGE', val);

            switch (val) {
                case 'home':
                    this.currentView = home;
                    this.mainTitle = '管理面板';
                    break;
                case 'work':
                    this.currentView = work;
                    this.mainTitle = '进行中';
                    break;
                case 'file':
                    this.currentView = file;
                    this.mainTitle = '文件管理';
                    break;
                case 'setting':
                    this.currentView = setting;
                    this.mainTitle = '系统设置';
                    break;
                default:
                    this.currentView = home;
                    this.mainTitle = '管理面板';
                    break;
            }
        },
        // 抽屉显示隐藏
        toggle(flag) {
            this.open = !this.open
            this.docked = !flag
        },
        //////////////////////////////////////////////////////////////////////////////////////////
        // 菜单事件
        // 1.分享二维码
        shareQrcode() {
            this.$router.push({ name: 'share', params: { page: 'role' } });
        },
        // 2.问题反馈
        facebackToMe() {
            this.$router.push('/connect');
        },
        // 3.使用说明
        howToUseIt() {
            this.$router.push('/note');
        },
        // 4.退出登陆
        loginOut() {

            sessionStorage.removeItem('accessToken');

            this.$router.replace('/admin/login');
        },
        // 4.退出程序
        exitApp() {

            // 退出微信内置浏览器
            if (WeixinJSBridge) {
                WeixinJSBridge.call('closeWindow');
            }

        },
        // 
        //////////////////////////////////////////////////////////////////////////////////////////

        refresh() {
            switch (this.bottomNav) {
                case 'home':
                    Event.$emit('refreshData', { page: 'home' });
                    break;

                case 'work':
                    Event.$emit('refreshData', { page: 'work' });
                    break;

                case 'file':
                    Event.$emit('refreshData', { page: 'file' });
                    break;

                case 'setting':
                    Event.$emit('refreshData', { page: 'setting' });
                    break;
                default:
                    break;
            }
        },

        readme() {
            switch (this.bottomNav) {
                case 'home':
                    Event.$emit('readme', { page: 'home' });
                    break;

                case 'work':
                    Event.$emit('readme', { page: 'work' });
                    break;

                case 'file':
                    Event.$emit('readme', { page: 'file' });
                    break;

                case 'setting':
                    Event.$emit('readme', { page: 'setting' });
                    break;
                default:
                    break;
            }
        }


    }
}
</script>
