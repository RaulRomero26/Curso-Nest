
export const pokemonIds = [1,20,30,34,66];


interface Pokemon {
    id: number;
    name: string;
    age?: number;

}

 export const bulbasur: Pokemon = {
     id:1,
     name: 'Bulbasur'
 }

 console.log(bulbasur)