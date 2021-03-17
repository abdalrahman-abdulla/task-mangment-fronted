<template>
    <div class="home p-2 p-md-4 text-left">  
        <b-card  
            :header="'Update '+ task.title +' Task' "
            style="width: 30rem;"
            class="mb-2"
        > 
        <ValidationObserver v-slot="{ handleSubmit }">
            <form @submit.prevent="handleSubmit(save_task)"  > 
                <ValidationProvider v-for="(field,index) in fields" :key='index' :name="field.name" :rules="'required'" v-slot="{ errors }"> 
                    <b-input-group size="sm" :class="errors[0] ? 'mt-1':'mb-3'"> 
                        <b-input-group-prepend is-text>
                            <b-icon v-if="field.icon!='$'" :icon="field.icon" ></b-icon>
                            <span v-if="field.icon=='$'" class="px-1">$</span>
                        </b-input-group-prepend>
                        <b-form-input 
                            :type="field.type"
                            max="999999"
                            v-model="task[field.name]"
                            :state="errors[0] ? false : null"
                            aria-describedby="input-live-help input-live-feedback"
                            :placeholder="field.placeholder" 
                        ></b-form-input>
                    </b-input-group>
                    <b-form-invalid-feedback class="d-block">
                        {{errors[0]}}
                    </b-form-invalid-feedback> 
                </ValidationProvider>
                <ValidationProvider rules="required" v-slot="{ errors }"> 
                    <b-input-group size="sm" :class="errors[0] ? 'mt-1':'mb-3'"> 
                        <b-input-group-prepend is-text>
                            <b-icon icon="file-earmark-spreadsheet-fill" ></b-icon> 
                        </b-input-group-prepend>
                        <b-form-textarea 
                            v-model="task['description']"
                            placeholder="Enter Task Description Please..."
                            rows="3"
                            max-rows="6"
                        ></b-form-textarea>
                    </b-input-group>
                    <b-form-invalid-feedback class="d-block">
                        {{errors[0]}}
                    </b-form-invalid-feedback> 
                </ValidationProvider> 
                <ValidationProvider name="department" rules="required" v-slot="{ errors }">
                    <b-input-group size="sm" :class="errors[0]? 'mt-1':'mb-3'">
                        <b-form-select 
                            v-model="task.department_id"   
                            required
                        >
                            <template #first>
                                <b-form-select-option :value="null" disabled>-- Please select your department --</b-form-select-option>
                            </template>
                            <b-form-select-option v-for="(value,index) in departments" :key="index" :value="value.id">{{value.name}}</b-form-select-option>
                        </b-form-select> 
                        <b-form-invalid-feedback class="d-block">
                            {{errors[0]}}
                        </b-form-invalid-feedback> 
                    </b-input-group>
                </ValidationProvider> 
                <div class="d-flex justify-content-between requirements mt-4">
                    <span>Requirements:</span>
                    <div class="option font-weight-bold	">
                        <span @click="countreq++" class="mx-1 text-success">+</span>
                        <span @click="minreq()" class="mx-1 text-danger" :class="countreq==1?'text-muted':'text-danger'">-</span>
                    </div>
                </div>
                <hr> 
                <ValidationProvider v-for="index in countreq" :key='"a"+index' name="requirements" :rules="'required'" v-slot="{ errors }"> 
                    <b-input-group size="sm" :class="errors[0] ? 'mt-1':'mb-3'"> 
                        <b-input-group-prepend is-text>
                            <b-icon  icon="list-task" ></b-icon> 
                        </b-input-group-prepend> 
                        <b-form-input 
                            type="text"
                            v-model="requirements[index-1]"
                            :state="errors[0] ? false : null"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter Requirements For Task Please ..." 
                        ></b-form-input>
                    </b-input-group>
                    <b-form-invalid-feedback class="d-block">
                        {{errors[0]}}
                    </b-form-invalid-feedback> 
                </ValidationProvider>
                <div class="d-flex justify-content-between requirements mt-4">
                    <span>Resources:</span>
                    <div class="option font-weight-bold	">
                        <span @click="countres++" class="mx-1 text-success">+</span>
                        <span @click="minres()" class="mx-1 text-danger" :class="countres==0?'text-muted':'text-danger'">-</span>
                    </div>
                </div>
                <hr> 
                <ValidationProvider v-for="index in countres" :key='"b"+index' name="resources" :rules="'required'" v-slot="{ errors }"> 
                    <b-input-group size="sm" :class="errors[0] ? 'mt-1':'mb-3'"> 
                        <b-input-group-prepend is-text>
                            <b-icon  icon="list-task" ></b-icon> 
                        </b-input-group-prepend> 
                        <b-form-input 
                            type="text"
                            v-model="resources[index-1]"
                            :state="errors[0] ? false : null"
                            aria-describedby="input-live-help input-live-feedback"
                            placeholder="Enter Resources For Task Please ..." 
                        ></b-form-input>
                    </b-input-group>
                    <b-form-invalid-feedback class="d-block">
                        {{errors[0]}}
                    </b-form-invalid-feedback> 
                </ValidationProvider>
                <div class="card-footer d-flex-column justify-content-center bg-white">
                    <div>
                        <b-button  type="submit" variant="success" class="px-4 mx-auto" size="sm">
                            <b-icon v-if="isLoading" icon="arrow-clockwise" animation="spin" font-scale="4" width='15px' height='15px' class="d-inline"></b-icon>
                            <span class="small ml-1">save Task</span>
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
    name: "addtask",
    data() {
        return {
            task:[
            ],
            departments:[],
            countreq:1,
            countres:0,
            isLoading:false,
            requirements:[],
            resources:[],
            fields:[
                {
                    name:'title',
                    type:'text',
                    placeholder:'Enter Task Title Please ...',
                    icon:'app-indicator'
                }, 
                {
                    name:'start_date',
                    type:'date',
                    placeholder:'Enter Task Start Date Please ...',
                    icon:'calendar2-date'
                },
                {
                    name:'deadline',
                    type:'number',
                    placeholder:'Enter Task Deadline Days Please ...',
                    icon:'stop-fill'
                },
                {
                    name:'budget',
                    type:'number',
                    placeholder:'Enter Task budget $ Please with max 999999$...',
                    icon:'$'
                },
            ],
        }
    },
    mounted() {  
        this.$http.get('auth/departments').then(data => {
            this.departments=data.data;
        }).catch(e=>{
            console.log(e)
        })
        this.fetch_task()
    },
    methods: {
        save_task(){ 
            this.task.requirements=this.requirements;
            if(this.resources.length){
                this.task.resources=this.resources;
            } 
            this.$http.put('admin/task/'+this.task.id,this.task).then(() => {  
                this.$router.push({name:'viewtask',params:{id:this.task.id}})
            })

        }, 
        minreq(){
            if(this.countreq>1){
                this.countreq--
                this.requirements.splice(this.requirements.length-1, 1)
            } 
        },
        minres(){
            if(this.countres>0){
                this.countres--
                this.resources.splice(this.resources.length-1, 1)
            } 
        },
        fetch_task(){
            this.$http.get('admin/task/'+this.$route.params.id ).then(data => { 
                this.task=data.data.data;   
                this.requirements=this.task.requirements;
                this.resources=this.task.resources;
                this.countreq=this.requirements.length;
                this.countres=this.resources.length;
                this.task.department_id=this.task.department.id;
            })
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