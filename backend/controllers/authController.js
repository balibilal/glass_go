import { User } from "../model/users.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';


export const getallUser = async (req, res) => {
    const users = await User.find();
    res.json(users)
  }

export const createUser = async (req, res, next) => {

   
    try {
        bcrypt.hash(req.body.password, 10, async function(err, hash) {
           
            req.body.password = hash;

            if(!err){
            const user = await User.create(req.body);
            if(user){
            res.json({
                message: 'new user has been created'
            })
        }

        }
        })
        
    } catch (error) {
        next(error)
    }
  }
  export const loginUser = async (req, res, next) => {
   
    try {
        const { email, password } = req.body;

        if(!email){
            return next(new Error('please provide email'))
        }
        if(!password){
            return next(new Error('please provide password'))
        }

        const user = await User.findOne({email})

        if(!user){
            return next(new Error('invalid email. Please create your account'))
        }

        const isMatched = await bcrypt.compare(password, user.password);

        if(!isMatched){
            return next(new Error('password is incorrect'))
        }


        // jwt authorized
        const token = await jwt.sign({user: user}, process.env.JWT_SECRET, { expiresIn: '1h' });
        
        res.cookie('token', token, {httpOnly: true,}).json({
            user,
            token
        })

    } catch (error) {
        next(error)
    }
  };

  export const logoutUser = async (req, res, next) => {
    // res.clearCookie('token', {httpOnly: true}).json({
    //     message: 'logged out'
    // })

    res.cookie("token", "", {expires: new Date(Date.now())}).json({
        message: 'Logged out'
    });
  };




  export const deleteUser = async (req, res) => {
    try {
      const { id } = req.params;
  
      // if (!id) {
      //   return res.status(400).json({ error: "User Not Found." });
      // }
  
      const deleteUser = await User.findByIdAndDelete(id);
      // if (!deleteUser) {
      //   return res.status(404).json({ error: "User not found." });
      // }
      res.json({ message: "User Delete successfully.", deleteUser });
    } catch (error) {
      console.error("Error updating status:", error);
      res.status(500).json({ error: "Internal server error." });
    }
  };