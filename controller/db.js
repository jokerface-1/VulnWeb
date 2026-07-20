import PG from "pg";

const db = new PG.Client({
    host:"localhost",
    user:"postgres",
    password:"jokerface",
    database:"vulnWeb",
    port:5432
});

export default db