const express = require('express')
const routerLog=require('./routes/logRoutes')
const routerNumbers=require('./container/randomNum')
const {engine} = require('express-handlebars')
// USADO YARGS EN EL PUERTO
// const yargs = require('yargs/yargs')(process.argv.slice(2))
// USANDO MINIMIST EN EL PUERTO
const parseArgs = require('minimist')


const app = express()

// app.use(express.static('public'));
app.use('/',routerLog)
app.use('/',routerNumbers)

app.engine("handlebars",engine())
app.set("view engine","handlebars")
app.set("views","./views")

// CLUSTER POR MODULO DE NODE
// const cluster = require('cluster')
// const os = require('os')

// const clusterMode = process.argv[3] == "CLUSTER"

// if(clusterMode && cluster.isMaster){
//     const cpus = os.cpus().length

//     for(let i=0; i<cpus;i++){
//         cluster.fork()
//     }
//     cluster.on('exit',worker=>{
//         console.log('worker',worker.process.pid,'died')
//         cluster.fork()
//     })
// }else{
//     const app=express()
//     const options ={
//         alias: {
//             'p':'PORT'
//         },
//         default: {
//             'PORT': 8080
//         }
//     }
//     const {PORT} = parseArgs(process.argv.slice(2), options)
    
//     const server = app.listen(PORT, () => { 
//         console.log(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
//     })
//     server.on('error', error => console.log(`Error en servidor ${error}`))

// }

// USADO YARGS EN EL PUERTO
// const args = yargs.default({port: 8080}).alias({port: 'p'}).argv
// const PORT = args.port
// USANDO MINIMIST EN EL PUERTO
const options ={
    alias: {
        'p':'PORT'
    },
    default: {
        'PORT': 8080
    }
}
const {PORT} = parseArgs(process.argv.slice(2), options)

const server = app.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${server.address().port}`);
})
server.on('error', error => console.log(`Error en servidor ${error}`))