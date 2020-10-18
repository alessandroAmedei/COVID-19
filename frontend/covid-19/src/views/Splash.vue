<template>
    <div id="splash">
        <div id="image">

        </div>
        <h3 id="title">Covid 19, statistiche e informazioni utili</h3>
        <h5>Created by: Alessandro Amedei</h5>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style>
#title{
    margin-top: 55px;
}

#splash{
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    align-content: center;
    justify-content: center;

    
}
#image{
      background-image: url('../assets/covid.png');
      background-size: contain;
      height: 250px;
      width: 250px;
      animation: rotate;
      animation-duration: 2.5s;
      animation-iteration-count: infinite;
      animation-fill-mode:forwards;
      animation-timing-function: linear;
}

@keyframes rotate {
    0%{
        transform: rotateZ(0deg);
    }
50%{
        transform: rotateZ(180deg);
    }
    100%{
        transform: rotateZ(360deg);
    }

}
</style>