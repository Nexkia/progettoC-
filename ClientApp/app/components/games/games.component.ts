import { Component, Inject } from '@angular/core';
import { Http } from '@angular/http';
import { Router } from '@angular/router';

import { RegistrationService } from '../_services/registration.service';

import { User } from '../entities/user';

@Component({
    selector: 'games',
    templateUrl: './games.component.html',
    styleUrls: ['./games.component.css']
})
export class GamesComponent {
    public games: Game[];
    user: User;
    filteredItems: Game[];
    filteredVectors: Game[];
    mygames: string;
    inputName: string = '';


    constructor(
        private router: Router,
        private regService: RegistrationService,
        private http: Http, @Inject('BASE_URL') private baseUrl: string) {
        this.getGames();
    }

    getGames(): void{
        this.getUserID();
        var query = "?id=" + this.mygames;
        this.http.get(this.baseUrl + 'api/gamesuser' + query).subscribe(result => {
            this.games = result.json() as Game[];
            this.filteredItems = this.games;
         

        }, error => console.error(error));
           
        
    }


    FilterByConsole() {
        this.filteredVectors = [];
        if (this.inputName != "") {
            this.filteredItems.forEach(element => {
                if (element.console.toUpperCase().indexOf(this.inputName.toUpperCase()) >= 0) {
                    this.filteredVectors.push(element);
                }
            });
        } else {
            this.filteredVectors = this.filteredItems;
        }
        this.games= this.filteredVectors
    }

    gotoDetail(id: number): void {
        this.router.navigate(['/game-details', id]);
    }

    gotoAdd(id: number): void {
        this.router.navigate(['/gameadd', id]);
    }

    getUserID(): void {
        var currentUser = window.localStorage.getItem('currentUser');
        if (currentUser !== null)
        {
            this.user = (JSON.parse(currentUser))[0];
            this.mygames = this.user.id;
        }
        

    }

    removeMyGame(id: number): void {

        var currentUser = window.localStorage.getItem('currentUser');
        if (currentUser !== null) {
            var user = JSON.parse(currentUser)[0] as User;
            this.http.delete(this.baseUrl + 'api/game/' +'?id='+ id).subscribe(result => { 
            }, error => console.error(error));
            window.location.reload();
        }
    }
}

interface Game {
    id: number;
    name: string;
    userid: number;
    valutation: number;
    description: string;
    console: string;
}


