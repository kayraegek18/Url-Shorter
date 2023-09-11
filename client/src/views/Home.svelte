<script>
    import { getCookie } from 'svelte-cookie';
    import CheckUserCookie from '../lib/CheckUserCookie.svelte';
    import Navbar from '../components/Navbar.svelte';
    import axios from 'axios';

    let token = getCookie('token');

    let links = [];
    function loadLinks() {
        links = [];
        axios.get('http://127.0.0.1:8000/links').then((res) => {
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
</script>

<CheckUserCookie token={token} successCallback={() => console.log("Logged in")} errorCallback={(msg) => { token = null; console.log(msg); }} />

<svelte:head>
    <title>Home</title>
</svelte:head>

<main>
    <Navbar token={token} />

    <div class="container">
        <label for="">All Time Links</label>
        <div class="links">
            {#each links as link}
                <div class="link">
                    <a href='http://localhost:5173/{link.link_id}' target="_blank" rel="noopener noreferrer">{link.link_name}</a>
                    <button class="success" on:click={() => { navigator.clipboard.writeText(`http://localhost:5173/${link.link_id}`); alert("Copied to clipboard!") }}>Copy</button>
                </div>
            {/each}
        </div>
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
</style>