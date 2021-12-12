import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ClienteModelo } from 'src/app/modelos/cliente.model';
import { EncomiendaModelo } from 'src/app/modelos/encomienda.model';
import { ServicioModelo } from 'src/app/modelos/servicio.model';
import { ClienteService } from 'src/app/servicios/cliente.service';
import { EncomiendaService } from 'src/app/servicios/encomienda.service';
import { ServicioService } from 'src/app/servicios/servicio.service';
import Swal from 'sweetalert2'

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {

  constructor(private fb: FormBuilder,
    private servicioService: ServicioService,
    private encomiendaService: EncomiendaService,
    private clienteService: ClienteService,
    private router: Router) { }

    listadoEncomiendas: EncomiendaModelo[] = []
    listadoClientesO: ClienteModelo[] = []

    fgValidacion = this.fb.group({
      fecha: ['', [Validators.required]],
      hora: ['', [Validators.required]],
      valor: ['', [Validators.required]],
      origen: ['', [Validators.required]],
      destino: ['', [Validators.required]],
      encomienda: ['', [Validators.required]],
    });
  

  ngOnInit(): void {
    this.getAllEncomiendas()
    this.getAllClientesOrigen()
  }

  store(){
    let servicio = new ServicioModelo();
    servicio.fecha = this.fgValidacion.controls["fecha"].value;
    servicio.hora = this.fgValidacion.controls["hora"].value;
    servicio.valor = this.fgValidacion.controls["valor"].value;
    servicio.origen = this.fgValidacion.controls["origen"].value;
    servicio.destino = this.fgValidacion.controls["destino"].value;
    servicio.encomienda = this.fgValidacion.controls["encomienda"].value;
 
    this.servicioService.store(servicio).subscribe((data: ServicioModelo)=> {
      Swal.fire('Creado correctamente!', '', 'success')
      this.router.navigate(['/servicios/get']);
    },
    (error: any) => {
      console.log(error)
      alert("Error en el envio");
    })
  }

  getAllEncomiendas(){
    this.encomiendaService.getAll().subscribe((data: EncomiendaModelo[]) => {
      this.listadoEncomiendas = data
      console.log(data)
    })
  }

  getAllClientesOrigen(){
    this.clienteService.getAll().subscribe((data: ClienteModelo[]) => {
      this.listadoClientesO = data
      console.log(data)
    })
  }



}
