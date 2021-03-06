import { observable, action, runInAction, makeObservable } from 'mobx';
import agent from '../api/agent';
import { RootStore } from './rootStore';
import { IOrderProductOptions } from '../common/sample/productOptions';
import { toast } from 'react-toastify';
import { IProduct } from '../models/product';
import moment from 'moment-timezone'
export default class OrderOptionsStore {
  _rootStore: RootStore;
  constructor(rootStore: RootStore) {
    makeObservable(this);
    this._rootStore = rootStore;
  }

  //List
  @observable loadingOptions = false;

  @observable productRegistry = new Map();

  @observable productOptionsRegistry = new Array<IOrderProductOptions>();

  //List
  @action loadOptions = async () => {
    this.loadingOptions = true;
    try {
      const productOption = await agent.Product.list(new URLSearchParams());
      const { products } = productOption;
      runInAction( () => {
        this.productOptionsRegistry = [];
        products.forEach((product: IProduct) => {
          let tempProduct: IOrderProductOptions = {
            key: product.id,
            value: product.id,
            text: product.name,
          };
          this.productRegistry.set(product.id, product);
          this.productOptionsRegistry.push(tempProduct);
        });
      });
    } catch (error) {
      console.log(error);
      toast.error('Problem loading product options');
    } finally {
      runInAction( () => {
        this.loadingOptions = false;
      });
    }
  };
}
//export default createContext(new ActivityStore());
