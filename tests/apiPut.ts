import { APIRequestContext } from "@playwright/test";
export class APIPUTS {
    private UPDATE_CUSTOMER: string;
    private UPDATE_CAR:string;

    constructor(UPDATE_CUSTOMER: string,UPPDATE_CAR:string) {
        this.UPDATE_CUSTOMER = UPDATE_CUSTOMER;
        this.UPDATE_CAR= UPPDATE_CAR;
    
    }

    // BELOW ALL PUTS REQUESTS METODS

    async uppdateCustomer(request: APIRequestContext,payload:object) {
        const response = await request.put(`${this.UPDATE_CUSTOMER}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(payload),
        })
        return response
    }

    async uppdateCar(request: APIRequestContext,payload:object) {
        const response = await request.put(`${this.UPDATE_CAR}`, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(payload),
        })
        return response
    }
   
}