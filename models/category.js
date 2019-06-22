module.exports = function(sequelize, Sequelize) {
  var category = sequelize.define('category', {
    uuid: {
      type: Sequelize.UUID,
      defaultValue: Sequelize.UUIDV4,
      primaryKey: true,
    },
    name: {
      type: Sequelize.STRING,
      notNull: true
    },
    description: {
      type: Sequelize.TEXT,
      notNull: true
    },
    photo: {
      type: Sequelize.TEXT,
      notNull: true,
      defaultValue: 'default'
    },
    status: {
      type: Sequelize.ENUM('Active', 'Inactive'),
      defaultValue: 'Active'
    }
  },
);
      return category;
}

/*
Gastronomía
  Restaurante
  Cocina económica
  Cafetería
  Comida rápida
  Bares
Servicios
  Educación
  Alquiler
  Eventos
Productos
  Abarrotes
  Vinos y licores
  Serigrafía
Viajes
  Hotel
  Hostal
Salud
  Hospital
  Clinica
  Consultorio
  Spa
*/
