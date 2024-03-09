

export class Pokemon {
    /*
    public id: number;
    public name: string;

    constructor (id: number, name: string) {
        this.id = id;
        this.name = name;
        console.log('constructor llamado');
    }*/

    constructor(
        public id: number,
        public name: string
    ){}

}

export const charmander = new Pokemon(4,'Charmander');
