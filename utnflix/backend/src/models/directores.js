import { DataTypes } from "sequelize";
import sequelize from "../../data/db.js";
import Episodios from "./episodios.js";

const Directores = sequelize.define(
  "Directores",
  {
    director_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_director: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del director es necesario",
        },
      },
    },
    nacionalidad: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    episodio_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    timestamps: false,
  }
);

Episodios.hasMany(Directores, { foreignKey: "episodio_id", as: "episodio_1" });
Directores.belongsTo(Episodios, { foreignKey: "episodio_id", as: "episodio_1" });

export default Directores;
