import { Organization } from "../models/organizationSchema";
import { OrganizationType } from "../types/organizationType";
import { organizationJoi, companyJoi } from "../interface/joiValidation";

import {
    GraphQLString,
    GraphQLList,
    GraphQLNonNull
}  from "graphql";

export function addOrganization() {
    return {
        type: OrganizationType,
        args: {
            organization: { type: new GraphQLNonNull(GraphQLString) },
            market_value: { type: new GraphQLNonNull(GraphQLString) },
            address: { type: new GraphQLNonNull(GraphQLString) },
            ceo: { type: new GraphQLNonNull(GraphQLString) },
            country: { type: new GraphQLNonNull(GraphQLString) },
            products: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
            employees: { type: new GraphQLNonNull(GraphQLList(GraphQLString)) },
            
        },
        resolve(_parent, args, context) {
            if (!context.headers.authorization) throw new Error("Authentication failed");

            const { error } = companyJoi(args);
            if (error) throw new Error(error.details[0].message);

            const organization = new Organization({
                organization: args.organization,
                market_value: args.market_value,
                address: args.address,
                ceo: args.ceo,
                country: args.country,
                products: args.products,
                employees: args.employees,
                no_of_employees: args.employees.length,
            });
            return organization.save();
        },
    }
}

export function deleteOrganization() {
    return {
        type: OrganizationType,
        args: {
            organization: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(_parent, args, context) {
            if (!context.headers.authorization) throw new Error("Authentication failed");

            const { error } = organizationJoi(args);
            if (error) throw new Error(error.details[0].message);

            const findOrganization = await Organization.findOne({ organization: args.organization });
            if (!findOrganization) throw Error("organization does not exist");
            return await Organization.findOneAndDelete({ organization: args.organization })
        },
    }
}

export function updateOrganization() {
    return {
        type: OrganizationType,
        args: {
            organization: { type: GraphQLString },
            market_value: { type: GraphQLString },
            address: { type: GraphQLString },
            ceo: { type: GraphQLString },
            country: { type: GraphQLString },
            products: { type: GraphQLList(GraphQLString) },
            employees: { type: GraphQLList(GraphQLString) },
        },
        async resolve(_parent, args, context) {
            if (!context.headers.authorization) throw new Error("Authentication failed");

            const findOrganization = await Organization.findOne({ organization: args.organization });
            if (findOrganization === null) return "Wrong or no organization name";

            const organizationId = findOrganization.id;
            return await Organization.findByIdAndUpdate(organizationId, {
                $set: {
                    organization: args.organization || findOrganization['organization'],
                    market_value: args.market_value || findOrganization['market_value'],
                    address: args.address || findOrganization['address'],
                    ceo: args.ceo || findOrganization['ceo'],
                    country: args.country || findOrganization['country'],
                    products: args.products || findOrganization['products'],
                    employees: args.employees || findOrganization['employees'],
                    no_of_employees: args.employees.length || findOrganization['no_of_employees'],
                    updated_at: Date.now()
                }
            }, {new: true})
        },
    }
}

