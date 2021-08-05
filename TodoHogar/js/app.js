const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;

const HashRouter = ReactRouterDOM.HashRouter;


class App extends React.Component {
    render(){
        return(
            <div>
                <HashRouter>
                    <Header />
                    <Footer />
                </HashRouter>
            </div>
        )
    }
}

class Header extends React.Component {
    render(){
        return(
            <>
                <header class="container-fluid">
                    <ul className="listado row">
                        <li className="col-sm-3 col-md-3 col-lg-3"><Link to="/">TodoHogar</Link> </li>
                        <li className="col-sm-2 col-md-2 col-lg-2"><Link to="productos">Productos</Link> </li>
                        <li className="col-sm-2 col-md-2 col-lg-2"><Link to="contacto">Contacto</Link> </li>
                        <li className="col-sm-2 col-md-2 col-lg-2"><Link to="registrarse">Registrarse</Link> </li>
                        <li className="col-sm-3 col-md-3 col-lg-3"><Link to="iniciarSesion">Iniciar sesión</Link> </li>
                    </ul>
                </header>

                <Switch>
                    <Route path="/" exact component={Start} />
                    <Route path="/productos" component={Products} />
                    <Route path="/contacto" component={Contact} />
                    <Route path="/registrarse" component={CheckIn} />
                    <Route path="/iniciarSesion" component={LogIn} />
                    <Route path="*" component={NoMatch} />
                </Switch>
            </>
        )
    }
}

class Start extends React.Component {
    render(){
        return(
            <div class="container">
                <h2>Productos populares</h2>
                <ul class="row linea align-items-center">
                    <ListarPopulares />
                </ul>
            </div>
        )
    }
} 

class ListarPopulares extends React.Component {
    constructor(props){
        super(props);
        this.state = {productos: null, productoInd: null}
    }

    componentDidMount(){
        this.obtenerProductos();
    }

    obtenerProductos(){

        let resp = axios.get("http://uade.cdnapp.xyz/productos");
        resp.then((x) => {
            this.setState({productos: x.data});
        }).catch((err) => {
            console.log(err);
        })

    }

    obtenerProductoPorId(id){
        let resp = axios.get("http://uade.cdnapp.xyz/productos/" + id);
        resp.then((x) => {
            console.log(x.data);
            this.setState({productoInd: x.data});
        }).catch((err) => {
            console.log(err);
        })
    }

    handlerClick(event){
        id = event.target.getAttribute("data-id");
        this.obtenerProductoPorId(id);
        // TODO: Actualizar vista
    }

    filtrarPopulares(){
        return this.state.productos.filter( x => x.rating >= 3)
    }

    render(){
        let html;
        if(this.state.productos == null){
            html = <p>Cargando productos</p>
        } else {
            html = (
                <>
                    {this.filtrarPopulares().map(x => {
                        return (
                            <li  className="col-sm-6 col-md-4 col-lg-3" onClick={this.handlerClick.bind(this)} data-id={x.id}>
                                <div>   
                                    <a href={"producto.html?id=" + x.id}>
                                        <img src={x.imagenes} alt="" />
                                        <p>{x.nombre}</p>
                                    </a>
                                    <span>${x.precio} ARS</span>
                                </div>
                            </li>
                        )  
                    })}
                </>
            )
        }

        return html;

    }

}

class Products extends React.Component {
    render(){
        return(
            <div class="container">
                <h2>Productos</h2>
                <ul className="row linea align-items-center">
                    <ListarProductos />
                </ul>
            </div>
        )
    }
} 

class ListarProductos extends React.Component{
    constructor(props){
        super(props);
        this.state = {productos: null, productoInd: null}
    }

    componentDidMount(){
        this.obtenerProductos();
    }

    obtenerProductos(){

        let resp = axios.get("http://uade.cdnapp.xyz/productos");
        resp.then((x) => {
            this.setState({productos: x.data});
        }).catch((err) => {
            console.log(err);
        })

    }

    obtenerProductoPorId(id){
        let resp = axios.get("http://uade.cdnapp.xyz/productos/" + id);
        resp.then((x) => {
            console.log(x.data);
            this.setState({productoInd: x.data});
        }).catch((err) => {
            console.log(err);
        })
    }

    handlerClick(event){
        id = event.target.getAttribute("data-id");
        this.obtenerProductoPorId(id);
        // TODO: Actualizar vista
    }



    render(){
        let html;
        if(this.state.productos == null){
            html = <p>Cargando productos</p>
        } else {
            html = (
                <>
                    {this.state.productos.map(x => {
                        return (
                            <li  className="col-sm-6 col-md-4 col-lg-3" onClick={this.handlerClick.bind(this)} data-id={x.id}>
                                <div>   
                                    <a href={"producto.html?id=" + x.id}>
                                        <img src={x.imagenes} alt="" />
                                        <p>{x.nombre}</p>
                                    </a>
                                    <span>${x.precio} ARS</span>
                                </div>
                            </li>
                        )  
                    })}
                </>
            )
        }

        return html;

    }

}

class Contact extends React.Component {
    render(){
        return(
            <div className="container contacto">
                <div className="row">
                    <div>
                        <h2>Contacto</h2>
                        <div className="row">
                            <form className="col-sm-12 col-md-12 col-lg-4">
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Nombre</label>
                                    <input type="text" className="form-control" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Email</label>
                                    <input type="email" className="form-control" aria-describedby="emailHelp" />
                                </div>
                                <div className="mb-3">
                                    <label for="exampleInputEmail1" className="form-label">Teléfono (opcional)</label>
                                    <input type="number" className="form-control" aria-describedby="emailHelp" />
                                </div>
                                <div className="form-group">
                                    <label for="exampleFormControlTextarea1">Mensaje (opcional)</label>
                                    <textarea className="form-control" rows="3" />
                                </div>
                                <div className="d-grid gap-2">
                                    <button type="submit" className="btn btn-secondary">Enviar</button>
                                </div>
                            </form>
                            <div className="col-sm-12 col-md-12 col-lg-7">
                                <div>
                                    <p>Contáctanos:</p>
                                    <ul>
                                        <li><i class="fas fa-envelope" /> TodoHogar@yahoo.com</li>
                                        <li><i class="fas fa-map-marker-alt" /> Defensa 247 (1065) C.A.B.A</li>
                                    </ul>
                                </div>
                                <iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d11701.418880068433!2d-58.379502609602326!3d-34.61427749412274!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bccad4b661f2d1%3A0xce79a257c076aaa6!2sDefensa%20247%2C%20C1065%20AAC%2C%20Buenos%20Aires!5e0!3m2!1ses-419!2sar!4v1624734589497!5m2!1ses-419!2sar" width="550" height="350" allowfullscreen="" loading="lazy" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 

class CheckIn extends React.Component {
    render(){
        return(
            <div class="container registrarse">
                <div class="row">
                    <div class="col-sm-10 col-md-10 col-lg-8">
                        <h2>Registrarse</h2>
                        <div class="row">
                            <form class="col-sm-9 col-md-7 col-lg-6">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Nombre</label>
                                    <input type="email" class="form-control" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Email</label>
                                    <input type="email" class="form-control" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Telefono (opcional)</label>
                                    <input type="number" class="form-control" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" />
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">He leido y acepto los terminos y condiciones</label>
                                </div>
                                <button type="submit" class="btn btn-secondary">Enviar</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 

class LogIn extends React.Component {
    render(){
        return(
            <div className="container iniciarSesion">
                <div className="row">
                    <div className="col-sm-10 col-md-10 col-lg-8">
                        <h2>Iniciar Sesión</h2>
                        <div className="row">
                            <form class="col-sm-9 col-md-7 col-lg-6">
                                <div class="mb-3">
                                    <label for="exampleInputEmail1" class="form-label">Dirección de Corre</label>
                                    <input type="email" class="form-control" aria-describedby="emailHelp" />
                                </div>
                                <div class="mb-3">
                                    <label for="exampleInputPassword1" class="form-label">Contraseña</label>
                                    <input type="password" class="form-control" />
                                </div>
                                <div class="mb-3 form-check">
                                    <input type="checkbox" class="form-check-input" id="exampleCheck1" />
                                    <label class="form-check-label" for="exampleCheck1">Mantener la sesión inciada</label>
                                </div>
                                <button type="submit" class="btn btn-secondary">Iniciar sesión</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
} 

class Footer extends React.Component{
    render(){
        return(
            <>
                <footer class="container-fluid ">
                    <div class="row">
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <div class="row">
                            <h4>Navegación</h4>
                                <ul>
                                    <li><Link to="/">TodoHogar</Link> </li>
                                    <li><Link to="productos">Productos</Link> </li>
                                    <li><Link to="contacto">Contacto</Link> </li>
                                    <li><Link to="registrarse">Registrarse</Link> </li>
                                    <li><Link to="iniciarSesion">Iniciar sesión</Link> </li>
                                </ul>
                            </div>
                        </div>
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <h4>Contacto</h4>
                            <p>Defensa 247 (1065) C.A.B.A.</p>
                            <a href="">TodoHogar@yahoo.com</a>
                        </div>
                        <div class="col-sm-4 col-md-4 col-lg-4">
                            <h4>Redes Sociales</h4>
                            <ul class="redesSocialesNegro">
                                <EnlaceRedSocial className="fab fa-youtube-square" />
                                <EnlaceRedSocial className="fab fa-twitter-square" />
                                <EnlaceRedSocial className="fab fa-pinterest-square" />
                                <EnlaceRedSocial className="fab fa-facebook-square" />
                            </ul>
                        </div>
                    </div>
                </footer>
            </>
        )
    }
}

class EnlaceRedSocial extends React.Component {
    render(){
        return(
            <li>
                <i class={this.props.className} />
            </li>
        )
    }
}

//Funciona solo si ingresas dentro del inicio, no desde el producto
class NoMatch extends React.Component {
    render() {
        return(
            <div class="container errorPagina">
                <div>
                    <i class="fab fa-snapchat-ghost"> </i>
                    <h1>404</h1>
                    <p>Página no encontrada</p>
                </div>
            </div>
        )
    }
}

ReactDOM.render(    
    <App />,
    document.querySelector('#root')
);