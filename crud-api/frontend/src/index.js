require('reflect-metadata');
const { PrismaClient } = require('@prisma/client');
const { ApolloServer } = require('apollo-server');
const { resolvers } = require("@generated/type-graphql");
const tq = require('type-graphql');

const prisma = new PrismaClient();

const app = async () => {
  try {
    const schema = await tq.buildSchema({ resolvers });

    const context = () => {
      return {
        prisma
      };
    };

    const server = new ApolloServer({ schema, context });

    server.listen({ port: 4000 }).then(({ url }) => {
      console.log(`🚀 Server ready at: ${url}`);
    });
  } catch (error) {
    console.error('Error starting the server:', error);
  }
};

app();