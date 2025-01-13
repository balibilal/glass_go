import express from 'express';
import { getallUser, createUser, loginUser, logoutUser, deleteUser } from '../controllers/authController.js';
// import { isAuthorized, isAuthunticatedUser } from '../middleware/auth.js';


const router = express.Router();

router.get('/get-all', getallUser);
router.post('/new', createUser);
router.post('/login', loginUser);
router.post('/logout', logoutUser);
router.delete('/delete-user/:id', deleteUser);




export default router;
