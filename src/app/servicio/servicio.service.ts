import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';

@Injectable()
export class ServicioService{
    httpOptions = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json'
        })
    }
    private personaUrl = 'http://localhost:3002/api/modules/pedidos/';

    constructor(private httpClient: HttpClient){}

    getPedidoById(idPedido: String) {
        return this.httpClient.get(this.personaUrl + 'pedidoId/' + idPedido);
    }
    
    getPedido(){
        return this.httpClient.get(this.personaUrl + 'pedido');
    }

    guardarPedido(pedido: any){
        return this.httpClient.post(this.personaUrl + 'pedido', JSON.stringify(pedido), this.httpOptions);
    }

    editarPedido(idPedido, pedido) {
        return this.httpClient.put(this.personaUrl + 'pedido/' + idPedido, JSON.stringify(pedido), this.httpOptions);

    }

    borrarPedido(idPedido){
        return this.httpClient.delete(this.personaUrl + 'pedido/' + idPedido, this.httpOptions);
    }    
}
