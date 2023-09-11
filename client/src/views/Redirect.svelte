<script>
    import axios from 'axios';
    import App from '../App.svelte';
    export let id;

    let hasError = false;
    let errorMessage = '';
    async function get() {
        try {
            const date = Date.now();
            const res = await axios.post(`http://127.0.0.1:8000/links`, { id });
            const ms = Date.now() - date;
            console.log(`${ms}ms`);
            console.log(res.data.link_target);
            window.location.href = res.data.link_target;
        } catch (error) {
            if (!error.response) {
                console.log(error);
                return;
            }
            if (!error.response.status) {
                console.log(error);
                return;
            }
            if (error.response.status == 404) {
                hasError = true;
                errorMessage = error.response.data.error;
            } else {
                hasError = true;
                errorMessage = 'Something went wrong';
            }
        }
    }
    get();
</script>

<svelte:head>
    <title>Redirecting...</title>
    <meta name="description" content="Mineala Url Shorter">
</svelte:head>

<main>
    {#if hasError}
        <label for="">{errorMessage}</label>
    {:else}
        <label for="">Redirecting...</label>
    {/if}

</main>

<style>
    main {
        width: 100vw;
        height: 100vh;

        display: flex;
        justify-content: center;
        align-items: center;

        background-color: rgb(25, 25, 25);
        color: #fff;
    }

    main label {
        font-size: 2rem;
    }
</style>