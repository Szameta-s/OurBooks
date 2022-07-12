import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";

@Injectable()
export class LoginService {

    constructor(public http:HttpClient) {
    }

    loginAction(userCreds: any, userLogin: any) {
        localStorage.setItem("currentUser", userLogin);
        return this.http.post<any>('http://localhost:5000/api/account/login', 
            userCreds,
            {
                withCredentials: true,
                observe: "response"
            }
        );
    }

    logoutAction() {
        return this.http.get<any>('http://localhost:5000/api/account/logout');
    }
}
