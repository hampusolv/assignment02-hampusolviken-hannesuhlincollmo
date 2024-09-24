import { test, expect } from '@playwright/test';

import { ADD_CAR, GET_ALL_CUSTOMERS } from './urlVariable';

import { APIGETS } from './apiGet';

import { generateFakerDataCreateCar } from './fakerData';

import { APIPOSTS } from './apiPost';

test.describe('Testsuite Hannes', () => {

  test.beforeEach(async ({  }) => {
    console.log ("now we do a new teste here in my testsuite");
  });

  test('Test case 01 find all customers', async ({ request }) => { // request här används som argumnet för att http anrop ska kunna göras inom testen 
    let apigets: APIGETS;
    //This line doesn't initialize the variable,just declares that apigets will be of type APIGETS.
    apigets = new APIGETS(GET_ALL_CUSTOMERS);
    /* The new APIGETS() syntax creates a new object of 
    type APIGETS and assigns it to the variable apigets 
    .*/
    const responseallcustomers = await apigets.getAllCustomers(request);
    /* asign a variabel to url allcustomes to object 
    apigets and call metod getAllCustomers fom class apiGet
    and with request run Apirequestcontext isolated on this test through request argument */
    expect(responseallcustomers.ok()).toBeTruthy();
    expect(responseallcustomers.status()).toBe(200);
    expect(responseallcustomers.status()).not.toBe(500);
    expect(responseallcustomers.status()).not.toBe(400);
  });

  test('Test case 02 add two cars with same registration number', async ({ request, }) => { 
    let apiposts: APIPOSTS;
    // //This line doesn't initialize the variable, just declares that apigets will be of type Class APIPOSTS.
    apiposts = new APIPOSTS(ADD_CAR);
    // do a varaible paylod and asign it to metod generateFakerDataCreateCar
    const payload = generateFakerDataCreateCar();
    console.log(payload)
     // print out payload you send to the server url for add car for check paylod object with
    const responsecreatecar = await apiposts.ADDCAR(request, payload);
    // assert that you cant create a new car with a registration number that allready exists expect staus_code 409 
    expect(responsecreatecar.status()).not.toBe(201);
    expect(responsecreatecar.status()).toBe(409);
  });

});

