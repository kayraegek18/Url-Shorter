<script>
    import { getCookie, setCookie } from 'svelte-cookie';
    import CheckUserCookie from '../lib/CheckUserCookie.svelte';

    let token = getCookie('token');
</script>

<CheckUserCookie token={token} successCallback={() => { setCookie('token', '', { expires: -1 }); window.location.href = "/"; }} errorCallback={(msg) => { token = null; console.log(msg); window.location.href = "/"; }} />

<svelte:head>
    <title>Logout</title>
</svelte:head>

<main>
    <label for="">Logouting...</label>
</main>

<style>
    main {
        width: 100vw;
        height: auto;
        min-height: 100vh;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: rgb(25, 25, 25);
        color: #fff;
    }

    main label {
        font-size: 2rem;
    }
</style>