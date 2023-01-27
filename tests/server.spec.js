const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200", async () => {
        const response = await request(server).get("/cafes").send();
        const status = response.statusCode;
        expect(status).toBe(200);
    });
    it("Obteniendo un producto", async () => {
        const { body } = await request(server).get("/cafes/1").send();
        const producto = body;
        expect(producto).toBeInstanceOf(Object);
    });
    it("Eliminando un producto", async () => {
        const jwt = "token";
        const idDeProductoAEliminar = 5
        const productos = { body: productos }
        productos = await request(server)
            .delete(`/cafes/${idDeProductoAEliminar}`)
            .set("Authorization", jwt)
            .send();
        const ids = productos.map(p => p.id)
        expect(ids).not.toContain(idDeProductoAEliminar);
    });
    it("Enviando un nuevo producto", async () => {
        const id = Math.floor(Math.random() * 999);
        const producto = { id, nombre: "Nuevo producto" };
        const productos = { body: productos }
        productos = await request(server)
            .post("/cafes")
            .send(producto);
        expect(productos).toContainEqual(producto);
        expect(productos.statusCode).toBe(201)
    });
});
