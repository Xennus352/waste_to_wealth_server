import { Router } from "express";
import { currentUser, deleteUser, getSingleUser, getUsers, updateUser } from "../controllers/users.controller";


const router = Router();

// Route to get all users
router.get("/", getUsers);

//Route to get current user
router.get("/current-user", currentUser);

// Route to get a single user by ID
router.get("/:id", getSingleUser);

// Route to update a post by ID
router.put("/:id", updateUser);

// Route to delete a post by ID
router.delete("/:id", deleteUser);

export default router;
