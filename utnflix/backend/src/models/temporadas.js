import { DataTypes } from "sequelize";
import sequelize from "../../data/db.js";
import Series from "./series.js";

const Temporadas = sequelize.define(
  "Temporadas",
  {
    temporada_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    serie_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    numero_temporada: {
      type: DataTypes.INTEGER,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "El número de temporada es requerido",
        },
        isInt: {
          args: true,
          msg: "El número de temporada debe ser un número entero",
        },
      },
    },
    fecha_lanzamiento: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La fecha de lanzamiento es requerida",
        },
        isDate: {
          args: true,
          msg: "La fecha de lanzamiento debe ser una fecha válida",
        },
      },
    },
  },
  {
    timestamps: false,
    tableName: "Temporadas",
  }
);

Series.hasMany(Temporadas, { foreignKey: "serie_id", as: "serie" });
Temporadas.belongsTo(Series, { foreignKey: "serie_id", as: "serie" });
export default Temporadas;
