import fs from 'fs';
import path from 'path';
import pdf from 'pdf-creator-node';
import data from '../../../helpars/data';
import options from '../../../helpars/options';


export const generatePdfService = async (): Promise<string> => {
  const html = fs.readFileSync(path.join(__dirname, './template.html'), 'utf-8');
  const filename = `${Math.random()}_doc.pdf`;
  const filePath = path.join(__dirname, '../../docs', filename);

  const prodlist = data.map(d => ({
    name: d.name,
    description: d.description,
    unit: d.unit,
    quantity: d.quantity,
    price: d.price,
    total: d.quantity * d.price,
    imgurl: d.imgurl
  }));

  const subtotal = prodlist.reduce((acc, item) => acc + item.total, 0);
  const tax = (subtotal * 20) / 100;
  const gtotal = subtotal - tax;

  const document = {
    html,
    data: {
      products: {
        prodlist,
        subtotal,
        tax,
        gtotal
      }
    },
    path: filePath
  };

  await pdf.create(document, options);
  return `/docs/${filename}`; 
  
};
