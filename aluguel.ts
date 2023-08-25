import { Usuario } from './usuario'
import { Bike } from './bike'

export class Aluguel{

    constructor(
    public inicioReserva: Date,
    public fimReserva: Date,
    public locatario: Usuario,
    public local: string, //CEP
    public bike: Bike
    ){}
    

}