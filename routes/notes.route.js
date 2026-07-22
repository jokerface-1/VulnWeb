import express from "express"
import { deletenotes, getnotes, notes, updatenotes } from "../controller/notes.controller.js";

const route = express.Router();

route.post("/notes", notes)
route.get("/getnotes/:id", getnotes) 
route.put("/updatenotes/:id", updatenotes)
route.delete("/deletenotes/:id", deletenotes)