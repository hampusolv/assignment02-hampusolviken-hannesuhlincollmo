import { test, expect } from '@playwright/test';

import { ADD_CAR, ADD_CUSTOMER, GET_ALL_CUSTOMERS } from './urlVariable';

import { APIGETS } from './apiGet';

import { generateFakerDataCreateCar } from './fakerData';

import { APIPOSTS } from './apiPost';

import { generateEmptyCustomerSchema } from './EmptyData';

test.describe('Testsuite Hannes and Hampus Group', () => {
  let apigets: APIGETS;
  let apiposts: APIPOSTS;

  test.beforeAll(async ({  }) => {
    apigets = new APIGETS(GET_ALL_CUSTOMERS);
    apiposts = new APIPOSTS(ADD_CAR,ADD_CUSTOMER);

  })

  test('Test case 01 find all customers', async ({ request }) => { 
    const responseAllCustomers = await apigets.getAllCustomers(request);
    expect(responseAllCustomers.ok()).toBeTruthy();
    expect(responseAllCustomers.status()).toBe(200);
    expect(responseAllCustomers.status()).not.toBe(500);
    expect(responseAllCustomers.status()).not.toBe(400);
  });

  test('Test case 02 add cars with a registration number that are in the database', async ({ request, }) => { 
    const payload = generateFakerDataCreateCar();
    console.log(payload)
     // print out payload you send to the server url for add car for check paylod object with
    const responseCreateCar= await apiposts.addCAR(request, payload);
    // assert that you cant create a new car with a registration number that allready exists expect staus_code 409 
    expect(responseCreateCar.status()).not.toBe(201);
    expect(responseCreateCar.status()).toBe(409);
  });

  test('Test case 03 add a customer without any value', async ({ request, }) => { 
    const payload = generateEmptyCustomerSchema();
    console.log(payload)
     // print out payload you send to the server url for add customer for check paylod object with
    const responseCreateCustomerWithEmptyData = await apiposts.addCAR(request, payload);
    // assert that you can`t create a new customer with any information expect 400 and not 201 response. 
    expect(responseCreateCustomerWithEmptyData.status()).toBe(400);
    expect(responseCreateCustomerWithEmptyData.status()).not.toBe(201);
    // test fail you can add a customer with no information. Then the carfirm cant contact customers not god buisness. 
    
  });

});

