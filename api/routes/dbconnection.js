import  express  from "express";
import Controller  from '../controllers/connection.js';

const router = express();
router.post("/logs",Controller.loginserverurisimple) //connexion et insertion de serveur sans authentication
router.post("/logns", Controller.loginserver) // connexion et insertion de serveur avec authentication
router.get("/getconnections",Controller. getallConnection) // affichage de tout connexion
router.get("/getdatabases", Controller.getdatabases) // affichage de databases of connected server
router.get("/getdatabasesuri", Controller.loguri) // connexion sans insertion
router.get("/getCollections", Controller.getCollections) //affichage des collections of connected server
router.get("/getCollectiondata", Controller.getCollectiondata) //affichage des keys of collection

export default router