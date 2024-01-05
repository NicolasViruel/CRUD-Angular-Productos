import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms'; //importamos el formBuilder sirve para crear formularios reactivos, el formgroup sirve para agrupar los controles del formulario, el validators sirve para validar los campos del formulario
import { Producto } from '../../models/producto.model';
import { ProductoService } from '../../services/producto.service'; //importamos el servicio
import Swal from 'sweetalert2'

@Component({
  selector: 'app-crud',
  templateUrl: './crud.component.html',
  styleUrls: ['./crud.component.css']
})
export class CrudComponent implements OnInit {
  formulario!: FormGroup; //creamos una variable de tipo formgroup
  showError: boolean = false;
  mensajeError: string = '';  
  producto: Producto = new Producto(); //creamos una variable de tipo producto, con un modelo definido
  respuestaProductos: any = []; 

  constructor(private fb: FormBuilder , private productoServices: ProductoService) { this.iniciaFormulario();}

  ngOnInit(): void {
    this.mostrar();
  }

  // luego modificamos nuestro modelo asi se va actualizando los valores con cada registro
  iniciaFormulario() {
    this.formulario = this.fb.group({ //creamos el formulario
      nombre: [this.producto.nombre, [Validators.required, Validators.pattern('^[a-zA-Z ]*$')]],
      cantidad: [this.producto.cantidad, [Validators.required]],
      descripcion: [this.producto.descripcion, [Validators.required]],
      id: [this.producto.id]
    });
  }

  guardar() {

    //realizo una vifurcacion para que el programa sepa si guardo o actualizo un producto.
    if(this.producto.id){
      this.actualizar();
    } else {
    this.producto = {
      nombre: this.formulario.get('nombre')?.value,
      cantidad: this.formulario.get('cantidad')?.value,
      descripcion: this.formulario.get('descripcion')?.value,
    }

    this.productoServices.guardarProducto(this.producto)
    .subscribe((respuesta: any) => {
      // console.log('Respuesta: ', respuesta);
      this.mostrar();
      Swal.fire({
        text: 'Guardado con exito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      this.showError = false;
    },
    (error: any) => {
      this.mostrarError();
      this.showError = true;
      this.mensajeError = 'Debe completar todos los campos';
    }
    );
    this.resetform();
  }
  };

  resetform(){
    this.formulario.reset();
  };

  mostrar(){
    this.productoServices.mostrarProductos()
    .subscribe((respuesta: any) => {
      // console.log('Respuesta: ', respuesta);
      this.respuestaProductos = respuesta;
      this.showError = false;
    },
    (error: any) => {
      this.mostrarError();
    }
    );
  } 

  mostrarError(){
    Swal.fire({
      title: 'Error!',
      text: 'Algo anda mal, intentalo nuevamente',
      icon: 'error',
      confirmButtonText: 'Aceptar'
    })
  }

  // inicializo los valores del modelo con los valores del formulario
  modificarModelo(prod: any){
    this.producto.id = prod.id;
    this.producto.nombre = prod.nombre;
    this.producto.cantidad = prod.cantidad;
    this.producto.descripcion = prod.descripcion;
    this.iniciaFormulario();
  }

  actualizar(){
    this.producto = {
      nombre: this.formulario.get('nombre')?.value,
      cantidad: this.formulario.get('cantidad')?.value,
      descripcion: this.formulario.get('descripcion')?.value,
      id: this.formulario.get('id')?.value
    }
    //llamo al metodo del servicio
    this.productoServices.actualizarProducto(this.producto)
    .subscribe((respuesta: any) => {
      this.mostrar();
      Swal.fire({
        text: 'Actualizado con exito',
        icon: 'success',
        confirmButtonText: 'Aceptar'
      })
      this.showError = false;
    }, 
    (error: any) => {
      this.mostrarError();
      
    }
    );
  }

  eliminar(producto:any ){
    Swal.fire({
      title: "Eliminar",
      text: "Vas a eliminar un producto, estas seguro?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Eliminar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoServices.eliminarProducto(producto.id)
        .subscribe((respuesta: any) => {
          this.mostrar();
          Swal.fire({
            title: "Eliminado!",
            text: "El producto fue removido de la lista",
            icon: "success"
          });
        });
      }
    },
    (error: any) => {
      this.mostrarError();
    }
    );
  }

  

}
