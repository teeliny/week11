import mongoose from 'mongoose'


import {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
} from "graphql";

export const UserType = new GraphQLObjectType({
  name: "User",
  fields: () => ({
    id: { type: GraphQLID },
    first_name: { type: GraphQLString },
    last_name: { type: GraphQLString },
    email: { type: GraphQLString },
    user_name: { type: GraphQLString },
    user_password: { type: GraphQLString },
    token: { type: GraphQLString }
  }),
});

