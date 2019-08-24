<template>
    <div class="left-menu">
        <div class="menu-title">YILAN JEWELRY</div>
        <div class="menu-item-wrap">
            <div 
                v-for="item in config"
                :key="item.name"
                @click="handleClick(item.id)"
                :class="{'menu-item':true,'menu-item--active':item.id===activePanel}" 
            >
                <i :class="item.icon"></i>
                <span class="menu-item__text">{{item.name}}</span>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from "vue-property-decorator";

@Component
export default class LeftMenu extends Vue {
    public config = [
        {
            name: "系列",
            id: 1,
            icon:"el-icon-menu"
        },
        {
            name: "作品",
            id: 2,
            icon:"el-icon-camera"
        },
        {
            name: "轮播图",
            id: 3,
            icon:"el-icon-picture-outline"
        },
        {
            name: "个人信息",
            id: 4,
            icon:"el-icon-user"
        }
    ];
    @Prop({ default: 0 })
    public activePanel!: number;

    public handleClick(item: number) {
        this.$emit("changePanel", item);
    }
}
</script>

<style lang="scss"></style>
