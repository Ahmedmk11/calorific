import UserModel from '../models/userModel.js'

export async function changePasswordWithoutOldPassword(email, newPassword) {
    try {
        const user = await UserModel.findOne({ email: email })

        if (!user) {
            return 404
        }

        user.password = newPassword
        await user.save()
    } catch (error) {
        console.log(error)
        return 500
    }
}
