<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.input-box {
    padding: px2rem(24px) px2rem(64px) px2rem(24px) px2rem(24px);
}

.tips-box {
    color: #7e848c;
    padding-left: px2rem(64px);
    h5 {
        font-size: 13px;
    }
}

.btn-box {
    padding: px2rem(96px) px2rem(64px) px2rem(64px) px2rem(64px);
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="修改管理员密码" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <div slot="right" style="width:48px;"></div>
        </mu-appbar>
        <div class="main-box-body">
            <div class="input-box">
                <mu-text-field label="旧密码" hintText="请输入旧密码" type="password" labelFloat fullWidth icon="security" v-model="oldPassword" />
                <mu-text-field label="新密码" hintText="请输入新密码" type="password" labelFloat fullWidth icon="lock_open" v-model="newPassword1" />
                <mu-text-field label="新密码" hintText="请确认新密码" type="password" labelFloat fullWidth icon="lightbulb_outline" v-model="newPassword2" />
            </div>
            <div class="tips-box">
                <h5>温馨提示：</h5>
                <p>1、该密码是管理员登陆、管理使用；</p>
                <p>2、修改后若是忘了该密码，请在主界面重置；</p>
                <p>3、重置该密码后，相关数据也会被重置！</p>
            </div>
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
            oldPassword: '',
            newPassword1: '',
            newPassword2: ''
        }
    },

    components: {

    },

    methods: {
        goBack() {
            this.$router.replace('/admin/home');
        },
        update() {

            if (this.oldPassword && this.newPassword1 && this.newPassword2) {

                this.updateInfo(true);

            } else {

                this.$dialog({
                    title: '信息不完整',
                    YBtnText: '确定',
                    showYBtn: true,
                    showNBtn: false,
                    context: '请填写完整信息！'
                })
                    .then(
                    data => {
                        console.log('用户取消操作');
                    },
                    () => {
                        console.log('用户取消操作');
                    })
                    .catch(err => {
                        console.log(err);
                    });
            }

        },

        updateInfo(type) {

            let promise = new Promise((reolve, reject) => {

                let user = JSON.parse(sessionStorage.getItem('accessToken'));

                user.password = Util.crypto(this.oldPassword);

                let params = {
                    admin: user,
                    user: { username: user.username, password: Util.crypto(this.newPassword1) }
                };

                AdminServer
                    .updateAdmin(params)
                    .then(
                    res => {

                        if (res.success) {

                            reolve({ text: res.message });

                            sessionStorage.removeItem('accessToken');

                            this.$router.replace('/admin/login');

                        } else {

                            reject({ text: res.message });
                        }
                    },
                    err => {
                        reject({ text: '服务器错误' });
                    })
                    .catch(err => {
                        reject({ text: '程序错误' });
                    });
            });

            !type || this.$toast({ mode: 'load', text: '重置中...' }, promise);
        }
    }
}
</script>
