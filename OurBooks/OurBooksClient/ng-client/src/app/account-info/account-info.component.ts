import { Component, OnInit } from "@angular/core";
import { Owner } from "../owners/shared/owner";
import { OwnersService } from "../owners/shared/owners.service";

@Component({
    selector: 'account-info',
    templateUrl: './account-info.component.html'
})
export class AccountInfoComponent implements OnInit {

    constructor(private ownersService: OwnersService) {
    }

    owner: Owner;

    ngOnInit(): void {
        this.ownersService.loadOwnerEmail("").subscribe((data: any) => {
            this.owner = data;
        })
    }
}