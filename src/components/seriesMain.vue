<template>
    <div class="series-wrap">
        <div class="series-bar">
            <el-button type="primary" @click="newSeries">添加系列</el-button>
            <el-button v-if="!isSorting" @click="startSort">排序</el-button>
            <el-button v-if="isSorting" @click="endSort">确认排序</el-button>
        </div>
        <div class="series-table">
            <el-table :data="series" style="width: 100%">
                <el-table-column prop="index" label="序号" width="100">
                    <template slot-scope="scope">
                        <span v-if="!isSorting">{{scope.row.index}}</span>
                        <el-input v-if="isSorting" v-model="scope.row.index"></el-input>
                    </template>
                </el-table-column>
                <el-table-column prop="seriesname" label="名称" width="180">
                </el-table-column>
                <el-table-column label="图片" min-width="300">
                    <template slot-scope="scope">
                        <el-image
                            style="width: 300px; height: 200px"
                            :src="scope.row.imgUrl"
                            fit="contain"
                            :preview-src-list="[scope.row.imgUrl]"
                        >
                        </el-image>
                    </template>
                </el-table-column>
                <el-table-column
                    prop="seriesname"
                    fixed="right"
                    width="180"
                    label="操作"
                >
                    <template slot-scope="scope">
                        <el-button
                            type="text"
                            size="small"
                            @click="viewDetail(scope.row)"
                            >详情</el-button
                        >
                        <el-button
                            type="text"
                            size="small"
                            @click="showEditDialog(scope.row)"
                            >编辑</el-button
                        >
                        <el-button
                            type="text"
                            size="small"
                            @click="confirmDel(scope.row)"
                            >删除</el-button
                        >
                    </template>
                </el-table-column>
            </el-table>
        </div>
        <el-dialog title="系列详情" class="detail-dialog" :visible.sync="detailVisible">
            <el-form :model="seriesDetail">
                <el-form-item label="名称: " :label-width="formLabelWidth">
                    <span>{{seriesDetail.seriesname}}</span>
                </el-form-item>
                <el-form-item label="简介: " :label-width="formLabelWidth">
                    <span>{{seriesDetail.seriesintro}}</span>
                </el-form-item>
                <el-form-item label="名称(英文): " :label-width="formLabelWidth">
                    <span>{{seriesDetail.seriesname_eng}}</span>
                </el-form-item>
                <el-form-item label="简介(英文): " :label-width="formLabelWidth">
                    <span>{{seriesDetail.seriesintro_eng}}</span>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button type="primary" @click="detailVisible = false"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog title="编辑系列" :visible.sync="editVisible">
            <el-form :model="seriesDetail">
                <el-form-item label="图片：" :label-width="formLabelWidth">
                    <el-upload
                        class="upload-demo"
                        drag
                        :action="picUploadUrl"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="最大限高: " :label-width="formLabelWidth">
                    <el-input v-model="newForm.maxHeight"></el-input>
                </el-form-item>
                <el-form-item label="名称: " :label-width="formLabelWidth">
                    <el-input v-model="newForm.name"></el-input>
                </el-form-item>
                <el-form-item label="简介: " :label-width="formLabelWidth">
                    <el-input v-model="newForm.seriesintro"></el-input>
                </el-form-item>
                <el-form-item label="名称(英文): " :label-width="formLabelWidth">
                    <el-input v-model="newForm.seriesname_eng"></el-input>
                </el-form-item>
                <el-form-item label="简介(英文): " :label-width="formLabelWidth">
                    <el-input v-model="newForm.seriesintro_eng"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmEdit"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
        <el-dialog title="添加系列" :visible.sync="newVisible">
            <el-form :model="newForm">
                <el-form-item label="图片：" :label-width="formLabelWidth">
                    <el-upload
                        class="upload-demo"
                        drag
                        :action="picUploadUrl"
                        multiple>
                        <i class="el-icon-upload"></i>
                        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                    </el-upload>
                </el-form-item>
                <el-form-item label="最大限高: " :label-width="formLabelWidth">
                    <el-input v-model="newForm.maxHeight"></el-input>
                </el-form-item>
                <el-form-item label="名称: " :label-width="formLabelWidth">
                    <el-input v-model="newForm.name"></el-input>
                </el-form-item>
                <el-form-item label="简介: " :label-width="formLabelWidth">
                    <el-input v-model="newForm.seriesintro"></el-input>
                </el-form-item>
                <el-form-item label="名称(英文): " :label-width="formLabelWidth">
                    <el-input v-model="newForm.seriesname_eng"></el-input>
                </el-form-item>
                <el-form-item label="简介(英文): " :label-width="formLabelWidth">
                    <el-input v-model="newForm.seriesintro_eng"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible = false">取 消</el-button>
                <el-button type="primary" @click="confirmNew"
                    >确 定</el-button
                >
            </div>
        </el-dialog>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import httpService from "@/common/request";
interface ISeries {
    id: number;
    seriesname: string;
    index?: number;
    seriespic: string;
}
interface ISeriesDetail {
    seriesintro: string;
    seriesintro_eng: string;
    seriesname: string;
    seriesname_eng: string;
    maxHeight?: string;
}

@Component
export default class SeriesMain extends Vue {
    public series: ISeries[] = [];
    public srcList: string[] = [];
    public seriesDetail: ISeriesDetail = {
        maxHeight: '',
        seriesintro: '',
        seriesintro_eng: '',
        seriesname: '',
        seriesname_eng: ''
    }
    public formLabelWidth = '120px';
    public detailVisible = false;
    public newVisible = false;
    public editVisible = false;
    public newForm:ISeriesDetail = {
        maxHeight:'',
        seriesintro: '',
        seriesintro_eng: '',
        seriesname: '',
        seriesname_eng: ''
    }

    public isSorting = false;

    public readonly picUploadUrl = '';

    public async getSeries() {
        const { data } = await httpService.getSeries();
        const srcList: string[] = [];
        this.series = data.map((series: ISeries, index: number) => {
            srcList.push("/static/images/series_images/" + series.seriespic);
            return {
                ...series,
                index: index + 1,
                imgUrl: "/static/images/series_images/" + series.seriespic
            };
        });
        this.srcList = srcList;
    }

    public async viewDetail(series: ISeries) {
        console.log(series)
        const { data } = await httpService.getOneSeries(series.id);
        this.seriesDetail = data;
        this.detailVisible = true;
    }
    public async showEditDialog(series: ISeries) {
        const { data } = await httpService.getOneSeries(series.id);
        this.seriesDetail = data;
        this.editVisible = true;
    }
    public confirmDel(series: ISeries) {
        this.$confirm('确认删除该系列吗？', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            // 删除接口
            this.$message({
                type: 'success',
                message: '删除成功!'
            });
        }).catch(() => {
            //        
        });
    }
    public newSeries() {
        this.newVisible = true;
    }
    public startSort() {
        this.isSorting = true;
    }
    public endSort(){
        this.isSorting = false;
        const sort:any = {}
        this.series.forEach((series)=>{
            sort.id = series.index;
        })
        httpService.sortSeries(sort);
    }

    public created() {
        this.getSeries();
    }

    public async confirmEdit() {
        await httpService.editSeries(this.seriesDetail);
    }
    public async confirmNew() {
        await httpService.addNewSeries(this.newForm);
    }
}
</script>

<style lang="scss"></style>
