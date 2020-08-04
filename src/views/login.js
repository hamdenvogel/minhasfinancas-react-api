import React from 'react';
import Card from '../components/card';
import FormGroup from '../components/form-group';
import {withRouter} from 'react-router-dom';
import UsuarioService from '../app/service/usuarioService';
import { mensagemErro} from '../components/toastr';
import { AuthContext } from '../main/provedorAutenticacao';



class Login extends React.Component {
    state = {
        email: '',
        senha: ''
    }

    constructor(){
        super();
        this.service = new UsuarioService();
    }

    entrar = () => {
        this.service.autenticar({
            email: this.state.email,
            senha: this.state.senha
        }).then( response => {
            this.context.iniciarSessao(response.data);
            this.props.history.push('/home')
        }).catch(erro => {
            mensagemErro(erro.response.data);   
        })    
    }

    /*
    entrar = async () => {
       try {
        const response = await axios.post('http://localhost:8080/api/usuarios/autenticar',{
            email: this.state.email,
            senha: this.state.senha
        });
        console.log('resposta ', response);
        console.log('requisição encerrada');

        } catch (erro) {
            console.log(erro.response);
        }        
    }
    */
   /*
   entrar = async () => {
     axios.post('http://localhost:8080/api/usuarios/autenticar',{
         email: this.state.email,
         senha: this.state.senha
     }).then( response => {
         localStorage.setItem('_usuario_logado', JSON.stringify(response.data));
         this.props.history.push('/home')
     }).catch(erro => {
         console.log('entrou no erro');
         this.setState({mensagemErro: erro.response.data})
     })    
 }
*/


    prepareCadastrar = () => {
        this.props.history.push('/cadastro-usuarios');        
    }

    render() {
        return (
                <div className="row">
                    <div className="col-md-6" style={{position: 'relative', left: '300px'}}>
                        <div className="bs-docs-section">
                           <Card title="Login">                            
                            <div className="row">
                              <div className="col-lg-12">
                                 <div className="bs-component">                                   
                                    <fieldset>
                                        <FormGroup label="Email: *" htmlFor="exampleInputEmail1" >
                                            <input type="email" 
                                            value={this.state.email}
                                            onChange={e => this.setState({email: e.target.value})}
                                            className="form-control" 
                                            id="exampleInputEmail1" 
                                            aria-describedby="emailHelp" 
                                            placeholder="Digite o Email" />
                                        </FormGroup>
                                        <FormGroup label="Senha: *" htmlFor="exampleInputEmail1" >
                                            <input type="password"
                                            value={this.state.senha}
                                            onChange={e => this.setState({senha: e.target.value})}
                                            className="form-control"
                                            id="exampleInputPassword1" 
                                            placeholder="Password" />
                                        </FormGroup>
                                        <button onClick={this.entrar} 
                                        className="btn btn-success mr-1">
                                        <i className="pi pi-sign-in" style={{'fontSize': '0.8em'}}></i>  Entrar</button>
                                        
                                        <button onClick={this.prepareCadastrar}
                                        className="btn btn-danger mr-1">
                                        <i className="pi pi-plus" style={{'fontSize': '0.8em'}}></i>  Cadastrar</button>
      
                                    </fieldset>
                                  </div>
                                 </div>
                               </div>     
                            </Card>
                        </div>

                    </div>
                </div>
        
        )
    }
}

Login.contextType = AuthContext;
//export default Login
export default withRouter(Login);