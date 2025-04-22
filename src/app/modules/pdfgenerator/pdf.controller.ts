import { Request, Response, NextFunction } from 'express';
import { generatePdfService } from './pdf.service';
import path from 'path';
import fs from 'fs';  


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
    const fileRelativePath = await generatePdfService();
    const absolutePath = path.join(__dirname, '../../', fileRelativePath); 

    console.log('Absolute path:', absolutePath);

    if (fs.existsSync(absolutePath)) {
      res.download(absolutePath, 'generated.pdf', (err) => {
        if (err) {
          console.error('File download failed:', err);
          res.status(500).send('Failed to download PDF');
        }
      });
    } else {
      console.error('File not found:', absolutePath);
      res.status(404).send('File not found');
    }

  } catch (error) {
    console.error('PDF generation failed:', error);
    res.status(500).send('Something went wrong');
  }
};


