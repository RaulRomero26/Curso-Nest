import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuid } from 'uuid';
import { Car } from './interfaces/car.interface';

@Injectable()
export class CarsService {

    private cars:Car[]= [
        {
            id: uuid(),
            brand: 'Toyota',
            model: 'Corolla'
        },
        {
            id: uuid(),
            brand: 'Honda',
            model: 'Civic'
        },
        {
            id: uuid(),
            brand: 'Jeep',
            model: 'Cherokee'
        },
       
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

}
