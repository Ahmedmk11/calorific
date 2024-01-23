import { Injectable } from '@nestjs/common'
import { User } from '../../models/user.schema'
import * as jwt from 'jsonwebtoken'
import nodemailer from 'nodemailer'
import notp from 'notp'
import base32 from 'thirty-two'
import crypto from 'crypto'
import {
    changePasswordWithOldPassword,
    changePasswordWithoutOldPassword,
} from '../../utils/changePassword'
import { InjectModel } from '@nestjs/mongoose'
import { IUser } from '../../models/user.schema'
import { Model } from 'mongoose'
import { ConfigService } from '@nestjs/config'

@Injectable()
export class AuthService {
    constructor(
        @InjectModel('User') private readonly userModel: Model<IUser>,
        private readonly configService: ConfigService
    ) {}

    async login(
        emailOrUsername: string,
        password: string,
        remember: boolean
    ): Promise<{ token: string; data: { user: typeof User } }> {
        try {
            const em = emailOrUsername.includes('@')

            const user = em
                ? await this.userModel.findOne({ email: emailOrUsername })
                : await this.userModel.findOne({ username: emailOrUsername })

            const lbl = em ? 'email' : 'username'

            console.log('user', user)

            if (!user) {
                throw new Error(`Invalid ${lbl} or password`)
            }

            const isMatch = await user.comparePassword(password)
            if (!isMatch) {
                throw new Error(`Invalid ${lbl} or password`)
            }

            const token = jwt.sign(
                { userId: user.id },
                this.configService.get<string>('jwtSecret'),
                {
                    expiresIn: remember ? '30d' : '2h',
                }
            )

            return { token, data: { user: user as unknown as typeof User } }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async logout(): Promise<{ message: string }> {
        return { message: 'Logged out' }
    }

    async getCurrUser(token: string): Promise<unknown> {
        try {
            if (token) {
                try {
                    const decoded = jwt.verify(
                        token,
                        this.configService.get<string>('jwtSecret')
                    )
                    const user = await this.userModel.findById(
                        (decoded as any).userId
                    )
                    return user
                } catch (error) {
                    console.error('Error decoding JWT: ', error)
                    throw new Error('Failed to decode JWT')
                }
            } else {
                throw new Error('No JWT token found in cookies')
            }
        } catch (error) {
            throw new Error(error.message)
        }
    }

    async changePassword(
        id: number,
        email: string,
        oldPassword: string,
        newPassword: string
    ): Promise<{ message: string }> {
        let response

        if (oldPassword === 'rem') {
            response = await changePasswordWithoutOldPassword(
                this.userModel,
                email,
                newPassword
            )
        } else {
            response = await changePasswordWithOldPassword(
                this.userModel,
                id,
                oldPassword,
                newPassword
            )
        }

        if (response === 404) {
            throw new Error('User not found')
        } else if (response === 403) {
            throw new Error('Invalid password')
        } else if (response === 500) {
            throw new Error('Error changing password')
        }

        return { message: 'Password changed' }
    }

    async generateAndSendOTP(email: string): Promise<{ secret: string }> {
        const secret = crypto.randomBytes(10).toString('hex')
        const totp = notp.totp.gen(base32.encode(secret), { step: 600 })

        if (!totp || !secret) {
            throw new Error('Error generating OTP')
        }

        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'calorificmail@gmail.com',
                pass: this.configService.get<string>('gmailPassword'),
            },
        })

        const mailOptions = {
            from: 'calorificmail@gmail.com',
            to: email,
            subject: 'OTP for Password Reset',
            html: `
      <!DOCTYPE html>
      <html lang="en" style="padding: 40px; width: 100%;">
          <head>
              <meta charset="UTF-8">
              <meta http-equiv="X-UA-Compatible" content="IE=edge">
              <meta name="viewport" content="width=device-width, initial-scale=1.0">
              <title>Email</title>
          </head>
          <body>
              <h2>Your OTP is ${totp}</h2>

              <p><strong>If you think this is a mistake please login to your account and change the password or contact us.</strong></p>

              <p><strong>This OTP will expire in 10 minutes.</strong></p>
          </body>
      </html>
          `,
        }

        transporter.sendMail(mailOptions, function (error) {
            if (error) {
                console.log(error)
                throw new Error('Error sending email')
            }
        })

        return { secret }
    }

    async validateOTP(
        otp: string,
        secret: string
    ): Promise<{ message: string }> {
        const isValid = notp.totp.verify(otp, base32.encode(secret))

        if (isValid) {
            console.log('OTP is valid')
            return { message: 'OTP is valid' }
        } else {
            console.log('OTP is invalid')
            throw new Error('Invalid OTP')
        }
    }
}
