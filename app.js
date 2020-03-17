import express from 'express';
import morgan from 'morgan';
import cors from 'cors';
import path from 'path';
import history from 'connect-history-api-fallback';
import mongoose from 'mongoose';
const app = express();
const uri = 'mongodb://localhost:27017/devmenv';
const option = {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
};

mongoose.connect(uri,option).then(
    () => {console.log('Conectado a mongoDB')},
    err => {console.log('Error');}
);

app.use(morgan('tiny'));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));

// Rutas api permitidas
app.use('/api', require('./routes/nota'));

// Configuracion de history mode de vuejs 
app.use(history());
app.use(express.static(path.join(__dirname,'public')))

// Configuracion del puerto
app.set('puerto', process.env.PORT || 3000);

// Escucha del puerto
app.listen(app.get('puerto'), () => {
    console.log('Escuchando el puerto: ' + app.get('puerto'))
})