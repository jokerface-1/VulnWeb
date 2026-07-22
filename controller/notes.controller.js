import db from "./db.js"

export const notes = async(req, res)=>{
    const title = req.body['title']
    const text = req.body['text']
    if(!title || !text){
           return res.json({
                "data":req.user.id,
                "message":"Give something",
    })

}
else{
    const query = await db.query("insert into notes(title, content, user_id) VALUES($1, $2, $3)", [title, text, req.user.id])
    if(query){
        return res.json({
            "message":"data inserted"
        })
    }
    else{
        return res.json({
            "message":"error"
        })
    }
}
}

export const getnotes = async(req, res)=>{
    const id = req.user.id;
    const param = req.params.id
    console.log(param)
    const query = await db.query("SELECT content FROM notes where user_id=$1 and user_id=$2", [id, param])
    if(query.rows.length <= 0){
        return res.json({
            "message":"No data in that id just create something"
        })
    }
    else{
        return res.json({
            "greetings":"hello",
            "Data":query.rows
        })
    }
}

export const updatenotes = async(req, res)=>{
    const id = req.user.id;
    const content = req.body['text']
    const param = req.params.id
    console.log(param)
    const query = await db.query("update notes set content=$1 where user_id=$2 and user_id=$3", [content ,id, param])
    if(query){
        return res.json({
            "message":"data inserted"
        })
    }
    else{
        return res.json({
            "greetings":"No data in that id"
        })
    }
}

export const deletenotes = async(req, res)=>{
    const id = req.user.id;
    const param = req.params.id
    console.log(param)
    const query = await db.query("DELETE FROM notes WHERE user_id = $1 AND user_id = $2", [id, param])
    if(query){
        return res.json({
            "message":"data deleted"
        })
    }
    else{
        return res.json({
            "greetings":"No data in that id"
        })
    }
}