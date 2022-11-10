import { Router } from "express";
import AuthController from "./controllers/AuthController.js";

const routes = new Router();
var auth = new AuthController();

routes.get("/listUsers", auth.listUsers);

export default routes;
