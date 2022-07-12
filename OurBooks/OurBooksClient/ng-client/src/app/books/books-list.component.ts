import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Book } from "./shared/book";
import { BookService } from "./shared/books.service";

@Component({
    selector: 'books-list',
    templateUrl: './books-list.component.html',
    styleUrls: ['./books-list.component.css']
})

export class BooksListComponent implements OnInit {

    listOfBooks: Book[];

    constructor(private booksService: BookService,
        private route: ActivatedRoute) {
    }

    ngOnInit() {
        this.booksService.loadBooks().subscribe((data: Book[]) => {
            this.listOfBooks = data;
        });
    }
}
