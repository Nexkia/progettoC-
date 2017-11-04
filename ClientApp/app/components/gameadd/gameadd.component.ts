import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { GameAddService } from '../_services/gameadd.service';

@Component({
    selector: "gameadd",
    templateUrl: 'gameadd.component.html',
    styleUrls: ['./gameadd.component.css'],
    providers: [GameAddService]
})

export class GameAddComponent {
    model: any = {};
    loading = false;
    error = false;
    id: number;

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        private GameAddService: GameAddService) {
        this.route.params.subscribe(params => {
            this.id = params['id'];
        }, error => console.error(error));
    }

    add() {
        this.loading = true;
        this.model.userid = this.id; // aggiungo di chi è il gioco
        this.GameAddService.create(this.model)
            .subscribe(
            data => {

                this.router.navigate(['/games']);
            },
            error => {
                this.router.navigate(['/games']);

            });
    }

}


