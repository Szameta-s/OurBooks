import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { appRoutes } from './routes';
import { AppComponent } from './app.component';
import { BooksListComponent } from './books/books-list.component';
import { BrowseBooksComponent } from './books/browse-books/browse-books.component';
import { BookService } from './books/shared/books.service';
import { NavbarComponent } from './navbar/navbar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { OwnerComponent } from './owners/owner.component';
import { BookDetailsComponent } from './books/browse-books/book-details/book-details.component';
import { OwnersService } from './owners/shared/owners.service';
import { LoginMenu } from './authorization/login-menu.component';
import { LoginService } from './authorization/shared/login.service';
import { CookieService } from 'ngx-cookie-service';
import { httpInterceptorProviders } from './http-interceptors';
import { RegisterComponent } from './register/register.component';
import { RegisterService } from './register/register.service';
import { AccountInfoComponent } from './account-info/account-info.component';
import { RegisterBookComponent } from './books/register-book/register-book.component';


@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    BooksListComponent,
    BrowseBooksComponent,
    BookDetailsComponent,
    OwnerComponent,
    LoginMenu,
    RegisterComponent,
    AccountInfoComponent,
    RegisterBookComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes),
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [
    BookService,
    OwnersService,
    LoginService,
    CookieService,
    RegisterService,
    httpInterceptorProviders
  ]
    ,
  bootstrap: [
    AppComponent,
    NavbarComponent,
    BooksListComponent,
    BookDetailsComponent
  ]
})
export class AppModule { }
