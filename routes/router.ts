import { Router, Request, Response } from 'express';
import Server from '../classes/server';

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

export default router;