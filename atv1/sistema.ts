import { Aluguel } from "./aluguel";
import { Bike } from "./bike";
import { Usuario } from "./usuario";

export class Sistema{


    bikes: Bike[] = []
    users: Usuario[] = []
    reservas: Aluguel[] = []
    
    cadastraBike(bike: Bike): void{
        this.bikes.push(bike)
    }
    cadastraUsuario(usuario: Usuario): void{
        this.users.push(usuario)
    }
    aluga(aluguel: Aluguel): void{//to partindo do principio que o usuario não pode escolher a bike
        this.reservas.push(aluguel)
        aluguel.bike.status = true //seta o status da bike alugada para ocupado
    }

}
