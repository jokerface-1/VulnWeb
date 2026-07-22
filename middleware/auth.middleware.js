import express from "express"
import  jwt  from "jsonwebtoken";

export const logger = (req, res, next)=>{
    try {
        const auth = req.headers.authorization
        const token = auth.split(" ")[1];
        const decode = jwt.verify(token, "secret")  
        console.log(decode)
        req.user = decode

    next();
    } catch (err) {
        res.json({
            "error":err
        })
    }
}

export const adminLogic = (req, res, next)=>{
    const auth = req.headers.authorization
    const token = auth.split(" ")[1];
    const decode = jwt.verify(token, "secret")  
    req.data = decode
    if(decode.email == "admin@gmail.com"){
          next();
    }
    else{
        console.log("Fuck you U are Not an admin")
    }

  
}