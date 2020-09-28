import createError from 'http-errors';
import mongoose from "mongoose";
import express from 'express';
import cookieParser from 'cookie-parser';
import logger from 'morgan';
import { graphqlHTTP } from "express-graphql";
import { verifyToken } from "./src/utilities/authenticate";

import { schema } from "./src/index";

const app = express();

app.get("/", function (_req, res, _next) {
  res.send("Sending as expected");
});


app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use('/graphql', graphqlHTTP(async (req) => ({
  schema,
  context: await verifyToken(req),
  graphiql: true,
})))

mongoose
  .connect("mongodb+srv://teeliny:Taiwo@53@cluster0.o6b0k.mongodb.net/organizationDB", {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })

mongoose.connection.once('open', () => {
  console.log("Connected to MongoDB");
})

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

export default app;
