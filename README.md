# Setup

## Initialise Git, NPM, Babel transpiler, and install dependencies
```
git init
npm init
touch .babelrc
npm install --save babel-preset-node5
```

## Setup Sequelize instance in db.js, install Sequalize and drivers
```
touch db.js
npm install --save sequelize pg pg-hstore
```

## Define associations and syncronise and create tables using Faker library
```
npm install --save lodash faker
touch config/config.json
```

## Run app to create relational database
```
babel-node db.js
```

## Open PostgreSQL (PSQL) CLI database with master as username
```
psql graphql_sequelize master
```

## Show tables within PSQL and select all columns in each table
```
\d
select * from containers;
select * from sections;
```
Note: sections table has a containerId column due to association

## Create GraphQL Schema schema.js (layer on top of Sequelize Schema and relational database)

## Import Sequelize DB instance and Schema to overlay it with GraphQL Type System

## Install GraphQL tooling with `graphql` to use GraphQL Spec and then import into GraphQL server
```
npm install --save graphql
```

## Install React and React DOM dependencies for GraphiQL
```
npm install --save react react-dom
```

## Define Individual Types (i.e. for Container and Section tables) in schema.js
## Define Query Types
## Define Root Query (GraphQL checks to find shape of data to return) and whose fields function returns Public API Methods and Args that may be restricted 
## Create Schema instance where Query instance is an options property of it

## Create Express server to allow sending HTTP Requests (i.e. GET) to GraphQL endpoint
## Use 'express-graphql' as GraphQL Middleware so GraphQL endpoint spawns quickly
https://github.com/graphql/express-graphql
```
npm install --save express express-graphql graphiql
```

## Install dependencies of GraphiQL
```
npm install --save react react-dom
```

## Run instead with and go to [localhost:3000/graphql](localhost:3000/graphql):
```
babel-node server.js
```

## Click Docs to show able to search on id query parameter

## Run Independent Query on 'containers' field

## Create query and press Play button to return response
```
{
  containers {
    id
    data {
      field1
      field2
      field3
    }
  }
}
```

## Restart server

## Run Independent Query on 'sections' field and repeat
```
{
  sections {
    id
  }
}
```

## Run Combined (Bi-directional) Query fields (benefit of GraphQL is Batches Requests from frontend) not being limited to independent endpoints like in RESTful API that only serves static data structures
```
{
  containers {
    id
    data {
      field1
      field2
      field3
    }
    sections {
    	id
    }
  }
}

{
  sections {
    id
    container {
    	id
        data {
          field1
          field2
          field3
        }
    	sections {
    		id
        container {
    			id
        }
    	}
    }
  }
}
```

## Alternatively go to URL below, then click Prettify

http://localhost:3000/graphql?query={sections{id,container{id}}}

## Mutations instance added to GraphQL Schema to write to DB using HTTP POST

## Call Public API from command line tools
```
curl -X POST http://localhost:3000/graphql \
  -H "Content-Type: application/graphql" \
  -d '{ containers { id, sections { id } } }'
```

## Run Mutation query

## Specify return expectations
```
mutation addContainer {
	addContainer(id: "TestContainer") {
		id
	}
}
```

## Links and Fragments (grouping by Store)

* https://github.com/graphql/graphql-js/issues/19
* https://github.com/facebook/relay/issues/77
* https://github.com/graphql/express-graphql
* https://learngraphql.com/basics/introduction
* https://developer.github.com/early-access/graphql/object/query/