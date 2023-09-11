<script>
  import { Router, Route } from 'svelte-routing';

  import Home from './views/Home.svelte';
  import Redirect from './views/Redirect.svelte';
    import Login from './views/Login.svelte';
    import Dashboard from './views/Dashboard.svelte';
    import Register from './views/Register.svelte';
    import Logout from './views/Logout.svelte';

  export let url;
  url = window.location.pathname;
</script>

<main>
  <Router {url}>
    <Route path="/" component={Home} />
    <Route path="/:id" component={Redirect} let:params />
    <Route path="/login" component={Login} />
    <Route path="/register" component={Register} />
    <Route path="/dashboard" component={Dashboard} />
    <Route path="/logout" component={Logout} />
  </Router>
</main>

<style>
  
</style>
