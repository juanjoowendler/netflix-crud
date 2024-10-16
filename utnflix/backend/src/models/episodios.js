import { DataTypes } from "sequelize";
import sequelize from "../../data/db.js";
import Series from "./series.js";
import Temporadas from "./temporadas.js";

const Episodios = sequelize.define(
  "Episodios",
  {
    episodio_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    temporada_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Temporadas,
        key: "temporada_id",
      },
    },
    nombre_episodio: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre del episodio es requerido",
        },
      },
    },
    duracion_minutos: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La duración en minutos es requerida",
        },
      },
    },
    fecha_emision: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La fecha de emisión es requerida",
        },
        isDate: {
          args: true,
          msg: "La fecha de emisión debe ser una fecha válida",
        },
      },
    },
    serie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
     
    },
  },
  {
    timestamps: false,
    tableName: "Episodios",
  }
);

Series.hasMany(Episodios, { foreignKey: "serie_id", as: "serie_1" });
Episodios.belongsTo(Series, { foreignKey: "serie_id", as: "serie_1" });

Temporadas.hasMany(Episodios, { foreignKey: "temporada_id", as: "temporada" });
Episodios.belongsTo(Temporadas, { foreignKey: "temporada_id", as: "temporada" });
export default Episodios;
