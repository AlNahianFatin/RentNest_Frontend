'use server'

import jwt, { JwtPayload } from "jsonwebtoken";

export async function verifyToken(token: string, secret: string) {
    try {
        const verifiedToken = jwt.verify(token, secret);

        return {
            success: true,
            data: verifiedToken
        };
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log("Token verification failed: ", error);
        return {
            success: false,
            error: error.message
        }
    }
}

// export async function decodeToken(token: string) {
//     try {
//         const decodedToken = jwt.decode(token) as JwtPayload | null;

//         if (!decodedToken) {
//             return {
//                 success: false,
//                 error: "Invalid token"
//             };
//         }

//         return {
//             success: true,
//             data: decodedToken
//         }
//     }
//     // eslint-disable-next-line @typescript-eslint/no-explicit-any
//     catch (error: any) {
//         return {
//             success: false,
//             error: error.message
//         };
//     }
// }