import { APIRequestContext } from "@playwright/test";
export class APIGETS{
    private GET_ALL_CUSTOMERS: string;
    private GET_ALL_CARS: string;

    constructor(GET_ALL_CUSTOMERS: string,GET_ALL_CARS:string){
        this.GET_ALL_CUSTOMERS = GET_ALL_CUSTOMERS;
        this.GET_ALL_CARS=GET_ALL_CARS;
    }

   // BELOW ALL GET REQUESTS METODS

    async getAllCustomers(request: APIRequestContext) {
        const response = await request.get(`${this.GET_ALL_CUSTOMERS}`);
        return response;
    }

    async getAllCars(request: APIRequestContext) {
        const response = await request.get(`${this.GET_ALL_CARS}`);
        return response;
    } 
    
}