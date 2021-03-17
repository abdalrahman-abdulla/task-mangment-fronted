<template>
    <div class="home p-2 p-md-4 text-left">  
        <b-card  
            header="update Department"
            style="width: 30rem;"
            class="mb-2"
        > 
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(save_department)"  > 
                <ValidationProvider name="name" rules="required" v-slot="{ errors }"> 
                    <b-input-group size="sm" :class="errors[0] ? 'mt-1':'mb-3'"> 
                        <b-input-group-prepend is-text>
                            <b-icon icon="app-indicator" ></b-icon> 
                        </b-input-group-prepend>
                        <b-form-input 
                            type="text" 
                            v-model="department.name"
                            :state="errors[0] ? false : null"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="enter department name please" 
                        ></b-form-input>
                    </b-input-group>
                    <b-form-invalid-feedback class="d-block" v-if="errors[0] || err['name']">
                        {{errors[0] || err['name'][0]}}
                    </b-form-invalid-feedback> 
                </ValidationProvider> 
                <div class="card-footer d-flex-column justify-content-center bg-white">
                    <div>
                        <b-button  type="submit" variant="success" class="px-4 mx-auto" size="sm">
                            <b-icon v-if="isLoading" icon="arrow-clockwise" animation="spin" font-scale="4" width='15px' height='15px' class="d-inline"></b-icon>
                            <span class="small ml-1">save department</span>
                        </b-button>
                    </div> 
                </div> 
            </form>
        </ValidationObserver> 
            
        </b-card> 
    </div>
</template>
<script>   
export default {
    name: "addDept",
    data() {
        return { 
            department:{}, 
            isLoading:false,
        }
    }, 
    mounted() {
        this.fetch_task()
    },
    methods: { 
        fetch_task(){
            this.$http.get('admin/department/'+this.$route.params.id ).then(data => { 
                this.department=data.data;    
            }).catch((e) => {
                console.log(e)
            })
        },
        save_department(){  
            this.isLoading=true
            this.$http.put('admin/department/'+this.department.id,this.department).then(() => {  
                this.$router.push({name:'viewtasks'})
            }).catch((e)=>{
                console.log(e) 
            }).then(()=>{this.isLoading=false;})
        },  
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
    font-size: 11px;
}
.req
{
    cursor: pointer;
}
.table span.text-success{
    cursor: pointer;
}
::placeholder{
    font-size: 12px; 
}
.option{
    font-size: 21px;
    cursor: pointer;
}
.requirements
{
    line-height: 20px;
}
</style>