import { test, expect } from '@playwright/test';

import { ADD_CAR, ADD_CUSTOMER, GET_ALL_CUSTOMERS } from './urlVariable';

import { APIGETS } from './apiGet';

import { generateFakerDataCreateCar } from './fakerData';

import { APIPOSTS } from './apiPost';

import { generateEmptyCustomerSchema } from './EmptyData';

test.describe('Testsuite Hannes and Hampus Group', () => {
  // declare all variables type notations before all test to avoid redundant code
  let apigets: APIGETS;
  let apiposts: APIPOSTS;

  // hook before all test that initialise all new class object to their classes and with conected URL
  test.beforeAll(async ({  }) => {
    apigets = new APIGETS(GET_ALL_CUSTOMERS);
    apiposts = new APIPOSTS(ADD_CAR,ADD_CUSTOMER);

  })

  test('Test case 01 find all customers', async ({ request }) => { // request här används som argumnet för att http anrop ska kunna göras inom testen 
    // let apigets: APIGETS;
    //This line doesn't initialize the variable,just declares that apigets will be of type APIGETS.
    // apigets = new APIGETS(GET_ALL_CUSTOMERS);
    /* The new APIGETS() syntax creates a new object of 
    type APIGETS and assigns it to the variable apigets 
    .*/
    const responseAllCustomers = await apigets.getAllCustomers(request);
    /* asign a variabel to url allcustomes to object 
    apigets and call metod getAllCustomers fom class apiGet
    and with request run Apirequestcontext isolated on this test through request argument */
    expect(responseAllCustomers.ok()).toBeTruthy();
    expect(responseAllCustomers.status()).toBe(200);
    expect(responseAllCustomers.status()).not.toBe(500);
    expect(responseAllCustomers.status()).not.toBe(400);
  });

  test('Test case 02 add cars with a registration number that are in the database', async ({ request, }) => { 
    // let apiposts: APIPOSTS;
    // //This line doesn't initialize the variable, just declares that apigets will be of type Class APIPOSTS.
    // apiposts = new APIPOSTS(ADD_CAR,ADD_CUSTOMER);
    // do a varaible paylod and asign it to metod generateFakerDataCreateCar
    const payload = generateFakerDataCreateCar();
    console.log(payload)
     // print out payload you send to the server url for add car for check paylod object with
    const responseCreateCar= await apiposts.addCAR(request, payload);
    // assert that you cant create a new car with a registration number that allready exists expect staus_code 409 
    expect(responseCreateCar.status()).not.toBe(201);
    expect(responseCreateCar.status()).toBe(409);
  });

  test('Test case 03 add a customer without any value', async ({ request, }) => { 
    // let apiposts: APIPOSTS;
    // //This line doesn't initialize the variable, just declares that apigets will be of type Class APIPOSTS.
    // apiposts = new APIPOSTS(ADD_CAR,ADD_CUSTOMER);
    // do a varaible paylod and asign it to metod generateEmptyCustomerSchema
    const payload = generateEmptyCustomerSchema();
    console.log(payload)
     // print out payload you send to the server url for add customer for check paylod object with
    const responseCreateCustomerWithEmptyData = await apiposts.addCAR(request, payload);
    // assert that you cant create a new car with a registration number that allready exists expect staus_code 409 
    expect(responseCreateCustomerWithEmptyData.status()).toBe(400);
    expect(responseCreateCustomerWithEmptyData.status()).not.toBe(201);
    // test fail you can add a customer with no information. Then the carfirm cant contact customers not god buisness. 
    
  });

});

