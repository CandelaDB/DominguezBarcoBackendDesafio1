const express = require("express");
const fs = require("fs");
const { Router } = express;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/api/public"));


class Contenedor {

    nextId;
    arrayObj = new Array();

    constructor(desafio4) {
        this.desafio4 = desafio4;
        if(fs.existsSync(desafio4)) {
            this.arrayObj = JSON.parse(fs.readFileSync(this.desafio4, "utf-8"));
            this.nextId = this.#getNextId();
            console.log("existe");
        } else {
            this.nextId = 0;
            fs.writeFileSync(this.desafio4, JSON.stringify(this.arrayObj));
            console.log("No existe");
        }
    }

    async save(object) {
        try {
            if (!this.#isInFile(object)) {
                object["id"] = this.nextId;
                this.nextId++;
                this.arrayObj.push(object);
                await fs.promises.writeFile(this.desafio4, JSON.stringify(this.arrayObj));
                console.log("se guardo" + object.id);
                return Promise.resolve(object.id);
            }
            else
            {
                console.log("Ya existe");
            }
        }
        catch (err) {
            console.log (err);
        }
    }

    getById(id) {
        let obj = null;
        this.arrayObj.map((element) => {
            if (element.id == id)
            {
                obj = element;
            }
        })
        return obj;
    }

    async update(id, newObject) {
    let index = this.#IdExists(id);
    if (index) {
        const { title, price, thumbnail } = newObject;
        this.arrayObj[index] = {
        title: title,
        price: price,
        thumbnail: thumbnail,
        id: id
        };
        await fs.promises.writeFile(
        this.desafio4,
        JSON.stringify(this.arrayObj)
        );
        console.log("se actualizo");
        return Promise.resolve(id);
    } else {
        console.log("no existe el id");
    }
    }

    #isInFile(obj) {
        let response = false;
        this.arrayObj.forEach(element => {
            if (element.title == obj.title && element.price == obj.price && element.thumbnail == obj.thumbnail) {
                response = true;
            }
        });
        return response;
    }

    #IdExists(id) {
    let response = false;
    this.arrayObj.forEach((element, index) => {
        if (element.id == id) {
        response = index;
        }
    });
    return response;
    }

    #getNextId () {
        if (this.arrayObj.length > 0) {
            let maxId = this.arrayObj.reduce((acc,current) => {
                return Math.max(acc, current.id)
            }, 0)
            return maxId + 1;
        } else {
            return 0;
        }
    }

    async getAll() {
        try {
            const data = await fs.promises.readFile(this.desafio4,"utf-8");
            this.arrayObj = JSON.parse(data);
            return this.arrayObj;
        }
        catch (err){
            console.log (err);
        }
    }

    async deleteById(id) {
    let flag = false;
    for (let i = 0; i < this.arrayObj.length; i++) {
        if (this.arrayObj[i].id === id) {
        flag = true;
        this.arrayObj.splice(i, 1);
        i--;
        }
    }
    //console.log ("flag: " + flag)
    if (flag) {
        try {
        await fs.promises.writeFile(
            this.desafio4,
            JSON.stringify(this.arrayObj)
        );
        console.log("borro");
        return id;
        } catch (err) {
        console.log(err);
        }
    } else {
        console.log("No se borro objeto pq no existe el ID");
        return null;
    }
    }

    async deleteAll() {
        this.arrayObj = [];
        try {
            await fs.promises.writeFile(this.desafio4,JSON.stringify(this.arrayObj))
            console.log("Se borro todo");
        }
        catch (err) {
            console.log(err);
        }
    }
}
const contenedorProductos = new Contenedor("productos.txt");
const routerProductos = new Router();

routerProductos.get("/api/productos", async (req, res) => {
    try {
    res.json(await contenedorProductos.getAll());
    } catch (error) {
    console.log(error);
    }
});

routerProductos.get("/api/productos/:id", (req, res) => {
    try {
    const { id } = req.params;
    const producto = contenedorProductos.getById(id);
    producto
        ? res.json(producto)
        : res.json({ error: "Producto no encontrado" });
    } catch (error) {
    console.log(error);
    }
});

routerProductos.post("/api/productos", async (req, res) => {
    try {
    const producto = req.body;
    console.log("El producto es" + producto);
    const productoNuevoId = await contenedorProductos.save(producto);
    productoNuevoId
        ? res.json({ ...producto, id: productoNuevoId })
        : res.json({ error: "Producto no encontrado" });
    } catch (error) {
    console.log(error);
    }
});

routerProductos.put("/api/productos/:id", async (req, res) => {
    try {
    const productoActualizar =  req.body;
    const { id } = req.params;
    const productoActualizarId = await contenedorProductos.update(Number(id),productoActualizar);
    productoActualizarId
        ? res.json({ actualizado: "ok", id: productoActualizarId })
        : res.json({ error: "Producto no encontrado" });
    } catch (error) {
    console.log(error);
    }
});
routerProductos.delete("/api/productos/:id", async (req, res) => {
    try {
    const { id } = req.params;
    const productoId = await contenedorProductos.deleteById(Number(id));
    productoId
        ? res.json({ borrado: "ok", id: productoId })
        : res.json({ error: "Producto no encontrado" });
    } catch (error) {
    console.log(error);
    }
});

app.use("/api", routerProductos);
const PORT = 8080;
const server = app.listen(PORT, () => {
    console.log("Servidor escuechando en el " + PORT);
});
server.on ('error', error => console.log ('Hubo un error: ' + error));