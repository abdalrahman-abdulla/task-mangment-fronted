<template>
    <div class="home d-flex m-0 p-0 justify-content-center align-items-center"> 
        <div class="overlay"></div>
        <router-view/>
    </div>
</template>
<script>  
export default {
    name: "auth", 
};
</script>
<style lang='scss'>
.home{
    height: 100vh;
    position: relative;
    .overlay{ 
        position: absolute;
        left: 0;
        width: 100%;
        height: 100%;
        background-image: url('../assets/img/bg.jpg');
        background-size: cover;
        filter: brightness(10%) blur(2px);
    }
    ::placeholder{
    font-size: 12px; 
    }
    .invalid-feedback{
        font-size: 12px; 
    }
    .option{
        font-size: 10px;
    }
}
</style>