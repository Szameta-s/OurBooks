import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { RegisterService } from "./register.service";
import { FormGroup, FormControl, Form, Validators, ValidatorFn, AbstractControl, ValidationErrors } from "@angular/forms";


@Component({
    selector: 'register',
    templateUrl: './register.component.html'
})
export class RegisterComponent implements OnInit {

    constructor(private route: ActivatedRoute, private registerService: RegisterService) {
    }

    registerForm: FormGroup;
    isFormCorrect: boolean = true;

    ngOnInit() {
        this.registerForm = new FormGroup({
            email: new FormControl('',
                [
                    Validators.required,
                    Validators.email
                ]),
            firstName: new FormControl(''),
            lastName: new FormControl(''),
            password: new FormControl('',
                [
                    Validators.required,
                    Validators.minLength(5),
                    Validators.maxLength(15)
                ]),
            confirmPassword: new FormControl('',
                [
                    Validators.required
                ])
        },
        {
            validators: this.comparePasswordValidator("password", "confirmPassword")
        });
    }

    registerRequest() {
        // Send user creds to API
        if (!this.registerForm.invalid) {
            this.registerService.registerAction(
                {
                    UserName: this.registerForm.get('email').value, 
                    Password: this.registerForm.get('password').value,
                    FirstName:this.registerForm.get('firstName').value,
                    LastName: this.registerForm.get('lastName').value
                }).subscribe();
        } else {
            this.isFormCorrect = false;
        }
    }

    comparePasswordValidator(controlName: string, matchingControlName: string) {
        return (formGroup: FormGroup) => {
            const control = formGroup.controls[controlName];
            const matchingControl = formGroup.controls[matchingControlName];

            const controlValue = control.value;
            const matchingControlValue = matchingControl.value;

            if (controlValue !== matchingControlValue){
                matchingControl.setErrors({mismatched: true});
            }

            return null;
        }
    } 

    // comparePasswordValidator(controlName: string, matchingControlName: string) {
    //     return (formGroup: FormGroup) => {
    //         const control = formGroup.controls[controlName];
    //         const matchingControl = formGroup.controls[matchingControlName];

    //         const controlValue = control.value;
    //         const matchingControlValue = matchingControl.value;

    //         if (controlValue !== matchingControlValue){
    //             matchingControl.setErrors({mismatched: true});
    //         }

    //         return null;
    //     }
    // } 
}
