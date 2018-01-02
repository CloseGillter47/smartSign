<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.icon-class {
    margin-top: px2rem(96px);
}

.btn-box-class {
    width: 100%;
    padding-left: px2rem(42px);
    padding-right: px2rem(42px);
    padding-bottom: px2rem(96px);
}

.btn-group {

    padding: px2rem(42px);
}

.btn-class {
    font-size: 16px;
    height: px2rem(96px);
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="开始签到" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <mu-icon-button icon="lightbulb_outline" slot="right" />
        </mu-appbar>
        <div class="main-box-body flex-box flex-col flex-betwn">
            <mu-icon value="verified_user" :size="96" class="icon-class" />
            <div class="btn-group">
                <mu-text-field label="姓名" labelFloat fullWidth required v-model="user.personName" />
                <mu-text-field label="身份证" labelFloat fullWidth required v-model="user.personNoCode" />
            </div>
            <div class="btn-box-class">
                <mu-raised-button label="验证信息" class="btn-class" primary fullWidth backgroundColor="#4caf50" @click="check" />
            </div>
        </div>
    </div>
</template>
<script>

import * as GuestServer from '../../server/guest'

export default {
    data() {
        return {
            classId: '',
            user: new Object()
        }
    },

    mounted() {
        if (this.$route.params.id) {

            this.classId = this.$route.params.id;

            this.user.lessionId = this.classId;

        } else {

            this.$router.push({ name: 'NotFount' });
        }

        this.user = this.$store.state.user.user;
    },

    methods: {
        goBack() {
            this.$router.go(-1);
        },

        check() {

            if (this.user.personName && this.user.personNoCode) {

                this.checkInfo(true);

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

        checkInfo(type) {

            let promise = new Promise((reolve, reject) => {

                let params = {
                    lessionId: this.classId,
                    user: this.user
                };

                GuestServer
                    .checkStudent(params)
                    .then(
                    res => {

                        if (res.success) {

                            reolve({ text: res.message });

                            this.$store.commit('SET_USER_INFO', this.user);

                            this.$router.push(`/guest/${this.classId}/base`);

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

            !type || this.$toast({ mode: 'load', text: '正在验证...' }, promise);
        }
    }
}
</script>
