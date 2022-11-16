const {
  GraphQLList,
  GraphQLID,
  GraphQLString,
  GraphQLFloat,
  GraphQLBoolean,
} = require('graphql');
const type = require('./type');
const GamesType = require('./games-type');
const { Op } = require('sequelize');
const Game = require('../../db/models/Game');

// Defines the queries
module.exports = {
  games: {
    type: new GraphQLList(type),
    args: {
      limit: {
        type: GraphQLFloat,
      },
      offset: {
        type: GraphQLFloat,
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
    },
    resolve: async (parent, args) => {
      const {
        limit,
        offset,
        location,
        grade,
        topics,
        classes,
        subjects,
        ekoskola_steps,
        timing,
        number_teachers,
        physical_activity,
      } = args;

      const where = {};
      if (grade && grade.length > 0) {
        where.grade = { [Op.overlap]: grade };
      }

      if (location && location.length > 0) {
        where.location = { [Op.overlap]: location };
      }

      if (topics && topics.length > 0) {
        where.topics = { [Op.overlap]: topics };
      }

      if (classes && classes.length > 0) {
        where.classes = { [Op.overlap]: classes };
      }

      if (subjects && subjects.length > 0) {
        where.subjects = { [Op.overlap]: subjects };
      }

      if (ekoskola_steps && ekoskola_steps.length > 0) {
        where.ekoskola_steps = { [Op.overlap]: ekoskola_steps };
      }

      if (timing && timing.length > 0) {
        where.timing = { [Op.contains]: timing };
      }
      if (number_teachers && number_teachers.length > 0) {
        where.number_teachers = { [Op.contains]: number_teachers };
      }
      if (physical_activity && physical_activity.length > 0) {
        where.physical_activity = { [Op.contains]: physical_activity };
      }
      return new Promise(async (resolve, reject) => {
        try {
          const count = await Game.count({ where });
          const response = await Game.findAll({ limit, offset, where });
          const games = response.map(game => {
            const fixedGame = game.dataValues;
            fixedGame.count = count;
            return fixedGame;
          });

          resolve(games);
        } catch (error) {
          reject(error.message);
        }
      });
    },
  },
  game: {
    type,
    args: {
      id: {
        type: GraphQLID,
      },
    },
    resolve: async (parent, args) => {
      const { id } = args;

      return new Promise(async (resolve, reject) => {
        const response = await Game.findOne({
          where: {
            id,
          },
        });
        const game = response.dataValues;
        resolve(game);
      });
    },
  },
};
