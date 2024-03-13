import { Controller, Get, Param } from '@nestjs/common';

@Controller('cars')
export class CarsController {

    private cars =['Toyota','Honda','Jeep'];

    @Get()
    getAllCars(){
        return this.cars;
    }

    @Get(':id')
    getCarById(@Param('id') id: string ) {
        //let carro: string = this.cars.find((car,index) => index == +id) solucion compleja
        return this.cars[id]
    }
}
