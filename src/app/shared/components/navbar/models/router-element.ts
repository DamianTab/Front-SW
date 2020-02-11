export class RouterElement {
  name = '';
  link = '';
  id;

  constructor(name: string, link: string, id?: number) {
    this.name = name;
    this.link = link;
    this.id = id;
  }
}
