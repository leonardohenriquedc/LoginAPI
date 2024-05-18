
import postgres from 'postgres';

const { PGHOST, PGDATABASE, PGUSER, PGPASSWORD, ENDPOINT_ID } = process.env;

const URL = `postgresql://primeiroBD_owner:DBysk3Y5vmKt@ep-damp-bread-a5htyirz.us-east-2.aws.neon.tech/loginDataBase?sslmode=require`

export const sql = postgres(URL, {ssl: 'import'});
