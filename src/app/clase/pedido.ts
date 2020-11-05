export class Pedido {
    constructor(
        public nombreCliente: string,
        public direccionEntrega: string,
        public pedido: string,
        public fechaEntrega: Date,
        
    ){}
}