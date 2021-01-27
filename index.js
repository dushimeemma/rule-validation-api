import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.get('/', (req, res) => {
  res.status(200).json({
    message: 'My Rule-Validation API',
    status: 'success',
    data: {
      name: 'Dushime Emmanuel',
      github: '@dushimeemma',
      email: 'dushimeemmma@gmail.com',
      mobile: '+250789078834',
      twitter: '@emma_papy',
    },
  });
});

app.use((req, res) => {
  res.status(404).json({
    message: 'Not found',
    status: 'error',
    data: null,
  });
});

app.listen(port, () => console.log(`Server started on port ${port}`));

export default app;
