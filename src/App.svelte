<script lang="ts">
	
import slickScroll from "slickscrolljs";
import { onMount } from "svelte";
import { imgPromises, loaderAnimationPromise, loadPageResolve, slickScrollInstance, workItemsFetch } from "./store";
import HomeSection from "./sections/home.svelte";
import WorkSection from "./sections/work.svelte";
import AboutSection from "./sections/about.svelte";
import NavComponent from "./components/nav.svelte"
import Footer from "./components/footer.svelte";
import Loader from "./components/loader.svelte";

let scrollContainer;
let navBar;
let loading = true;
let isNavVisible = true;

onMount(async () => {
	// Disable scrolling on initial load
	scrollContainer.style.overflowY = "hidden";
	scrollContainer.scrollTo(0, 0);
	
	await workItemsFetch; // Wait for work data to load
	await Promise.allSettled($imgPromises); // Wait for images to load
	await loaderAnimationPromise; // Wait until loading animation is complete

	loading = false; // Destroy loader component 
	loadPageResolve(); // Resolve loadPagePromise

	// Resolve slickScroll promise and pass momentumScroll's value
	$slickScrollInstance = new slickScroll({
		root: scrollContainer,
		easing: "easeOutCirc",
		duration: 250,
		fixedOffsets: [
			navBar
		]
	});

	// Enable scrolling
	scrollContainer.style.overflowX = "hidden";
	scrollContainer.style.overflowY = "auto";

});

</script>


<!-- Page loading progress bar -->
{#if loading} <Loader></Loader> {/if}

<div id="scroll-frame" bind:this={scrollContainer}>
	<!-- Top nav-bar and mobile nav-bar -->
	<div id="nav-bar" bind:this={navBar}>
		<NavComponent scrollContainer={scrollContainer}></NavComponent>
	</div>
	<!-- page sections -->
	<HomeSection></HomeSection>
	<WorkSection></WorkSection>
	<AboutSection></AboutSection>
	<Footer></Footer>
</div>




<style lang="sass">
\:global(html)
	-webkit-user-select: none
	::-webkit-scrollbar
		display: none
	
\:global(body)
	background-color: #08090A
	overflow: hidden
	color: #FAFFFD
	margin: 0
	padding: 0
	-moz-osx-font-smoothing: grayscale
	-webkit-font-smoothing: antialiased

\:global(*)
	margin: 0
	padding: 0
	-moz-osx-font-smoothing: grayscale
	-webkit-font-smoothing: antialiased

#scroll-frame
	height: 100%
	top: 0
	left: 0
	position: relative
	width: 100%
	overflow-y: auto
	overflow-x: hidden

#nav-bar
	position: fixed
	top: 6vh
	z-index: 100
</style>