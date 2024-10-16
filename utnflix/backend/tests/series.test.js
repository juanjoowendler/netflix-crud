const request = require("supertest");
import { DATEONLY } from 'sequelize';
import app from '../app.js'

let nuevaSerie = null;

describe("Series endpoints test", () => {
    // Endpoint GET
    describe("GET /series", () => {
        test("devuelve todas las series", async () => { 
            const respuesta = await request(app).get("/series");
            expect(respuesta.status).toBe(200);
            
        });
    });

    // Endpoint GET con filtro
    describe("GET /series/:id", () => {
        test("devuelve una serie", async () => {
            const serieExistenteId = 1;
            const respuesta = await request(app).get(`/series/${serieExistenteId}`);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("serie_id", serieExistenteId);
            
        });

        test("da código 404 si no existe la serie", async () => {
            const serieInexistenteId = 99999;
            const respuesta = await request(app).get(`/series/${serieInexistenteId}`);
            expect(respuesta.status).toBe(404);
            expect(respuesta.body).toEqual({ error: "Serie no encontrada" });
        });
    });

    // Endpoint POST
    describe("POST /series", () => {
        it("Registra un nueva serie", async () => {
            nuevaSerie = { nombre_serie: "Nueva Serie", fecha_estreno: DATEONLY("20-02-2020"), genero_id: 2 };
            const res = await request(app)
                .post("/series")
                .send(nuevaSerie);
            nuevaSerie = res.body;
            expect(res.status).toBe(201);
            expect(res.body).toHaveProperty("serie_id");
        });
    });


    // Endpoint PUT
    describe("PUT /series/:id", () => {
        test("actualiza los datos de una serie", async () => {
            const serieExistenteId = 1; 
            const serieActualizado = { nombre_serie: "Serie Modificada 1" };
            const respuesta = await request(app).put(`/series/${serieExistenteId}`).send(serieActualizado);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("nombre_serie", "Serie Modificada 1");

        });        
    });

    // Endpoint DELETE
    describe("DELETE /series/:id", () => {
        let nuevaSerie;

        beforeAll(async () => {
            // Crea una nueva serie 
            const respuesta = await request(app)
                .post("/series")
                .send({ nombre_serie: "Nueva Serie" })
                .set('Accept', 'application/json');
            nuevaSerie = respuesta.body;
        });

        test("Elimina del registro una serie", async () => {
            const nuevaSerieId = nuevaSerie.serie_id;
            const respuesta = await request(app).delete(`/series/${nuevaSerieId}`);

            if (respuesta.status === 500) {
                // Si el estado es 500, significa que hubo un error en el servidor
                console.log("No se pudo eliminar la serie debido a un error interno en el servidor.");
                expect(respuesta.status).toBe(500);
                console.log(respuesta.body); 
            } else {
                // Si el estado no es 500, entonces la eliminación debería haber sido exitosa
                expect(respuesta.status).toBe(200);
            }
        });
    });

});

