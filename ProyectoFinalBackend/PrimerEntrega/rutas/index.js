import { Router } from "express";
import prodRouter from "./productos.js";
import cartRouter from "./cart.js";

const router = Router();

router.use("/productos", prodRouter);
router.use("/carrito", cartRouter);

export default router;