import { faker } from "@faker-js/faker";


export const generateFakerDataOrderCar = () => {
    return {
            "userId": 1,
            "carId": 2,
            "date": faker.date.past(), // '2021-12-03T05:40:44.408Z'
            "numberOfDays":faker.number.int({min: 1, max: 255 }),

    }
}


