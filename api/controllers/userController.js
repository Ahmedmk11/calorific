import UserModel from '../models/userModel.js'
import { fileURLToPath } from 'url'
import path, { dirname } from 'path'
import dotenv from 'dotenv'

const currentFileUrl = import.meta.url
const currentFilePath = fileURLToPath(currentFileUrl)
const __dirname = dirname(currentFilePath)
dotenv.config({ path: path.join(__dirname, '.env') })

async function createUser(req, res) {
    try {
        const {
            username,
            name,
            email,
            password,
            birthdate,
            gender,
            phoneNumber,
        } = req.body

        const newUser = new UserModel({
            username,
            name,
            email,
            password,
            birthdate,
            gender,
            phoneNumber,
        })

        await newUser.save()
        res.status(201).json(newUser)
    } catch (err) {
        console.error('Error creating user:', err)
        res.status(500).json(err)
    }
}

const checkUsernameAvailability = async (req, res) => {
    try {
        const { username } = req.params
        console.log(username)
        const isTaken = await UserModel.findOne({ username: username })
        console.log(isTaken)
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const checkEmailAvailability = async (req, res) => {
    try {
        const { email } = req.params
        console.log(email)
        const isTaken = await UserModel.findOne({ email: email })
        console.log(isTaken)
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

const checkPhoneAvailability = async (req, res) => {
    try {
        const { phone } = req.params
        console.log(phone)
        const isTaken = await UserModel.findOne({ phoneNumber: phone })
        console.log(isTaken)
        if (!isTaken) {
            res.status(202).json({ message: 202 })
        } else {
            res.status(200).json({ message: 200 })
        }
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

export {
    createUser,
    checkUsernameAvailability,
    checkEmailAvailability,
    checkPhoneAvailability,
}
