<script>
    import { getCookie, setCookie } from 'svelte-cookie';
    import axios from 'axios';
    import sha256 from 'crypto-js/sha256';
    import CheckUserCookie from '../lib/CheckUserCookie.svelte';
    import Navbar from '../components/Navbar.svelte';

    let token = getCookie('token');

    let username = "";
    let email = "";
    let password = "";

    async function register() {
        let hashedPassword = sha256(password).toString();
        try {
            const res = await axios.post('http://127.0.0.1:8000/user/create', {
                user_name: username,
                user_email: email,
                user_password: hashedPassword
            });
            if (res.data.error) {
                console.log(res.data.error);
                return;
            }

            token = res.data.user_id;
            setCookie('token', token, { expires: 7 });
            window.location.href = "/dashboard";
        } catch (error) {
            console.log(error);
        }
    }
</script>

<CheckUserCookie token={token} successCallback={() => { token = null; window.location.href = "/"; }} errorCallback={(msg) => {  }} />

<svelte:head>
    <title>Register</title>
</svelte:head>

<main>
    <Navbar token={token} />

    <div class="container">
        <div class="form-container">
            <h1>Register</h1>
            <input type="text" name="username" placeholder="Username" bind:value={username} required>
            <input type="email" name="username" placeholder="Email" bind:value={email} required>
            <input type="password" name="password" placeholder="Password" bind:value={password} required>
            <button type="submit" on:click={register}>Register</button>
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
        height: auto;
        min-height: 80vh;

        display: flex;
        justify-content: center;
        align-items: center;
    }

    .form-container {
        width: 50%;
        height: auto;
        min-height: 50vh;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .form-container {
        width: 30%;
        height: auto;
        min-height: 50vh;

        display: flex;
        justify-content: center;
        align-items: center;
        flex-direction: column;
    }

    .form-container input {
        width: 50%;
        height: 2rem;
        margin: 0.5rem 0;
        padding: 0.5rem;

        border: none;
        border-radius: 0.5rem;
    }

    .form-container button {
        width: 50%;
        height: 2rem;
        margin: 0.5rem 0;
        padding: 0.5rem;

        border: none;
        border-radius: 0.5rem;

        background-color: rgb(25, 25, 25);
        color: #fff;
    }

    .form-container button:hover {
        background-color: rgb(50, 50, 50);
    }
</style>