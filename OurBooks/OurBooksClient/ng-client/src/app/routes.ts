import { Routes } from "@angular/router";
import { AccountInfoComponent } from "./account-info/account-info.component";
import { AppComponent } from "./app.component";
import { LoginMenu } from "./authorization/login-menu.component";
import { BooksListComponent } from "./books/books-list.component";
import { BookDetailsComponent } from "./books/browse-books/book-details/book-details.component";
import { BrowseBooksComponent } from "./books/browse-books/browse-books.component";
import { RegisterBookComponent } from "./books/register-book/register-book.component";
import { OwnerComponent } from "./owners/owner.component";
import { RegisterComponent } from "./register/register.component";


export const appRoutes: Routes = [
    {path: 'home', component: BooksListComponent},
    {path: 'login', component: LoginMenu},
    {path: 'register', component: RegisterComponent},
    {path: 'account', component: AccountInfoComponent},
    {path: 'browse', component: BrowseBooksComponent},
    {path: 'book/:id', component: BookDetailsComponent},
    {path: 'addbook', component: RegisterBookComponent},
    {path: 'browse/:searchTerm', component: BrowseBooksComponent},
    {path: 'owner/:userId', component: OwnerComponent},
    {path: '', redirectTo: '/home', pathMatch: 'full'}
];