import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getUser, addUser, validateUser, updateUser } from '../utils/UserUtils.ts';

const router = new Router();

router.post("/user", async (ctx): Promise<void> => {
    const { token } = await ctx.request.body({ type: 'json' }).value;

    if (token === undefined || token === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid token"
        };
        return;
    }

    try {
        const result = await getUser(token);
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            error: error
        };
    }
});

router.post("/user/create", async (ctx): Promise<void> => {
    const { user_name, user_email, user_password } = await ctx.request.body({ type: 'json' }).value;

    if (user_name === undefined || user_name === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid user name"
        };
        return;
    }

    if (user_email === undefined || user_email === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid user email"
        };
        return;
    }

    if (user_password === undefined || user_password === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid user password"
        };
        return;
    }

    try {
        const result = await addUser(user_name, user_email, user_password);
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            error: error
        };
    }
});

router.post("/user/login", async (ctx): Promise<void> => {
    const { user_email, user_password } = await ctx.request.body({ type: 'json' }).value;

    if (user_email === undefined || user_email === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid user email"
        };
        return;
    }

    if (user_password === undefined || user_password === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid user password"
        };
        return;
    }

    try {
        const result = await validateUser(user_email, user_password);
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            error: error
        };
    }
});

router.post("/user/update", async (ctx): Promise<void> => {
    const { token, user_name, user_email, user_password } = await ctx.request.body({ type: 'json' }).value;

    if (token === undefined || token === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid token"
        };
        return;
    }

    if (user_name === undefined || user_name === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid user name"
        };
        return;
    }

    if (user_email === undefined || user_email === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid user email"
        };
        return;
    }

    if (user_password === undefined || user_password === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid user password"
        };
        return;
    }

    try {
        const result = await updateUser(token, user_name, user_email, user_password);
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            error: error
        };
    }
});

export default router;