import express from 'express'
import {
    createUser,
    checkUsernameAvailability,
    checkEmailAvailability,
    checkPhoneAvailability,
} from '../controllers/userController.js'

const router = express.Router()

router.post('/register-user', createUser)
router.get('/check-username-availability', checkUsernameAvailability)
router.get('/check-email-availability', checkEmailAvailability)
router.get('/check-phone-availability', checkPhoneAvailability)

export default router
