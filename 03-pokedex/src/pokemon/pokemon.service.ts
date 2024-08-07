import { BadGatewayException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { isValidObjectId, Model } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';
import { PaginationDto } from '../common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  constructor(

    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,

    private readonly configService: ConfigService
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {      
      const pokemon = await this.pokemonModel.create(createPokemonDto);
  
      return pokemon;
    } catch (error) {
      this.handleException(error)
    }

  }

  findAll(paginationDto: PaginationDto) {
    const {limit = this.configService.get<number>('defaultLimit'), offset = 0} = paginationDto;
    return this.pokemonModel.find()
    .limit(limit)
    .skip(offset)
    .sort({no:1})
    .select('-__v');
  }

  async findOne(term: string) {

    let pokemon: Pokemon;

    //Por id 

    if(!isNaN(+term)){
      pokemon = await this.pokemonModel.findOne({no:term});
    }
   
    //Mongo ID
    if( !pokemon && isValidObjectId(term)){
      pokemon = await this.pokemonModel.findById(term);
    }

    // Name

    if(!pokemon){
      pokemon = await this.pokemonModel.findOne({name:term.toLowerCase()});
    }

    if(!pokemon) throw new NotFoundException(`Pokemon ${term} not found`);

    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {

    const pokemon = await this.findOne(term);
    
    if(updatePokemonDto.name){
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
    }

    try {
      await pokemon.updateOne(updatePokemonDto);
      return {...pokemon.toJSON(),...updatePokemonDto};
    } catch (error) {
      this.handleException(error)
    }
   
  }

  async remove(id: string) {
   const {deletedCount} = await this.pokemonModel.deleteOne({_id:id});
   if(deletedCount === 0){
    throw new NotFoundException(`Pokemon ${id} not found`);
   }
   return;
  }

  private handleException(error: any){
    if(error.code === 11000){
      throw new BadGatewayException(`Pokemon exists un db ${JSON.stringify(error.keyValue)}`)
    }
    console.log(error);
    throw new InternalServerErrorException(`Can't create Pokemon - Check server logs`)
  }
}
