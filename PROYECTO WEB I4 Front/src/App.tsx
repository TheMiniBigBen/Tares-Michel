import UserForm from './modules/user/User_Form';

function App() {
  return (
    <div>
      <Router>
        <nav>
          <ul>
            <li><Link to= "/">Inicio</Link></li>
            <li><Link to= "/user">Usuarios</Link></li>
            <li><Link to= "/contact">Contactos</Link></li>
          </ul>
        </nav>
        <Routes>
          <Route path ="/"



    </div>
  );
}

export default App;