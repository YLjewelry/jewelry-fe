<template>
    <div class="user-info">
        <el-form :model="userInfo">
            <el-form-item label="设计师照片: " :label-width="formLabelWidth">
                <el-upload
                class="upload-demo"
                drag
                action="https://jsonplaceholder.typicode.com/posts/"
                multiple>
                    <i class="el-icon-upload"></i>
                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                </el-upload>
            </el-form-item>
            <el-form-item label="设计师介绍: " :label-width="formLabelWidth">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="userInfo.intro">
                </el-input>
            </el-form-item>
            <el-form-item label="获奖参展经历: " :label-width="formLabelWidth">
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="userInfo.exper">
                </el-input>
            </el-form-item>
            <el-form-item
                label="设计师介绍(英文): "
                :label-width="formLabelWidth"
            >
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="userInfo.intro_eng">
                </el-input>
            </el-form-item>
            <el-form-item
                label="获奖参展经历(英文): "
                :label-width="formLabelWidth"
            >
                <el-input
                    type="textarea"
                    :autosize="{ minRows: 2, maxRows: 4}"
                    placeholder="请输入内容"
                    v-model="userInfo.exper_eng">
                </el-input>
            </el-form-item>
        </el-form>
        <el-button type="primary" @click="editInfo">确认修改</el-button>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import httpService from "@/common/request";

interface IUserInfo {
    img: string;
    intro: string;
    intro_eng: string;
    exper: string;
    exper_eng: string;
}

@Component
export default class UserMain extends Vue {
    public userInfo: IUserInfo = {
        img: "",
        intro: "",
        intro_eng: "",
        exper: "",
        exper_eng: ""
    };
    public formLabelWidth = '150px'

    public async getUserInfo() {
        const { data } = await httpService.getInfo();
        this.userInfo = data;
    }

    public async editInfo(){
        const params = {};
        try{
            // await httpService.setInfo(params);
            this.$message.success('修改成功')
        }catch{
            this.$message.error('修改失败')
        }
    }


    public created(){
        this.getUserInfo();
    }
}
</script>

<style lang="scss"></style>
