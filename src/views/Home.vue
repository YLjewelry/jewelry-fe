<template>
    <div class="home">
        <el-container>
            <el-aside class="admin-aside" width="200px">
                <left-menu 
                    @changePanel="changePanel"
                    :activePanel="activePanel"
                ></left-menu>
            </el-aside>
            <el-container>
                <el-header>Header</el-header>
                <el-main>
                    <series-main v-if="activePanel===1"></series-main>
                    <jobs-main v-if="activePanel===2"></jobs-main>
                    <swiper-main v-if="activePanel===3"></swiper-main>
                    <user-main v-if="activePanel===4"></user-main>
                </el-main>
            </el-container>
        </el-container>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";

import LeftMenu from '@/components/leftMenu.vue';
import SeriesMain from '@/components/seriesMain.vue';
import JobsMain from '@/components/jobsMain.vue';
import SwiperMain from '@/components/swiperMain.vue';
import UserMain from '@/components/userMain.vue';

@Component({
    components:{
        LeftMenu,
        SeriesMain,
        JobsMain,
        SwiperMain,
        UserMain
    }
})
export default class Home extends Vue {
    public series: any[] = [];
    public jobs: any[] = [];
    public intro: string = '';
    public image: string = '';

    public activePanel= 1;

    public changePanel(panel:number){
        this.activePanel = panel;
    }

}
</script>
