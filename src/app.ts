import express, { Application,NextFunction, Request, Response  } from 'express'
const app:Application = express()
import cors from 'cors';
import httpStatus from 'http-status';
import cookieParser from 'cookie-parser';
import globalErrorHandler from './app/middlewares/globalErrorHandler';
import router from './app/routes';
import path from 'path';
const port = 3000

app.use(cors());
app.use(cookieParser());

//parser
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, './views'));
// Static file serve route (PDF, etc.)
app.use('/docs', express.static(path.join(__dirname, 'app/docs')));


app.get('/', (req: Request, res: Response) => {
    res.send({
        Message: "Ph health care server.."
    })
});

app.use('/api/v1',router)

// app.use(globalErrorHandler)



app.use((req: Request, res: Response, next: NextFunction) => {
    res.status(httpStatus.NOT_FOUND).json({
        success: false,
        message: "API NOT FOUND!",
        error: {
            path: req.originalUrl,
            message: "Your requested path is not found!"
        }
    })
})

export default app