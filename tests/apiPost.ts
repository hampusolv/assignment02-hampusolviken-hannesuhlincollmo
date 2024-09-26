import { Faker } from "@faker-js/faker";
import { APIRequestContext } from "@playwright/test";

export class APIPOST{
    private ADD_CAR: string;
    private ORDER_CAR: String

    constructor(ADD_CAR: string,ORDER_CAR:string){
        this.ADD_CAR = ADD_CAR;
        this.ORDER_CAR =ORDER_CAR;
    }

    // POST

    async ADDCAR(request: APIRequestContext) {
        const response = await request.post(`${this.ADD_CAR}`);
        return response;
    }

    async orderCar(request: APIRequestContext,payload:object) {
        const response = await request.post(`${this.ORDER_CAR}`, {
            headers: {
                'Content-Type': 'application/json', 
            },
            data: JSON.stringify(payload),


        })
        return response
    }

}











