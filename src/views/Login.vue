<template>
    <div class="login">
        <div class="login-wrap">
            <h1>登录</h1>
            <el-form
                class="login-form"
                :model="loginForm"
                :rules="rules"
                ref="loginFormRef"
                label-width="100px"
            >
                <el-form-item label="用户名" prop="username" required>
                    <el-input v-model="loginForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password" required>
                    <el-input type="password" v-model="loginForm.password">
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="login">登录</el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import httpService from '@/common/request';

@Component
export default class Home extends Vue {
    public loginForm = {
        username: "",
        password: ""
    };

    public rules = {
        username: [
            { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
    };

    public login() {
        (this.$refs.loginFormRef as any).validate((valid: boolean) => {
            if (valid) {
                httpService.login({
                    name: this.loginForm.username,
                    password: this.loginForm.password
                }).then((res: any) => {
                    if (res.data == 9998) {
                        this.$message.error("用户未激活！");
                    } else if (res.data == 9999) {
                        this.$message.error("用户名或密码错误！");
                    } else {
                        this.$message.success("登录成功");
                        this.$router.push("/home");
                    }
                })
                .catch((err: any) => {
                    this.$message.error("登录失败！");
                });
            } else {
                return false;
            }
        });
    }
}
</script>

<style lang="sass" scoped></style>
