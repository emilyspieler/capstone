'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('Posts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      title: {
        allowNull: false,
        type: Sequelize.STRING
      },
      body: {
        allowNull: false,
        type: Sequelize.STRING
      },
      description: {
        allowNull: false,
        type: Sequelize.STRING
      },
      private: {
        type: Sequelize.BOOLEAN
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      spaceId: {
         type: Sequelize.INTEGER,
         onDelete: "CASCADE", // delete post if parent topic is deleted
         allowNull: false,    // validation to prevent null value
         references: {        // association information
           model: "Spaces",   // table name
           key: "id",         // attribute to use
           as: "spaceId"      // reference as topicId
         },
       },
       userId: {
          type: Sequelize.INTEGER,
          onDelete: "CASCADE", // delete post if parent topic is deleted
          allowNull: false,    // validation to prevent null value
          references: {        // association information
            model: "Users",   // table name
            key: "id",         // attribute to use
            as: "userId"      // reference as topicId
          },
        }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('Posts');
  }
};
