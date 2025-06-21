const express = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
const mongoose = require('mongoose');
const User = require('./models/user');
const TimeEntry = require('./models/TimeEntry');
const bcrypt = require('bcrypt');

const typeDefs = gql`
  type User {
    username: String!
    vorname: String
    nachname: String
  }

  type TimeEntry {
    id: ID!
    username: String!
    startTime: String!
    endTime: String!
  }

  type Query {
    login(username: String!, password: String!): User
    timeEntries(username: String!, date: String!): [TimeEntry]
  }

  type Mutation {
    addTimeEntry(username: String!, startTime: String!, endTime: String!): TimeEntry
  }
`;

const resolvers = {
  Query: {
    async login(_, { username, password }) {
      const user = await User.findOne({ username });
      if (!user) return null;
      const valid = await bcrypt.compare(password, user.password);
      if (!valid) return null;
      return user;
    },
    async timeEntries(_, { username, date }) {
      const start = new Date(date + "T00:00:00.000Z");
      const end = new Date(date + "T23:59:59.999Z");
      return await TimeEntry.find({
        username,
        startTime: { $gte: start, $lte: end }
      });
    }
  },
  Mutation: {
    async addTimeEntry(_, { username, startTime, endTime }) {
      // Konvertiere Strings zu Date-Objekten!
      const entry = new TimeEntry({
        username,
        startTime: new Date(startTime),
        endTime: new Date(endTime)
      });
      await entry.save();
      return entry;
    }
  }
};

async function startServer() {
  await mongoose.connect('mongodb://localhost:27017/timeTool');
  const app = express();
  const server = new ApolloServer({ typeDefs, resolvers });
  await server.start();
  server.applyMiddleware({ app });
  app.listen(3000, () => console.log('GraphQL server ready at http://localhost:3000/graphql'));
}

startServer();