import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const CrearProductos = () => {

    const valorInicial = {
        nameProduct: '',
        cantidad:'',
        precio: '',
        imagen: ''
    }

    let{id} = useParams()

    const [producto, setProducto] = useState(valorInicial)
    const [subId, setSubId] = useState(id)

    const capturarDatos = (e)=> {
        const {name,value}  = e.target
        setProducto({...producto,[name]:value})   
    }

    const guardarDatos = async(e) => {
        e.preventDefault()
        
        //logica peticion post
        const newProducto = {
            nameProduct: producto.nameProduct,
            cantidad:producto.cantidad,
            precio:producto.precio,
            imagen:producto.imagen
        }
        
        await axios.post("http://localhost:5000/productos",newProducto)

        setProducto({...valorInicial})
    }

    //Funcion para actualizar
    const actualizarProducto = async(e) =>{
        e.preventDefault()
        const newProducto = {
            nameProduct: producto.nameProduct,
            cantidad: producto.cantidad,
            precio: producto.precio,
            imagen: producto.imagen
        }
        await axios.put("http://localhost:5000/productos/"+subId, newProducto)
        setProducto({...valorInicial})
        setSubId('')
    }

    //logica para la peticion a la api
    const obtUno = async(valorId) =>{
        const res = await axios.get("http://localhost:5000/productos/"+valorId)
        setProducto({
            nameProduct: res.data.nameProduct,
            cantidad: res.data.cantidad,
            precio: res.data.precio,
            imagen: res.data.imagen
        })
    }

    useEffect(()=>{
        if (subId !== ''){
            obtUno(subId)
        }
    },[subId])


  return (
    <div className="col-md-6 offset-md-3">
      <div className="card card-body">
        <form onSubmit={guardarDatos}>
            <h2 className="text-center mb-3" >Crear Producto</h2>
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresar Nombre"
              required
              name='nameProduct'
              value={producto.nameProduct}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Cantidad</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresar Cantidad"
              required
              name= 'cantidad'
              value={producto.cantidad}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Precio:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresar Precio"
              required
              name='precio'
              value={producto.precio}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Imagen:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresar Imagen"
              required
              name='imagen'
              value={producto.imagen}
              onChange={capturarDatos}
            />
          </div>

          <button className="btn btn-primary form-control">Guardar Producto</button>
        </form>
        <form onSubmit={actualizarProducto}>
        <button className="btn btn-danger form-control mt-2">Actualizar Producto</button>
        </form>

      </div>
    </div>
  );
}

export default CrearProductos
