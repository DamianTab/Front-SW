import { DbPage } from '../../models/db-page';
import { DbPageFetchService } from './db-page-fetch.service';
import { Injectable } from '@angular/core';
import { first } from 'rxjs/operators';

@Injectable()
export class DbPageIterator<T> {
    private page: DbPage<T>;

    constructor(private retrieveData: DbPageFetchService<T>) { }

    init(url: string, callback: Function): this {
        return this.download(url, callback);
    }

    loadNext(callback: Function): this {
        return this.download(this.page.next, callback);
    }

    loadPrevious(callback: Function): this {
        return this.download(this.page.previous, callback);
    }

    hasNext(): Boolean {
        return this.page.next !== null;
    }

    hasPrevious(): Boolean {
        return this.page.previous !== null;
    }

    get results(): T[] {
        return this.page.results;
    }

    private download(url: string, callback: Function): this {
        let subscription = this.retrieveData.fetch(url).pipe(first()).subscribe(data => {
            this.page = data;
            callback();
            subscription.unsubscribe();
        });
        return this;
    }
}