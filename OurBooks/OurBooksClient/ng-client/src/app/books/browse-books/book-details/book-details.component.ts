import { Component } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { LoginMenu } from "src/app/authorization/login-menu.component";
import { LoginService } from "src/app/authorization/shared/login.service";
import { Book } from "../../shared/book";
import { BookService } from "../../shared/books.service";

@Component({
    selector: 'book-details',
    templateUrl: './book-details.component.html',
    styleUrls: ['./book-details.component.css']
})

export class BookDetailsComponent {
    book: any;
    listOfBooks: Book[];

    constructor(private booksService: BookService, private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.booksService.loadSingleBook(+this.route.snapshot.params['id']).subscribe((data: Book) => {
            this.book = data;
        });
    }
}