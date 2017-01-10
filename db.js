import Sequelize from 'sequelize';
import db from './config/db';
import _ from 'lodash';
import Faker from 'faker';

const SequelizeConnection = new Sequelize(
  db.schema,
  db.username,
  db.password,
  {
    dialect: db.dialect,
    host: db.host
  }
);

let sampleBlob = {
  field1: 'Field 1',
  field2: 'Field 2',
  field3: 'Field 3'
};

function removeSpaces(val) {
  return val.replace(/\s+/, '')
}

// Sequelize (ORM) table definitions for PostgreSQL database
const Container = SequelizeConnection.define('container', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
    set: function(val) {
      this.setDataValue('id', removeSpaces(val));
    }
  },
  data: {
    type: Sequelize.JSONB
  }
});

const Section = SequelizeConnection.define('section', {
  id: {
    type: Sequelize.STRING,
    primaryKey: true,
    unique: true,
    allowNull: false,
    set: function(val) {
      this.setDataValue('id', removeSpaces(val));
    }
  }
});

// Associations defined between resource tables
Container.hasMany(Section);
Section.belongsTo(Container);

/**
 * Synchronise the Sequelize models and associations with PostgreSQL database.
 * Reinitializes the PostgreSQL tables each time run.
 * Fixtures (fake data) after tables initialised.
 * force checks and drops tables if already exist but just overrides if false
 */

SequelizeConnection.sync({force: true}).then(() => {
  _.times(10, () => {
    return Container.create({
      id: Faker.company.companyName(),
      data: sampleBlob
    }).then(container => {
      return container.createSection({
        id: Faker.name.firstName() + Faker.name.lastName()
      });
    }).catch(function(error) {
      console.log("Error: ", error);
    });
  })
});

// Module to import into GraphQL Schema
export default SequelizeConnection;