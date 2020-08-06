import { GraphQLObjectType } from 'graphql';
import artistMutation from './artistMutation';
import errorMutation from './errorMutation';
import genreMutation from './genreMutation';
import userMutation from './userMutation';
import userRoleMutation from './userRoleMutation';

export default new GraphQLObjectType({
  name: 'Mutation',
  fields: {
    ...artistMutation,
    ...errorMutation,
    ...genreMutation,
    ...userMutation,
    ...userRoleMutation,
  },
});
