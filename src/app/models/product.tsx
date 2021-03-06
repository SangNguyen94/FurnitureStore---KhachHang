export interface IProductEnvelope {
  products: IProduct[];
  resultCount: string;
}

export interface IProduct {
  id: string;
  name: string;
  category: string;
  brand: string;
  description:string;
  price: number;
  importPrice: number;
  stock: number;
  dateAdded: Date;
  photos: IPhoto[];
  image: string;
}

export interface IProductFormValues extends Partial<IProduct> {}

export class ProductFormValues implements IProductFormValues {
  id?: string = undefined;
  name: string = '';
  category: string = '';
  brand: string = '';
  description:string='';
  price: number = 0;
  importPrice: number = 0;
  stock: number = 0;
  dateAdded?: Date = undefined;

  constructor(init?: IProductFormValues) {
    if (init && init.dateAdded) {
      // Do NOT FUCKING CHANGE OBJECT OUTSIDE MOBX
      //init.time=init.date
      this.dateAdded = init.dateAdded;
    }
    Object.assign(this, init);
  }
}

export interface IPhoto {
  id: string;
  url: string;
  main: boolean;
}
