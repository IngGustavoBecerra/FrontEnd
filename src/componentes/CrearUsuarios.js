import React, { useEffect, useState } from 'react'
import axios from 'axios'
import {useParams} from 'react-router-dom'

const CrearUsuarios = () => {

    const valorInicial = {
        name: '',
        password:'',
        email: ''
    }

    let{id} = useParams()

    const [usuario, setUsuario] = useState(valorInicial)
    const [subId, setSubId] = useState(id)

    const capturarDatos = (e)=> {
        const {name,value}  = e.target
        setUsuario({...usuario,[name]:value})   
    }

    const guardarDatos = async(e) => {
        e.preventDefault()
        
        //logica peticion post
        const newUser = {
            name: usuario.name,
            password:usuario.password,
            email:usuario.email
        }
        
        await axios.post("http://localhost:5000/users",newUser)

        setUsuario({...valorInicial})
    }

    //Funcion para actualizar
    const actualizarUser = async(e) =>{
        e.preventDefault()
        const newUser = {
            name: usuario.name,
            email: usuario.email
        }
        await axios.put("http://localhost:5000/users/"+subId, newUser)
        setUsuario({...valorInicial})
        setSubId('')
    }

    //logica para la peticion a la api
    const obtUno = async(valorId) =>{
        const res = await axios.get("http://localhost:5000/users/"+valorId)
        setUsuario({
            name:res.data.name,
           
            email:res.data.email
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
            <h2 className="text-center mb-3" >Crear Usuario</h2>
          <div className="mb-3">
            <label>Nombre:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresar Nombre"
              required
              name='name'
              value={usuario.name}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Password:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresar Password"
              required
              name= 'password'
              value={usuario.password}
              onChange={capturarDatos}
            />
          </div>
          <div className="mb-3">
            <label>Email:</label>
            <input
              type="text"
              className="form-control"
              placeholder="Ingresar Correo"
              required
              name='email'
              value={usuario.email}
              onChange={capturarDatos}
            />
          </div>

          <button className="btn btn-primary form-control">Guardar Usuario</button>
        </form>
        <form onSubmit={actualizarUser}>
        <button className="btn btn-danger form-control mt-2">Actualizar Usuario</button>
        </form>

      </div>
    </div>
  );
}

export default CrearUsuarios
