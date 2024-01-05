import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Producto } from '../models/producto.model';
import { environment } from '../../environments/environment';
import { map } from 'rxjs/operators';
@Injectable({
  providedIn: 'root'
})
export class ProductoService {

  //catalogo-productos-cd903/productos.json
  url: any = `${environment.url}/catalogo-productos-cd903/productos.json`;


  constructor(private http:HttpClient) { }


  guardarProducto(producto:Producto){
    //con la libreria de http, genero el post hacia la url donde esta conectada a fireBase
    return this.http.post(this.url, producto);
  }

  mostrarProductos(){
    return this.http.get(this.url)
    .pipe(map(this.arregloProducto)//con el pipe y el map, mapeo la respuesta de la url
    ); 
      
  }

  arregloProducto (prod:any){
    // console.log("productos ", prod);
    
    let productos : Producto[] = [];

    if(prod !== null){
      Object.keys(prod).forEach(llave =>{
        let producto: Producto = prod[llave];
        producto.id = llave;

        productos.push(producto);
      });
    }

    return productos;

  }

  //metodo para actualizar producto
  actualizarProducto(producto:Producto){
    const prodAux = { ...producto };
    delete prodAux.id;
    return this.http.put(`${environment.url}/catalogo-productos-cd903/productos/${producto.id}.json`, prodAux);
  }

  //metodo para eliminar producto
  eliminarProducto(id : any){
    return this.http.delete(`${environment.url}/catalogo-productos-cd903/productos/${id}.json`);
  }

}
