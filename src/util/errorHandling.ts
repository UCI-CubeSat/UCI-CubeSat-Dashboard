import { z } from "zod";

export const GenericErrorValidator = z.object({
    message: z.string()
})

export class GenericErrorClass extends Error {
    constructor(message: string) {
        super(message)
    }
}
export const extractError = async (response: Response) => {
    const error = await response.json();
    if (GenericErrorValidator.safeParse(error).success) {
        throw new GenericErrorClass(error.message)
    }
    else {
        throw new GenericErrorClass("Error, but no message provided.")
    }
}

