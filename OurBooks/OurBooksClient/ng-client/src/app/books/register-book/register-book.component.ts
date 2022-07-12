import { Component, OnInit } from "@angular/core";
import { FormControl, FormGroup } from "@angular/forms";
import { CookieService } from "ngx-cookie-service";
import { LoginService } from "src/app/authorization/shared/login.service";
import { Book } from "../shared/book";
import { BookService } from "../shared/books.service";

@Component({
    selector: 'register-book',
    templateUrl: './register-book.component.html'
})
export class RegisterBookComponent implements OnInit {
    
    constructor(private bookService: BookService, private cookieService: CookieService,
        private loginService: LoginService) {
    }

    registerBookForm: FormGroup;
    loggedIn: boolean;
    genres: string[];


    ngOnInit() {
        this.genres = GENRES;
        
        if (this.cookieService.get("Authorization") === "") {
            this.loggedIn = false;
            console.log(this.cookieService.get("Authorization"));
        } else {
            this.loggedIn = true;
            console.log(this.cookieService.get("Authorization"));
        }

        this.registerBookForm = new FormGroup({
            title: new FormControl(''),
            author: new FormControl(''),
            genre: new FormControl(''),
            shortDescription: new FormControl(''),
            longDescription: new FormControl(''),
            price: new FormControl(''),
            cover: new FormControl('')
        });
    }

    registerBookRequest() {
        console.log("Title: " + this.registerBookForm.get("title").value);
        console.log(localStorage.getItem("currentUser"));

        if (this.cookieService.get("Authorization") !== "") {
            this.bookService.addBook(
                {
                    Title: this.registerBookForm.get("title").value,
                    Author: this.registerBookForm.get("author").value,
                    Genre: this.registerBookForm.get("genre").value,
                    shortDescription: this.registerBookForm.get("shortDescription").value,
                    longDescription: this.registerBookForm.get("longDescription").value,
                    Price: this.registerBookForm.get("price").value,
                    Cover: this.registerBookForm.get("cover").value,
                    userEmail: localStorage.getItem("currentUser")
                }
                ).subscribe();
        }
    }
}

const GENRES = [
    "Fantasy", "Action", "Drama"
]