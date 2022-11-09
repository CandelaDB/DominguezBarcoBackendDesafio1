const fs = require('fs');

class Contenedor {

    nextId;
    arrayObj = new Array();

    constructor(desafio2) {
        this.desafio2 = desafio2;
        if(fs.existsSync(desafio2)) {
            this.arrayObj = JSON.parse(fs.readFileSync(this.desafio2, "utf-8"));
            this.nextId = this.#getNextId();
            console.log("existe");
        } else {
            this.nextId = 0;
            fs.writeFileSync(this.desafio2, JSON.stringify(this.arrayObj));
            console.log("No existe");
        }
    }

    async save(object) {
        try {
            if (!this.#isInFile(object)) {
                object["id"] = this.nextId;
                this.nextId++;
                this.arrayObj.push(object);
                await fs.promises.writeFile(this.desafio2, JSON.stringify(this.arrayObj));
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

    #isInFile(obj) {
        let response = false;
        this.arrayObj.forEach(element => {
            if (element.title == obj.title && element.price == obj.price && element.thumbnail == obj.thumbnail) {
                response = true;
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
            const data = await fs.promises.readFile(this.desafio2,"utf-8");
            this.arrayObj = JSON.parse(data);
            return this.arrayObj;
        }
        catch (err){
            console.log (err);
        }
    }

    async deleteById(id) {
        let flag = false;
        for( let i = 0; i < this.arrayObj.length; i++){     
            if ( this.arrayObj[i].id === id) {
                flag = true;
                this.arrayObj.splice(i, 1); 
                i--; 
            }
        }
        console.log ("flag: " + flag)
        if (flag){
            try {
                await fs.promises.writeFile(this.desafio2,JSON.stringify(this.arrayObj))
                console.log("Se borro");
            }
            catch (err) {
                console.log(err);
            }
        } else {
            console.log ("No se borro porque no existe el ID");
        }

    }

    async deleteAll() {
        this.arrayObj = [];
        try {
            await fs.promises.writeFile(this.desafio2,JSON.stringify(this.arrayObj))
            console.log("Se borro todo");
        }
        catch (err) {
            console.log(err);
        }
    }
}

let objetoAgregar = {title: "Mate", price: 506.90, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kaa_mate.JPG/800px-Kaa_mate.JPG"};
let objetoAgregar2 = {title: "Termo", price: 1900, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kaa_mate.JPG/800px-Kaa_mate.JPG"};
let objetoAgregar3 = {title: "Yerba", price: 250, thumbnail: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Kaa_mate.JPG/800px-Kaa_mate.JPG"};

const productosContenedor = new Contenedor("./productos.txt");

function test() {
    productosContenedor.getAll()
    .then((array) => console.log(array))
    .then(() => productosContenedor.save(objetoAgregar))
    .then(() => productosContenedor.save(objetoAgregar2))
    .then(() => productosContenedor.save(objetoAgregar3))
    .then(() => productosContenedor.getAll())
    .then(array => {
        console.log(array)
        console.log(productosContenedor.getById(5));
    })
    .then(() => productosContenedor.deleteById(1))
    .then(productosContenedor.deleteAll())
}

test();

const app = express(); 
const productosCont = new Contenedor("./productos.txt");

app.get("/productos", (req, res) => {
    productosCont.getAll()
    .then(productos => res.send(JSON.stringify(productos,null,2)))
    .catch(err => console.log(err))
});

app.get("/productosRandom", (req, res) => {
    productosCont.getAll()
    .then(productos => {
        let randomNum = Math.floor(Math.random() * (productos.length - 0 + 1)) + 0;
        res.send(JSON.stringify(productos[randomNum],null,2));
    })
    .catch(err => console.log(err))
});

const server = app.listen(8080, (req, res) => {
    console.log("Servidor escuechando en el 8080");
});
server.on ('error', error => console.log ('Hubo un error: ' + error));