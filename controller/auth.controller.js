import e from "express";
import db from "./db.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"

const salt = 10;

export const register = async(req, res)=>{
    const name  = req.body['name'];
    const mail = req.body['mail'];
    const pass = req.body['pass'];
if (
    !name?.trim() ||
    !mail?.trim() ||
    !pass?.trim()
) {
    return res.status(400).json({
        message: "All fields are required"
    });
}
    else{
        const checkUser = await db.query("select * from register where mail = $1", [mail])
        if (await checkUser.rows.length > 0){
            res.status(409).json({
                status:"mail already existed try login"
            })
        }
        else{
            bcrypt.genSalt(salt, async(err, salt)=>{
                bcrypt.hash(pass, salt, async(err, hash)=>{
                    await db.query("INSERT INTO register(name, mail, password) VALUES($1, $2, $3)" , [name, mail, hash])
                    res.status(201).json({
                        status:"data created"
                        })
                })
            })
 
        }
     
    }
}

export const login = async(req, res)=>{
    const mail = req.body['mail'];
    const pass = req.body['pass'];
    const query = await db.query("SELECT * FROM register where mail = $1", [mail])
    if(query.rows.length > 0){
        console.log(" we in")
         bcrypt.compare(pass, query.rows[0].password, async(err, hash)=>{
            if(hash){
                const token = jwt.sign({
                    id:query.rows[0].id,
                    email:query.rows[0].mail
                },
                "secret",{
                    expiresIn:"1h"
                }
            )
                res.status(200).json({
                    "message":"User match",
                    token
                })
            }
            else{
                const query = await db.query("select * from flags where attack=$1", ["User Enumeration"])
                res.status(401).json({
                    "message":"Password not match",
                    "Flag":query.rows[0].flag
                })
            }
        })
    }
    else{
        const query = await db.query("select * from flags where attack=$1", ["User Enumeration"])
        res.json({
            "message":"Mail Not Exist",
            "Flag":query.rows[0].flag
        })
    }
}

export const getprofile = (req, res)=>{
    res.json({
        profile:true,
        "user":req.user
    })
}

export const adminPage = async(req, res)=>{
    const query = await db.query("select * from flags where attack=$1",["JWT_Secret"])
    if(query.rows.length > 0){
        res.json({
            "Flag": query.rows[0].flag
        })
    }
    else{
        console.log("No Flag")
    }
}