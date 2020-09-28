
// import { companyJoi } from "../interface/joiValidation";

import  {
  GraphQLObjectType,
  GraphQLString,
  GraphQLID,
  GraphQLList,
  GraphQLInt,
} from "graphql";


export const OrganizationType = new GraphQLObjectType({
  name: "Company",
  fields: () => ({
    id: { type: GraphQLID },
    organization: { type: GraphQLString },
    created_at: { type: GraphQLString },
    updated_at: { type: GraphQLString },
    market_value: { type: GraphQLString },
    address: { type: GraphQLString },
    ceo: { type: GraphQLString },
    country: { type: GraphQLString },
    no_of_employees: { type: GraphQLInt },
    product: { type: GraphQLList(GraphQLString) },
    employee: { type: GraphQLList(GraphQLString) },
  }),
});

// const RootQuery = new GraphQLObjectType({
//   name: 'RootQueryType',
//   fields: {
//     organization: {
//       type: OrganizationType,
//       args: { id: { type: GraphQLID } },
//       resolve(parent, args) {
//         return Organization.findById(args.id);
//       }
//     },
//     organizations: {
//       type: new GraphQLList(OrganizationType),
//       resolve(parent, args) {
//         return Organization.find();
//       }
//     },
//   }
// });


// Mutation
// const Mutation = new GraphQLObjectType({
//   name: "Mutation",
//   fields: {
//     addOrganization: {
//       type: OrganizationType,
//       args: {
//         name: { type: new GraphQLNonNull(GraphQLString) },
//         genre: { type: new GraphQLNonNull(GraphQLString) },
//         authorId: { type: new GraphQLNonNull(GraphQLID) },
//       },
//       resolve(parent, args) {
//         let organization = new Organization({
//           organization: args.organization,
//           market_value: args.market_value,
//           address: args.address,
//           ceo: args.ceo,
//           country: args.country,
//           no_of_employees: args.no_of_employees.length,
//           product: args.products,
//           employee: args.employees,
//         });
//         return organization.save();
//       },
//     },
//   },
// });

// module.exports = new GraphQLSchema({
//   query: RootQuery,
//   mutation: Mutation
// });

