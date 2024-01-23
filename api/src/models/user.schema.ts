// user.schema.ts
import * as bcrypt from 'bcrypt'
import mongoose, { Schema, Document } from 'mongoose'

export enum Sex {
    Male = 'male',
    Female = 'female',
}

export interface IUser extends Document {
    username: string
    name: string
    email: string
    password: string
    birthdate: Date
    sex: Sex
    phoneNumber: string
    comparePassword(enteredPassword: string): Promise<boolean>
    food_list?: any[]
    daily_preferences?: { [key: string]: number }
    weight_target?: number
    weight_current?: number
    height?: number
    health_history?: {
        date: Date
        weight: number
        body_fats: number
        muscle_mass: number
        bmi: number
        bmr: number
        pbf: number
        smm: number
    }[]
    activity_level?: string
    diet_history?: {
        date: Date
        calories: number
        proteins: number
        fats: number
        carbs: number
        target: boolean
    }[]
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    sex: { type: String, enum: Object.values(Sex), required: true },
    phoneNumber: { type: String, required: true },
    food_list: { type: Array, default: [] },
    daily_preferences: {
        type: Object,
        default: { calories: 0, carbs: 0, proteins: 0, fats: 0 },
    },
    weight_target: { type: Number, default: 0 },
    weight_current: { type: Number, default: 0 },
    height: { type: Number, default: 0 },
    health_history: { type: Array, default: [] },
    activity_level: {
        type: String,
        enum: [
            'bmr',
            'sedentary',
            'light',
            'moderate',
            'active',
            'very_active',
            'extra_active',
        ],
        default: 'bmr',
    },
    diet_history: { type: Array, default: [] },
})

UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password') || this.isNew) {
        this.password = await bcrypt.hash(this.password, 12)
    }
    next()
})

UserSchema.methods.comparePassword = async function (
    enteredPassword: string
): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password)
}

const UserModel = mongoose.model<IUser>('User', UserSchema)

export { UserModel as User, UserSchema }
