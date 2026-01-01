import { productRepository } from '../repositories/product.repository';

interface CreateProductDTO {
  title: string;
  price: number;
  salePercentage: number | null;
  purchaseCount: number;
  onSpotlight: boolean;
  stars: number;
  type: 'PHYSICAL' | 'DIGITAL';
  category: 'GAME' | 'ASSET' | 'COURSE' | 'AUDIO' | 'TEMPLATE' | 'SOFTWARE' | 'E-BOOK' | 'VIDEO';
  creatorId: string;
}

export const productService = {
  async create(productData: CreateProductDTO) {

    const existingProduct = await productRepository.getByTitleCreatorId(productData.title, productData.creatorId);
    if (existingProduct) {
      throw new Error('Product with this name already exists.');
    }

    const newProduct = await productRepository.create(productData);

    return newProduct;
  },

  async get() {
    const products = await productRepository.get();
    return products;
  },
  
  async getById(id:string) {
    const product = await productRepository.getById(id);
    return product
  }
};