import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";


@Injectable()
export class RegisterService {

    constructor(public http:HttpClient) {
    }

    registerAction(user) {
        return this.http.post<any>('http://localhost:5000/api/account/register', 
            user,
            {
                withCredentials: true,
                observe: "response"
            }
        );
    }
}