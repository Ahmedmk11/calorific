import { Controller, Post, Body, Param, Patch } from '@nestjs/common'
import { CreateUserDto } from './dto/create-user.dto'
import { AddUserPreferencesDto } from './dto/add-user-preferences.dto'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Post('register-user')
    async createUser(@Body() createUserDto: CreateUserDto) {
        return this.userService.createUser(createUserDto)
    }

    @Patch('add-user-preferences')
    async addUserPreferences(
        @Body() addUserPreferencesDto: AddUserPreferencesDto
    ) {
        return this.userService.addUserPreferences(addUserPreferencesDto)
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
