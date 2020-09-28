import { Organization } from "../models/organizationSchema";
import { OrganizationType } from "../types/organizationType";

import Users from "../models/userSchema";
import { UserType } from "../types/userType";
import { userIdJoi } from "../interface/joiValidation";

import {
    GraphQLID,
    GraphQLList,
} from "graphql";

export function organization() {
    return {
        type: OrganizationType,
        args: { id: { type: GraphQLID } },
        async resolve(_parent, args, context) {
            if (!context.headers.authorization) throw new Error("Authentication failed");

            const { error } = userIdJoi(args);
            if (error) throw new Error(error.details[0].message);
            return await Organization.findOne({ _id: args.id });
        }
    }
}

export function organizations() {
    return {
        type: new GraphQLList(OrganizationType),
        async resolve(_parent, _args, context) {
            if (!context.headers.authorization) throw new Error("Authentication failed");
            return Organization.find();
        }
    }
}

export function userAll() {
    return {
        type: new GraphQLList(UserType),
        resolve(_parent, _args, context) {
            if (!context.headers.authorization) throw new Error("Authentication failed");
            const users = Users.find();
            return users
        }
    }
}

