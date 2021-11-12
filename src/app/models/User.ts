export interface UserSignUpDetails {
    lastname: string,
    firstname: string,
    password: string,
    email: string,
    accepttandc: boolean
}

export type UserLoginDetails = Omit<UserSignUpDetails, "lastname" | "accepttandc" | "firstname">