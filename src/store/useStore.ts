import { create } from "zustand";

const useStore = create((set) => ({
	orders: [],
	setOrders: (orders: []) => {
		set((state: any) => ({
			orders: orders,
		}));
	},
	particularOrder: {},
	setParticularOrder: (particularOrder: {}) => {
		set((state: any) => ({
			particularOrder: particularOrder,
		}));
	},
}));

export default useStore;
