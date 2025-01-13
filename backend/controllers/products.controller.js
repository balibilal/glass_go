
import path from 'path';
import { Product } from '../model/jobs.model.js';
import fs from 'fs';
const __dirname = path.resolve();

export const addProducts = async (req, res, next) => {
  const newProduct = req.body;
  try {

    const encoded = newProduct.image;
    const base64ToArray = encoded.split(";base64,");
    const prefix = base64ToArray[0];
    const extension = prefix.replace(/^data:image\//, '');

    if (['jpeg', 'png', 'jpg'].includes(extension)) {
      const imageData = base64ToArray[1];
      const filename = (new Date().getTime() / 1000 | 0) + '.' + extension;
      const imagepath = path.join(__dirname, './uploads/') + filename;
      const filepath = path.resolve(imagepath);

      fs.writeFileSync(filepath, imageData, { encoding: 'base64' });

        newProduct.image = '/uploads/' + filename;
        
        await Product.create(newProduct);

        return res.status(201).json({ message: 'Product created successfully' });



    }
    else {
      return next(new Error('Invalid Image type'));
    }

  } catch (error) {
    console.error('Error creating product:', err);
    return next(new Error('Failed to create product'));

  }

};


export const getProducts = async (req, res) => {
  const products = await Product.find();
  res.json(products)
}



export const updateProd = async (request, response) => {
  try {
    const { id } = request.params;
    const { status } = request.body;

    if (!status) {
      return response.status(400).json({ error: "Status is required." });
    }

    const updatedProd = await Product.findByIdAndUpdate(
      id,
      { status }, // Update only the status field
      { new: true } // Return the updated document
    );

    if (!updatedProd) {
      return response.status(404).json({ error: "Product not found." });
    }

    response.json({ message: "Status updated successfully.", data: updatedProd });
  } catch (error) {
    console.error("Error updating status:", error);
    response.status(500).json({ error: "Internal server error." });
  }
};



export const patchRiders = async (request, response) => {
  try {
    const { id } = request.params;
    const { riders } = request.body;

    if (!riders) {
      return response.status(400).json({ error: "Status is required." });
    }

    const patchRiders = await Product.findByIdAndUpdate(
      id,
      { riders }, // Update only the status field
      { new: true } // Return the updated document
    );

    if (!patchRiders) {
      return response.status(404).json({ error: "Product not found." });
    }

    response.json({ message: "Riders updated successfully.", data: patchRiders });
  } catch (error) {
    console.error("Error updating status:", error);
    response.status(500).json({ error: "Internal server error." });
  }
};
