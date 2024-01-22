import {
    Controller,
    Post,
    Body,
    Res,
    HttpStatus,
    Get,
    Req,
} from '@nestjs/common'
import { AuthService } from './auth.service'

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post('login')
    async login(
        @Body()
        reqBody: {
            emailOrUsername: string
            password: string
            remember: boolean
        },
        @Res() res
    ) {
        try {
            const { emailOrUsername, password, remember } = reqBody
            const result = await this.authService.login(
                emailOrUsername,
                password,
                remember
            )
            res.cookie('token', result.token, {
                secure: true,
                sameSite: 'None',
                httpOnly: true,
                maxAge: remember
                    ? 30 * 24 * 60 * 60 * 1000
                    : 2 * 60 * 60 * 1000,
            })

            console.log('Token', result.token)

            return res
                .status(HttpStatus.OK)
                .json({ token: result.token, data: { user: result.data.user } })
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message })
        }
    }

    @Post('logout')
    async logout(@Res() res) {
        try {
            const result = await this.authService.logout()
            res.clearCookie('token')
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message })
        }
    }

    @Get('get-curr-user')
    async getCurrUser(@Req() req, @Res() res) {
        try {
            const token = req.cookies.token
            const result = await this.authService.getCurrUser(token)
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message })
        }
    }

    @Post('change-password')
    async changePassword(
        @Body()
        reqBody: {
            id: number
            email: string
            oldPassword: string
            newPassword: string
        },
        @Res() res
    ) {
        try {
            const result = await this.authService.changePassword(
                reqBody.id,
                reqBody.email,
                reqBody.oldPassword,
                reqBody.newPassword
            )
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message })
        }
    }

    @Post('generate-send-otp')
    async generateAndSendOTP(@Body() reqBody: { email: string }, @Res() res) {
        try {
            const result = await this.authService.generateAndSendOTP(
                reqBody.email
            )
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message })
        }
    }

    @Post('validate-otp')
    async validateOTP(
        @Body() reqBody: { otp: string; secret: string },
        @Res() res
    ) {
        try {
            const result = await this.authService.validateOTP(
                reqBody.otp,
                reqBody.secret
            )
            return res.status(HttpStatus.OK).json(result)
        } catch (error) {
            return res
                .status(HttpStatus.INTERNAL_SERVER_ERROR)
                .json({ message: error.message })
        }
    }
}
