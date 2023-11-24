import mysql from "mysql2/promise"

class DB {
    static connection;
    constructor() {
        if (!DB.connection) {
            DB.connection = getDBInstance();
        }
        return DB.connection;
    }
}

async function getDBInstance() {
    if (!DB.connection) {
        try {
            return DB.connection = await mysql.createConnection({host:'srv507.hstgr.io', user: 'u828725825_root', password:'Beytulayse372', database: 'u828725825_bil372'});
        } catch (error) {
            return error.message;
        }
    }
    return DB.connection;
}

export default async function Exp() {
    await new DB()
    return DB.connection;
};