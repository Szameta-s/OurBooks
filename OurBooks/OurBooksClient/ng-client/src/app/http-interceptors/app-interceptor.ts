import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";
import { Observable, throwError } from "rxjs";
import { catchError, tap } from "rxjs/operators";


@Injectable()
export class AppInterceptor implements HttpInterceptor {

    constructor(private route: ActivatedRoute, private router: Router,
        private cookieService: CookieService) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const authToken = this.cookieService.get("Authorization");
        const modifiedReq = req.clone({ 
            headers: req.headers.set("Authorization", `${authToken}`),
          });

        return next.handle(modifiedReq).pipe( tap(() => {},
            (err: any) => {
                if (err instanceof HttpErrorResponse) {
                    switch(err.status){
                        // case 400: {
                        //     console.log(true);
                        //     this.router.navigate(['/login'])
                        //     // .then(() => {
                        //     //     window.location.reload();
                        //     // });
                        //     break;
                        // }
                        case 401: {
                            this.router.navigate(['/login']);
                            break;
                        }
                        // case 404: {
                        //     this.router.navigate(['/browse']);
                        //     break;
                        // }
                        default: {
                            break;
                        }
                    }
                    // if (err.status === 401) {
                    //     this.router.navigate(['/login']);
                    // }
                    // else if(err.status === 404) {
                    //     this.router.navigate['/index']
                    // }
                    // else{
                    //     return;
                    // }
                }
        }));     
    }
}