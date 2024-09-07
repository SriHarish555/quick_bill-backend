/**
 * @swagger
 * components:
 *   schemas:
 *     OTP:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "sriharish7635@gmail.com"
 *     VerifyOTP:
 *       type: object
 *       properties:
 *         email:
 *           type: string
 *           example: "sriharish7635@gmail.com"
 *         otp:
 *           type: string
 *           example: "123456"
 *     SuperAdmin:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *           example: "Sri Harish"
 *         email:
 *           type: string
 *           example: "sriharish7635@gmail.com"
 *         pwd:
 *           type: string
 *           example: "securepassword123"
 *         adminId:
 *           type: string
 *           example: "admin123"
 
 */

/**
 * @swagger
 * tags:
 *   - name: "OTP"
 *     description: "APIs related to OTP functionalities"
 */

/**
 * @swagger
 * tags:
 *   - name: "Super Admin"
 *     description: "APIs related to Super Admin functionalities"
 */

/**
 * @swagger
 * /otp:
 *   post:
 *     summary: Generate an OTP
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/OTP'
 *     responses:
 *       200:
 *         description: OTP generated successfully
 *       400:
 *         description: Validation Error
 */

/**
 * @swagger
 * /otp/verify:
 *   post:
 *     summary: Verify an OTP
 *     tags: [OTP]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/VerifyOTP'
 *     responses:
 *       200:
 *         description: OTP verified successfully
 *       400:
 *         description: Validation Error
 */

/**
 * @swagger
 * /super/admin/register:
 *   post:
 *     summary: Register a Super Admin
 *     tags: [Super Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SuperAdmin'
 *     responses:
 *       201:
 *         description: Super Admin created successfully
 *       400:
 *         description: Validation Error
 *       500:
 *         description: Server Error
 */

/**
 * @swagger
 * /super/admin/create:
 *   post:
 *     summary: Create a Root Admin
 *     tags: [Super Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/SuperAdmin'
 *     responses:
 *       201:
 *         description: Root Admin created successfully
 *       400:
 *         description: Validation Error
 *       500:
 *         description: Server Error
 */
