import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CatBreed, Image, Search } from '../interfaces/list-home.interface';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ServicesService {

  constructor(
    private readonly _httpClient: HttpClient
  ) { 
  }

  //  Obtener los datos de los gatos
  getListCatbreeds(): Observable<CatBreed[]> {
    return this._httpClient.get<CatBreed[]>(`${environment.API_URL}/breeds`)
  }

  //  Obtener dato del gato por ID
  getCatbreedById(id: string): Observable<CatBreed> {
  return this._httpClient.get<CatBreed>(`${environment.API_URL}/breeds/${id}`)
  }

  // Obtener imagen de un gato por ID
  getCatImageById(id: string): Observable<Image> {
    return this._httpClient.get<Image[]>(`${environment.imageUrl}search?breed_ids=${id}`).pipe(
      map(res => res[0])
    )
  }

  // Obtener datos de busqueda
  getCatSearch(params: Search): Observable<CatBreed[]> {
    return this._httpClient.get<CatBreed[]>(`${environment.API_URL}/breeds/search?q=${params}`)
  }

} 