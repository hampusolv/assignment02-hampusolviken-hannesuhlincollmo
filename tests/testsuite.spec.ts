import { test, expect } from '@playwright/test';
import { DELETE_CAR, GET_ALL_CUSTOMERS, WRONG_URL } from './urlVariable';
import { APIGETS } from './apiGet';
import { APIDELETE } from './apiDelete'
import { Faker } from '@faker-js/faker';


  test('Test case 01 find all customers', async ({ request }) => {
    let apigets: APIGETS;
    apigets = new APIGETS(GET_ALL_CUSTOMERS);
    const responseallcustomers = await apigets.getAllCustomers(request);
    expect(responseallcustomers.ok()).toBeTruthy();
    expect(responseallcustomers.status()).toBe(200);
  });

  test("Test case 05 delete car with wrong url", async ({ request }) => {
    let apidelete: APIDELETE;
    apidelete = new APIDELETE(WRONG_URL);
    const responsedeletecar = await apidelete.deleteCarWithWrongUrl(request);
    expect(responsedeletecar.ok()).toBeFalsy();
    expect(responsedeletecar.status()).toBe(405);
  });

  test("Test case 10", async ({ request }) => {
    let apiDelete: APIDELETE;
    apiDelete = new APIDELETE(DELETE_CAR);
    const responsedeletecar = await apiDelete.deleteCar(request);
    expect(responsedeletecar.ok()).toBeFalsy();
    expect(responsedeletecar.status()).toBe(404);
    console.log(responsedeletecar);

    


  });


