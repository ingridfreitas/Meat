import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable } from 'rxjs';
import { MEAT_API } from '../app.api';
import { Restaurant } from './restaurant/restaurant.model';
import { catchError, map } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class RestaurantsService {


  constructor(private http: HttpClient, private tost: ToastrService) { }

  restaurants() : Observable <Restaurant[]> {
    return this.http.get<Restaurant[]>(`${MEAT_API}/restaurants`).pipe(
      map(restaurants => restaurants),
      catchError(erro => this.exibirErro(erro))
    )
  }

  restaurantById(id: String): Observable<Restaurant>{
    return this.http.get<Restaurant>(`${MEAT_API}/restaurants/${id}`).pipe(
      map(restaurants => restaurants), 
      catchError(erro => this.exibirErro(erro))
    )
  }

  exibirErro(e: any): Observable<any>{
    this.exibirMensagem('ERRO!', 'Erro de Conexão com banco de dados', 'Json erro');
    return EMPTY
  }

  exibirMensagem(titulo: string, mensagem: string, tipo: string):void{
    this.tost.show(mensagem, titulo, {closeButton: true, progressBar: true}, tipo)
  }
}
