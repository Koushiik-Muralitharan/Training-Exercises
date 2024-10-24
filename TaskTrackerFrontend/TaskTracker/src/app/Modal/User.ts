// export interface AddUser {
//     userName: string
//     password: string
//   }

// export interface User {
//     userId: number
//     userName: string
//     password: string
//   }

export class User{
    userId!: number;
    userName: string;
    password: string;


    constructor(){
        this.userName = "";
        this.password = "";
    }
}