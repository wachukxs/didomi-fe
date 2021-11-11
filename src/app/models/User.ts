export interface UserSignUpDetails {
    lastname: string,
    firstname: string,
    password: string,
    email: string,
    accepttandc: boolean
}

export type UserLoginDetails = Omit<UserSignUpDetails, "lastname" | "accepttandc" | "firstname">

export interface ConsentChangeEvent {
    emailnotifications: boolean,
    smsnotifications: boolean,
    email: string,
    time: boolean
}