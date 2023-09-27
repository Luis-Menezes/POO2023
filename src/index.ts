import { App } from "./app";
import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import * as sinon from 'sinon';

async function main(){
    const app = new App()
    const user0 = new User('Joaozinho', 'jpmatador', '164924')
    await app.registerUser(user0)
    const user1 = new User('Mariazinha', 'querida@gmail.com', '1234')
    await app.registerUser(user1)
    const bike = new Bike('caloi mountainbike', 'mountain bike',
         1234, 1234, 100.0, 'My bike', 5, [])
        app.registerBike(bike)
        const clock = sinon.useFakeTimers();
        app.rentBike(bike.id, user0.email)
        const hour = 1000 * 60 * 60
        clock.tick(2 * hour)
        //const rentAmount = app.returnBike(bike.id, user0.email)
        //app.returnBike(bike.id, user1.email)
        app.removeUser('vnlaksn')
}

main()