import  express  from "express";
import {  deleteUser, getallUser, updateUser } from '../controllers/user.js';
import { createUser } from "../controllers/auth.js";
import User from "../models/User.js";
import { verifyToken } from "../utils/verifyToken";

//import  {verifyAdmin, verifyToken, verifyUser}  from "../utils/verifyToken.js";
const router = express();

router.get('/protectedRoute', verifyToken, (req, res) => {
  // Route handler logic goes here
  res.send('This is a protected route!');
});

//CREATE
router.post('/signup', createUser);
 
//UPDATE
router.put('/:id', updateUser);

//DELETE
router.delete('/:id', deleteUser);

//GET
  router.get('/:id', function(req,res){

  var id = req.params.id;
  User.findById(id, function(err, user){
    res.json(user);
  });

});
//GET ALL
router.get('/', getallUser)

export default router