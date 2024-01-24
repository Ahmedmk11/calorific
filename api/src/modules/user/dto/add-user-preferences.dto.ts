import { IsNumber, IsString } from 'class-validator'

export class AddUserPreferencesDto {
    @IsString()
    _id: string

    @IsNumber()
    weight: number

    @IsNumber()
    height: number

    @IsNumber()
    targetWeight: number

    @IsNumber()
    targetWater: number

    @IsString()
    activityLevel: string

    @IsNumber()
    calories: number

    @IsNumber()
    carbs: number

    @IsNumber()
    proteins: number

    @IsNumber()
    fats: number
}
