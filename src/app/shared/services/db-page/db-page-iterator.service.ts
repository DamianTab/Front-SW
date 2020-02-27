import { DbPage } from '../../models/db-page';
import { DbPageFetchService } from './db-page-fetch.service';
import { Component } from '@angular/core';

@Component({})
export class DbPageIterator<T> {
    private page: DbPage<T>;
    private task: DbPageIterator.Task;

    constructor(private retrieveData: DbPageFetchService<T>,
        private onErrorContinue: boolean = false
    ) {
        const emptyTask = (async () => { })();
        this.task = emptyTask;
    }

    //load only one page on url
    init(url: string, callback?: Function, errorCallback?: Function): this {
        this.addSyncTask(async () => {
            await this.download(url, callback, errorCallback);
        });
        return this;
    }

    //load all pages on source url
    loadAll(url: string, callback?: Function, errorCallback?: Function): this {
        this.addSyncTask(async () => {
            
            this.init(url, async () => {

                    const start = this.page.results;

                    this.page = {
                        'count': 0,
                        'next': null,
                        'previous': null,
                        'results': []
                    };
                    
                    const prev = [], next = [];

                    while (await this.hasNext()) {
                        this.loadNext(() => next.push(...this.results), 1, errorCallback);
                    }

                    this.init(url, undefined, errorCallback);
                    while (await this.hasPrevious()) {
                        this.loadPrevious(() => prev.push(...this.results), 1, errorCallback);
                    }

                    this.page.results = [...prev, ...start, ...next];
                    this.page.count = this.page.results.length;
                    console.log(`${prev}, ${start} ${next}`);
                    await callback();
                }, errorCallback);
        });
        return this;
    }

    loadNext(callback?: Function, offset?: number, errorCallback?: Function): this {
        this.addSyncTask(async () => {
            let offsetArg: number = offset === undefined ? 1 : offset;

            for (let i = 0; i < offsetArg; i++) {
                if (await this.hasNext()) {
                    if (i + 1 === offset) {
                        await this.download(this.page.next, callback, errorCallback);
                    } else {
                        await this.download(this.page.next, undefined, errorCallback);
                    }
                } else {
                    throw Error(`Null next page link${offset !== undefined ? `, page: ${i}/${offsetArg}` : ''}`);
                }
            }
        });
        return this;
    }

    loadPrevious(callback?: Function, offset?: number, errorCallback?: Function): this {
        this.addSyncTask(async () => {
            let offsetArg: number = offset === undefined ? 1 : offset;

            for (let i = 0; i < offsetArg; i++) {
                if (await this.hasNext()) {
                    if (i + 1 === offset) {
                        await this.download(this.page.previous, callback, errorCallback);
                    } else {
                        await this.download(this.page.previous, undefined, errorCallback);
                    }
                } else {
                    throw Error(`Null previous page link${offset !== undefined ? `, page: ${i}/${offsetArg}` : ''}`);
                }
            }
        });
        return this;
    }

    hasNext(): Promise<boolean> {
        this.addSyncTask((async () => {
            return this.page.next !== null;
        }))
        return this.task as Promise<boolean>;
    }

    hasPrevious(): Promise<Boolean> {
        this.addSyncTask((async () => {
            return this.page.previous !== null;
        }))
        return this.task as Promise<boolean>;
    }

    get results(): T[] {
        return this.page.results;
    }

    private addSyncTask(callback: Function): void {
        (this.task as any).then((async () => {
            await this.task;
            await callback();
        })());
    }

    private async download(url: string, callback?: Function, errorCallback?: Function): Promise<void> {
        return this.retrieveData.fetch(url)
            .catch(reason => { if (errorCallback !== undefined) errorCallback(reason) })
            .then((data: DbPage<T>) => {
                if (data === undefined && this.onErrorContinue) {
                    return;
                } else {
                    this.page = data;
                    if (callback !== undefined) {
                        callback();
                    }
                }
            });
    }
}

namespace DbPageIterator {
    export type Task = Promise<any> | ((value: any) => any);
}