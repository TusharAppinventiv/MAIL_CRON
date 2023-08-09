import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize('DSR', 'postgres', 'tushar', {
  host: 'localhost', 
  dialect: 'postgres',
  logging: false
});

sequelize.authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });
