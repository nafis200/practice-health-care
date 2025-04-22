import { Request, Response, NextFunction } from 'express';
import { generatePdfService } from './pdf.service';


export const homeView = (req: Request, res: Response, next: NextFunction) => {
  res.render('home');
};

export const generatePdf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const filepath = await generatePdfService();
    const fullUrl = `${req.protocol}://${req.get('host')}${filepath}`;

    res.send({
      message: 'PDF generated successfully',
      downloadUrl: fullUrl
    });
    
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).send('Something went wrong');
  }
};
