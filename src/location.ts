export class Location{
    constructor(public latitude: number, public longitude:number){}

    getlocation(): Promise<Location>{
        return new Promise((resolve, reject) => {
            if ('geolocation' in navigator) {
              navigator.geolocation.getCurrentPosition(
                (position) => {
                  const latitude = position.coords.latitude;
                  const longitude = position.coords.longitude;
                  const localizacao = new Location(latitude, longitude);
                  resolve(localizacao);
                },
                (error) => {
                  reject(error);
                }
              );
            } else {
              reject(new Error('Geolocation não suportada no navegador.'));
            }
          });
    }
}