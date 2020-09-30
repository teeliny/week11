import Users from "../models/userSchema";
import { UserType } from "../types/userType";

import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID, 
} from "graphql";
import { encryptPassword, generateToken, decryptPassword } from "../utilities/encrypt";
import { userIdJoi, signUpJoi, logInJoi, organizationJoi, emailJoi } from "../interface/joiValidation";

export function addUser() {
    return {
        type: UserType,
        args: {
            first_name: { type: new GraphQLNonNull(GraphQLString) },
            last_name: { type: new GraphQLNonNull(GraphQLString) },
            email: { type: new GraphQLNonNull(GraphQLString) },
            user_name: { type: new GraphQLNonNull(GraphQLString) },
            user_password: { type: new GraphQLNonNull(GraphQLString) },
            
        },
        async resolve(_parent, args) {
            const { error } = signUpJoi(args);
            if (error) throw new Error(error.details[0].message);

            const findUser = await Users.find({ email: args.email });
            console.log(findUser);
            if (findUser.length > 0) {
                throw Error("email already exist.");
            }
            const password = args.user_password;
            args.user_password = encryptPassword(password);
            const user = new Users({
                first_name: args.first_name,
                last_name: args.last_name,
                email: args.email,
                user_name: args.user_name,
                user_password: args.user_password,
            });
            if (user) {
                const token = generateToken(user);
                return user.save();
            }
        },
    }
}

export function signIn() {
    return {
        type: UserType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString) },
            user_password: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(_parent, args, context) {
            const { error } = logInJoi(args);
            if (error) throw new Error(error.details[0].message);

            const findUser = await Users.findOne({ email: args.email })
            if (!findUser) {
                return "Invalid email."
            }
            const validPassword = await decryptPassword(
                args.user_password,
                findUser["user_password"]
            );

            if (!validPassword) return "Invalid password";
            const token = generateToken(findUser);
            findUser["token"] = token;
            context.token = token;
            return findUser;
        },
    }
}

export function deleteUser() {
    return {
        type: UserType,
        args: {
            email: { type: new GraphQLNonNull(GraphQLString) },
        },
        async resolve(_parent, args) {
            const { error } = emailJoi(args);
            if (error) throw new Error(error.details[0].message);

            const userEmail = args.email;
            if (!userEmail) return ('Provide a valid Email')
            const findUser = await Users.find({ email: args.email });
            if (!findUser[0]) throw Error("User not found");
            return await Users.findOneAndDelete({ email: args.email });
        },
    }
}
