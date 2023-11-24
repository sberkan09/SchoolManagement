import type { NextApiRequest, NextApiResponse } from 'next'
import mysql from "mysql2/promise"
 
type ResponseData = {
  TC_NO: string
  ISIM: string
}

async function main() {
  // create the connection
  const connection = await mysql.createConnection({host:'srv507.hstgr.io', user: 'u828725825_root', password:'Beytulayse372', database: 'u828725825_bil372'});
  // query database
  try {
    const [data] = await connection.execute('select * from `ogrenci`', []);
    connection.end();
    return data;
  } catch (error) {
    return error.message;
  }
}
 
export default async function handler(req, res) {
  res.status(200).json({ students: await main() })
}