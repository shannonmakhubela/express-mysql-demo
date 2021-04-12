/***************************************
 * @ Shannon Makhuela
 ***************************************/
const express = require('express');
const router = express.Router();
const controller = require('../controller/account_controller');

// instatiate controller.
const userController = new controller();

// register router
router.post('/register', (req,res,next) => userController.account_Register(req,res,next));
// account Login.
router.post('/login', (req,res,next) =>userController.account_Login(req,res,next));
// account update.
router.patch('/update_account/:accountid', (req,res,next) =>userController.update_account(req,res,next));
// delete account.
router.delete('/delete_account/:accountid', (req,res,next) =>userController.delete_account(req,res,next));
//fetch all accounts
router.get('/fetch_all_accounts', (req,res,next) => userController.fetch_all_accounts(req,res,next));
//fetch single account.
router.get('/fetch_account/:accountid', (req,res,next) => userController.fetch_account(req,res,next));
// deactivate User.
router.get('/deactivate_account/:accountid', (req,res,next) => userController.deactivate_account(req,res,next));
//activate
router.get('/activate_account/:accountid', (req,res,next) => userController.activate_account(req,res,next));

// export router
module.exports = router ;