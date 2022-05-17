import express from 'express';
import cors from 'cors';
import 'express-async-errors';
import { handleError, ValidationError } from './utils/error';
import { rateLimit } from 'express-rate-limit';

const app = express();

app.use(
  cors({
    origin: 'http://localhost:3000',
  })
);
app.use(express.json());
app.use(
  rateLimit({
    windowMs: 5 * 60 * 1000,
    max: 100,
  })
);

// app.get('/', async (req, res) => {
//   throw new ValidationError('Error jus came in');
// });

app.use(handleError);

app.listen(3001, '0.0.0.0', () => {
  console.log(`listening on port: http://localhost:3001`);
});
