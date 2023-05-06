import { createUser, login } from '../controllers/auth.js';
import  express  from "express";

const router = express();

router.post("/signup", createUser)
router.post("/login", login)





export default router