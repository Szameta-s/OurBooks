import { Component, Input, OnInit } from "@angular/core";
import { ActivatedRoute, Router } from "@angular/router";
import { CookieService } from "ngx-cookie-service";

@Component({
    selector: 'nav-bar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {

    constructor(private route: ActivatedRoute, private router: Router, 
        private cookieService: CookieService) {
    }
    
    @Input() searchTerm: string = '';

    showLogout: boolean; 

    ngOnInit(): void {
        if(this.cookieService.get("Authorization").toString() === "") {
            this.showLogout = false;
        }
        else {
            this.showLogout = true;
        }

        this.route.params.subscribe(params => {
            if (params.searchTerm)
                this.searchTerm = params.searchTerm;
        })
    }

    public logoutRequest() {
        this.cookieService.delete("Authorization");
        this.showLogout = false;
    }

    printData()
    {
        console.log(this.searchTerm);
    }
}