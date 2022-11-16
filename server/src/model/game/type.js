const {
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLObjectType,
  GraphQLNonNull,
  GraphQLList,
  GraphQLBoolean,
} = require('graphql');

// Defines the type
module.exports = new GraphQLObjectType({
  name: 'Game',
  description: 'A game',
  fields: {
    id: {
      type: new GraphQLNonNull(GraphQLID),
    },
    name: {
      type: new GraphQLNonNull(GraphQLString),
    },
    description: {
      type: new GraphQLNonNull(GraphQLString),
    },
    objetive_1: {
      type: new GraphQLNonNull(GraphQLString),
    },
    objetive_2: {
      type: GraphQLString,
    },
    objetive_3: {
      type: GraphQLString,
    },
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
    subjects: {
      type: new GraphQLList(GraphQLString),
    },
    ekoskola_steps: {
      type: new GraphQLList(GraphQLString),
    },
    timing: {
      type: new GraphQLList(GraphQLString),
    },
    number_teachers: {
      type: new GraphQLList(GraphQLString),
    },
    physical_activity: {
      type: new GraphQLList(GraphQLString),
    },
    file_id: {
      type: new GraphQLNonNull(GraphQLString),
    },
    count: {
      type: GraphQLFloat,
    },
  },
});
