import { faker } from "@faker-js/faker";
import { CAR_REGISTRATION_NUMBER, CAR_ID_1, CAR_ID_2 } from "./carVariable";
import { Customer_ID_FIRST} from "./customerVariable";

export const CreateCarWithExistringRegistrationNumber = () => {
    return {
        "pricePerDay": faker.number.int(100),
        "fabric": faker.lorem.word(5),
        "model": faker.string.alphanumeric(5),
        "registrationNumber": CAR_REGISTRATION_NUMBER
    }
}

export const UpdateCustomer = () => {
    return {
        "id": Customer_ID_FIRST,
        "username": faker.person.suffix(),
        "name": faker.person.firstName(),
        "address": faker.location.streetAddress(),
        "email": faker.internet.email(),
        "phoneNumber": faker.phone.number()
    }
}

export const OrderCarFirstUser = () => {
    return {
        "userId": Customer_ID_FIRST,
        "carId": CAR_ID_1,
        "date": faker.date.soon(),
        "numberOfDays": faker.number.int({ min: 10, max: 255 })
    }
}

export const CreateCar = () => {
    return {
        "pricePerDay": faker.number.int(100),
        "fabric": faker.lorem.word(5),
        "model": faker.string.alphanumeric(5),
        "registrationNumber": faker.string.alphanumeric(6),
    }
}

export const UpdateCarWithNegativePrice = () => {
    return {
        "id": CAR_ID_2,
        "pricePerDay": faker.number.int({ min: -100, max: -1 }),
        "fabric": faker.lorem.word(5),
        "model": faker.string.alphanumeric(5),
        "registrationNumber": faker.string.alphanumeric(6),
    }
}

export const generateFakerDataOrderCar = () => {
    return {
        "userId": 1,
        "carId": 2,
        "date": faker.date.past(), // '2021-12-03T05:40:44.408Z'
        "numberOfDays": faker.number.int({ min: 1, max: 255 }),

    }
}

