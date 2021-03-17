<template>
    <div class="home ">  
        <Navbar />
        <div class="d-flex justify-content-center align-items-center">
            <router-view/>
        </div> 
    </div>
</template>
<script>  
import Navbar from '../components/navbar'
export default {
    name: "admin", 
    components:{
        Navbar,
    }
};
</script>
<style lang='scss' scoped> 
.home{ 
    background-color: #eaeaea;
}
</style>