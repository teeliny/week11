
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
    products: { type: GraphQLList(GraphQLString) },
    employees: { type: GraphQLList(GraphQLString) },
  }),
});


