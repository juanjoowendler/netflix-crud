import { DataTypes } from 'sequelize';
import sequelize from '../../data/db.js';  

const Generos = sequelize.define('Generos', {
    genero_id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nombre_genero: {
        type: DataTypes.TEXT,
        allowNull: false,
        unique: true,
        validate: {
            notEmpty: {
                args: true,
                msg: "El nombre del género es requerido"
            }
        }
    }
}, {
    timestamps: false,
    tableName: 'Generos'
});

export default Generos;
