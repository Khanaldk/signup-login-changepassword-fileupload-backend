const express=require('express');
const usercontroller=require('../controllers/usercontoller')

const userroutes=express.Router();



/**
 * @swagger
 *  components:
 *    schemas:
 *      userSignup:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          name:
 *           type: string
 *           description: User's Name
 *          email:
 *           type: string
 *           format: email
 *           description: User's email
 *          password:
 *           type: string
 *           description: User's password
 *         
 */

/**
 * @swagger
 *  components:
 *    schemas:
 *      userLogin:
 *        type: object
 *        required:
 *          - name
 *          - email
 *          - password
 *        properties:
 *          email:
 *           type: string
 *           format: email
 *           description: User's email
 *          password:
 *           type: string
 *           description: User's password
 *         
 */



/**
 * @swagger
 * tags:
 *     name: User
 *     description: The user managing API endpoint
 */



/**
 * @swagger
 * /api/user/signup:
 *   post:
 *     summary: Create new user
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userSignup'    
 *     responses:
 *       200:
 *         description: Created User successfully
 *       500:
 *         description: Some Server Error
 */
userroutes.post('/signup',usercontroller.signup);


/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: login user
 *     security:
 *       - jwt: []
 *     tags: [User]
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/userLogin'    
 *     responses:
 *       200:
 *         description: Login User successfully
 *       500:
 *         description: Some Server Error
 */


userroutes.post('/login',usercontroller.login)


/**
 * @swagger
 *  components:
 *    schemas:
 *      ChangePassword:
 *        type: object
 *        required:
 *          - email
 *          - oldpassword
 *          - newpassword
 *        properties:
 *          email:
 *           type: string
 *           format: email
 *           description: User's email
 *          oldpassword:
 *           type: string
 *           description: User's old password
 *          newpassword:
 *           type: string
 *           description: User's new password
*/

/**
 * @swagger
 * /api/user/change-password:
 *   patch:
 *     summary: Change Password
 *     tags: [User]
 *     security:
 *       - jwt: []
 *     requestBody:
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePassword'
 *     responses:
 *       200:
 *         description: Updated password successfully
 *       500:
 *         description: Some Server Error
*/

userroutes.patch('/change-password',usercontroller.changepassword)


// /**
//  * @swagger
//  *  /api/file-upload/doc:
//  *   post:
//  *     summary: Upload a single doc
//  *     tags: [FileUpload]
//  *     requestBody:
//  *       content:
//  *         multipart/form-data:
//  *           schema:
//  *            type: object
//  *            properties:
//  *              doc:
//  *                type: string
//  *                format: binary
//  *     responses:
//  *      200:
//  *          description: Image Uploaded successfully
//  *      500:
//  *          description: Some Server Error
// */
module.exports=userroutes


