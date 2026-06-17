import Express from 'express';
import cors from 'cors'; 
import dotenv from 'dotenv';

dotenv.config();

const app = Express();

const PORT = process.env.PORT || 4000

app.use(cors());
app.use(Express.json());

app.listen(PORT, () => {console.log("Server runnning on port 4000")})