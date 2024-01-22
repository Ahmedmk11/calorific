// user.schema.ts
import bcrypt from 'bcrypt'
import mongoose, { Schema, Document } from 'mongoose'

export enum Sex {
    Male = 'male',
    Female = 'female',
    Other = 'other',
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
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true },
    name: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
    birthdate: { type: Date, required: true },
    sex: { type: String, enum: Object.values(Sex), required: true },
    phoneNumber: { type: String, required: true },
})

UserSchema.pre<IUser>('save', async function (next) {
    if (this.isModified('password')) {
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
