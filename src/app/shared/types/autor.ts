export class Autor {
    public id: number;
    public surName: string;
    public firstName: string;
    public patronymic: string;
    public dateBirth: string; 

    constructor(id:number, surName:string, firstName:string, patronymic: string, dateBirth: string) {
        this.id = id;
        this.surName = surName;
        this.firstName = firstName;
        this.patronymic = patronymic;
        this.dateBirth = dateBirth
    }
}