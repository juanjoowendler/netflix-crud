import { DataTypes } from "sequelize";
import sequelize from "../../data/db.js";
import Generos from "./generos.js";

const Series = sequelize.define(
  "Series",
  {
    serie_id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    nombre_serie: {
      type: DataTypes.TEXT,
      allowNull: false,
      unique: true,
      validate: {
        notEmpty: {
          args: true,
          msg: "El nombre de la serie es requerido",
        },
      },
    },
    fecha_estreno: {
      type: DataTypes.DATEONLY,
      allowNull: false,
      validate: {
        notEmpty: {
          args: true,
          msg: "La fecha de estreno es requerida",
        },
        isDate: {
          args: true,
          msg: "La fecha de estreno debe ser una fecha válida",
        },
      },
    },
    genero_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Generos,
        key: "genero_id",
      },
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    imagenUrl: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    timestamps: false,
    tableName: "Series",
  }
);

Generos.hasOne(Series, { foreignKey: "genero_id", as: "genero" });
Series.belongsTo(Generos, { foreignKey: "genero_id", as: "genero" });

export default Series;
