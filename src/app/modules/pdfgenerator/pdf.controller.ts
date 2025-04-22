import { Request, Response, NextFunction } from 'express';
import { generatePdfService } from './pdf.service';
import path from 'path';


// export const homeView = (req: Request, res: Response, next: NextFunction) => {
//   res.render('home');
// };

// export const generatePdf = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const filepath = await generatePdfService();
//     const fullUrl = `${req.protocol}://${req.get('host')}${filepath}`;

//     res.send({
//       message: 'PDF generated successfully',
//       downloadUrl: fullUrl
//     });
    
//   } catch (error) {
//     console.error('PDF generation failed:', error);
//     res.status(500).send('Something went wrong');
//   }
// };

export const generatePdf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileRelativePath = await generatePdfService(); // e.g. /docs/xyz.pdf
    const absolutePath = path.join(__dirname, '../../', fileRelativePath); // Full server path

    
    res.download(absolutePath, 'generated.pdf', (err) => {
      if (err) {
        console.error('File download failed:', err);
        res.status(500).send('Failed to download PDF');
      }
    });
  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).send('Something went wrong');
  }
};

