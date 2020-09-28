import {
    GraphQLSchema,
    GraphQLObjectType,
} from "graphql";

import { addUser, signIn, deleteUser } from './mutation/userMutation'
import { addOrganization, updateOrganization, deleteOrganization } from './mutation/organizationMutation';
import { organization, organizations, userAll } from './query/organizationQuery';

// Root Query for Organization
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    description: 'This is the default root query provided by the backend',
    fields: {
        oneOrganization: organization(),
        allOrganization: organizations(),
        allUser: userAll(),
    },
});

// Root mutation for Organization
const RootMutation = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Default mutation provided by the backend APIs',
    fields: {
        addOrganization: addOrganization(),
        deleteOrganization: deleteOrganization(),
        updateOrganization: updateOrganization(),
        
        addUser: addUser(),
        signIn: signIn(),
        deleteUser: deleteUser(),
    },
});

export const schema = new GraphQLSchema({
    query: RootQuery,
    mutation: RootMutation,
});
