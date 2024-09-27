import { APIRequestContext } from "@playwright/test";
export class APIDELETE{
    private DELETE_CAR : string;
    private WRONG_URL : string 

    constructor(DELETE_CAR: string,WRONG_URL:string){
        this.DELETE_CAR = DELETE_CAR;
        this.WRONG_URL = WRONG_URL;
    }

    // below all delete requests metods 

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
    async deleteCarWithLatestId(request: APIRequestContext, carid: number) {
        const payload = { id: carid }; 
        const response = await request.delete(this.DELETE_CAR, {
            headers: {
                'Content-Type': 'application/json',
            },
            data: JSON.stringify(payload), 
        });
        return response;
    }
}