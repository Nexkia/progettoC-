
import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AuthenticationService } from '../_services/authentication.service';
import { User } from '../entities/user';

@Component({
    selector: 'home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;
    currentUser: any;
    user: string;
    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService
    ) { }

    ngOnInit() {
        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
        this.currentUser = localStorage.getItem('currentUser');
        this.currentUser = JSON.parse(this.currentUser);
        this.user = this.currentUser[0].username;
    }


    logout() {
        this.authenticationService.logout();
        this.router.navigate(['/login']);
    }
}


