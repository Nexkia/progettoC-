import { Component, Inject } from '@angular/core';
import { Location } from '@angular/common';
import { ActivatedRoute, Router, ParamMap } from '@angular/router';
import { Http } from '@angular/http';



import { RegistrationService } from '../_services/registration.service';

import { User } from '../entities/user';
import { Game } from '../entities/game';

@Component({
    selector: 'game-details',
    templateUrl: './game-details.component.html',
    styleUrls: ['./game-details.component.css']
})

export class GameDetailsComponent {
    game: Game;
    id: string;
    url: string;

    constructor(
        private location: Location,
        private route: ActivatedRoute,
        private router: Router,
        private regService: RegistrationService,
        private http: Http, @Inject('BASE_URL') public baseUrl: string) {
        this.route.params.subscribe(params => {
            this.id = params['id']; //ottenuto dal click sul gioco 
            this.url = this.baseUrl + 'api/gamedetail?id=' + this.id;
            this.http.get(this.url).subscribe(result => { 
                this.game = result.json()[0] as Game;
            }, error => console.error(error));
        });

    }


    private handleError(error: any): Promise<any> {
        console.error('An error occurred', error); 
        return Promise.reject(error.message || error);
    }

    goBack(): void {
        this.location.back();
    }

   

}

