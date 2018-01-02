<style lang="scss" scoped>
.logo-box {
    padding: 20px;
}
</style>

<template>
    <div class="containter flex-box flex-col">
        <div class="logo-box">
            <mu-icon value="games" :size="64" />
        </div>

        <mu-raised-button label="Primary" class="demo-raised-button" primary/>

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
        }
    }
}
</script>
