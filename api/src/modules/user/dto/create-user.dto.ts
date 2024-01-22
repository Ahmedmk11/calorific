import { IsEmail, IsEnum, IsString } from 'class-validator'

export enum Sex {
    Male = 'male',
    Female = 'female',
}

export class CreateUserDto {
    @IsString()
    username: string

    @IsString()
    name: string

    @IsEmail()
    email: string

    @IsString()
    password: string

    @IsString()
    birthdate: Date

    @IsEnum(Sex)
    sex: Sex

    @IsString()
    phoneNumber: string
}
