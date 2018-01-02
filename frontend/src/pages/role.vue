<style lang="scss" scoped>
@import '../assets/css/function';
.logo-box {
    padding-top: px2rem(72px);
}

.btn-box {
    width: 100%;
    padding-bottom: px2rem(126px);
    .wc-btn {
        font-size: 16px;
        height: px2rem(96px);
        &:first-child {
            margin-bottom: px2rem(42px);
        }
    }
}
</style>

<template>
    <div class="containter flex-box flex-col flex-betwn app-padding">

        <mu-icon value="group" :size="128" class="logo-box" />

        <div class="flex-box flex-col btn-box">
            <mu-raised-button label="管理员登陆" class="wc-btn" secondary fullWidth @click="admin()" />

            <mu-raised-button label="学员签到" class="wc-btn" primary fullWidth @click="guest()" />
        </div>
    </div>
</template>
<script>
import * as AdminServer from '../server/admin'
import * as Util from "../util"
export default {

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

        admin() {
            this.$router.push({ name: 'adminLogin', params: { nav: true } });
        },

        guest() {
            this.$router.push({ name: 'GuestLogo', params: { nav: true } });
        }
    }
}
</script>
