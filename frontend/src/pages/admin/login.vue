
<style lang="scss" scoped>
@import '../../assets/css/function';
.containter {
    padding: 0;
}

.btn-box {
    padding-bottom: px2rem(126px);
    .btn-group {
        padding-bottom: px2rem(72px);
    }
    .wc-btn {
        font-size: 16px;
        height: px2rem(96px);
    }
}
</style>

<template>
    <div class="containter flex-box flex-col flex-betwn">
        <mu-appbar title="管理员登陆" v-if="true">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <mu-icon-menu icon="expand_more" slot="right">
                <mu-menu-item title="清理缓存" @click="clear" />
                <mu-menu-item title="操作说明" @click="readme" />
                <mu-menu-item title="联系我们" @click="callme" />
            </mu-icon-menu>
        </mu-appbar>
        <div class="con-box-body flex-box flex-col flex-betwn app-padding">
            <mu-icon value="timelapse" :size="128" color="#ff5252" />
            <div class="flex-box flex-col btn-box">
                <div class="btn-group">
                    <mu-text-field label="管理员账号" labelFloat fullWidth v-model="username" />
                    <mu-text-field label="登陆密码" labelFloat fullWidth v-model="password" type="password" />
                </div>
                <mu-raised-button label="登陆" class="wc-btn" backgroundColor="#4caf50" primary fullWidth @click="login" />
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
            username: '',
            password: ''
        }
    },

    methods: {
        test() {
            let params = {
                user: {
                    username: "root",
                    password: Util.crypto('root@123')
                }
            };
            AdminServer
                .login(params)
                .then(res => {
                    console.log(res);
                })
                .catch(err => {
                    console.log(err);
                });
        },

        goBack() {
            this.$router.go(-1);
        },

        login() {

            if (!this.username || !this.password) return;

            let promise = new Promise((reolve, reject) => {

                let params = {
                    user: {
                        username: this.username,
                        password: Util.crypto(this.password)
                    }
                };

                AdminServer
                    .login(params)
                    .then(
                    res => {

                        if (res.success) {

                            reolve({ text: '登陆成功' });

                            sessionStorage.setItem('accessToken', JSON.stringify(res.data.user));

                            this.$router.replace('/admin/home');

                        } else {

                            reolve({ text: '登陆失败' });
                        }
                    },
                    err => {

                        reject({ text: '服务器错误' });
                    })
                    .catch(err => {

                        reject({ text: '程序错误' });
                    });
            });

            this.$toast({ mode: 'load', text: '正在登陆 ...' }, promise);

        },

        clear() {

            let promise = new Promise((reolve, reject) => {
                setTimeout(() => {
                    reolve({ text: '清理完成' });
                }, 1200);
            });

            this.$toast({ mode: 'load', text: '开始清理缓存...' }, promise);
        },

        readme() {

        },

        callme() {

        }
    }
}
</script>
