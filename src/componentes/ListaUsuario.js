import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {Link} from 'react-router-dom'

const ListaUsuario = () => {

  const [lista, setLista] = useState([])

  useEffect(()=>{
    const getUsuarios = async() => {
      const res = await axios.get('http://localhost:5000/users')
      setLista(res.data)
    }
    getUsuarios()

  },[lista])

  const eliminarUser = async(id) => {
    await axios.delete('http://localhost:5000/users/' + id)
  }

 


  return (
    <div className='row'>
      {
        lista.map(list => (
          <div className='col-md-4 p-2' key={list._id}>
            <div className='card'>
              <div className='card-header'>
                <h5>Nombre:{list.name}</h5>
              </div>
              <div className='card-body'>
                <p>email:{list.email}</p>                
              </div>
              <div className='card-footer'>
                <button className='btn btn-danger' onClick={() => eliminarUser(list._id)}>
                  Eliminar
                </button>
                <Link className='btn btn-primary m-1' to={'/edit/'+list._id}>
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

export default ListaUsuario
