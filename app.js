import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';
const app = express();


app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas api permitidas
app.get('/api', (req,res) => {
    console.log('hola');
})

// Configuracion de history mode de vuejs 
app.use(history());
app.use(express.static(path.join(__dirname,'public')))

// Configuracion del puerto
app.set('puerto', process.env.PORT || 3000);

// Escucha del puerto
app.listen(app.get('puerto'), () => {
    console.log('Escuchando el puerto: ' + app.get('puerto'))
})