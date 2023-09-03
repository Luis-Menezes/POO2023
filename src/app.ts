import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    findBike(bikeID: string): Bike{
        return this.bikes.find(bike => bike.id === bikeID)
    }
    
    
    registerUser(user: User): void {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        user.id = crypto.randomUUID()
        this.users.push(user)
    }

    registerBike(bike: Bike):void{
        bike.id = crypto.randomUUID()
        this.bikes.push(bike)
    }
    //registerBike
    removeUser(email: string){
        const indexRemove = this.users.findIndex(user => user.email === email)
        this.users.splice(indexRemove, 1)
    }
    rentBike( bikeID : string, userEmail: string, startDate: Date, endDate: Date, ): void{
        //recuperar bike
        const bike = this.findBike(bikeID)

        //recuperar ususario
        const user = this.findUser(userEmail)

        //array só com as reservas da bike
        const array: Rent[] = this.rents.filter(rRent => rRent.bike === bike)
        const newRent = Rent.create(array, bike, user, startDate, endDate) //tenta criar o rent com o array e as info das reservas

        this.rents.push(newRent) //adiciona o rent no array das reservas

    }
    returnBike(bikeID: string, returnDate: Date): void{
        const bike = this.findBike(bikeID)
        const array: Rent[] = this.rents.filter(rRent => rRent.bike === bike)
        const rent = array.find(rent => rent.dateReturned == undefined)
        rent.dateReturned = returnDate
    }
    //return bike
    
}
