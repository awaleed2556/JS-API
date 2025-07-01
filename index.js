import express from "express";
import cors from "cors";
import indexRouter from "./routes/index.js";
import path, { dirname } from "path";                                            // directory for folder on any machine
import { fileURLToPath } from "url";
const app = express();
const PORT = process.env.PORT || 8080;

const __dirname = dirname(fileURLToPath(import.meta.url));                       // get the path for the folder

app.use(express.static(path.join(__dirname,'public')));
app.use(express.json());                                                        // convert the parameters to json when using post
app.use(cors());

app.use(cors({
  origin: "https://your-firebase-app.web.app", 
  methods: ["GET", "POST"],
  credentials: true
}));

app.get('/', (req,res) => res.sendFile(path.join(__dirname,'index.html')));      // at the root route / send the html file            
app.use('/api',indexRouter);                                                    // middleware

app.listen(PORT, () => console.log(`Server is listening on http://localhost:${PORT}`));

