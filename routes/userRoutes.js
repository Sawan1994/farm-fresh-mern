const express = require('express');
const userController = require('../controllers/userController');

const { getAllUsers, createUser, getUser, deleteUser } = userController;

const userRouter = express.Router();

userRouter.route('/').get(getAllUsers).post(createUser);
userRouter.route('/:id').get(getUser).delete(deleteUser);

module.exports = userRouter;
