const { GraphQLObjectType } = require('graphql');
const gameMutation = require('../model/game/mutations');

module.exports = new GraphQLObjectType({
  name: 'RootMutationsType',
  fields: {
    addGame: gameMutation.addGame,
  },
});
