const Link = ReactRouterDOM.Link;
const Route = ReactRouterDOM.Route;
const Switch = ReactRouterDOM.Switch;

const BrowserRouter = ReactRouterDOM.BrowserRouter;


class App extends React.Component{
    render(){
        return (
            <BrowserRouter>
                <Header />
                    <div className="producto container">
                        <Producto />
                    </div>
                <Footer />
            </BrowserRouter>
        )
    }
}

class Producto extends React.Component {

    constructor(props){
        super(props);
        this.state = {productos: null, productoInd: null}
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

    componentDidMount(){
        var queryDict = {}
        location.search.substr(1).split("&").forEach(function(item) {queryDict[item.split("=")[0]] = item.split("=")[1]})

        this.obtenerProductoPorId(queryDict.id)
    }

    render(){
        if (this.state.productoInd != null){
            return(
                <>
                    <h2>{this.state.productoInd.nombre}</h2>
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-5">
                            <img src={this.state.productoInd.imagenes} alt="" />
                        </div>
                        <div className="col-sm-12 col-md-12 col-lg-7">
                            <span>${this.state.productoInd.precio} ARS</span>
                            <div className="row">
                                <div className="col-sm-5 col-md-5 col-lg-3">
                                    <label for="precio">Cantidad</label>
                                    <input type="text" name="precio" value="1"/>
                                </div>
                                <div className="col-sm-7 col-md-7 col-lg-9">
                                    <button>Agregar al carrito</button>                    
                                </div>
                            </div>
                            <h3>Descripción</h3>
                            <p>{this.state.productoInd.descripcion}</p>
                            <div>
                                <h4>Redes Sociales</h4>
                                <ul className="redesSociales">
                                    <li><i className="fab fa-youtube-square" /></li>
                                    <li><i className="fab fa-twitter-square" /></li>
                                    <li><i className="fab fa-pinterest-square" /></li>
                                    <li><i className="fab fa-facebook-square" /></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </>
            )

        } else {
            return (<p>Cargando</p>)
        }
    }
}

/* header y footer hardcodeados*/

class Header extends React.Component {
    render(){
        return(
            <>
                <header class="container-fluid">
                    <ul className="listado row">
                        <li onClick="location.href='index.html'" className="col-sm-3 col-md-3 col-lg-3"><Link to="/">TodoHogar</Link> </li>
                        <li className="col-sm-2 col-md-2 col-lg-2"><Link to="productos">Productos</Link> </li>
                        <li className="col-sm-2 col-md-2 col-lg-2"><Link to="contacto">Contacto</Link> </li>
                        <li className="col-sm-2 col-md-2 col-lg-2"><Link to="registrarse">Registrarse</Link> </li>
                        <li className="col-sm-3 col-md-3 col-lg-3"><Link to="iniciarSesion">Iniciar sesión</Link> </li>
                    </ul>
                </header>
            </>
        )
    }
}


/**************************************** */

class Product extends React.Component{
    render(){
        return(
            <li className="col-sm-6 col-md-4 col-lg-3">
                <div>   
                    <a href={"producto.html?id=" + this.props.id}>
                        <img src={this.props.img} alt="" />
                        <p>{this.props.titulo}</p>
                    </a>
                    <span>$ {this.props.precio} ARS</span>
                </div>
            </li>
        );
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
                                    <li onClick="location.href='index.html'"><Link to="/">TodoMangas</Link> </li>
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
                            <a href="">TodoMangas@yahoo.com</a>
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

ReactDOM.render(
    <App />,
    document.getElementById('root')
)