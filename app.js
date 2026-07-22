import express from "express";
import healthRoutes from "./routes/health.routes.js";
import { adminPage, getprofile, login, register } from "./controller/auth.controller.js";
import { getHealth } from "./controller/health.controller.js";
import bodyParser from "body-parser";
import { adminLogic, logger } from "./middleware/auth.middleware.js";
import { limiter } from "./middleware/ratelimit.middleware.js";
import { deletenotes, getnotes, notes, updatenotes } from "./controller/notes.controller.js";

const app = express();
app.use(bodyParser.urlencoded({extended:true}));

app.use(express.json());
app.use("/health", getHealth);
app.use("/register", register);
app.use("/login",limiter, login)
app.use("/profile",logger ,getprofile)
app.use("/admin",  adminLogic,adminPage)
app.use("/notes", logger, notes)
app.use("/getnotes/:id", logger, getnotes)
app.use("/updatenotes/:id", logger, updatenotes)
app.use("/deletenotes/:id", logger, deletenotes)

export default app;