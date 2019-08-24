<template>
    <div class="series-wrap">
        <div class="series-bar">
            <el-button type="primary" @click="newSeries">添加作品</el-button>
            <el-button @click="startSort">排序</el-button>
        </div>
        <div class="series-table">
            <el-table :data="series" style="width: 100%">
                <el-table-column prop="index" label="序号" width="100">
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
        <el-dialog title="作品详情" class="detail-dialog" :visible.sync="detailVisible">
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
        <!-- <el-dialog title="编辑作品" :visible.sync="editVisible">
            <el-form :model="edit">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select
                        v-model="form.region"
                        placeholder="请选择活动区域"
                    >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                    >确 定</el-button
                >
            </div>
        </el-dialog> -->
        <!-- <el-dialog title="添加作品" :visible.sync="dialogFormVisible">
            <el-form :model="form">
                <el-form-item label="活动名称" :label-width="formLabelWidth">
                    <el-input v-model="form.name" autocomplete="off"></el-input>
                </el-form-item>
                <el-form-item label="活动区域" :label-width="formLabelWidth">
                    <el-select
                        v-model="form.region"
                        placeholder="请选择活动区域"
                    >
                        <el-option label="区域一" value="shanghai"></el-option>
                        <el-option label="区域二" value="beijing"></el-option>
                    </el-select>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false"
                    >确 定</el-button
                >
            </div>
        </el-dialog> -->
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";
import httpService from "@/common/request";
interface ISeries {
    id: number;
    seriesname: string;
    seriespic: string;
}
interface ISeriesDetail {
    seriesintro: string;
    seriesintro_eng: string;
    seriesname: string;
    seriesname_eng: string;
}

@Component
export default class JobsMain extends Vue {
    public series: ISeries[] = [];
    public srcList: string[] = [];
    public seriesDetail: ISeriesDetail = {
        seriesintro: '',
        seriesintro_eng: '',
        seriesname: '',
        seriesname_eng: ''
    }
    public formLabelWidth = '120px';
    detailVisible = false;

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
    public showEditDialog(series: ISeries) {
        //
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
        //
    }
    public startSort() {
        //
    }

    public created() {
        this.getSeries();
    }
}
</script>

<style lang="scss"></style>
