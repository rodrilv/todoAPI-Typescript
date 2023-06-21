import express, {json, urlencoded} from 'express';
import { DbConnection } from './config'
import * as config from './config/config'
import {AuthRouter, TodoRouter} from './routes';

config;

const app = express();
app.disable("X-Powered-By");
app.use(json());
app.use(urlencoded({ extended: false }));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization, token, x-access-token"
  );
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  next();
});

app.use('/api/auth', AuthRouter);
app.use('/api/', TodoRouter)


app.listen(process.env.PORT, () => {
  console.log("Listening on Port:", process.env.PORT);
  DbConnection();
});
