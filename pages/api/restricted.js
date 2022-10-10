import { unstable_getServerSession } form "next-auth/next"
import { authOptions } from "./auth/[...nextauth]"

export default async (requ, res) => {
    const session = await unstable_getServerSession(req, res, authOptions)

    if (session) {
        res.send({
            content: "This is protected content. You can access this content."
        })
    } else {
        res.send({
            error: "You must be signed in to view the protected contents."
        })
    }
}