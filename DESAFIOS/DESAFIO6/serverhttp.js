const objeto = [
    {
        titulo: "titulovalue",
        precio: "preciovalue",
        thumb: "thumbvalue",
        id: "123"
    }
];

objeto.forEach(element => {
    for (const [key, value] of Object.entries(element)) {
        if (key != "id") {
            console.log(`${key}: ${value}`);
        }
    }
});