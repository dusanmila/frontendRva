import { HttpClient, HttpClientModule } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SMER_URL } from '../app.constants';
import {Smer} from '../models/smer';

@Injectable({
  providedIn: 'root'
})
export class SmerService {

  constructor(private httpClient: HttpClient) { }

  public getAllSmerovi() : Observable<any> {
    return this.httpClient.get(`${SMER_URL}`)
    //u smer komponenti ce se ispisati ovi podaci 
    
}
  //ovo je metoda koja iscitava sve smerove, a pozivace onu metodu
  //sa bekenda 
  //obzervabla vraca neki tok podataka, a mi cemo moci da se prijavimo
  //na taj tok podataka 

  //pravimo metodu koja ce dodavati novi smer 
  public addSmer(smer: Smer): Observable<any> 
  {
    smer.id = 0;
    return this.httpClient.post(`${SMER_URL}`, smer)
//sad mozrmo pozvati iz dijalog komponente
}

public updateSmer(smer: Smer): Observable<any> {
  return this.httpClient.put(`${SMER_URL}`, smer) 
}
//prosledjuje se samo ID smera koji brisemo, i razlicita je putanja na kojoj se izvrsava delete metoda 
public deleteSmer(id: number) : Observable<any> {
  return this.httpClient.delete(`${SMER_URL}/${id}`);
  //PAZI KAKO PROSLEDJUJES OVAJ ID 
  
}


}
