
import './App.css';
import {Routes, Route} from 'react-router-dom'
//import Navegacion from './componentes/Navegacion';
//import CrearUsuarios from './componentes/CrearUsuarios';
//import ListaUsuario from './componentes/ListaUsuario';
import NavegacionProducto from './componentes/NavegarProductos';
import CrearProducto from './componentes/CrearProducto';
import ListaPorducto from './componentes/ListaProducto';

function App() {
  return (
    <div className="">     
      <NavegacionProducto/>
        <div className="container p-4">
          <Routes>
            <Route path="/" element={<ListaPorducto/>}/>
            <Route path="/CrearProducto" element={<CrearProducto/>}/>
            <Route path="/editProduct/:id" element={<CrearProducto/>}/>
          </Routes>
        </div> 
    </div>
    
  );
}

export default App;


//Codigo para navegar con usuario
/*      
      <Navegacion/>
        <div className="container p-4">
          <Routes>
            <Route path="/" element={<ListaUsuario/>}/>
            <Route path="/CrearUsuario" element={<CrearUsuarios/>}/>
            <Route path="/edit/:id" element={<CrearUsuarios/>}/>
          </Routes>
        </div>  
*/ 