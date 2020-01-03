import { Usuario } from './usuario';


export class UsuarioLista{

    private lista: Usuario[] = [];

    constructor(){}

    //  AGREGAR UN USUARIO
    public agregar( usuario: Usuario ){

        this.lista.push( usuario );
        console.log(this.lista);
        return usuario;

    }

    public actualizarNombre( id: string, nombre: string ){

        for( let usuario of this.lista ){

            if( usuario.id === id ){
                usuario.nombre = nombre;
                break;
            }

        }

        console.log('==== Actualizando usuario ====');
        console.log( this.lista );

    }

    //  Obtener lista de usuarios
    public getLista(){
        return this.lista;
    }
    
    //  OBETENER UN USUARIO
    public getUsuario( id: string ){
        return this.lista.find( usuario => usuario.id === id );
    }

    //  OBTENER USUARIOS DE UNA SALA
    public getUsuariosSala( sala: string ){
        return this.lista.filter( usuario => usuario.sala === sala );
    }

    //  BORRAR UN USUARIO
    public borrarUsuario( id: string ){
       
        const tempUsuario = this.getUsuario( id );

        this.lista = this.lista.filter( usuario => usuario.id !== id );
                
        return tempUsuario;

    }

}