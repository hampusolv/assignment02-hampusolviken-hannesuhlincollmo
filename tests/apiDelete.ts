import { APIRequestContext } from "@playwright/test";
import { WRONG_URL } from "./urlVariable";

export class APIDELETE{
    private DELETE_CAR : string;
    private WRONG_URL : string 

    constructor(DELETE_CAR: string ){
        this.DELETE_CAR = DELETE_CAR;
        this.WRONG_URL = WRONG_URL;
    }
async deleteCar(request: APIRequestContext ) {
    const response = await request.delete(`${this.DELETE_CAR}`, {
        headers: {
            'Content-Type': 'application/json', 
        },
        data: {
            "id": "100"


        }

    });
    return response;
    }

    async deleteCarWithWrongUrl(request: APIRequestContext){
        const response = await request.delete(`${this.WRONG_URL}`,{
            headers: {
                "Content-Type": "application/json",

            },
            data: {
                "id": "1000"
            }

        });
        return response;
    }
}