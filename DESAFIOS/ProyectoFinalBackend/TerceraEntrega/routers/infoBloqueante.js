import { Router } from "express";
import os from 'os';
import compression from 'compression';
import logger from '../logger.js';

const Argumentos = process.argv.slice(2);
const Plataforma = process.platform;
const Version = process.version;
const Memoria = process.memoryUsage().rss;
const Path = process.execPath;
const Id = process.pid;
const Carpeta = process.cwd();
const numCPUs = os.cpus().length

const datos = {
    Argumentos: Argumentos,
    CPUS: `Usados actualmente ${numCPUs}`,
    Plataforma: `Sistema operativo ${Plataforma}`,
    Version: `Version de node ${Version}`.repeat(10),
    Memoria: `Memoria total usada ${Memoria}`,
    Path: `Path de ejecucion ${Path}`,
    Id: `Id del proceso actual de trabajo ${Id}`,
    Carpeta: `Carpeta actual del proyecto ${Carpeta}`,
};


const infoBloqueante = Router();

infoBloqueante.get("/", (req, res) => {
    console.log(`Esta es la ruta bloqueante de /info`);
    console.log(`sumo logs para testear con artillery`);
    console.log('Route /info access granted')
    res.send(datos);
});

export default infoBloqueante;