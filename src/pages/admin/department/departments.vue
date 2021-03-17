<template>
    <div class="home p-2 p-md-4 text-left"> 
        <b-card
            v-for="(department,index) in departments"
            :key="index"
            :header="department.name"
            style="width: 30rem;"
            class="mb-2"
        >  
            <template #footer>  
                <router-link :to='{name:"updateDept", params:{ id:department.id }}' class="w-100">
                    <small class="text-primary float-right">update department</small>
                </router-link>
            </template>
        </b-card>
    </div>
</template>
<script>   
export default {
    name: "departments",
    data() {
        return {
            departments:[],  
        }
    },
    mounted() { 
        this.$http.get('admin/department').then(data => { 
            console.log(data.data)
            this.departments=data.data;    
        }) 
    }, 
};
</script>
<style lang='scss' scoped>  
.card-title{
    font-size: 20px;
}
.card-text{
    font-size: 13px;
}
.card-date{
    font-size: 10px;
}
</style>