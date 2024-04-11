import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';
import { CreateCarDto, UpdateCarDto } from './dto';


@Injectable()
export class CarsService {

    private cars:Car[]= [
        // {
        //     id: uuid(),
        //     brand: 'Toyota',
        //     model: 'Corolla'
        // },
    ];

    public findAll(){
        return this.cars;
    }

    public findOneById(id: string){
        let car = this.cars.find(car => car.id == id);

        if(!car){
            throw new NotFoundException(`Car with '${id}' not found`);
        }

        return car;
    }

    public create(createCarDto: CreateCarDto){

        let car: Car = {
            id: uuid(),
           ...createCarDto
        }

        this.cars.push(car);

        return car;
    }

    update( id: string, updateCarDto: UpdateCarDto ) {

        let carDB = this.findOneById( id );
        
        if( updateCarDto.id && updateCarDto.id !== id )
            throw new BadRequestException(`Car id is not valid inside body`);

        this.cars = this.cars.map( car => {

            if ( car.id === id ) {
                carDB = { ...carDB,...updateCarDto, id }
                return carDB;
            }

            return car;
        })
        
        return carDB;
    }
    
    public delete(id: string){

        let carDB = this.findOneById(id);

        this.cars = this.cars.filter (car => car.id !== id);

    }

    fillCarsWithSeedData(cars : Car[]){
        this.cars = cars;
    }
}
