import { Component, OnInit } from "@angular/core";
import { ActivatedRoute } from "@angular/router";
import { Book } from "../books/shared/book";
import { BookService } from "../books/shared/books.service";
import { Owner } from "./shared/owner";
import { OwnersService } from "./shared/owners.service";


@Component({
    selector: 'owner',
    templateUrl: './owner.component.html',
    styleUrls: [
        './owner.component.css'
    ]
})

export class OwnerComponent implements OnInit{

    owner: Owner;
    books: Book[];
    changeVisibility: boolean = false;

    constructor (private ownersService: OwnersService, private route: ActivatedRoute, private booksService: BookService) {       
    }

    ngOnInit() {
        this.route.params.subscribe(params => {
            if(params.userId)
                this.ownersService.loadOwnerEmail(params.userId).subscribe((data: any) => {
                    this.owner = data;
                    console.log(params.userId);
            });
            else
                console.log(params.userId);
            })
        this.booksService.loadBooksFromUser().subscribe((data: Book[]) => {
            this.books = data;
    });
    }

    showBooks() {
        if(this.changeVisibility) {
            this.changeVisibility = false;
        } else {
            this.changeVisibility = true;
        }
    }
}
