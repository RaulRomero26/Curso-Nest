import axios from 'axios';

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
        public readonly id: number,
        public name: string,
        //public imageUrl: string,
    ){}

    get imageUrl(): string{
        return `https://pokemon.com/${this.id}.jpg`
    }

    scream() {
        console.log(`${this.name.toLocaleUpperCase()}!!!`);
    }

    speak() {
        console.log(`${this.name}, ${this.name}`);
    }

    async getMoves(){
        
        //const moves =10;
        
        const {data} = await axios.get('https://pokeapi.co/api/v2/pokemon/4');

       console.log(data.moves);

       return data.moves;
    }
}

export const charmander = new Pokemon(4,'Charmander');

console.log(charmander);
charmander.speak();
charmander.scream();
charmander.getMoves();