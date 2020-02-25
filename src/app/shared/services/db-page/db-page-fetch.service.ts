import { Injectable } from "@angular/core";
import { HttpClient } from '@angular/common/http';
import { DbPage } from '../../models/db-page';
import { Observable } from 'rxjs';

@Injectable()
export class DbPageFetchService<ResultObject> {
    constructor(private http: HttpClient) { }

    fetch(url: string): Observable<DbPage<ResultObject>> {
        return this.http.get<DbPage<ResultObject>>(url);
    }
}