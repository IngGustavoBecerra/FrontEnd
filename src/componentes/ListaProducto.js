import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const ListaProducto = () => {

  const [lista, setLista] = useState([])

  useEffect(()=>{
    const getProducto = async() => {
      const res = await axios.get('http://localhost:5000/productos')
      setLista(res.data)
    }
    getProducto()

  },[lista])

  const eliminarProducto = async(id) => {
    await axios.delete('http://localhost:5000/productos/' + id)
  }

 
  return (
    <div className='row'>
      {
        lista.map(list => (
          <div className='col-md-4 p-2' key={list._id}>
            <div className='card'>
              <div className='card-header'>
                <h5>Nombre:{list.nameProduct}</h5>
              </div>
              <div className='card-body'>
                <p>Cantidad:{list.cantidad}</p> 
                <p>Precio:{list.precio}</p>   
                <p>Imagen:{list.imagen}</p>            
              </div>
              <div className='card-footer'>
                <button className='btn btn-danger' onClick={() => eliminarProducto(list._id)}>
                  Eliminar
                </button>
                <Link className='btn btn-primary m-1' to={'/editProduct/'+list._id}>
                  Editar 
                </Link>
              </div>

            </div>

          </div>
        ))
      }
    </div>
  )
}

export default ListaProducto