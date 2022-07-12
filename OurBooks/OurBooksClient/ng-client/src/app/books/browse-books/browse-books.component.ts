import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Book } from "../shared/book";
import { BookService } from "../shared/books.service";
import { of, Observable } from 'rxjs';
import { filter } from 'rxjs/operators';
import { BooksListComponent } from "../books-list.component";

@Component({
    selector: 'browse-books',
    templateUrl: './browse-books.component.html'
})

export class BrowseBooksComponent implements OnInit {

    constructor(private booksService: BookService, private route: ActivatedRoute) {   
    }

    listOfBooks: Book[];

    ngOnInit() {
        this.route.params.subscribe(params => {
            if(params.searchTerm)
                this.booksService.loadBooksBySearchTerm(params.searchTerm).subscribe((data: Book[]) => {
                        this.listOfBooks = data;
                    })
            else
                this.booksService.loadBooks().subscribe((data: Book[]) => {
                    this.listOfBooks = data;
            })
        });

    }
}
