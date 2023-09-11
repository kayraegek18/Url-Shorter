import { client } from '../index.ts';

export function getLink(link_id: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("SELECT * FROM links WHERE link_id = $1", [link_id]).then((result) => {
            resolve(JSON.stringify(result.rows[0]));
        }).catch((error) => {
            reject(error);
        });
    });
}

export function getLinks(link_owner: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("SELECT * FROM links WHERE link_owner = $1", [link_owner]).then((result) => {
            resolve(result.rows);
        }).catch((error) => {
            reject(error);
        });
    });
}

export function getAllLinks(): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("SELECT * FROM links").then((result) => {
            resolve(JSON.stringify(result.rows));
        }).catch((error) => {
            reject(error);
        });
    });
}

export function addLink(link_owner: string, link_name: string, link_target: string): Promise<string> {
    return new Promise((resolve, reject) => {
        const token = Math.round(Math.random() * 9999).toString() + Math.round(Math.random() * 9999).toString() + Math.round(Math.random() * 9999).toString();

        const date = new Date();
        const day = date.getDate();
        const month = date.getMonth() + 1;
        const year = date.getFullYear();

        const hour = date.getHours();
        const minute = date.getMinutes();
        const second = date.getSeconds();

        const dateNow = `${day}.${month}.${year} ${hour}:${minute}:${second}`;

        client.queryObject("INSERT INTO links (link_id, link_owner, link_target, link_name, link_status, link_createdat) VALUES ($1, $2, $3, $4, $5, $6) RETURNING link_id", [token, link_owner, link_target, link_name, true, dateNow]).then((result) => {
            resolve(JSON.stringify(result.rows[0]));
        }).catch((error) => {
            reject(error);
        });
    });
}

export function updateLink(token: string, link_target: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("UPDATE links SET link_target = $1 WHERE link_id = $2 RETURNING *", [link_target, token]).then((result) => {
            resolve(JSON.stringify(result.rows[0]));
        }).catch((error) => {
            reject(error);
        });
    });
}

export function removeLink(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("DELETE FROM links WHERE link_id = $1", [token]).then((result) => {
            resolve(JSON.stringify("Success"));
        }).catch((error) => {
            reject(error);
        });
    });
}

export function validateLink(link_id: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("SELECT * FROM links WHERE link_id = $1", [link_id]).then((result) => {
            if (result.rows.length <= 0) {
                reject("No link found");
                return;
            }
            resolve(JSON.stringify(result.rows[0]));
        }).catch((error) => {
            reject(error);
        });
    });
}