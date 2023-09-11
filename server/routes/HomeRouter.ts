import { Router } from "https://deno.land/x/oak@v12.6.1/mod.ts";
import { getLink, getAllLinks, getLinks, addLink, removeLink } from '../utils/LinkUtils.ts';

const router = new Router();

router.get("/links", async (ctx): Promise<void> => {
    try {
        const result = await getAllLinks();
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            error: error
        };
    }
});
router.post("/links", async (ctx): Promise<void> => {
    const { owner, id } = await ctx.request.body({ type: 'json' }).value;

    if (owner) {
        try {
            const result = await getLinks(owner);
            ctx.response.body = result;
        } catch (error) {
            ctx.response.status = 500;
            ctx.response.body = {
                error: error
            };
        }
        return;
    }

    try {
        const result = await getLink(id);

        if (result === undefined || result === null) {
            ctx.response.status = 404;
            ctx.response.body = {
                error: "Invalid link id"
            };
            return;
        }

        if (result.length <= 0) {
            ctx.response.status = 404;
            ctx.response.body = {
                error: "Invalid link id"
            };
            return;
        }

        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            error: error
        };
    }
});

router.post("/links/create", async (ctx): Promise<void> => {
    const { owner, linkName, linkTarget } = await ctx.request.body({ type: 'json' }).value;

    if (owner === undefined || owner === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid link owner"
        };
        return;
    }

    if (linkName === undefined || linkName === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid link name"
        };
        return;
    }

    if (linkTarget === undefined || linkTarget === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid link target"
        };
        return;
    }

    try {
        const result = await addLink(owner, linkName, linkTarget);
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            error: error
        };
    }    
});

router.post("/links/remove", async (ctx): Promise<void> => {
    const { owner, id } = await ctx.request.body({ type: 'json' }).value;

    if (owner === undefined || owner === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid link owner"
        };
        return;
    }

    if (id === undefined || id === null) {
        ctx.response.status = 400;
        ctx.response.body = {
            error: "Invalid link id"
        };
        return;
    }

    try {
        const ownerLinks = await getLinks(owner);

        if (ownerLinks === undefined || ownerLinks === null) {
            ctx.response.status = 404;
            ctx.response.body = {
                error: "Invalid link owner"
            };
            return;
        }

        if (ownerLinks.length <= 0) {
            ctx.response.status = 404;
            ctx.response.body = {
                error: "Invalid link owner"
            };
            return;
        }
        
        let linkExists = false;
        for (let i = 0; i < ownerLinks.length; i++) {
            if (ownerLinks[i].link_id === id) {
                linkExists = true;
                break;
            }
        }
        

        if (!linkExists) {
            ctx.response.status = 404;
            ctx.response.body = {
                error: "Invalid link id"
            };
            return;
        }

        const result = await removeLink(id);
        ctx.response.body = result;
    } catch (error) {
        ctx.response.status = 500;
        ctx.response.body = {
            error: error
        };
    }
});

export default router;