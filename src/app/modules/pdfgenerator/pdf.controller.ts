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



// export const generatePdf = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const fileRelativePath = await generatePdfService();
//     const absolutePath = path.join(__dirname, '../../', fileRelativePath);

//     console.log('Absolute path:', absolutePath);

//     if (fs.existsSync(absolutePath)) {
//       res.download(absolutePath, 'generated.pdf', (err) => {
//         if (err) {
//           console.error('File download failed:', err);
//           res.status(500).send('Failed to download PDF');
//         } else {
//           fs.unlink(absolutePath, (unlinkErr) => {
//             if (unlinkErr) {
//               console.error('Failed to delete file after download:', unlinkErr);
//             } else {
//               console.log('PDF file deleted after download.');
//             }
//           });
//         }
//       });
//     } else {
//       console.error('File not found:', absolutePath);
//       res.status(404).send('File not found');
//     }

//   } catch (error) {
//     console.error('PDF generation failed:', error);
//     res.status(500).send('Something went wrong');
//   }
// };

// export const generatePdf = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const fileRelativePath = await generatePdfService();
//     const absolutePath = path.join(__dirname, '../../', fileRelativePath);

//     console.log('Absolute path:', absolutePath);

//     if (fs.existsSync(absolutePath)) {
//        res.download(absolutePath, 'generated.pdf', async (err) => {
//         if (err) {
//           console.error('File download failed:', err);
//           res.status(500).send('Failed to download PDF');
//         } else {
//           setTimeout(async () => {
//             try {
//               await fs.promises.unlink(absolutePath);
//               console.log('PDF file deleted after download.');
//             } catch (unlinkError) {
//               console.error('Failed to delete file after download:', unlinkError);
//               res.status(500).send('Failed to delete file');
//             }
//           },1000); 
//         }
//       });
//     } else {
//       console.error('File not found:', absolutePath);
//       res.status(404).send('File not found');
//     }

//   } catch (error) {
//     console.error('PDF generation failed:', error);
//     res.status(500).send('Something went wrong');
//   }
// };

export const generatePdf = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const fileRelativePath = await generatePdfService(); // Generates the file
    const absolutePath = path.join(__dirname, '../../', fileRelativePath); // Absolute path to the file

    console.log('Absolute path:', absolutePath);

    if (fs.existsSync(absolutePath)) {
      // Send the file to the client
      const fileStream = fs.createReadStream(absolutePath);

      res.setHeader('Content-Type', 'application/pdf');
      res.setHeader('Content-Disposition', 'attachment; filename=generated.pdf');

      fileStream.pipe(res); // Stream the file

      // After the download is complete, delete the file
      res.on('finish', async () => {
        try {
          await fs.promises.unlink(absolutePath); // Delete the file after it is downloaded
          console.log('PDF file deleted after download.');
        } catch (unlinkError) {
          console.error('Failed to delete file after download:', unlinkError);
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


