import { DbPage } from '../../models/db-page';
import { DbPageFetchService } from './db-page-fetch.service';
import { Directive } from '@angular/core';

@Directive(null)
export class DbPageIteratorDirective<T> {
    private page: DbPage<T>;
    private task: Promise<any>;

    constructor(private retrieveData: DbPageFetchService<T>,
                private onErrorContinue: boolean = false
    ) {
        const emptyTask = (async () => { })();
        this.task = emptyTask;
    }

    // load only one page on url
    init(url: string, { callback, errorCallback }: { callback?: CallableFunction; errorCallback?: CallableFunction; }): this {
        this.addSyncTask(async () => {
            await this.download({ url, callback, errorCallback });
        });
        return this;
    }

    // load all pages on source url
    loadAll({ url, callback, errorCallback }: { url: string; callback?: CallableFunction; errorCallback?: CallableFunction; }): this {
        this.addSyncTask(async () => {

            const worker = new DbPageIteratorDirective<T>(this.retrieveData, this.onErrorContinue);

            this.page = {
                count: 0,
                next: null,
                previous: null,
                results: []
            };

            worker.init(url, {callback: async () => {

                const left = new DbPageIteratorDirective<T>(this.retrieveData, this.onErrorContinue);
                const right = new DbPageIteratorDirective<T>(this.retrieveData, this.onErrorContinue);

                const prev = [];
                const next = [];

                while (await right.hasNext(false)) {
                    right.loadNext({ callback: () => next.push(...right.page.results), offset: 1, errorCallback });
                }

                while (await left.hasPrevious(false)) {
                    left.loadPrevious({ callback: () => prev.push(...left.page.results), offset: 1, errorCallback });
                }

                this.page.results = [...prev, ...worker.page.results, ...next];
                this.page.count = this.page.results.length;
                await callback();

            }, errorCallback});
        });
        return this;
    }

    loadNext({ callback, offset, errorCallback }:
        { callback?: CallableFunction; offset?: number; errorCallback?: CallableFunction; } = {}): this {

        this.addSyncTask(async () => {
            const offsetArg: number = offset === undefined ? 1 : offset;

            for (let i = 0; i < offsetArg; i++) {
                if (this.hasNext()) {
                    if (i + 1 === offset) {
                        await this.download({ url: this.page.next, callback, errorCallback });
                    } else {
                        await this.download({ url: this.page.next, callback: undefined, errorCallback });
                    }
                } else {
                    throw Error(`Null next page link${offset !== undefined ? `, page: ${i}/${offsetArg}` : ''}`);
                }
            }
        });
        return this;
    }

    loadPrevious({ callback, offset, errorCallback }:
        { callback?: CallableFunction; offset?: number; errorCallback?: CallableFunction; } = {}): this {

        this.addSyncTask(async () => {
            const offsetArg: number = offset === undefined ? 1 : offset;

            for (let i = 0; i < offsetArg; i++) {
                if (this.hasPrevious()) {
                    if (i + 1 === offset) {
                        await this.download({ url: this.page.previous, callback, errorCallback });
                    } else {
                        await this.download({ url: this.page.previous, callback: undefined, errorCallback });
                    }
                } else {
                    throw Error(`Null previous page link${offset !== undefined ? `, page: ${i}/${offsetArg}` : ''}`);
                }
            }
        });
        return this;
    }

    hasNext(sync: boolean = true): boolean | Promise<boolean> {
        if (sync) {
            return this.page.next !== null;
        } else {
            this.addSyncTask((async () => {
                return this.page.next !== null;
            }));
            return this.task as Promise<boolean>;
        }
    }

    hasPrevious(sync: boolean = true): boolean | Promise<boolean> {
        if (sync) {
            return this.page.previous !== null;
        } else {
            this.addSyncTask((async () => {
                return this.page.previous !== null;
            }));
            return this.task as Promise<boolean>;
        }
    }

    get results(): T[] {
        return this.page.results;
    }

    private addSyncTask(callback: any): void {
        this.task = this.task.then(async (data: any) => await callback(data));
    }

    private async download(
        { url, callback, errorCallback }: { url: string; callback?: any; errorCallback?: any; }): Promise<void> {
        return this.retrieveData.fetch(url)
            .catch(reason => { if (errorCallback !== undefined) { errorCallback(reason); } })
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
