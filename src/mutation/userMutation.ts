import Users from "../models/userSchema";
import { UserType } from "../types/userType";

import {
    GraphQLString,
    GraphQLNonNull,
    GraphQLID, 
} from "graphql";
import { encryptPassword, generateToken, decryptPassword } from "../utilities/encrypt";
import { userIdJoi, signUpJoi, logInJoi } from "../interface/joiValidation";

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

            const findUser = await Users.find({ email: args.email })
            if (findUser.length > 0) {
                return "email already exist."
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
            id: { type: new GraphQLNonNull(GraphQLID) },
        },
        async resolve(_parent, args) {
            const { error } = userIdJoi(args);
            if (error) throw new Error(error.details[0].message);

            const id = args.id;
            if (!id) return ('Provide a valid Id')
            const findUser = Users.find({ _id: args.id })
            if (!findUser[0]) throw Error("User not found");
            await Users.findByIdAndDelete(id);
        },
    }
}
