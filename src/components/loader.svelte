<script lang="ts">
import { onMount } from "svelte";
import waitForElementTransition from 'wait-for-element-transition';
import { imgPromises, loaderAnimationResolve, workItemsFetch } from "../store";

let loader;
let loadingDone = false;
let loadingPercentage = 0;

onMount(async () => {
    // Wait for work item loading from JSON file to complete
    await workItemsFetch;
    
    let counter = 0;
    let length = $imgPromises.length;

    // Calculate percentage by how many images have loaded
    $imgPromises.forEach(async (promise) => {
        await promise;
        counter++;
        loadingPercentage = Math.round((counter / length) * 100);

        // If loading is complete, initiate outro animation
        if (loadingPercentage > 99) {
            waitForElementTransition(loader).then(() => {
                loadingDone = true;
                loadingPercentage = 0;

                // Once outro animation is complete, resolve page loading promise, allowing intro animations to begin
                waitForElementTransition(loader).then(() => {
                    loaderAnimationResolve();
                });
            });
        }
    });
});

</script>


<div class="page-cover">
    <div class="loader-wrapper">
        <div 
            class="loader-background"
            class:outro={loadingDone}></div>
        <div 
            bind:this={loader}
            class="loader"
            class:outro={loadingDone}
            style="width: {loadingPercentage}%"></div>
    </div>
</div>


<style lang="sass">

@import "../consts.sass"
@include textStyles()

.page-cover
    width: 100vw
    height: 100vh
    position: fixed
    top: 0
    left: 0
    display: flex
    flex-direction: column
    justify-content: center
    align-items: center
    z-index: 1000
    background-color: #08090A

    .loader-wrapper
        position: relative
        display: block
        height: 0.2rem
        width: 20rem

        .loader, .loader-background
            position: absolute
            top: 0
            height: 100%

        .loader-background
            width: 100%
            background-color: rgba(255, 255, 255, 0.1)

        .loader 
            background-color: #745CFF
            transition: width 0.3s ease

        .outro
            transition: width 0.2s ease
            right: 0 !important
            width: 0

</style>