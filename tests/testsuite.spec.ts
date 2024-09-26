import { test, expect } from '@playwright/test';
import { ADD_CAR, DELETE_CAR, GET_ALL_CUSTOMERS, ORDER_CAR, WRONG_URL } from './urlVariable';
import { APIDELETE } from './apiDelete'
import { APIPOST } from './apiPost';
import { generateFakerDataOrderCar } from './fakerData';



test.describe('Hannes och Hampus', () => {
  let apiposts: APIPOST;
  let apiDelete: APIDELETE;

  test.beforeAll(async ({ }) => {
    apiposts = new APIPOST(ADD_CAR, ORDER_CAR);
    apiDelete = new APIDELETE(DELETE_CAR);
  })

  test("Test case 08 delete car with wrong url", async ({ request }) => {

    const responsedeletecar = await apiDelete.deleteCarWithWrongUrl(request);
    expect(responsedeletecar.ok()).toBeFalsy();
    expect(responsedeletecar.status()).toBe(405);
  });

  test("Test case 09", async ({ request }) => {

    const responsedeletecar = await apiDelete.deleteCar(request);
    expect(responsedeletecar.ok()).toBeFalsy();
    expect(responsedeletecar.status()).toBe(404);
    console.log(responsedeletecar);

  });

  test("Test case 10 ", async ({request}) =>{

    const payload = generateFakerDataOrderCar();
    const responsebookcar = await apiposts.orderCar(request,payload);
    expect(responsebookcar.status()).toBe(400);
    console.log(responsebookcar);


  });
  


});

