import UserModel from '../models/userModel.js'

export async function changePasswordWithOldPassword(
    id,
    oldPassword,
    newPassword
) {
    try {
        const user = await UserModel.findById(id)

        if (!user) {
            return 404
        }

        const isMatch = await user.comparePassword(oldPassword, user.password)

        if (!isMatch) {
            return 403
        }
        user.password = newPassword
        await user.save()
    } catch (error) {
        console.log(error)
        return 500
    }
}
