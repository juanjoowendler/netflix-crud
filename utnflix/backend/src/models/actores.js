import { DataTypes } from "sequelize";
import sequelize from "../../data/db.js";
import Episodios from "./episodios.js";

const Actores = sequelize.define(
  "Actores",
  {
    actor_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_actor: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del actor es necesario",
        },
      },
    },
    fecha_nacimiento: {
      type: DataTypes.DATEONLY,
      allowNull: true,
      validate: {
        isDate: {
          args: true,
          msg: "Formato de fecha de nacimiento inválido",
        },
      },
    },
    episodio_id: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
  },
  {
    timestamps: false,
  }
);

Episodios.hasMany(Actores, { foreignKey: "episodio_id", as: "episodio" });
Actores.belongsTo(Episodios, { foreignKey: "episodio_id", as: "episodio" });

export default Actores;
