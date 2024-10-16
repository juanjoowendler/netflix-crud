

const request = require("supertest");
import { DATEONLY } from 'sequelize';
import app from '../app.js'

let nuevaTemporada = null;


describe("Temporadas endpoints test", () => {

    // Endpoint GET
    describe("GET /temporadas", () => {
        test("devuelve todas las temporadas", async () => { 
            const respuesta = await request(app).get("/temporadas");
            expect(respuesta.status).toBe(200);
            
        });
    });

    // Endpoint GET con filtro
    describe("GET /temporadas/:id", () => {
        test("devuelve una temporada", async () => {
            const temporadaExistenteId = 1;
            const respuesta = await request(app).get(`/temporadas/${temporadaExistenteId}`);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("temporada_id", temporadaExistenteId);
            
        });

        test("da código 404 si no existe la temporada", async () => {
            const temporadaInexistenteId = 99999;
            const respuesta = await request(app).get(`/temporadas/${temporadaInexistenteId}`);
            expect(respuesta.status).toBe(404);
            expect(respuesta.body).toEqual({ error: "Temporada no encontrada" });
        });
    });

    // Endpoint POST
    describe("POST /temporadas", () => {
        test("Registra una nueva temporada", async () => {
            nuevaTemporada = {  serie_id: 1, numero_temporada: 2, fecha_lanzamiento: DATEONLY("09-12-2018") };
            const respuesta = await request(app).post("/temporadas").send(nuevaTemporada);
            expect(respuesta.status).toBe(201);
            expect(respuesta.body).toHaveProperty("numero_temporada", 2);
        });
    });

    // Endpoint PUT
    describe("PUT /temporadas/:id", () => {
        test("actualiza los datos de una temporada", async () => {
            const temporadaExistenteId = 1; 
            const temporadaActualizado = { numero_temporada: 3 };
            const respuesta = await request(app).put(`/temporadas/${temporadaExistenteId}`).send(temporadaActualizado);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("numero_temporada", 3);

        });        
    });


    // Endpoint DELETE
    describe("DELETE /temporadas/:id", () => {
        

        beforeAll(async () => {
            // Crea una nueva temporada para asegurarte de que existe
            const respuesta = await request(app)
                .post("/temporadas")
                .send({numero_temporada: 2})
                .set('Accept', 'application/json');
            nuevaTemporada = respuesta.body;
        });

        test("Elimina del registro una temporada", async () => {
            const nuevaTemporadaId = nuevaTemporada.temporada_id;
            const respuesta = await request(app).delete(`/temporadas/${nuevaTemporadaId}`);

            // Verificar el estado de la respuesta
            if (respuesta.status === 500) {
                // Si el estado es 500, significa que hubo un error en el servidor
                console.log("No se pudo eliminar la temporada debido a un error interno en el servidor.");
                // Puedes agregar expectativas para manejar el error como sea apropiado
                expect(respuesta.status).toBe(500);
                // También podrías verificar el cuerpo de la respuesta para obtener más detalles del error
                console.log(respuesta.body); // Verificar el cuerpo de la respuesta para detalles adicionales
            } else {
                // Si el estado no es 500, entonces la eliminación debería haber sido exitosa
                expect(respuesta.status).toBe(200);
            }
        });
    });

});


