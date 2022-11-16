const { GraphQLObjectType } = require('graphql');
const gameQueries = require('../model/game/queries');

module.exports = new GraphQLObjectType({
  name: 'RootQueryType',
  fields: {
    games: gameQueries.games,
    game: gameQueries.game,
  },
});
