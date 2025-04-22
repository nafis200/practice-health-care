import express from 'express';
import { generatePdf } from './pdf.controller';


const router = express.Router();

// router.get('/', homeView);
router.get('/download', generatePdf);

export const pdfRoute = router;
