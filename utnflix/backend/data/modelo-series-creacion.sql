
CREATE TABLE IF NOT EXISTS "Series" (
	"serie_id"	INTEGER,
	"nombre_serie"	TEXT,
	"fecha_estreno"	DATE,
	"genero_id"	INTEGER,
	"imagenUrl"	TEXT,
	"descripcion"	text,
	PRIMARY KEY("serie_id"),
	FOREIGN KEY("genero_id") REFERENCES "Generos"("genero_id")
);
CREATE TABLE IF NOT EXISTS "Generos" (
	"genero_id"	INTEGER,
	"nombre_genero"	TEXT,
	PRIMARY KEY("genero_id")
);
CREATE TABLE IF NOT EXISTS "Temporadas" (
	"temporada_id"	INTEGER,
	"serie_id"	INTEGER,
	"numero_temporada"	INTEGER,
	"fecha_lanzamiento"	DATE,
	PRIMARY KEY("temporada_id"),
	FOREIGN KEY("serie_id") REFERENCES "Series"("serie_id")
);
CREATE TABLE IF NOT EXISTS "Actores" (
	"actor_id"	INTEGER,
	"nombre_actor"	TEXT,
	"fecha_nacimiento"	DATE,
	"episodio_id" INTEGER,
	PRIMARY KEY("actor_id"),
	CONSTRAINT fk_episodio_actores FOREIGN KEY (episodio_id) REFERENCES Episodios (episodio_id)
);
CREATE TABLE IF NOT EXISTS "Directores" (
	"director_id"	INTEGER,
	"nombre_director"	TEXT,
	"nacionalidad"	TEXT,
	"episodio_id" INTEGER,
	PRIMARY KEY("director_id"),
	CONSTRAINT fk_episodio_directores FOREIGN KEY (episodio_id) REFERENCES Episodios (episodio_id)
);

CREATE TABLE IF NOT EXISTS "Episodios" (
	"episodio_id"	INTEGER,
	"temporada_id"	INTEGER,
	"nombre_episodio"	TEXT,
	"duracion_minutos"	INTEGER,
	"fecha_emision"	DATE,
	"serie_id"	INTEGER,
	FOREIGN KEY("temporada_id") REFERENCES "Temporadas"("temporada_id"),
	FOREIGN KEY("serie_id") REFERENCES "Series"("serie_id"),
	PRIMARY KEY("episodio_id")
);

INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (1,'Serie Modificado 1','2008-01-20',1,'https://es.web.img3.acsta.net/pictures/18/04/04/22/52/3191575.jpg','La historia de Walter White, un profesor de química convertido en fabricante de metanfetaminas, y su alumno, Jesse Pinkman.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (2,'Game of Thrones','2011-04-17',2,'https://es.web.img3.acsta.net/r_1920_1080/pictures/19/03/22/10/08/5883111.jpg?coixp=50&coiyp=40','Un drama épico basado en la serie de novelas de George R.R. Martin, sigue las luchas por el poder en los Siete Reinos de Westeros.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (3,'Stranger Things','2016-07-15',3,'https://es.web.img3.acsta.net/pictures/22/05/14/13/26/5638861.jpg','Una serie de ciencia ficción y horror que sigue a un grupo de niños en un pequeño pueblo mientras enfrentan eventos sobrenaturales y una dimensión alternativa llamada "el Upside Down".');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (4,'The Crown','2016-11-04',4,'https://pics.filmaffinity.com/the_crown-838357032-large.jpg','Un drama histórico que narra la vida de la Reina Isabel II y los eventos históricos que marcaron su reinado.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (5,'Friends','1994-09-22',5,'https://m.media-amazon.com/images/M/MV5BNDVkYjU0MzctMWRmZi00NTkxLTgwZWEtOWVhYjZlYjllYmU4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_FMjpg_UX1000_.jpg','Una comedia que sigue la vida y las aventuras de seis amigos que viven en Nueva York.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (6,'The Mandalorian','2019-11-12',6,'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/theinfiltred/23ynap85pQb9DXEMWYbx2HNtCQL19aXHMbNzgGspM1JZaCbyafDFFkDA4GjReph6TVHdh.jpg','Una serie del universo de Star Wars que sigue las aventuras de un cazarrecompensas solitario en la galaxia.

');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (7,'Sherlock','2010-07-25',7,'https://m.media-amazon.com/images/M/MV5BMWEzNTFlMTQtMzhjOS00MzQ1LWJjNjgtY2RhMjFhYjQwYjIzXkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg','Una serie moderna basada en los personajes de Arthur Conan Doyle, que sigue al detective Sherlock Holmes y su compañero Dr. John Watson en Londres.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (8,'The Office','2005-03-24',5,'https://m.media-amazon.com/images/M/MV5BMDNkOTE4NDQtMTNmYi00MWE0LWE4ZTktYTc0NzhhNWIzNzJiXkEyXkFqcGdeQXVyMzQ2MDI5NjU@._V1_.jpg','Una comedia estilo falso documental que sigue la vida cotidiana de los empleados en una oficina de ventas de papel.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (9,'Chernobyl','2019-05-06',8,'https://es.web.img3.acsta.net/pictures/19/04/29/08/21/1692162.jpg?coixp=45&coiyp=73','Una miniserie que dramatiza el desastre nuclear de Chernóbil en 1986 y los esfuerzos posteriores para contener la contaminación.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (10,'The Boys','2017-02-18',1,'https://i0.wp.com/bloody-disgusting.com/wp-content/uploads/2022/03/the-boys-season-3-poster.png?w=820&ssl=1','Una serie de superhéroes que sigue a un grupo de vigilantes que luchan contra superhéroes corruptos.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (11,'Banda de Hermanos','2024-06-13',4,'https://es.web.img3.acsta.net/pictures/18/01/19/14/35/4798235.jpg','Una miniserie bélica producida por Steven Spielberg y Tom Hanks, sigue a la Compañía Easy de la 101ª División Aerotransportada durante la Segunda Guerra Mundial.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (12,'The wire','2002-06-02',1,'https://pics.filmaffinity.com/the_wire-680717276-large.jpg','Un drama que explora la vida en Baltimore desde diferentes perspectivas, incluyendo la policía, el sistema educativo, los medios y el narcotráfico.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (13,'Los sopranos','1999-01-10',1,'https://images.justwatch.com/poster/812682/s718/los-soprano.jpg','Un drama que sigue la vida de Tony Soprano, un jefe de la mafia de Nueva Jersey, mientras equilibra los problemas familiares y criminales.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (14,'Better Call Saul','2015-02-08',1,'https://pics.filmaffinity.com/better_call_saul-870008164-large.jpg','Un spin-off de Breaking Bad, centrado en el abogado Jimmy McGill y su transformación en el corrupto abogado Saul Goodman.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (16,'Fargo','2014-04-15',7,'https://i.pinimg.com/736x/2f/ce/35/2fce352d02bb9e13acc6bc98266555f1.jpg','Una serie de antología inspirada en la película de los hermanos Coen, con historias de crimen y humor negro en diferentes épocas y lugares.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (17,'DARK','2017-12-01',3,'https://pics.filmaffinity.com/Dark_Serie_de_TV-111203947-large.jpg','Una serie alemana de ciencia ficción que sigue la desaparición de niños en un pequeño pueblo y los secretos oscuros de las familias involucradas, incluyendo viajes en el tiempo.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (18,'Peaky Blinders','2013-09-12',7,'https://mir-s3-cdn-cf.behance.net/project_modules/1400/d7590f135861167.61ef6fb49f8e4.jpg','Un drama histórico que sigue a la familia Shelby, una pandilla criminal en Birmingham, Inglaterra, después de la Primera Guerra Mundial.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (19,'The Twilight Zone','1959-10-02',3,'https://m.media-amazon.com/images/M/MV5BZWNmMDQ4MTktMzk2ZS00MDEyLTgxNDEtZGQ1YmU4MGUyZDVkXkEyXkFqcGdeQXVyNjExODE1MDc@._V1_.jpg','Una serie de antología de ciencia ficción y horror que presenta historias independientes con giros inesperados y moralejas.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (20,'Fleabag','2016-07-21',5,'https://m.media-amazon.com/images/I/71AJoBx3oDL._AC_UF894,1000_QL80_.jpg','Una comedia dramática creada y protagonizada por Phoebe Waller-Bridge, sigue a una joven londinense mientras lidia con la vida y el dolor tras una tragedia personal.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (21,'House','2004-11-16',1,'https://images.justwatch.com/poster/199979170/s332/temporada-8','Un drama médico que sigue al brillante pero irascible Dr. Gregory House y su equipo mientras diagnostican casos médicos complejos.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (22,'Succession','2018-06-03',1,'https://es.web.img2.acsta.net/pictures/18/05/18/11/43/4369994.jpg','Un drama satírico que sigue a la poderosa familia Roy mientras luchan por el control de su imperio mediático.

');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (23,'Battlestar Galactica','2004-10-18',3,'https://m.media-amazon.com/images/M/MV5BZjBjMjk4YWQtZjY1MC00NTI5LWEwZDMtYWMyYjk2MjkzMThhXkEyXkFqcGdeQXVyNzA5NjUyNjM@._V1_.jpg','Una serie de ciencia ficción que sigue a los últimos sobrevivientes de la humanidad, liderados por la nave Battlestar Galactica, mientras huyen de los Cylon, una raza de robots que destruyó sus planetas.

');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (24,'Freaks and Geeks','1999-09-25',5,'https://m.media-amazon.com/images/M/MV5BZWJhOGFiZWMtYTY5Ni00NGU1LWE5OWItNzA5NThkNWUwYzc4XkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg','Un drama adolescente ambientado en los años 80 que sigue a dos grupos de estudiantes de secundaria: los "freaks" y los "geeks".

');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (25,'Mad Men','2007-07-19',1,'https://cloudfront-eu-central-1.images.arcpublishing.com/prisa/HYZVLVI7EJNSJAS66LN7H4MZPA.jpg','Un drama que sigue la vida de los publicistas en una agencia de publicidad en Nueva York durante los años 60.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (26,'Narcos','2015-08-28',4,'https://pics.filmaffinity.com/narcos_mexico-194987829-large.jpg','Un drama criminal que narra la historia de los cárteles de drogas en Colombia y la lucha de las autoridades por detenerlos.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (27,'Mindhunters','2017-10-13',7,'https://es.web.img3.acsta.net/pictures/19/08/07/17/01/2286697.jpg','Una serie basada en hechos reales que sigue a dos agentes del FBI que desarrollan perfiles psicológicos de asesinos en serie.

');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (28,'Mr. Robot','2015-06-24',3,'https://c8.alamy.com/compes/2ah2f4p/el-sr-robot-2015-dirigida-por-sam-esmail-temporada-4-credito-cable-universal-productions-album-2ah2f4p.jpg','Un thriller psicológico que sigue a Elliot Alderson, un hacker con problemas de salud mental que se une a un grupo de hacktivistas para derribar conglomerados corruptos.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (29,'Black Mirror','2011-12-04',3,'https://i.pinimg.com/736x/e1/fb/16/e1fb164433849d9ac3fd18052d02f113.jpg','Una serie de antología que explora un futuro distópico cercano, examinando la sociedad moderna y las posibles consecuencias de la tecnología.

');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (30,'Heartstopper','2022-04-22',10,'https://pics.filmaffinity.com/Heartstopper_Serie_de_TV-355892955-large.jpg','Una serie británica sobre la relación romántica entre dos adolescentes, basada en la novela gráfica de Alice Oseman.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (31,'Severance','2022-02-18',3,'https://m.media-amazon.com/images/M/MV5BMjkwZjcwMGQtNDAzOC00YjJiLThiYTgtNWU3ZjRiZmY2YzEzXkEyXkFqcGdeQXVyMTMzNDExODE5._V1_FMjpg_UX1000_.jpg','Un thriller de ciencia ficción que explora la vida de empleados que han aceptado un procedimiento para separar sus recuerdos laborales de los personales.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (32,'It’s Always Sunny in Philadelphia','2005-08-04',5,'https://m.media-amazon.com/images/M/MV5BZDc4NjU1MmMtZjIzNy00MWRhLWI4ZjUtYjY4YmFlY2NjMzA0XkEyXkFqcGdeQXVyMjkwOTAyMDU@._V1_FMjpg_UX1000_.jpg','Una comedia sobre un grupo de amigos egoístas y moralmente cuestionables que manejan un bar en Filadelfia.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (33,'Seinfeld','1989-07-05',5,' https://m.media-amazon.com/images/M/MV5BZjZjMzQ2ZmUtZWEyZC00NWJiLWFjM2UtMzhmYzZmZDcxMzllXkEyXkFqcGdeQXVyNTA4NzY1MzY@._V1_.jpg','Una comedia sobre la vida cotidiana de Jerry Seinfeld y sus excéntricos amigos en Nueva York.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (34,'Peep Show','2003-09-19',5,' https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRGy5_u243tSGVq6s2Mq0eX7uWsNdb1bRXSnw&s','Una comedia británica que sigue la vida de dos compañeros de piso con perspectivas y personalidades muy diferentes.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (35,'The Last of Us','2023-01-15',2,'https://es.web.img3.acsta.net/pictures/22/12/05/09/44/0128038.jpg','Basada en el popular videojuego, sigue a los sobrevivientes de un apocalipsis zombi mientras intentan encontrar una cura para la infección.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (36,'When They See Us','2019-05-31',8,'https://m.media-amazon.com/images/M/MV5BZmJjM2YzOWEtOTYxYi00YjhkLTliMzgtMTA2MTc0NDQ1MDM4XkEyXkFqcGdeQXVyODY5OTk4MA@@._V1_.jpg','Una miniserie basada en hechos reales que narra la historia de los cinco adolescentes conocidos como los "Central Park Five", quienes fueron condenados injustamente por un ataque en Central Park.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (37,'Lost (Perdidos)','2004-09-22',2,'https://pics.filmaffinity.com/lost-924104956-mmed.jpg','Un drama de misterio y ciencia ficción que sigue a los sobrevivientes de un accidente aéreo en una isla misteriosa.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (38,'Line of Duty','2012-06-26',7,'https://images.justwatch.com/poster/11701532/s718/temporada-2.jpg','Un drama policial británico que sigue a la unidad anticorrupción AC-12 mientras investigan a policías corruptos.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (39,'Deadwood','2004-03-21',8,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS7VZDvVIm3kmCoHk2_BKuKyR8cbfyG5iPiFw&s','Un drama que se desarrolla en el pueblo fronterizo de Deadwood, Dakota del Sur, en los años 1870, mostrando la corrupción y el crimen en el oeste americano.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (40,'Mare of Eastown','2021-04-18',9,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRURN6KmAp09YzSMYr2FUpexOl_3lMHsknxEQ&s','Un drama policial que sigue a la detective Mare Sheehan mientras investiga un asesinato en un pequeño pueblo de Pensilvania.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (41,'Hannibal','2013-04-04',9,'https://images.hive.blog/0x0/https://files.peakd.com/file/peakd-hive/naath/23sJxbeyxhRDg4wCRh8UxTpD4TXELwQx1sucQoEFEE29SB5j6A6mQkVo4PseDqn816kz8.jpg','Una serie de suspenso psicológico centrada en la relación entre el agente del FBI Will Graham y el brillante psiquiatra y asesino en serie Dr. Hannibal Lecter.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (42,'The Bear','2022-06-23',1,'https://pics.filmaffinity.com/The_Bear_Serie_de_TV-982511761-large.jpg','Una serie dramática centrada en un joven chef que regresa a Chicago para dirigir la tienda de sándwiches de su familia.

');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (43,'Boardwalk Empire','2010-09-19',8,'https://www.lavanguardia.com/peliculas-series/images/serie/poster/2010/9/w1280/kL6SqlVPpfAof2nQbh1VxkUuXBQ.jpg','Un drama histórico que sigue la vida de Enoch "Nucky" Thompson en Atlantic City durante la era de la Prohibición.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (45,'Vikings','2013-03-03',8,'https://es.web.img3.acsta.net/pictures/20/12/04/10/04/4859166.jpg','Un drama histórico que sigue las aventuras del legendario vikingo Ragnar Lothbrok y su familia.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (46,'Twin Peaks','1990-04-08',9,'https://m.media-amazon.com/images/M/MV5BMTExNzk2NjcxNTNeQTJeQWpwZ15BbWU4MDcxOTczOTIx._V1_.jpg','Un drama de misterio creado por David Lynch, que sigue la investigación del asesinato de la joven Laura Palmer en un pequeño pueblo.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (47,'The Shield','2002-03-12',7,'https://m.media-amazon.com/images/M/MV5BMTcwNzQwODI5NV5BMl5BanBnXkFtZTcwNzQxMjI5MQ@@._V1_.jpg','Un drama policial que sigue a un grupo de detectives corruptos en Los Ángeles mientras intentan equilibrar sus propios intereses con la lucha contra el crimen.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (48,'Happy Valley','2014-04-29',7,'https://es.web.img3.acsta.net/pictures/15/05/12/21/17/527570.jpg','Un drama policial británico que sigue a la sargento Catherine Cawood mientras investiga crímenes en su pequeño pueblo en Yorkshire.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (49,'True Detective','2014-01-12',9,'https://i.pinimg.com/564x/64/c8/17/64c817759e2e03f689fee2ff5d958521.jpg','Una serie de antología que presenta diferentes historias de crímenes y detectives en cada temporada, con un enfoque en el carácter y la moralidad.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (50,'La Maldición de Hill House','2018-10-12',2,'https://es.web.img2.acsta.net/pictures/18/09/20/08/44/5720467.jpg','Una serie de terror que sigue a una familia que enfrenta los recuerdos traumáticos de su tiempo viviendo en una casa embrujada.

');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (51,'The Americans','2013-01-30',1,'https://pics.filmaffinity.com/The_Americans_Serie_de_TV-753530620-large.jpg','Un drama de espionaje que sigue a dos agentes soviéticos encubiertos que se hacen pasar por una familia estadounidense durante la Guerra Fría.

');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (52,'Justified','2010-03-16',7,'https://m.media-amazon.com/images/M/MV5BZGU1MzUxZTYtZTQyMy00MjFiLThhYWUtYTBiMTBlM2QyNWQ5XkEyXkFqcGdeQXVyNDIzMzcwNjc@._V1_.jpg','Un drama que sigue al mariscal de los EE.UU. Raylan Givens mientras impone su propia forma de justicia en su ciudad natal de Kentucky.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (53,'Rick and Morty','2024-06-19',3,'https://es.web.img3.acsta.net/r_1920_1080/pictures/23/09/12/17/30/4980796.jpg','Después de haber estado desaparecido durante casi 20 años, Rick Sánchez llega de imprevisto a la puerta de la casa de su hija Beth y se va a vivir con ella y su familia utilizando el garaje como su laboratorio personal.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (54,'Invencible','2024-06-03',3,'https://es.web.img3.acsta.net/r_1920_1080/pictures/21/02/26/16/32/3176360.jpg','Mark Grayson, de 17 años, es como cualquier otro chico de su edad, excepto que su padre es el superhéroe más poderoso del planeta, Omni-Man. Mark descubre que el legado de su padre puede no ser tan heroico como parece.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (56,'Spider-man','2024-06-14',2,'https://www.tvtime.com/_next/image?url=https%3A%2F%2Fartworks.thetvdb.com%2Fbanners%2Fposters%2F73750-5.jpg&w=640&q=75','Parker, quien, tras ser picado por una araña radiactiva, obtiene habilidades arácnidas y se convierte en el legendario héroe de Nueva York. Enfrentando villanos y equilibrando su vida personal, la serie explora temas de poder, responsabilidad y la dualidad de ser humano y superhéroe.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (57,'Atlanta','2024-06-13',5,'https://m.media-amazon.com/images/M/MV5BZGU1MzRhNmMtNDExOS00NTk2LWJlYzMtMzc4YWYyN2Q3M2ZmXkEyXkFqcGdeQXVyMTUzMTg2ODkz._V1_.jpg','Una comedia dramática creada por Donald Glover, sigue a Earn y su primo Paper Boi mientras navegan por la escena musical de Atlanta, abordando temas de raza, clase y éxito.');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (58,'Gato','2024-06-11',7,'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQdgsED44pffK4qewnSv7HoRy6e5WYX9BolTw&s','Buscado por multiples delitos. ');
INSERT INTO "Series" ("serie_id","nombre_serie","fecha_estreno","genero_id","imagenUrl","descripcion") VALUES (59,'solicitelo','2024-06-06',1,'https://content.imageresizer.com/images/memes/Herbert-meme-10.jpg','DEA');

INSERT INTO "Generos" ("genero_id","nombre_genero") VALUES (1,'Drama');
INSERT INTO "Generos" ("genero_id","nombre_genero") VALUES (2,'Fantasy');
INSERT INTO "Generos" ("genero_id","nombre_genero") VALUES (3,'Sci-Fi');
INSERT INTO "Generos" ("genero_id","nombre_genero") VALUES (4,'Biography');
INSERT INTO "Generos" ("genero_id","nombre_genero") VALUES (5,'Comedy');
INSERT INTO "Generos" ("genero_id","nombre_genero") VALUES (6,'Adventure');
INSERT INTO "Generos" ("genero_id","nombre_genero") VALUES (7,'Crime');
INSERT INTO "Generos" ("genero_id","nombre_genero") VALUES (8,'History');
INSERT INTO "Generos" ("genero_id","nombre_genero") VALUES (9,'Mystery');
INSERT INTO "Generos" ("genero_id","nombre_genero") VALUES (10,'Romance');

INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (1,1,3,'2008-01-20');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (2,1,2,'2009-03-08');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (3,2,1,'2011-04-17');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (4,2,2,'2012-04-18');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (5,3,1,'2016-07-15');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (6,3,2,'2017-10-27');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (8,4,2,'2017-12-01');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (9,5,1,'1994-09-22');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (12,16,1,'2024-06-20');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (13,58,2,'2024-07-03');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (14,17,1,'2024-06-28');
INSERT INTO "Temporadas" ("temporada_id","serie_id","numero_temporada","fecha_lanzamiento") VALUES (15,12,50,'2024-06-13');

INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (1,'Bryan Cranston ','1956-03-07');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (2,'Aaron Paul','1979-08-27');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (3,'Kit Harington','1986-12-26');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (4,'Emilia Clarke','1986-10-23');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (5,'Millie Bobby Brown','2004-02-19');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (6,'Claire Foy','1984-04-16');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (7,'Matt LeBlanc','1967-07-25');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (8,'Pedro Pascal','1975-04-02');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (9,'Martin Lorgot','2024-06-20');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (10,'Martin Locas','2024-06-20');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (11,'jj','2024-06-26');
INSERT INTO "Actores" ("actor_id","nombre_actor","fecha_nacimiento") VALUES (12,'Solicitelo','2024-06-05');

INSERT INTO "Directores" ("director_id","nombre_director","nacionalidad") VALUES (1,'Malcon Marron','Polish');
INSERT INTO "Directores" ("director_id","nombre_director","nacionalidad") VALUES (2,'David Benioff','American');
INSERT INTO "Directores" ("director_id","nombre_director","nacionalidad") VALUES (3,'D.B. Weiss','American');
INSERT INTO "Directores" ("director_id","nombre_director","nacionalidad") VALUES (4,'Matt Duffer','American');
INSERT INTO "Directores" ("director_id","nombre_director","nacionalidad") VALUES (5,'Ross Duffer','Argentina');
INSERT INTO "Directores" ("director_id","nombre_director","nacionalidad") VALUES (6,'Peter Morgan','British');
INSERT INTO "Directores" ("director_id","nombre_director","nacionalidad") VALUES (7,'Michael Schur','American');
INSERT INTO "Directores" ("director_id","nombre_director","nacionalidad") VALUES (8,'Craig Mazin','American');
INSERT INTO "Directores" ("director_id","nombre_director","nacionalidad") VALUES (9,'Paul King','British');

INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (1,1,'Pilot',58,'2008-01-20',1);
INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (2,5,'Cats in the Bag...',48,'2008-01-27',3);
INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (3,2,'Seven Thirty-Seven',47,'2009-03-08',4);
INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (4,2,'Grilled',45,'2009-03-15',2);
INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (5,3,'Winter Is Coming',62,'2011-04-17',6);
INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (6,3,'The Kingsroad',56,'2011-04-24',5);
INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (7,4,'Wolferton Splash',58,'2016-11-04',5);
INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (8,4,'Hyde Park Corner',56,'2016-11-11',7);
INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (9,5,'The One Where Monica Gets a Roommate',22,'1994-09-22',8);
INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (12,14,'oscuro',120,'2024-07-05',17);
INSERT INTO "Episodios" ("episodio_id","temporada_id","nombre_episodio","duracion_minutos","fecha_emision","serie_id") VALUES (14,3,'Prueba1231',234,'2024-06-14',2);
COMMIT;
