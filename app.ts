import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'
import * as bcrypt from 'bcrypt'

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []

    private async hashPassword(password: string): Promise<string> {
        const saltRounds = 10; // O número de rounds de "sal" para a criptografia (recomendado >= 10)
        const salt = await bcrypt.genSalt(saltRounds);
        const hashedPassword = await bcrypt.hash(password, salt);
        return hashedPassword;
      }
      
    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    registerUser(user: User): string {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const newId = crypto.randomUUID()
        this.hashPassword(user.password)
            .then((hashedPassword)=>{
                console.log('Password: ', hashedPassword)
                user.password = hashedPassword
            })
            .catch((error) => {
                console.log('Could not cryptograph password', error)
            })
        user.id = newId
        this.users.push(user)
        return newId
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    loginUser(email: string, password: string): void{
        const user = this.users.find(rUser => rUser.email === email)
        if(!user){
            throw new Error('User does not exist')
        }
        if(user.password != password){
            throw new Error('Invalid password')
        }
        else{
            console.log('Welcome ', user.name)
        }
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    
    rentBike(bikeId: string, userEmail: string, startDate: Date, endDate: Date): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        const bikeRents = this.rents.filter(rent =>
            rent.bike.id === bikeId && !rent.dateReturned
        )
        const newRent = Rent.create(bikeRents, bike, user, startDate, endDate)
        this.rents.push(newRent)
    }

    returnBike(bikeId: string, userEmail: string) {
        const today = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.dateReturned === undefined &&
            rent.dateFrom <= today
        )
        if (rent) {
            rent.dateReturned = today
            return
        }
        throw new Error('Rent not found.')
    }
    listRents(): Rent[] {
        return this.rents.slice()
    }
    
    listUsers(): User[]{
        return this.users.slice()
    }

    listBikes():Bike[]{
        return this.bikes.slice()
    }
}
