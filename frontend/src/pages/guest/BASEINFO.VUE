<style lang="scss" >
@import '../../assets/css/function';
</style>
<style lang="scss" scoped>
@import '../../assets/css/function';
.form-class {
    padding: px2rem(42px);
    padding-right: px2rem(66px);
    h2 {

        padding: px2rem(36px) 0 px2rem(36px) px2rem(12px);
        width: 100%;
        font-weight: 700;
    }
}

.btn-group {
    width: 100%;
    padding: px2rem(72px);
    padding-left: px2rem(24px);
    padding-right: 0;
}

.next-btn {
    font-size: 16px;
    height: px2rem(96px);
}
</style>
<template>
    <div class="containter flex-box flex-col">
        <mu-appbar class="main-box-head" title="填写基础信息" titleClass="center-text">
            <mu-icon-button icon="arrow_back" slot="left" @click="goBack" />
            <mu-icon-button icon="lightbulb_outline" slot="right" />
        </mu-appbar>
        <div class="main-box-body flex-box flex-col flex-betwn form-class">
            <h2>基本信息</h2>
            <mu-divider class="w-divider" />
            <mu-text-field hintText="姓名" type="text" v-model="user.personName" fullWidth icon="portrait" disabled />

            <mu-text-field hintText="拼音" type="text" v-model="user.pinyin" fullWidth icon="text_format" />

            <mu-text-field hintText="身份证号码" type="text" v-model="user.personNoCode" fullWidth icon="lock_outline" disabled />
            <h2>职务相关</h2>
            <mu-divider class="w-divider" />
            <mu-text-field hintText="单位" type="text" v-model="user.unit" fullWidth icon="business" />

            <mu-text-field hintText="部门" type="text" v-model="user.dept" fullWidth icon="supervisor_account" />

            <mu-text-field hintText="职务" type="text" v-model="user.job" fullWidth icon="work" />
            <h2>联系方式</h2>
            <mu-divider class="w-divider" />
            <mu-text-field hintText="通信地址" type="text" v-model="user.addr" fullWidth icon="store" />

            <mu-text-field hintText="联系电话" type="text" v-model="user.phone" fullWidth icon="call" />

            <mu-text-field hintText="E-mail" type="text" v-model="user.email" fullWidth icon="email" />

            <mu-text-field hintText="邮编" type="text" v-model="user.code" fullWidth icon="hdr_strong" />
            <div class="btn-group">
                <mu-raised-button label="下一步" class="next-btn" primary fullWidth backgroundColor="#4caf50" @click="next" />
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
            classId: '',
            user: new Object()
        }
    },

    mounted() {
        if (this.$route.params.id) {

            this.classId = this.$route.params.id;

        } else {

            this.$router.push({ name: 'NotFount' });
        }

        this.user = this.$store.state.user.user;

    },

    methods: {

        goBack() {
            this.$router.go(-1);
        },

        next() {
            if (this.user.unit && this.user.dept && this.user.job && this.user.phone && this.user.email && this.user.pinyin) {

                this.$store.commit('SET_USER_INFO', this.user);

                this.$router.push(`/guest/${this.classId}/company`);

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
        }
    }
}
</script>
