import mongoose from 'mongoose'
import bcrypt from 'bcrypt'
import validator from 'validator'

const userModel = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, 'Please enter your username.'],
            unique: [true, 'Username is taken.'],
            lowercase: true,
            validate: [
                {
                    validator: function (value) {
                        return /^[A-Za-z0-9_\.]+$/.test(value)
                    },
                    message:
                        'Please enter a valid username. It should contain only numbers, alphabets, underscores, or periods.',
                },
            ],

            minlength: [
                4,
                'Please enter a username that is 4 characters or longer',
            ],
            maxlength: [
                20,
                'Please enter a username that is 20 characters or shorter',
            ],
        },
        name: {
            type: String,
            required: [true, 'Please enter your name.'],
            validate: [
                {
                    validator: function (value) {
                        return /^[A-Za-z\s]+$/.test(value)
                    },
                    message: 'Name must contain only letters and spaces.',
                },
            ],
        },
        email: {
            type: String,
            required: [true, 'Please enter your email.'],
            unique: [true, 'Email is taken.'],
            lowercase: true,
            validate: [
                validator.isEmail,
                'Please enter a valid email address.',
            ],
        },
        password: {
            type: String,
            required: [true, 'Please enter your password.'],
            validate: [
                {
                    validator: function (value) {
                        return /^(?=.*[A-Za-z])(?=.*\d).{8,}$/.test(value)
                    },
                    message:
                        'Password must be at least 8 characters long and contain at least one letter.',
                },
            ],
        },
        birthdate: {
            type: Date,
            required: [true, 'Please enter your birthdate.'],
        },
        sex: {
            type: String,
            enum: ['male', 'female'],
            required: [true, 'Please select your sex.'],
        },
        phoneNumber: {
            type: String,
            required: [true, 'Please enter your phone number.'],
            validate: [
                {
                    validator: function (value) {
                        return /^[0-9\s()+-]+$/.test(value)
                    },
                    message:
                        'Phone number can only contain numbers, spaces, brackets, hyphens, and plus signs.',
                },
            ],
        },
        food_list: {
            type: Array,
            default: [],
        },
        daily_preferences: {
            type: Object,
            default: {
                calories: 0,
                carbs: 0,
                proteins: 0,
                fats: 0,
            },
        },
        weight_target: {
            type: Number,
            default: 0,
        },
        weight_current: {
            type: Number,
            default: 0,
        },
        height: {
            type: Number,
            default: 0,
        },
        health_history: {
            type: [
                {
                    date: {
                        type: Date,
                        required: true,
                    },
                    weight: {
                        type: Number,
                        required: true,
                    },
                    body_fats: {
                        type: Number,
                        required: true,
                    },
                    muscle_mass: {
                        type: Number,
                        required: true,
                    },
                    bmi: {
                        type: Number,
                        required: true,
                    },
                    bmr: {
                        type: Number,
                        required: true,
                    },
                    pbf: {
                        type: Number,
                        required: true,
                    },
                    smm: {
                        type: Number,
                        required: true,
                    },
                },
            ],
            default: [],
        },
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
        diet_history: {
            type: [
                {
                    date: {
                        type: Date,
                        required: true,
                    },
                    calories: {
                        type: Number,
                        required: true,
                    },
                    proteins: {
                        type: Number,
                        required: true,
                    },
                    fats: {
                        type: Number,
                        required: true,
                    },
                    carbs: {
                        type: Number,
                        required: true,
                    },
                    target: {
                        type: Boolean,
                        required: true,
                    },
                },
            ],
            default: [],
        },
    },
    { timestamps: true },
    {
        toJSON: { virtuals: true },
        toObject: { virtuals: true },
    }
)

userModel.pre('save', async function () {
    if (!this.isModified('password')) return

    this.password = await bcrypt.hash(this.password, 12)
})

userModel.methods.comparePassword = async function (
    enteredPassword,
    hashedPassword
) {
    return await bcrypt.compare(enteredPassword, hashedPassword)
}

const UserModel = mongoose.model('User', userModel)

export default UserModel
