
const request = require("supertest");
import app from '../app.js'

let nuevoGenero = null;

describe("Generos endpoints test", () => {

    // Endpoint GET
    describe("GET /generos", () => {
        test("devuelve todos los generos", async () => { 
            const respuesta = await request(app).get("/generos");
            expect(respuesta.status).toBe(200);
            
        });
    });

    // Endpoint GET con filtro
    describe("GET /generos/:id", () => {
        test("devuelve un genero", async () => {
            const generoExistenteId = 1;
            const respuesta = await request(app).get(`/generos/${generoExistenteId}`);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("genero_id", generoExistenteId);
            
        });

        test("da código 404 si no existe el genero", async () => {
            const generoInexistenteId = 99999;
            const respuesta = await request(app).get(`/generos/${generoInexistenteId}`);
            expect(respuesta.status).toBe(404);
            expect(respuesta.body).toEqual({ error: "Género no encontrado" });
        });
    });

    // Endpoint POST
    describe("POST /generos", () => {
        test("Registra un nuevo genero", async () => {
            nuevoGenero = { nombre_genero: "Genero creado 1" };
            const respuesta = await request(app).post("/generos").send(nuevoGenero);
            nuevoGenero = respuesta.body;
            expect(respuesta.status).toBe(201);
            expect(respuesta.body).toHaveProperty("nombre_genero", "Genero creado 1");
            
        });
    });

    // Endpoint PUT
    describe("PUT /generos/:id", () => {
        test("actualiza los datos de un genero", async () => {
            const generoExistenteId = nuevoGenero.genero_id;
            const generoActualizado = { nombre_genero: "Genero Modificado 1" };
            const respuesta = await request(app).put(`/generos/${generoExistenteId}`).send(generoActualizado);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("nombre_genero", "Genero Modificado 1");
            
        });
    });

    // Endpoint DELETE
    describe("DELETE /generos/:id", () => {
        test("elimina del registro un genero", async () => {
            const nuevoGeneroId = nuevoGenero.genero_id;
            const respuesta = await request(app).delete(`/generos/${nuevoGeneroId}`);
            expect(respuesta.status).toBe(200);
        });
    });
});

