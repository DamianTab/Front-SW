export class RouterElement {
  name = '';
  link = '';
  id;

  // tslint:disable-next-line: variable-name
  constructor(_name: string, _link: string, _id?: number) {
    this.name = _name;
    this.link = _link;
    this.id = _id;
  }
}
