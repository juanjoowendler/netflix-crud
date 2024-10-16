const request = require("supertest");
import app from '../app.js'

let nuevoDirector = null;

describe("Directores endpoints test", () => {

    // Endpoint GET
    describe("GET /directores", () => {
        test("devuelve todos los directores", async () => { 
            const respuesta = await request(app).get("/directores");
            expect(respuesta.status).toBe(200);
            
        });
    });

    // Endpoint GET con filtro
    describe("GET /directores/:id", () => {
        test("devuelve un director", async () => {
            const directorExistenteId = 1;
            const respuesta = await request(app).get(`/directores/${directorExistenteId}`);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("director_id", directorExistenteId);
            
        });

        test("da código 404 si no existe el director", async () => {
            const directorInexistenteId = 99999;
            const respuesta = await request(app).get(`/directores/${directorInexistenteId}`);
            expect(respuesta.status).toBe(404);
            expect(respuesta.body).toEqual({ error: "Director no encontrado" });
        });
    });

    // Endpoint POST
    describe("POST /directores", () => {
        test("Registra un nuevo director", async () => {
            nuevoDirector = { nombre_director: "Director creado 1" };
            const respuesta = await request(app).post("/directores").send(nuevoDirector);
            nuevoDirector = respuesta.body;
            expect(respuesta.status).toBe(201);
            expect(respuesta.body).toHaveProperty("nombre_director", "Director creado 1");
            
        });
    });

    // Endpoint PUT
    describe("PUT /directores/:id", () => {
        test("actualiza los datos de un director", async () => {
            const directorExistenteId = nuevoDirector.director_id;
            const directorActualizado = { nombre_director: "Director Modificado 1" };
            const respuesta = await request(app).put(`/directores/${directorExistenteId}`).send(directorActualizado);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("nombre_director", "Director Modificado 1");
            
        });
    });

    // Endpoint DELETE
    describe("DELETE /directores/:id", () => {
        test("elimina del registro un director", async () => {
            const nuevoDirectorId = nuevoDirector.director_id;
            const respuesta = await request(app).delete(`/directores/${nuevoDirectorId}`);
            expect(respuesta.status).toBe(200);
        });
    });
});
