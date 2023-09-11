<script>
    import { getCookie } from 'svelte-cookie';
    import CheckUserCookie from '../lib/CheckUserCookie.svelte';
    import Navbar from '../components/Navbar.svelte';
    import axios from 'axios';
    import { onMount } from 'svelte';

    let token = getCookie('token');

    let links = [];
    function loadLinks() {
        links = [];
        axios.post('http://127.0.0.1:8000/links', {
            owner: token
        }).then((res) => {
            if (res.data.error) {
                console.log(res.data.error);
                return;
            }
            links = res.data;
        }).catch((err) => {
            console.log(err);
        });
    }
    loadLinks();

    let linkName = "";
    let linkTarget = "";

    function newLink() {
        axios.post('http://127.0.0.1:8000/links/create', {
            owner: token,
            linkName,
            linkTarget,
        }).then((res) => {
            if (res.data.error) {
                console.log(res.data.error);
                return;
            }

            loadLinks();

            linkName = "";
            linkTarget = "";
            document.getElementById("newLinkPopup").style.display = "none";
        }).catch((err) => {
            console.log(err);
        });
    }

    function removeLink(id) {
        axios.post('http://127.0.0.1:8000/links/remove', {
            owner: token,
            id
        }).then((res) => {
            if (res.data.error) {
                console.log(res.data.error);
                return;
            }

            loadLinks();
        }).catch((err) => {
            console.log(err);
        });
    }

    onMount(() => {
        let newLinkButton = document.getElementById("newLink");
        let newLinkPopup = document.getElementById("newLinkPopup");

        newLinkButton.addEventListener("click", () => {
            newLinkPopup.style.display = "flex";
        });
    });
</script>

<CheckUserCookie token={token} successCallback={() => console.log("Logged in")} errorCallback={(msg) => { token = null; console.log(msg); window.location.href = "/"; }} />

<svelte:head>
    <title>Dashboard</title>
</svelte:head>

<main>
    <Navbar token={token} />

    <div class="container">
        <label for="">Your links:</label>
        <button id="newLink">New Link</button>
        <div class="links">
            {#each links as link}
                <div class="link">
                    <a href='http://localhost:5173/{link.link_id}' target="_blank" rel="noopener noreferrer">{link.link_name}</a>
                    <button class="success" on:click={() => { navigator.clipboard.writeText(`http://localhost:5173/${link.link_id}`); alert("Copied to clipboard!") }}>Copy</button>
                    <button class="danger" on:click={() => { removeLink(link.link_id) }}>Remove</button>
                </div>
            {/each}
        </div>
    </div>

    <div class="newLinkPopup" id="newLinkPopup">
        <label for="">Creating new link...</label>
        <input type="text" placeholder="Link Name" bind:value={linkName}>
        <input type="text" placeholder="Link Target" bind:value={linkTarget}>
        <button on:click={newLink}>Submit</button>
    </div>
</main>

<style>
    main {
        width: 100vw;
        height: auto;
        min-height: 100vh;

        background-color: rgb(25, 25, 25);
        color: #fff;
    }
    
    .container {
        width: 100%;
        margin-top: 10rem;
        height: auto;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container label {
        font-size: 2rem;
    }

    .container button {
        width: 5rem;
        height: 2rem;
        margin: 1rem;
        border: none;
        border-radius: 0.5rem;
        background-color: rgb(50, 50, 50);
        color: #fff;
        font-size: 1rem;
        cursor: pointer;
    }

    .container button.danger {
        background-color: rgb(255, 80, 80);
    }

    .container button.success {
        background-color: rgb(135, 255, 80);
        color: #121212;
    }

    .container .links {
        width: 100%;
        height: auto;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;
    }

    .container .links .link a {
        font-size: 1.5rem;
        margin: 1rem;
        text-decoration: underline;
        color: #fff;
    }

    .newLinkPopup {
        width: 100vw;
        height: 100vh;
        min-height: 100vh;
        position: fixed;
        top: 0;
        left: 0;
        background-color: rgba(25, 25, 25, 0.9);
        display: none;
        justify-content: center;
        flex-direction: column;
        align-items: center;
        z-index: 9999;
        gap: 1rem;
    }

    .newLinkPopup label {
        font-size: 2rem;
    }

    .newLinkPopup input {
        width: 25%;
        height: 2rem;
        margin: 0.5rem 0;
        padding: 0.5rem;

        border: none;
        border-radius: 0.5rem;
    }

    .newLinkPopup button {
        width: 12.5%;
        height: 2rem;
        margin: 0.5rem 0;
        padding: 0.5rem;

        border: none;
        border-radius: 0.5rem;

        background-color: rgb(135, 255, 80);
        color: #121212;
        cursor: pointer;
    }
</style>