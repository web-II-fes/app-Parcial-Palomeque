import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ServicioService } from '../../servicio/servicio.service';
import { CrearComponent } from '../crear/crear.component';
import { FormGroup, FormControl, FormBuilder, Validator, Validators} from '@angular/forms';
import { Pedido } from "../../clase/pedido";

@Component({
  selector: 'app-mostrar',
  templateUrl: './mostrar.component.html',
  styleUrls: ['./mostrar.component.css']
})
export class MostrarComponent implements OnInit {
  displayedColumns: string[] = ['nombreCliente', 'direccionEntrega', 'pedido', 'fechaEntrega', 'editar', 'borrar'];
  dataSource : any[] = [];

  formCliente : FormGroup;
   pedidos : any[] = [];
   idPedido : any;
    pedido : any;

  constructor(private fb : FormBuilder, private servicioService : ServicioService, private router : Router) { }

  ngOnInit(): void {
    this.getPedido();
    this.initForm(this.pedido);
  }
  nombreControl = new FormControl('User');

  initForm(editarPedido : Pedido){
      this.formCliente = this.fb.group({
        nombreCliente : [editarPedido ? editarPedido.nombreCliente :'', Validators.required],
        direccionEntrega : [editarPedido ? editarPedido.direccionEntrega :'', Validators.required],
        pedido : [editarPedido ? editarPedido.pedido :'', Validators.required],
        fechaEntrega : [editarPedido ? editarPedido.fechaEntrega :'', Validators.required]
       });
      }

  getPedido(){
    this.servicioService.getPedido().subscribe((data: any) => {
      
      this.dataSource = data;
    });
  }

  recibePedido(pedido : CrearComponent){
    
    this.dataSource.push(pedido);
  }

  editarPedido(idPedido){
  

    this.router.navigate(['/crear-component/', idPedido]);
  }
    
  borrarPedido(pedido: any){
    this.idPedido = pedido._id;
    this.servicioService.borrarPedido
    (this.idPedido).subscribe((data: any ) =>{
    let pedidoBorrado = pedido;
  });
  location.reload();
  }
}
