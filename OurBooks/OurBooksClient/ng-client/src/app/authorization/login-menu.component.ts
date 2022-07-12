import { Component, Injectable, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { LoginService } from "./shared/login.service";
import { FormGroup, FormControl } from "@angular/forms";
import { User } from "./shared/User";
import { CookieService } from "ngx-cookie-service";
import { AppInterceptor } from "../http-interceptors/app-interceptor";

@Component({
    selector: 'login-menu',
    templateUrl: './login-menu.component.html'
})
export class LoginMenu implements OnInit{

    constructor(private route: ActivatedRoute, private router: Router,
        private loginService: LoginService, private cookieService: CookieService) {
    }

    authHeader: string;
    loginForm: FormGroup;
    correctLoginPassword: boolean = true;

    ngOnInit() {
        this.loginForm = new FormGroup({
            login: new FormControl(),
            password: new FormControl()
        });
    }

    loginRequest() {
        // Print user creds to console
        console.log(this.loginForm.get('login').value, this.loginForm.get('password').value);

        // Send user creds to API
        this.loginService.loginAction(
            {
                UserName: this.loginForm.get('login').value, 
                Password: this.loginForm.get('password').value
            }, this.loginForm.get('login').value)
            .subscribe(response => {
                this.authHeader = response.headers.get('Authorization');
                console.log(this.authHeader);
               
                this.router.navigateByUrl('/home').then(() => {
                    window.location.reload();
                });
            });
    }
}