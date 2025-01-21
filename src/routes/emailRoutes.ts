import { Router } from "express";
import espController from "../controllers/espController";

export const emailRoutes = Router();

emailRoutes.post('/', espController.updateEmail);

