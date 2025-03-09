import { Product as IProduct } from '@/types/product';
import { create } from 'zustand';

interface IProductStore {
  products: IProduct[],
  nextCursor: string | null | undefined,
  hasMore: boolean,
  limit: number,
  isLoading: boolean,
  isFetching: boolean,
  deleteById: string | null,
  updateSelected: IProduct | null,
  modalVisible: boolean,
  search: string | null | undefined,
  setSearch: (search: string | null | undefined) => void,
  setModalVisible: (visible: boolean) => void,
  setUpdateSelected: (data: IProduct | null) => void,
  setDeleteById: (id: string | null) => void,
  setFetching: (isFetching: boolean) => void,
  setNextCursor: (nextCursor: string | null | undefined) => void,
  setHasMore: (hasMore: boolean) => void,
  addProducts: (products: IProduct[]) => void,
  addNewProducts: (products: IProduct[]) => void,
  updateProduct: (product: IProduct) => void,
  deleteProduct: (id: string) => void,
  clearProducts: () => void
}

const useProductStore = create<IProductStore>((set, get) => ({
  products: [],
  nextCursor: null,
  hasMore: true,
  limit: 8,
  isLoading: false,
  isFetching: false,
  deleteById: null,
  updateSelected: null,
  modalVisible: false,
  search: undefined,
  setSearch: (search) => set({ search }),
  setModalVisible: (visible: boolean) => set({ modalVisible: visible }),
  setUpdateSelected: (data: IProduct | null) => set({ updateSelected: data }),
  setDeleteById: (id) => set({ deleteById: id }),
  setFetching: (isFetching) => set({ isFetching }),
  setNextCursor: (nextCursor) => {
    set({ nextCursor });
  },
  setHasMore: (hasMore: boolean) => {
    set({ hasMore });
  },
  addProducts: (payload: IProduct[]) => {
    set((state) => ({ products: [...state.products, ...payload] }));
  },
  addNewProducts: (payload: IProduct[]) => {
    set((state) => ({ products: [...payload, ...state.products] }));
  },
  updateProduct: (updatedProduct) => {
    set((state) => ({
      products: state.products.map((product) =>
        product.id === updatedProduct.id ? updatedProduct : product
      ),
    }));
  },
  deleteProduct: (productId) => {
    set((state) => ({
      products: state.products.filter((product) => product.id !== productId),
    }));
  },
  clearProducts: () => set({ products: [] }),
  setProducts: (products: IProduct[]) => set({ products }),
}));

export default useProductStore;
