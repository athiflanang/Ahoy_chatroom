'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Users', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      username: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false
      },
      imageUrl: {
        type: Sequelize.STRING,
        defaultValue: "https://imgs.search.brave.com/k4VXX9uyVPedOonGsxXKJoG9Z3e9Rsoh_bSdjK-VRuk/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5nZXR0eWltYWdl/cy5jb20vaWQvNTEy/NTM2MTY1L3Bob3Rv/L2NvcmdpLXB1cHB5/LmpwZz9zPTYxMng2/MTImdz0wJms9MjAm/Yz1NWGFYX2ZHbDR5/SEYzaHc5d0dvc3Bi/dWdxVnh4N3R0cEJf/QkFkSnJEbkhNPQ"
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Users');
  }
};