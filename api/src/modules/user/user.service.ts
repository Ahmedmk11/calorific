import { Injectable } from '@nestjs/common'
import { InjectModel } from '@nestjs/mongoose'

import { CreateUserDto } from './dto/create-user.dto'
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

    async checkUsernameAvailability(
        username: string
    ): Promise<{ message: number }> {
        try {
            const isTaken = await this.userModel.findOne({
                where: { username },
            })
            return isTaken ? { message: 200 } : { message: 202 }
        } catch (error) {
            return { message: 500 }
        }
    }

    async checkEmailAvailability(email: string): Promise<{ message: number }> {
        try {
            const isTaken = await this.userModel.findOne({
                where: { email },
            })
            return isTaken ? { message: 200 } : { message: 202 }
        } catch (error) {
            return { message: 500 }
        }
    }

    async checkPhoneAvailability(phone: string): Promise<{ message: number }> {
        try {
            const isTaken = await this.userModel.findOne({
                where: { phoneNumber: phone },
            })
            return isTaken ? { message: 200 } : { message: 202 }
        } catch (error) {
            return { message: 500 }
        }
    }
}
