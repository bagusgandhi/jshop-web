import { create } from 'zustand';

interface IAdjustmentTransactionStore {
  page: number,
  limit: number,
  deleteById: string | null,
  updateSelectedId: string | null,
  modalVisible: boolean,
  setModalVisible: (visible: boolean) => void
  setLimit: (limit: number) => void,
  setPage: (page: number) => void,
  setDeleteById: (deleteById: string | null) => void,
  setUpdateSelectedId: (updateSelectedId: string | null) => void,
  setPagination: (page: number, limit: number) => void

}

const useAdjustmentTransactionStore = create<IAdjustmentTransactionStore>((set, get) => ({
  page: 1,
  limit: 10,
  deleteById: null,
  updateSelectedId: null,
  modalVisible: false, 
  setModalVisible: (visible) => set({ modalVisible: visible }),
  setLimit: (limit) => set({ limit }),
  setPage: (page) => set({ page }),
  setDeleteById: (deleteById) => set({ deleteById }),
  setUpdateSelectedId: (updateSelectedId) => set({ updateSelectedId }),
  setPagination: (page, limit) => set({ page, limit }),

}));

export default useAdjustmentTransactionStore;
