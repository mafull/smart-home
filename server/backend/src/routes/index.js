// -- Node module imports --
import express  from "express";


const router = express.Router();


router.get("/", (req, res) => res.send("INDEX"));
router.get("/hi", (req, res) => res.send("Hello world!"));



export default router;
