import { hash, compare } from "bcryptjs"

export const encrypt = async (pass: string) => {
    const passHash = await hash(pass, 8);
    return passHash;
}

export const verified = async (pass: string, passHash: string) => {
    console.log(pass, passHash)
    const isCorrect = await compare(pass, passHash);
    return isCorrect;
}