import { Router, Request, Response } from 'express';
import Server from '../classes/server';
import { usuariosConectados } from '../sockets/socket';

const router = Router();

router.get('/mensajes', ( req: Request, res: Response ) => {
    res.json({
        ok: true,
        mensaje: 'Todo esta bien'
    });
});

router.post('/mensajes', ( req: Request, res: Response ) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;

    //  ENVIAR A TODOS
    const payload = {
        de,
        cuerpo
    };

    const server = Server.instance;
    server.io.emit( 'mensaje-nuevo', payload );

    res.json({
        ok: true,
        cuerpo,
        de
    });
});

router.post('/mensajes/:id', ( req: Request, res: Response ) => {
    
    const cuerpo = req.body.cuerpo;
    const de = req.body.de;
    const id = req.params.id;

    //  MENSAJES PRIVADOS
    const payload = {
        de,
        cuerpo
    };

    const server = Server.instance;
    // Esta parte del "IN" es para enviar a un usuario si lo quitamos enviaria a todos los usuarios
    server.io.in( id ).emit( 'mensaje-privado', payload );

    res.json({
        ok: true,
        cuerpo,
        de,
        id
    });
});

//  SERVICIO PARA OBTENER TODOS LOS IDs DE LOS USUARIOS
router.get('/usuarios', ( req: Request, res: Response ) =>{

    //  LLAMAR A LAS FUNCIONES DE SOCKETS (conexion con Socket.io)
    const server = Server.instance;

    server.io.clients( (err: any, clientes: string[] ) =>{

        if( err ){
            return res.json({
                ok: false,
                err
            })
        }

        res.json({
            ok: true,
            clientes
        });

    });

});

//  OBTENER USUARIOS Y SUS NOMBRES
router.get('/usuarios/detalle', ( req: Request, res: Response ) =>{

    res.json({
        ok: true,
    //  de aqui sacamos los usuarios conectados
        clientes: usuariosConectados.getLista()
    });

});



export default router;