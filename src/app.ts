import { Bike } from "./bike";
import { Rent } from "./rent";
import { User } from "./user";
import crypto from 'crypto'
import { Crypt } from "./crypt";

export class App {
    users: User[] = []
    bikes: Bike[] = []
    rents: Rent[] = []
    crypt: Crypt = new Crypt()

    
    findUser(email: string): User {
        return this.users.find(user => user.email === email)
    }

    updateLocation(id: string): void{
        const bike = this.bikes.find(bike=> bike.id === id)
        bike.location.getlocation()
    }

    async registerUser(user: User): Promise<string> {
        for (const rUser of this.users) {
            if (rUser.email === user.email) {
                throw new Error('Duplicate user.')
            }
        }
        const newId = crypto.randomUUID()
        user.id = newId
        const encryptedPassword = await this.crypt.encrypt(user.password)
        user.password = encryptedPassword
        this.users.push(user)
        return newId
    }

    registerBike(bike: Bike): string {
        const newId = crypto.randomUUID()
        bike.id = newId
        this.bikes.push(bike)
        return newId
    }

    async authenticate(email: string, password: string): Promise<boolean>{
        const user = this.users.find(rUser => rUser.email === email)
        if(!user) throw new Error('User does not exist')
        return await this.crypt.compare(password, user.password)
    }

    removeUser(email: string): void {
        const userIndex = this.users.findIndex(user => user.email === email)
        if (userIndex !== -1) {
            this.users.splice(userIndex, 1)
            return
        }
        throw new Error('User does not exist.')
    }
    
    rentBike(bikeId: string, userEmail: string): void {
        const bike = this.bikes.find(bike => bike.id === bikeId)
        if (!bike) {
            throw new Error('Bike not found.')
        }
        const user = this.findUser(userEmail)
        if (!user) {
            throw new Error('User not found.')
        }
        if(!bike.available){
            throw new Error('Bike not available')
        }
        const newRent = new Rent(bike, user, new Date())
        newRent.bike.available = false
        this.rents.push(newRent)

    }

    returnBike(bikeId: string, userEmail: string): number {
        const now = new Date()
        const rent = this.rents.find(rent => 
            rent.bike.id === bikeId &&
            rent.user.email === userEmail &&
            rent.bike.available === false
        )
        if (!rent) {
            throw new Error('Rent not found.')
        }
        rent.dateReturned = now
        rent.bike.available = true
        const diff = (now.getTime() - rent.dateFrom.getTime())/3600000
        return diff*rent.bike.rate
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
