/**
 * @description: 请求
 * @author: zhuyaohua
 * @email: zhuyaohua@bytedance.com
 *
 * @created: 2019-08-24 12:32:19
 */
import axios from 'axios';

export default {
    login(params: any) {
        return axios.post('http://www.yilanjewelry.com/login/', params);
    },

    getSeries() {
        return axios.get('http://www.yilanjewelry.com/getOptionSeries/');
    },

    getOneSeries(id: number) {
        return axios.get(`http://www.yilanjewelry.com/getOneSeries/?id=${id}`);
    },

    getWorks(id: number) {
        return axios.get(`http://www.yilanjewelry.com/getOptionWorks/?id=${id}`);
    },

    getAllPicture() {
        return axios.get(`http://www.yilanjewelry.com/getAllPics/`);
    },

    updateSwiper() {
        return axios.post(`http://www.yilanjewelry.com/fixIndex/`);
    },

    addNewSeries(params: any) {
        return axios.post(`http://www.yilanjewelry.com/addSeries/`);
    },

    addNewWork(params: any) {
        return axios.post(`http://www.yilanjewelry.com/addWork/`);
    },

    delSeries(params: any) {
        return axios.delete(`http://www.yilanjewelry.com/delSeries/`, {
            data: {
                seriesId: params,
            },
        });
    },

    delWork(params: any) {
        return axios.delete(`http://www.yilanjewelry.com/delWork/`, {
            data: {
                workId: params,
            },
        });
    },

    sortWork(params: any) {
        return axios.post(`http://www.yilanjewelry.com/workSequence/`);
    },

    sortSeries(params: any) {
        return axios.post(`http://www.yilanjewelry.com/seriesSequence/`);
    },

    setInfo(params: any) {
        return axios.post(`http://www.yilanjewelry.com/setIntro/`);
    },

    getInfo() {
        return axios.get(``);
    },
};
