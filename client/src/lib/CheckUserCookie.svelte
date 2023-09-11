<script>
    import { getCookie, setCookie } from 'svelte-cookie';
    import axios from 'axios';

    export let token = null;
    export let success = false;
    export let successCallback = () => { };
    export let errorCallback = (message) => { };

    async function checkUser() {
        if (!token) {
            success = false;
            errorCallback("");
            return;
        }

        try {
            const res = await axios.post('http://127.0.0.1:8000/user', {
                token
            });
            if (res.data.error) {
                setCookie('token', '', { expires: -1 });
                token = null;
                success = false;
                errorCallback(res.data.error);
                return;
            }
            success = true;
            successCallback();
        } catch (error) {
            console.log(error);
            if (error.response.data.error) {
                setCookie('token', '', { expires: -1 });
                success = false;
                token = null;
                errorCallback(error.response.data.error);
            }
        }
    }
    checkUser();
</script>