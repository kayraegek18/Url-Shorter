<script>
    export let token;
</script>

<nav>
    <img class="logo" src="/vite.svg" alt="logo">
    <div class="buttons">
        <a href="/">Home</a>
        {#if token}
            <a href="/dashboard">Dashboard</a>
            <a href="/logout">Logout</a>
        {:else}
            <a href="/login">Login</a>
            <a href="/register">Register</a>
        {/if}
    </div>
</nav>

<style>
    nav {
        width: 100%;
        height: 5rem;
        padding-top: 50px;

        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center;

        background-color: rgb(25, 25, 25);
        color: #fff;
    }

    nav .buttons {
        margin-top: 25px;
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 1rem;
    }

    nav .logo {
        width: 5rem;
        height: 5rem;
        margin-top: 50px;
    }

    nav a {
        font-size: 1.5rem;
        text-decoration: none;
        color: #fff;
    }
</style>