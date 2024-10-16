const request = require("supertest");
import app from '../app.js'

let nuevoActor = null;

describe("Actores endpoints test", () => {

    // Endpoint GET
    describe("GET /actores", () => {
        test("devuelve todos los actores", async () => { 
            const respuesta = await request(app).get("/actores");
            expect(respuesta.status).toBe(200);
            
        });
    });

    // Endpoint GET con filtro
    describe("GET /actores/:id", () => {
        test("devuelve un actor", async () => {
            const actorExistenteId = 1;
            const respuesta = await request(app).get(`/actores/${actorExistenteId}`);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("actor_id", actorExistenteId);
            
        });

        test("da código 404 si no existe el actor", async () => {
            const actorInexistenteId = 99999;
            const respuesta = await request(app).get(`/actores/${actorInexistenteId}`);
            expect(respuesta.status).toBe(404);
            expect(respuesta.body).toEqual({ error: "Actor no encontrado" });
        });
    });

    // Endpoint POST
    describe("POST /actores", () => {
        test("Registra un nuevo actor", async () => {
            nuevoActor = { nombre_actor: "Actor creado 1" };
            const respuesta = await request(app).post("/actores").send(nuevoActor);
            nuevoActor = respuesta.body;
            expect(respuesta.status).toBe(201);
            expect(respuesta.body).toHaveProperty("nombre_actor", "Actor creado 1");
            
        });
    });

    // Endpoint PUT
    describe("PUT /actores/:id", () => {
        test("actualiza los datos de un actor", async () => {
            const actorExistenteId = nuevoActor.actor_id;
            const actorActualizado = { nombre_actor: "Actor Modificado 1" };
            const respuesta = await request(app).put(`/actores/${actorExistenteId}`).send(actorActualizado);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("nombre_actor", "Actor Modificado 1");
            
        });
    });

    // Endpoint DELETE
    describe("DELETE /actores/:id", () => {
        test("elimina del registro un actor", async () => {
            const nuevoActorId = nuevoActor.actor_id;
            const respuesta = await request(app).delete(`/actores/${nuevoActorId}`);
            expect(respuesta.status).toBe(200);
        });
    });
});

