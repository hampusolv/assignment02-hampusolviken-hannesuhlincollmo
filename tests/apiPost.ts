import { APIRequestContext } from "@playwright/test";

export class APIPOST {
    private ADD_CAR: string;
    private ADD_CUSTOMER: string;
    private ORDER_CAR: string;

    //private makes the get_all_customers property inaccessible from outside the class. 
    constructor(ADD_CAR: string, ADD_CUSTOMER: string,ORDER_CAR:string) {
        this.ADD_CAR = ADD_CAR;
        this.ADD_CUSTOMER = ADD_CUSTOMER;
        this.ORDER_CAR= ORDER_CAR;
    }

    // BELOW ALL POST REQUESTS METODS
    async addCAR(request: APIRequestContext,payload:object) {
        const response = await request.post(`${this.ADD_CAR}`, {
            headers: {
                'Content-Type': 'application/json',
                /* Ensure the server knows you're sending 
                JSON must do oterwise you got 415 response from server*/
            },
            data: JSON.stringify(payload),
        })
        return response
    }

    async addCustomerWithEmpytValue(request: APIRequestContext) {
        const response = await request.post(`${this.ADD_CUSTOMER}`, {
            headers: {
                'Content-Type': 'application/json', 
            },
            data: {
                "username": "",
                "name": "",
                "address": "",
                "email": "",
                "phoneNumber": ""         
            }
        })
        return response
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