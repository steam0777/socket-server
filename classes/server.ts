import express from 'express';
import { SERVER_PORT } from '../global/environment';
import http from 'http';
import socketIO from 'socket.io';

import * as socket from '../sockets/socket';

export default class Server{

    private static _intance: Server;

    public app: express.Application;
    public port: number;

    public io: SocketIO.Server;
    private httpServer: http.Server;

    private constructor(){

        this.app = express();
        this.port = SERVER_PORT;

        this.httpServer = new http.Server( this.app );
        this.io = socketIO( this.httpServer );

        this.escucharSockets();
    }

    public static get instance(){

        return this._intance || ( this._intance = new this() );

    }

    private escucharSockets(){
        console.log('Escuchando conexiones - sockets');

        this.io.on('connection', cliente =>{
            //console.log('Cliente conectado');
            //console.log( cliente.id );
            //  CONECTAR CLIENTE
            socket.conectarCliente( cliente );

            //  CONFIGURAR USUARIO
            socket.configurarUsuario( cliente, this.io );

            //  MENSAJES
            socket.mensaje( cliente, this.io );

            //  DESCONECTAR
            socket.desconectar( cliente ); 
        });
    }

    start( callback: any ){

        this.httpServer.listen( this.port, callback );  

    }

}