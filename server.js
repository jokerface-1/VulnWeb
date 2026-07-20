import app from "./app.js";
import db from "./controller/db.js";

db.connect();
app.listen(3000, ()=>{
    console.log("listening")
})