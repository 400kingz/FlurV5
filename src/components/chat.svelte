<script lang="ts">
    import { fade } from "svelte/transition";
    import anime from "animejs";
    import { onMount } from "svelte";
    import { loadPagePromise } from "../store";

    let showChat = false;
    let chatButton;

    function toggleChat() {
        showChat = !showChat;
    }
    
    onMount(async () => {
        // Wait for page to load
        await loadPagePromise;
        // Initiate intro animations
        introAnimations();
    });

    function introAnimations() {
        let targets = [chatButton];
        // Set initial state to begin animation from
        targets.forEach(e => {
            e.style.transform = "translateY(-1530%) rotate(-7deg)"
        })

        anime({
            targets: targets,
            rotate: 0,
            translateY: "0%",
            easing: "cubicBezier(0.165, 0.84, 0.44, 1)",
            duration: 1000,
            delay: anime.stagger(100, {start: + 500})
        })
    }
  
</script>

<button bind:this={chatButton} transition:fade class="chat-button" on:click={toggleChat}>
  <span>Chat</span>
</button>

{#if showChat}
  <div in:fade out:fade={{ duration: 300 }} class="chat-window">
    <div class="bg">
      <h1>FLUR.<span>AI</span></h1>
    </div>
    <!-- Chat messages -->
    <div class="chat-messages">
      <!-- Bot messages -->
      <div class="bot-message">
        <p>Hi there! How can I help you today?</p>
      </div>
      <!-- User messages -->
      <div class="user-message">
        <p>Hi, is the Ai customer support down today?</p>
      </div>
      <!-- Bot messages -->
      <div class="bot-message">
        <p>Yes it is, but will be up whenever we have any free time!</p>
      </div>
      <!-- User messages -->
      <div class="user-message">
        <p>Can you tell me more about your pricing?</p>
      </div>
      <!-- Bot messages -->
      <div class="bot-message">
        <p>
          Of course! Our pricing varies depending on the services you need. Can
          you tell me a bit more about what you're looking for?
        </p>
      </div>
      <!-- User messages -->
      <div class="user-message">
        <p>Yes, I'm interested in your web development services.</p>
      </div>
      <!-- Bot messages -->
      <div class="bot-message">
        <p>
          Great! We offer a range of web development services, including front-end
          development with Svelte and back-end development with Node.js. Our
          pricing for these services starts at $88 per hour. Would you like to
          schedule a call to discuss your project in more detail?
        </p>
      </div>
    </div>
    <!-- Chat input -->
    <div class="chat-input">
      <input type="text" placeholder="Type your message here..." />
      <button>Send</button>
    </div>
  </div>
{/if}


<style>


  .chat-window {
    display: flex;
    flex-direction: column;
    height: 60%;
    width: 80%;
    max-width: 950px;
    background-color: #08090a;
    -webkit-box-shadow: 0px 0px 218px 79px rgba(8,9,10,1);
    -moz-box-shadow: 0px 0px 218px 79px rgba(8,9,10,1);
    box-shadow: 0px 0px 218px 79px rgba(8,9,10,1);
    border-radius: 5px;
    overflow: hidden;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1000;
    scroll-behavior: smooth;
  }

  /* Chat messages */
  .chat-messages {
    display: flex;
    flex-direction: column;
    padding: 1rem;
    overflow-y: scroll;
    width: 100%;
    color: rgb(228, 230, 232);
  }

  /* align User messages to right side of window*/
  .user-message {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
    margin: 2rem;
    border: #8c52ff 1px solid;
    border-radius: 17px;
    word-wrap: break-word;
    width: 20%;
    align-self: flex-end;
    padding: 1rem;
  }

  /* Bot messages */
  .bot-message {
    display: flex;
    flex-direction: row;
    margin: 2rem;
    border: #87FF65 1px solid;
    border-radius: 17px;
    word-wrap: break-word;
    width: 30%;
    align-self: flex-start;
    padding: 1rem;
  }

  /* Chat input */
  .chat-input {
    display: flex;
    flex-direction: row;
    padding: 1.75rem;
  }

  /* Chat input text box */
  .chat-input input[type="text"] {
    flex: 1;
    margin-right: 10px;
    border: none;
    border-radius: 5px;
    padding: 1rem;
    background-color: #fafffd;
  }

  /* Chat input send button */
  .chat-input button {
    border: none;
    border-radius: 5px;
    padding: 5px 10px;
    background-color: #87FF65;
    color: black;
    cursor: pointer;
  }

  /* Chat input send button hover */
  .chat-input button:hover {
    background-color: #8c52ff;
  }

    /* Chat window background */
    .bg {
        background-color: #87FF65;
        height: 40%;
        width: 100%;
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    /* Chat window title */
    .bg h1 {
        font-size: 2rem;
        color: #4d4f54;
        margin: 0;
    }

    /* Chat window title span */
    .bg h1 span {
        font-size: 1.5rem;
        color: #08090a;
    }

    /* open and close chat button */
    .chat-button {
        position: fixed;
        top: 50%;
        right: 5%;
        margin: 1.75rem;
        padding: 1rem;
        border: none;
        border-radius: 17px;
        background-color: #8c52ff;
        color: black;
        cursor: pointer;
        transform: translate(-50%, -50%);
    }

    /* chat button pulse animate when clicked and let the animation play 1s after its clicked */
    .chat-button:active {
        transform-origin: center;
        transition: transform 0.5s ease-in-out;
        transform: scale(0.9);
    }

    @media screen and (max-width: 768px) {
        .chat-window {
            width: 100%;
            height: 100%;
            border-radius: 0;
            border: none;
            -webkit-box-shadow: none;
            -moz-box-shadow: none;
            box-shadow: none;
            position: fixed;
            top: 0;
            left: 0;
            transform: translate(0, 0);
        }

        .chat-window .bg {
            height: 20%;
        }

        .chat-window .chat-messages {
            height: 78%;
        }

        .chat-window .user-message {
            width: 50%;
        }

        .chat-window .bot-message {
            width: 50%;
        }

        .chat-window .chat-input {
            height: 8%;
        }

        .chat-window .chat-input button {
            padding: 1rem;
        }

        .chat-button {
            position: absolute;
            top: -7%;
            right: -12%;
            z-index: 9999;
            background-color: #87FF65;
        }
    }
    
</style>
