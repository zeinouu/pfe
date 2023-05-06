import bcrypt from 'bcryptjs';
import User from '../models/User.js';
import createError  from '../utils/error.js';
import jwt from 'jsonwebtoken';

export const createUser = async (req, res)=>{
 
    const { fname, lname, email, password } = req.body;
    try{
      const salt = bcrypt.genSaltSync(10);
      const hash = bcrypt.hashSync(password, salt);
      const oldUser = await User.findOne({ email });
      if(oldUser){
       return  res.send({error : "User Exists"}); //hatit return khtr l fonction traja3 
      }    //akthr men return donc thot return bch matet3adech leli baadha 
     await User.create({
      fname, 
      lname,
      email,
      password: hash,
     });
     res.send({ message: "User Created Successfully"});
  }catch(error){
    res.status(500).send({ error: `Failed to create user: ${error.message}` });
    }
}

export const login = async (req, res, next) => {
  try {
    const user = await User.findOne({ username: req.body.username });
    if (!user) return next(createError(404, "User not found!"));

    const isPasswordCorrect = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!isPasswordCorrect)
      return next(createError(400, "Wrong password or username!"));

    const token = jwt.sign({},
      process.env.JWT,
      { expiresIn: "24h" }
    );

    const { password, ...otherDetails } = user._doc;
    res
      .cookie("access_token", token, {
        httpOnly: true,
      })
      .status(200)
      .json({ token,details: { ...otherDetails } });
  } catch (error) {
    next({ error: `Failed to create user: ${error.message}` });
  }
};

   /* export const userdata = async(req, res) => {
      const { token } = req.body;
      try {
        const user = jwt.verify(token, process.env.JWT);
        const useremail = user.email;
        User.findOne({ email: useremail }).then((data) => {
          res.send({ status: "ok", data: data});
        }).catch((error) => {
          res.send({ status: "error", data:error});
        });
      }catch (error){}
    }*/




   

 