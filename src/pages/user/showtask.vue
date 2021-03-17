<template>
    <div class="home p-2 p-md-4 text-left">  
        <b-card 
            v-if="task.department"
            :header="task.title"
            style="width: 30rem;"
            class="mb-2"
        > 
            <b-card-text class="small  card-date mb-2">Department: {{task.department.name}}</b-card-text>
            <b-card-text class="mb-1">
                Description:  {{task.description}}
            </b-card-text>
            <b-card-text class="mb-1">
                budget:  {{task.budget}}
            </b-card-text>  
            <b-card-text class="mb-1">
                created at:  {{task.created_at}}
            </b-card-text>
            <b-card-text class="mb-1 small  ">
                deadline:  <span class="card-date text-info mb-0">{{task.start_date + ' - ' + task.deadline}}</span>
            </b-card-text>
            <b-card-text class="mb-1">
                <span>Requirements:</span>
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 ml-2 p-0" v-for="(item,index) in task.requirements" :key="index">{{item}}</b-list-group-item>
                </b-list-group>
            </b-card-text>
            <b-card-text class="mb-1">
                <span>Resources: </span>
                <b-list-group class="border-0">
                    <b-list-group-item class="border-0 ml-2 p-0" v-for="(item,index) in task.resources" :key="index">{{item}}</b-list-group-item>
                </b-list-group>
            </b-card-text>
            <b-card-text class="mb-1">
                progress: <span :class="task.progress==0?'text-warning':'text-success'">{{task.progress==0? 'not assign to any user' : task.progress==1 ? 'in progress ': task.progress==2 ?'reviewing':'completed'}}</span>
            </b-card-text> 
            <div v-if="task.progress==0">
                <b-card-text class="mb-1  req" v-if="task.progress==0" @click="task.canreq ?request_task():''" :class="task.canreq ? 'text-primary':'text-muted'">
                    {{task.canreq ?'request this task ':'you already request it'}}
                </b-card-text>
            </div>
            <div v-else> 
                <b-card-text class="mb-1" v-if="task.user">
                    <span>implementing by : {{task.user.name}} </span> 
                </b-card-text>
                <b-card-text class="mb-1" v-if="task.user">
                    <span>last update : {{task.updated_at}} </span> 
                </b-card-text> 
                <b-card-text class="mb-1" v-if="task.work_link">
                    <span>work link : <b-link :href="task.work_link" >click here</b-link></span> 
                </b-card-text>
                <b-card-text class="mb-1" v-if="task.progress==2">
                    <span>Completed and you need Approve delivery request by admin</span> 
                </b-card-text>
                <div v-if="task.user.id==this.$store.getters.get_user.id && task.progress!=3">
                    <b-button 
                        :variant="updateMode?'danger':'primary'" 
                        class="m-0 py-0 " 
                        size="sm" 
                        @click="updateMode=updateMode?false:true"
                    >
                        {{updateMode?'cancel':'update'}}
                    </b-button>
                    <b-form @submit.prevent="updateProgress()" class="update mt-2" v-if="updateMode"> 
                        <b-form-group label="progress %" label-for="bg-opacity" label-cols-sm="3" label-cols-lg="12" label-size="sm">
                            <b-input-group size="sm">
                                <b-form-select 
                                    v-model="progress"   
                                    required
                                >
                                    <template #first>
                                        <b-form-select-option :value="null" disabled>-- Please select your progress --</b-form-select-option>
                                    </template>
                                    <b-form-select-option value="1">in progress stage</b-form-select-option>
                                    <b-form-select-option value="2">reviewing stage</b-form-select-option>
                                </b-form-select> 
                            </b-input-group>
                        </b-form-group>
                        <b-form-group>
                            <b-form-input 
                                type="text"
                                v-model="link"
                                placeholder="Enter link to your current work..." 
                                required
                            ></b-form-input>
                        </b-form-group>
                        <b-button 
                            variant="primary" 
                            class="m-0 py-0 " 
                            size="sm"  
                            type="submit"
                        >
                            update
                        </b-button> 
                    </b-form>
                </div>
            </div> 

            <template #footer> 
                <small class="small">add Comment</small>
                <b-form @submit.prevent="post_comment()"> 
                    <b-form-textarea
                        id="textarea"
                        v-model="comment"
                        placeholder="Enter comment..."
                        rows="3"
                        max-rows="4"
                        required
                    ></b-form-textarea>
                    <b-button variant="primary" type="submit" size="sm" class="m-2 ml-auto">post</b-button>
                </b-form>
                <hr>
                <span class="mb-2">All Coments ({{task.comments.length}})</span> 
                <div v-if="task.comments[0]">
                    <hr>
                    <b-card-text  class="mb-1" v-for="(comm,index) in task.comments" :key='index'>
                        <span class="font-weight-bold" >{{comm.user_name}}:</span> <span> {{comm.body}}</span>
                    </b-card-text> 
                </div>
                
                
            </template>
            
        </b-card> 
    </div>
</template>
<script>   
export default {
    name: "showtask",
    data() {
        return {
            task:{}, 
            comment:'' ,
            canreq:false,
            progress:0,
            link:'',
            updateMode:false,

        }
    },
    mounted() { 
        this.fetch_task()
    },
    created() { 
        window.Echo.private(`task.`+ this.$store.getters.get_user.department_id+'.'+this.$route.params.id)
        .listen('updatedTask', (e) => {
            this.task = e.task
        }).listen('deletedShowTask', () => {    
            this.$router.push({name:'viewusertasks'})
        });
    },
    methods: {
        fetch_task(){
            this.$http.get('user/task/'+this.$route.params.id ).then(data => {  
                this.task=data.data;   
                this.progress=this.task.progress;
            })
        }, 
        post_comment(){
            this.$http.post('user/task/'+ this.task.id +'/comment',{body:this.comment}).then(() => {  
                this.fetch_task()
                this.comment=''
            })
        }, 
        request_task(){ 
            this.$http.post('user/task/'+ this.task.id +'/request').then(() => {  
                this.task.canreq=false; 
            })
        },
        updateProgress(){
            this.$http.put('user/task/'+ this.task.id,{
                progress:this.progress,
                link:this.link
            }).then(data => {     
                this.task=data.data
                this.updateMode=false
            })
        }
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
</style>