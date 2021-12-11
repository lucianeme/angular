import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { SeguridadService } from './seguridad.service';
import { ServicioModelo } from '../modelos/servicio.model';


@Injectable({
  providedIn: 'root'
})
export class ServicioService {

  constructor(private http: HttpClient,
    private seguridadService: SeguridadService
    ) { 
      this.token = this.seguridadService.getToken();
    }

    url = "http://localhost:3000"
    token: string = ''

    store(servicio: ServicioModelo): Observable<ServicioModelo> {
      return this.http.post<ServicioModelo>(`${this.url}/servicios`, {
        fecha: servicio.fecha,
        hora: servicio.hora,
        valor: servicio.valor,
        origen: servicio.origen,
        destino: servicio.destino,
        encomienda: servicio.encomienda
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })  
      });
    }

    getAll(): Observable<ServicioModelo[]>{
      return this.http.get<ServicioModelo[]>(`${this.url}/servicios`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    update(servicio: ServicioModelo): Observable<ServicioModelo> {
      return this.http.patch<ServicioModelo>(`${this.url}/servicios/${servicio.id}`, {
        fecha: servicio.fecha,
        hora: servicio.hora,
        valor: servicio.valor,
        origen: servicio.origen,
        destino: servicio.destino,
        encomienda: servicio.encomienda
      }, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      });
    }

    delete(id: string): Observable<ServicioModelo[]>{
      return this.http.delete<ServicioModelo[]>(`${this.url}/servicios/${id}`, {
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }

    getWithId(id: string): Observable<ServicioModelo>{
      return this.http.get<ServicioModelo>(`${this.url}/servicios/${id}`,{
        headers: new HttpHeaders({
          "Authorization": `Bearer ${this.token}`
        })
      })
    }





}
