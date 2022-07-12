import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable } from "rxjs";
import { CookieService } from "ngx-cookie-service";
import { Owner } from "./owner";


@Injectable()
export class OwnersService {

    constructor(public http:HttpClient, private cookieService: CookieService) {
    }
    
    
    loadOwners() {
        return this.http.get<Owner[]>('http://localhost:5000/api/owner');
    }

    loadOwnerEmail(userId) {
        return this.http.get<Owner[]>(`http://localhost:5000/api/account?userId=${userId}`);
    }

    loadSingleOwner(id: number, header: string) {
        return this.http.get<Owner>(`http://localhost:5000/api/owner/${id}`);
    }

    loadOwnerWithBooks(id: number){
        return this.http.get<Owner>(`http://localhost:5000/api/owner/${id}/showBooks`);
    }
}