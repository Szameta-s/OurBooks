import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { Book } from "./book";

@Injectable()
export class BookService {

    constructor(public http:HttpClient) {
    }
    
    loadBooks() {
        return this.http.get<Book[]>('http://localhost:5000/api/book');
    }

    loadSingleBook(id: number) {
        return this.http.get<Book>('http://localhost:5000/api/book/' + id);
    }

    loadBooksBySearchTerm(seachTerm: string) {
        return this.http.get<Book[]>('http://localhost:5000/api/book?searchTerm=' + seachTerm);
    }

    loadBooksFromUser() {
        return this.http.get<Book[]>('http://localhost:5000/api/book/userbooks');
    }

    addBook(book: any) {
        return this.http.post<any>('http://localhost:5000/api/book', book);
    }
}

const BOOKS = [
    {
        id: 1,
        author: 'J.R.R. Tolkien',
        title: 'Lord of the Rings: The Fellowship of the Ring',
        cover: 'Softcover',
        imgUrl: './assets/images/fellowship.jpg',
        desription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!'
    },
    {
        id: 2,
        author: 'J.R.R. Tolkien',
        title: 'Lord of the Rings: The Two Towers',
        cover: 'Softcover',
        imgUrl: './assets/images/twotowers.jpg',
        desription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!'
    },
    {
        id: 3,
        author: 'J.R.R. Tolkien',
        title: 'Lord of the Rings: The Return of the King',
        cover: 'Hardcover',
        imgUrl: './assets/images/returnoftheking.jpg',
        desription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!'
    },
    {
        id: 4,
        author: 'J.R.R. Tolkien',
        title: 'Hobbit: An Unexpected Journey',
        cover: 'Hardcover',
        imgUrl: './assets/images/hobbit.jpg',
        desription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!'
    },
    {
        id: 4,
        author: 'J.R.R. Tolkien',
        title: 'Hobbit',
        cover: 'Hardcover',
        imgUrl: './assets/images/hobbit.jpg',
        desription: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Eligendi, fugiat asperiores inventore beatae accusamus odit minima enim, commodi quia, doloribus eius! Ducimus nemo accusantium maiores velit corrupti tempora reiciendis molestiae repellat vero. Eveniet ipsam adipisci illo iusto quibusdam, sunt neque nulla unde ipsum dolores nobis enim quidem excepturi, illum quos!'
    }
]