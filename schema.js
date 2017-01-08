import {
  GraphQLString,
  GraphQLObjectType,
  GraphQLList,
  GraphQLSchema
} from 'graphql'; // Import specific Types from GraphQL

import SequelizeDatabase from './db';

// Individual Query
const Container = new GraphQLObjectType({
  name: 'Container',
  description: 'Represents a Container',
  // Function that overlays Sequelize fields and returns object of field types
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        /**
         *  Resolve invokes retrieval of data from specific source (i.e. Sequelize).
         *  Resolve has Container object passed in as parameter that is available
         *  in response to query that returns Sequelized Container object from db.
         */
        resolve(container) {
          return container.id
        }
      },
      /**
       *  HAS MANY relationship allows add a (PLURAL) Associated query that may also be called
       *  as an Independent Query as a field of this query to allow Combined Queries
       */
      sections: {
        type: new GraphQLList(Section),
        resolve(container) {
          /**
           *  Sequelize automatically provides Dynamic Function
           *  getSections() function that we may call since we declared Associations
           *  between the two tables (hasMany and belongsTo)
           */
          return container.getSections();
        }
      }
    }
  }
});

// Individual Query
const Section = new GraphQLObjectType({
  name: 'Section',
  description: 'Represents a Section',
  fields: () => {
    return {
      id: {
        type: GraphQLString,
        resolve(section) {
          return section.id
        }
      },
      /**
       *  BELONGS TO relationship allows add a (SINGULAR) Associated query that may also be called
       *  as an Independent Query as a field of this query to allow Combined Queries
       *  IMPORTANT NOTE: Differs from HAS MANY as follows:
       *  - container NOT containers
       *  - getContainer NOT getContainers
       *  - Container NOT new GraphQLList(Container)  (i.e. one container, not array of containers)
       */
      container: {
        type: Container,
        resolve(section) {
          return section.getContainer();
        }
      }
    }
  }
});

// Root Query
const RootQuery = new GraphQLObjectType({
  name: 'RootQuery',
  description: 'Represents the Root Query',
  // Function that returns object of all Public API Methods to query against
  fields: () => {
    return {
      containers: {
        // Returns multiple records so use GraphQLList type
        type: new GraphQLList(Container),
        /**
         *  Return Promise from SequelizeDatabase instance.
         *  Arguments `args` are passed along with GraphQL Query
         *  (i.e. used to search/filter against the db columns).
         *
         *  Security enforcement by restricting access to args using
         *  Input Data Sanitization (IDS) to prevent untrusted input
         *  and access to private database columns
         */
        args: {
          id: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return SequelizeDatabase.models.container.findAll({where: args});
        }
      },
      sections: {
        type: new GraphQLList(Section),
        args: {
          id: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return SequelizeDatabase.models.section.findAll({where: args});
        }
      }
    }
  }
});

// Schema
const GraphQLQuerySchema = new GraphQLSchema({
  query: RootQuery
});

export default GraphQLQuerySchema;