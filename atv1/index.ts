import { Sistema } from "./sistema";
import { Bike } from "./bike";
import { Aluguel } from "./aluguel";
import { Usuario } from "./users";

const sistema0 = new Sistema
const luis = new Usuario('luis menezes', '164924')
sistema0.cadastraUsuario(luis)
const bike0 = new Bike('2408')
const bike1 = new Bike('2023')
sistema0.cadastraBike(bike0)
sistema0.cadastraBike(bike1)
const date1 = new Date("2020-02-01")
const reserva0 = new Aluguel(date1, date1, luis, 'ict - unifesp', bike0)
sistema0.aluga(reserva0)

console.log(sistema0)
console.log(reserva0)
