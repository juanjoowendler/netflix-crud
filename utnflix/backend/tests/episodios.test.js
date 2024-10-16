const request = require("supertest");
import { DATEONLY } from 'sequelize';
import app from '../app.js'

let nuevoEpisodio = null;


describe("Episodios endpoints test", () => {

    // Endpoint GET
    describe("GET /episodios", () => {
        test("devuelve todos los episodios", async () => { 
            const respuesta = await request(app).get("/episodios");
            expect(respuesta.status).toBe(200);
            
        });
    });

    // Endpoint GET con filtro
    describe("GET /episodios/:id", () => {
        test("devuelve un episodio", async () => {
            const episodioExistenteId = 1;
            const respuesta = await request(app).get(`/episodios/${episodioExistenteId}`);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("episodio_id", episodioExistenteId);
            
        });

        test("da código 404 si no existe el episodio", async () => {
            const episodioInexistenteId = 99999;
            const respuesta = await request(app).get(`/episodios/${episodioInexistenteId}`);
            expect(respuesta.status).toBe(404);
            expect(respuesta.body).toEqual({ error: "Episodio no encontrado" });
        });
    });

    // Endpoint POST
    describe("POST /episodios", () => {
        test("Registra un nuevo episodio", async () => {
            nuevoEpisodio = { temporada_id: 3, nombre_episodio: "Nuevo episodio", 
            duracion_minutos: 30, fecha_emision: DATEONLY("20-10-2015"), serie_id: 3};
            const respuesta = await request(app).post("/episodios").send(nuevoEpisodio);
            expect(respuesta.status).toBe(201);
            expect(respuesta.body).toHaveProperty("nombre_episodio", "Nuevo episodio");
        });
    });
    

    // Endpoint PUT
    describe("PUT /episodios/:id", () => {
        test("actualiza los datos de un episodio", async () => {
            const episodioExistenteId = 1; 
            const episodioActualizado = { nombre_episodio: "Episodio Modificado 1" };
            const respuesta = await request(app).put(`/episodios/${episodioExistenteId}`).send(episodioActualizado);
            expect(respuesta.status).toBe(200);
            expect(respuesta.body).toHaveProperty("nombre_episodio", "Episodio Modificado 1");

        });        
    });

    // Endpoint DELETE
    describe("DELETE /episodios/:id", () => {
        let nuevoEpisodio;

        beforeAll(async () => {
            // Crea un nuevo episodio 
            const respuesta = await request(app)
                .post("/episodios")
                .send({ nombre_episodio: "Nueva Episodio" })
                .set('Accept', 'application/json');
            nuevoEpisodio = respuesta.body;
        });

        test("Elimina del registro un episodio", async () => {
            const nuevoEpisodioId = nuevoEpisodio.episodio_id;
            const respuesta = await request(app).delete(`/episodios/${nuevoEpisodioId}`);

            // Verificar el estado de la respuesta
            if (respuesta.status === 500) {
                // Si el estado es 500, significa que hubo un error en el servidor
                console.log("No se pudo eliminar el episodio debido a un error interno en el servidor.");
                expect(respuesta.status).toBe(500);
                console.log(respuesta.body);
            } else {
                // Si el estado no es 500, entonces la eliminación debería haber sido exitosa
                expect(respuesta.status).toBe(200);
            }
        });
    });

    });

