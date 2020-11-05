import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Pedido } from 'src/app/clase/pedido';
import { ServicioService } from 'src/app/servicio/servicio.service';

@Component({
  selector: 'app-crear',
  templateUrl: './crear.component.html',
  styleUrls: ['./crear.component.css']
})
export class CrearComponent implements OnInit {

  formCliente : FormGroup;
   pedidos : any[] = [];
   idPedido : any;
   param : any;
   pedido : any;

  constructor(private route : ActivatedRoute, private fb : FormBuilder, private router : Router, private servicioService: ServicioService) { }

  ngOnInit() {
      
      this.route.paramMap.subscribe((param) => {
        
        this.idPedido = param.get('id');

        if (this.idPedido !== 'new') {
            this.getPedidoById(this.idPedido);
        }
});

      this.initForm(this.pedido);
  }

 

   initForm(editarPedido : Pedido){
 
    this.formCliente = this.fb.group({
      nombreCliente : [editarPedido ? editarPedido.nombreCliente:'', Validators.required],
      direccionEntrega : [editarPedido ? editarPedido.direccionEntrega:'', Validators.required],
      pedido : [editarPedido ? editarPedido.pedido:'', Validators.required],
      fechaEntrega : [editarPedido ? editarPedido.fechaEntrega:'', Validators.required]
     });
    }

    getPedidoById(idPedido: String) {
      this.servicioService.getPedidoById(idPedido).subscribe((data) => {
          
          let pedidoId = data;

          this.formCliente.patchValue(pedidoId);
      });
  }

    getPedido(){
      this.servicioService.getPedido().subscribe((pedidos: any) =>{
        this.pedidos = pedidos;
      });
    }

   

   enviar(){
    if(this.idPedido){
      this.servicioService.editarPedido(this.idPedido, this.formCliente.value).subscribe(pedido =>{
        
      });
  } else {
    this.servicioService.guardarPedido(this.formCliente.value).subscribe(pedido => {
      let pedidoNuevo = pedido;
    });
    }
    this.router.navigate(['/mostrar-component']);
   };  
  
}