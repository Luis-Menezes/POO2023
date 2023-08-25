
export class Bike{
    nSerie: string
    status: boolean = false //se tá reservada = 1, se tá livre = 0

    constructor(nSerie: string){
        this.nSerie = nSerie
    }

    libera(): boolean {
     if(this.status == false){
        this.status = true
        return true //se ela não tá reservada retorna 1 pra desbloquear o trem
     }
     else  return false //não desbloquea o trem
    }
}
