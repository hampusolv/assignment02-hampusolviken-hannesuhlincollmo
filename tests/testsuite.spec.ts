import { test, expect } from '@playwright/test';
import { generateFakerDataOrderCar } from './fakerData';
import { ADD_CAR, ADD_CUSTOMER, GET_ALL_CUSTOMERS, UPDATE_CUSTOMER, ORDER_CAR, GET_ALL_CARS, DELETE_CAR,UPDATE_CAR,WRONG_URL } from './urlVariable';
import { APIGETS } from './apiGet';
import { CreateCarWithExistringRegistrationNumber,UpdateCustomer, OrderCarFirstUser, OrderCarSecondUser,CreateCar, UpdateCarWithNegativePrice} from './fakerData';
import { APIPOST } from './apiPost';
import { APIPUTS } from './apiPut';
import { APIDELETE } from './apiDelete';

test.describe('Testsuite Hannes and Hampus Group', () => {
  let apigets: APIGETS;
  let apiposts: APIPOST;
  let apiputs: APIPUTS;
  let apiDelete: APIDELETE;

  test.beforeAll(async ({ }) => {
    apigets = new APIGETS(GET_ALL_CUSTOMERS, GET_ALL_CARS);
    apiposts = new APIPOST(ADD_CAR, ADD_CUSTOMER, ORDER_CAR);
    apiputs = new APIPUTS(UPDATE_CUSTOMER,UPDATE_CAR);
    apiDelete = new APIDELETE(DELETE_CAR,WRONG_URL);
  })

  test('Test case 01 find all customers', async ({ request }) => {
    const responseAllCustomers = await apigets.getAllCustomers(request);
    expect(responseAllCustomers.ok()).toBeTruthy();
    expect(responseAllCustomers.status()).toBe(200);
    expect(responseAllCustomers.status()).not.toBe(500);
    expect(responseAllCustomers.status()).not.toBe(400);
  });

  test('Test case 02 add cars with a registration number that are in the database', async ({ request, }) => {
    const payload = CreateCarWithExistringRegistrationNumber();
    const responseCreateCar = await apiposts.addCAR(request, payload);
    expect(responseCreateCar.status()).not.toBe(201);
    expect(responseCreateCar.status()).toBe(409);
  });

  test('Test case 03 uppdate a customer and verify changes in customers list', async ({ request, }) => {
    const payload = UpdateCustomer();
    const responseUpdateCustomer = await apiputs.uppdateCustomer(request, payload);
    expect(await responseUpdateCustomer.json()).toMatchObject(
      expect.objectContaining({
        name: payload.name,
        username: payload.username,
        address: payload.address,
        email: payload.email,
        phoneNumber: payload.phoneNumber,
        id: payload.id
      })
    )
    const responseAllCustomers = await apigets.getAllCustomers(request);
    expect(responseAllCustomers.ok()).toBeTruthy();
    const allCustomers = await responseAllCustomers.json();
    expect(allCustomers).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: payload.name,
          username: payload.username,
          address: payload.address,
          email: payload.email,
          phoneNumber: payload.phoneNumber,
          id: payload.id
        })
      ])
    )
  });

  test('Test case 04 add a customer without any value', async ({ request, }) => {
    const responseCreateCustomerWithnodata = await apiposts.addCustomerWithEmpytValue(request);
    expect(responseCreateCustomerWithnodata.status()).toBe(400);
    expect(responseCreateCustomerWithnodata.status()).not.toBe(201);
  });

  test('Test case 05 book a car and then validate that another user cant book same car', async ({ request, }) => {
    const payload = OrderCarFirstUser();
    const responseordecar = await apiposts.orderCar(request, payload);
    expect(responseordecar.status()).toBe(200);
    const responsemessage = await responseordecar.text();
    expect(responsemessage).toStrictEqual("Booking created successfully");
    expect(responsemessage).not.toStrictEqual("Car is already booked");
    const payload2 = OrderCarSecondUser();
    const responseordecar2 = await apiposts.orderCar(request, payload2);
    const responsemessage2 = await responseordecar2.text();
    expect(responsemessage2).toStrictEqual("Car is already booked");
  });

  test('Test case 06 create car and take away car from car list', async ({ request }) => {
    const payload = CreateCar();
    const responsecreateCar = await apiposts.addCAR(request, payload);
    expect(responsecreateCar.status()).toBe(201);
    expect(responsecreateCar.status()).not.toBe(400);
    const createcar = await responsecreateCar.json()
    const carid = createcar.id;
    const responseallcars = await apigets.getAllCars(request);
    expect(responseallcars.status()).toBe(200);
    const allcars = await responseallcars.json();
    expect(allcars).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          pricePerDay: payload.pricePerDay,
          fabric: payload.fabric,
          model: payload.model,
          registrationNumber: payload.registrationNumber,
        })
      ])
    )
    const deleteresponselatestcar = await apiDelete.deleteCarWithLatestId(request, carid);
    expect(deleteresponselatestcar.status()).toBe(200);
    const uppdatedcarlistresponse = await apigets.getAllCars(request);
    const uppdatedcarlist = await uppdatedcarlistresponse.json();
    expect(uppdatedcarlist).not.toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          id: carid
        })
      ])
    )
  });
  test('Test case 07 validate update car with negative price', async ({ request,}) => {
    const payload = UpdateCarWithNegativePrice();
    console.log(payload)
    const responseuppdatecarnegativeprice = await apiputs.uppdateCar (request,payload);
    expect(responseuppdatecarnegativeprice.status()).toBe(400);
    expect(responseuppdatecarnegativeprice.status()).not.toBe(200);
  });
  
  test("Test case 08 delete car with wrong url", async ({ request }) => {
    const responsedeletecar = await apiDelete.deleteCarWithWrongUrl(request);
    expect(responsedeletecar.ok()).toBeFalsy();
    expect(responsedeletecar.status()).toBe(405);
  });

  test("Test case 09 delete a car that is allready gone", async ({ request }) => {
    const responsedeletecar = await apiDelete.deleteCar(request);
    expect(responsedeletecar.ok()).toBeFalsy();
    expect(responsedeletecar.status()).toBe(404);
    console.log(responsedeletecar);

  });

  test("Test case 10 order car with old date ", async ({request}) =>{
    const payload = generateFakerDataOrderCar();
    const responsebookcar = await apiposts.orderCar(request,payload);
    expect(responsebookcar.status()).toBe(400);
    console.log(responsebookcar);
  });
  
  
});

