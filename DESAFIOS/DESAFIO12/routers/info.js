import { Router } from "express";

const Argumentos = process.argv.slice(2);
const Plataforma = process.platform;
const Version = process.version;
const Memoria = process.memoryUsage().rss;
const Path = process.execPath;
const Id = process.pid;
const Carpeta = process.cwd();

const datos = {
    Argumentos: Argumentos,
    Pltataforma: `Sistema operativo ${Plataforma}`,
    Version: `Version de node ${Version}`,
    Memoria: `Memoria total usada ${Memoria}`,
    Path: `Path de ejecucion ${Path}`,
    Id: `Id del proceso actual de trabajo ${Id}`,
    Carpeta: `Carpeta actual del proyecto ${Carpeta}`,
};

const info = Router();

info.get("/", (req, res) => {
    res.json(datos);
});

export default info;