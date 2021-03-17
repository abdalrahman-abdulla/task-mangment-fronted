<template>
    <div class="home p-2 p-md-4 text-left">   
        <div class="d-flex mb-3">
            <div class="filter" style="width: 30rem;">
                <b-form-select v-model="selected" :options="options"></b-form-select>
            </div>
        </div>
        <b-card
            v-for="(task,index) in tasksfilters"
            :key="index"
            :header="task.title"
            style="width: 30rem;"
            class="mb-2"
        > 
            <b-card-text class="small  card-date mb-2">Department: {{task.department.name}}</b-card-text>
            <b-card-text class="mb-2">
                {{task.description}}
            </b-card-text>
            <b-card-text class="small  card-date text-info mb-0">{{task.start_date + ' - ' + task.deadline}}</b-card-text>
            <template #footer>  
                <router-link :to='{name:"showtask", params:{ id:task.id,task:task }}' class="w-100">
                    <b-badge pill 
                    :variant="!task.progress?'success':task.progress==1?'info':task.progress==2?'primary':'dark'" 
                    > 
                    {{!task.progress?'AVAILABLE':task.progress==1?'INPROGRESS':task.progress==2?'REVIEWING':'COMPLETED'}}
                    </b-badge>
                    <b-badge pill variant="info ml-2">Comments <b-badge variant="light">{{task.comments}}<span class="sr-only">unread messages</span></b-badge></b-badge>
                    <small class="text-primary float-right">view task</small>
                </router-link>
            </template>
        </b-card>
        <b-pagination
            v-model="currentPage"
            :total-rows="page_info.total"
            :per-page="page_info.per_page" 
            ></b-pagination>
    </div>
</template>
<script>   
export default {
    name: "tasks",
    data() {
        return {
            tasks:[], 
            selected:null,
            options: [
                { value: null, text: 'filter' ,disabled:true},
                { value: null, text: 'all tasks' },
                { value: 'not_assign', text: 'Last Tasks' },
                { value: 'my_tasks', text: 'My Own Tasks' },  
            ],
            page_info:{},
            currentPage:1,
        }
    },
    mounted() { 
        this.fetch_data()
    },
    computed:{ 
        tasksfilters(){
            let temp=this.tasks
            if(this.selected=='not_assign'){
                return temp.filter(task => (task.progress==0));
            }else if(this.selected=='my_tasks'){
                return temp.filter(task => task.user_id ? task.user_id==this.$store.getters.get_user.id : false);
            } else{
                return temp
            }  
        }
    },
    created() {
        window.Echo.private(`tasks.`+ this.$store.getters.get_user.department_id)
            .listen('newTask', (e) => {
                this.tasks.push(e.task)
            }).listen('deletedTask', (e) => {  
                console.log(e)
                this.tasks=this.tasks.filter(task => (task.id != e.task.id));
            });
    },
    methods: {
        fetch_data(){
            this.$http.get('user/task?page='+this.currentPage).then(data => { 
            this.page_info=data.data.page_info;
            this.tasks=data.data.data;  
            }) 
        }
    }, 
    watch: {
        currentPage() {
            this.fetch_data()
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
    font-size: 10px;
}
</style>