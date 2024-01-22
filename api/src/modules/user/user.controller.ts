import { Controller, Post, Body, Param } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register-user')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

    @Post('check-username-taken/:username')
    async checkUsernameAvailability(@Param('username') username: string) {
        return this.userService.checkUsernameAvailability(username)
    }

    @Post('check-email-taken/:email')
    async checkEmailAvailability(@Param('email') email: string) {
        return this.userService.checkEmailAvailability(email)
    }

    @Post('check-phone-taken/:phone')
    async checkPhoneAvailability(@Param('phone') phone: string) {
        return this.userService.checkPhoneAvailability(phone)
    }
}
