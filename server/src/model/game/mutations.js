const {
  GraphQLNonNull,
  GraphQLString,
  GraphQLList,
  GraphQLID,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');
const type = require('./type');

// Defines the mutations
module.exports = {
  addGame: {
    type,
    args: {
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
      location: {
        type: new GraphQLList(GraphQLString),
      },
      grade: {
        type: new GraphQLList(GraphQLString),
      },
      topics: {
        type: new GraphQLList(GraphQLString),
      },
      classes: {
        type: new GraphQLList(GraphQLString),
      },
    },
    resolve: async (parent, args) => {
      // const { name, description, location, grade, topics, classes } = args;
      // return new Promise(async (resolve, reject) => {
      //   const game = {
      //     name,
      //     description,
      //     location,
      //     grade,
      //     topics,
      //     classes,
      //     file_id: uuidv1() + '.pdf',
      //   };
      //   try {
      //     const res = await Game.create(game);
      //     resolve(res);
      //   } catch (error) {
      //     reject(error.message);
      //   }
      // });
    },
  },
  updateGame: {
    type,
    args: {
      id: { type: GraphQLID },
      name: { type: new GraphQLNonNull(GraphQLString) },
      description: { type: new GraphQLNonNull(GraphQLString) },
    },
    resolve: async () => {
      return new Promise((resolve, reject) => {
        // TODO
      });
    },
  },
};
