const request = require("supertest");
const server = require("../index");

describe("Operaciones CRUD de cafes", () => {
    it("Obteniendo un 200 y tener por lo menos 1 objeto", async () => {
        const { body, statusCode } = await request(server).get("/cafes").send();
        expect(statusCode).toBe(200);
        expect(body.length).toBeGreaterThan(0)
    });
    it("Eliminando un producto no existente", async () => {
        const jwt = "token";
        const idDeProductoAEliminar = 100

        const { statusCode } = await request(server)
            .delete(`/cafes/${idDeProductoAEliminar}`)
            .set("Authorization", jwt)
            .send();

        expect(statusCode).toBe(404)
    });
    it("agregando un nuevo producto", async () => {
        const id = Math.floor(Math.random() * 1);
        const producto = { id, nombre: "" }

        const { body, statusCode } = await request(server)
            .post("/cafes")
            .send(producto);

        expect(body).toContainEqual(producto);
        expect(statusCode).toBe(201)
    });
    it("actualizando productos", async () => {

        const { body, statusCode } = await request(server)
            .put("/cafes/3")
            .send({ id: 5 });

        expect(statusCode).toBe(400)
    });
});
