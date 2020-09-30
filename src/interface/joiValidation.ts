import Joi from "joi";
import { idType, SignInType, SignUpType, BodyType } from "./interface"

function signUpJoi(input: SignUpType) {
  const querySignUp = {
    first_name: Joi.string().min(3).required(),
    last_name: Joi.string().min(3).required(),
    email: Joi.string().email().required(),
    user_name: Joi.string().min(3).required(),
    user_password: Joi.string().min(5).required(),
  };
  return Joi.validate(input, querySignUp);
}

function logInJoi(input: SignInType) {
  const queryLogIn = {
    email: Joi.string().email(),
    user_password: Joi.string().min(3).required(),
  };
  return Joi.validate(input, queryLogIn);
}

function companyJoi(input: BodyType) {
  const queryCompany = {
    organization: Joi.string().min(3).required(),
    market_value: Joi.string().max(50).required(),
    address: Joi.string().min(3).required(),
    ceo: Joi.string().min(3).required(),
    country: Joi.string().min(3).required(),
    products: Joi.array().items(Joi.string().min(3)),
    employees: Joi.array().items(Joi.string().min(3)),
  };
  return Joi.validate(input, queryCompany);
}

function userIdJoi(input: string) {
  const queryId = {
    id: Joi.string().min(3).required(),
  };
  return Joi.validate(input, queryId);
}

function organizationJoi(input: string) {
  const queryName = {
    organization: Joi.string().min(3).required(),
  };
  return Joi.validate(input, queryName);
}

function emailJoi(input: string) {
  const queryEmail = {
    email: Joi.string().email().required(),
  };
  return Joi.validate(input, queryEmail);
}

export { signUpJoi, logInJoi, companyJoi, userIdJoi, organizationJoi, emailJoi };
