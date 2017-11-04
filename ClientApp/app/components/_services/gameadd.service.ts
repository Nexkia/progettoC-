import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { Game } from '../entities/game';

@Injectable()
export class GameAddService {
    constructor(private http: Http) { }

    create(game: Game) {
        return this.http.put('/api/game', game).map((response: Response) => response.json());
    }

}