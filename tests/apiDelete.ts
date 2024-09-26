import { APIRequestContext } from "@playwright/test";

export class APIDELETE{
    private DELETE_CAR: string;
  

    constructor(DELETE_CAR: string){
        this.DELETE_CAR = DELETE_CAR;
        
    }

   // BELOW ALL DELETE REQUESTS METODS
   async deleteCarWithLatestId(request: APIRequestContext, carid: number) {
    const payload = { id: carid }; // Create a payload with the car ID
    const response = await request.delete(this.DELETE_CAR, {
        headers: {
            'Content-Type': 'application/json',
        },
        data: JSON.stringify(payload), // Send the payload in the body
    });
    return response;
  }
}
     

