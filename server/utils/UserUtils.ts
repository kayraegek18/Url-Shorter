import { client } from '../index.ts';

export function getUser(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("SELECT * FROM users WHERE user_id = $1", [token]).then((result) => {
            if (result.rows.length <= 0) {
                reject("No user found");
                return;
            }
            resolve(JSON.stringify(result.rows[0]));
        }).catch((error) => {
            reject(error);
        });
    });
}

export function addUser(user_name: string, user_email: string, user_password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("SELECT * FROM users WHERE user_name = $1 OR user_email = $2", [user_name, user_email]).then((result) => {
            if (result.rows.length > 0) {
                reject("User already exists");
                return;
            }

            createUser(user_name, user_email, user_password).then((result) => {
                resolve(result);
            }).catch((error) => {
                reject(error);
            });
        }).catch((error) => {
            reject(error);
        });
    });
}

export function updateUser(token: string, user_name: string, user_email: string, user_password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("UPDATE users SET user_name = $1, user_email = $2, user_password = $3 WHERE user_id = $4 RETURNING user_id, user_name, user_email, user_pp", [user_name, user_email, user_password, token]).then((result) => {
            resolve(JSON.stringify(result.rows[0]));
        }).catch((error) => {
            reject(error);
        });
    });
}

export function removeUser(token: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("DELETE FROM users WHERE user_id = $1", [token]).then((result) => {
            resolve(JSON.stringify("Success"));
        }).catch((error) => {
            reject(error);
        });
    });
}

export function validateUser(user_email: string, user_password: string): Promise<string> {
    return new Promise((resolve, reject) => {
        client.queryObject("SELECT * FROM users WHERE user_email = $1 AND user_password = $2", [user_email, user_password]).then((result) => {
            if (result.rows.length <= 0) {
                reject("No user found");
                return;
            }
            resolve(JSON.stringify(result.rows[0].user_id));
        }).catch((error) => {
            reject(error);
        });
    });
}

function createUser(user_name: string, user_email: string, user_password: string): Promise<string> {
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
        
        client.queryObject("INSERT INTO users (user_id, user_name, user_email, user_password, user_createdat) VALUES ($1, $2, $3, $4, $5) RETURNING user_id", [token, user_name, user_email, user_password, dateNow]).then((result) => {
            resolve(JSON.stringify(result.rows[0]));
        }).catch((error) => {
            console.log(error);
            reject(error);
        });
    });
}