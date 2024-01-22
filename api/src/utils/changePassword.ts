export async function changePasswordWithOldPassword(
    repo,
    id,
    oldPassword,
    newPassword
) {
    try {
        const user = await repo.findOne({ where: { _id: id } })

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

export async function changePasswordWithoutOldPassword(
    repo,
    email,
    newPassword
) {
    try {
        const user = await repo.findOne({
            where: { email: email },
        })

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
