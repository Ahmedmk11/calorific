import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateUserDto } from './dto/create-user.dto'
import { AddUserPreferencesDto } from './dto/add-user-preferences.dto'

import { User } from '../../models/user.schema'
import { IUser } from '../../models/user.schema'
import { Model } from 'mongoose'

@Injectable()
export class UserService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>
    ) {}

    async createUser(
        createUserDto: CreateUserDto
    ): Promise<{ message: string; user?: typeof User } | { error: string }> {
        try {
            const {
                username,
                name,
                email,
                password,
                birthdate,
                sex,
                phoneNumber,
            } = createUserDto

            const newUser = await this.userModel.create({
                username,
                name,
                email,
                password,
                birthdate,
                sex,
                phoneNumber,
            })

            await newUser.save()
            return {
                message: 'User created successfully',
                user: newUser as unknown as typeof User,
            }
        } catch (err) {
            console.error('Error creating user:', err)
            return { error: 'Internal server error' }
        }
    }

    async addUserPreferences(
        addUserPreferencesDto: AddUserPreferencesDto
    ): Promise<{ message: string; user?: typeof User } | { error: string }> {
        try {
            const {
                _id,
                weight,
                height,
                targetWeight,
                targetWater,
                activityLevel,
                calories,
                carbs,
                proteins,
                fats,
            } = addUserPreferencesDto

            const currUser = await this.userModel.findById(_id)

            if (!currUser) {
                console.error('User not found')
                return { error: 'User not found' }
            }

            currUser.weight_current = weight
            currUser.height = height
            currUser.weight_target = targetWeight
            currUser.water_target = targetWater
            currUser.activity_level = activityLevel
            currUser.daily_preferences.calories = calories
            currUser.daily_preferences.carbs = carbs
            currUser.daily_preferences.proteins = proteins
            currUser.daily_preferences.fats = fats
            currUser.isNewUser = false

            await currUser.save()
            console.log(currUser)
            return {
                message: 'User updated successfully',
                user: currUser as unknown as typeof User,
            }
        } catch (err) {
            console.error('Error updating user:', err)
            return { error: 'Internal server error' }
        }
    }

    async checkUsernameAvailability(
        username: string
    ): Promise<{ message: number }> {
        try {
            const isTaken = await this.userModel.findOne({ username })
            return isTaken ? { message: 200 } : { message: 202 }
        } catch (error) {
            return { message: 500 }
        }
    }

    async checkEmailAvailability(email: string): Promise<{ message: number }> {
        try {
            const isTaken = await this.userModel.findOne({ email })
            return isTaken ? { message: 200 } : { message: 202 }
        } catch (error) {
            return { message: 500 }
        }
    }

    async checkPhoneAvailability(phone: string): Promise<{ message: number }> {
        try {
            const isTaken = await this.userModel.findOne({
                phoneNumber: phone,
            })
            return isTaken ? { message: 200 } : { message: 202 }
        } catch (error) {
            return { message: 500 }
        }
    }
}
