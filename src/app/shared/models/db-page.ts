export class DbPage<ResultObject> {
    count: number;
    next: null | string;
    previous: null | string;
    results: ResultObject[];
}