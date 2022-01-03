export class Book {
    public id: number;
    public title: string;
    public numberPages: number;
    public genre: string;
    public id_autor: number; 

    constructor(id:number, title:string, numberPages:number, genre: string, id_autor: number) {
        this.id = id;
        this.title = title;
        this.numberPages = numberPages;
        this.genre = genre;
        this.id_autor = id_autor
    }
}