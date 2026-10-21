const STORAGE_KEY = 'async_react_items_v1';

const INITIAL_DATA = [
  { id: '1', name: 'RTX 4070 Ti', category: 'GPU', price: 799, stock: 5, status: 'Available', manufacturer: 'NVIDIA', lastUpdated: '2026-10-01' },
  { id: '2', name: 'Ryzen 7 7800X3D', category: 'CPU', price: 389, stock: 12, status: 'Available', manufacturer: 'AMD', lastUpdated: '2026-10-05' },
  { id: '3', name: 'DDR5 32GB Kit', category: 'RAM', price: 115, stock: 0, status: 'Discontinued', manufacturer: 'Corsair', lastUpdated: '2026-09-20' },
];

export const fakeApi = {
  getInitialItems: () => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(INITIAL_DATA));
      return INITIAL_DATA;
    }
    return JSON.parse(data);
  },

  fetchList: () => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.1) {
          reject(new Error('Network Error: Failed to fetch item list.'));
          return;
        }
        resolve(fakeApi.getInitialItems());
      }, 600);
    });
  },

  fetchDetails: (id) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (Math.random() < 0.05) {
          reject(new Error(`Failed to load details for item ${id}.`));
          return;
        }
        const items = fakeApi.getInitialItems();
        const item = items.find((i) => i.id === id);
        if (!item) {
          reject(new Error('Item not found.'));
          return;
        }
        resolve({
          ...item,
          warranty: '2 Years Manufacturer',
          warehouseLocation: 'Zone B-4',
          weightKg: 0.85,
          rating: 4.8,
        });
      }, 500);
    });
  },

  createItem: (newItem) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = fakeApi.getInitialItems();
        const created = { ...newItem, id: Date.now().toString(), lastUpdated: new Date().toISOString().split('T')[0] };
        const updated = [created, ...items];
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve(updated);
      }, 400);
    });
  },

  updateItem: (id, updatedFields) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = fakeApi.getInitialItems();
        const updated = items.map((i) => (i.id === id ? { ...i, ...updatedFields, lastUpdated: new Date().toISOString().split('T')[0] } : i));
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve(updated);
      }, 400);
    });
  },

  deleteItem: (id) => {
    return new Promise((resolve) => {
      setTimeout(() => {
        const items = fakeApi.getInitialItems();
        const updated = items.filter((i) => i.id !== id);
        localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
        resolve(updated);
      }, 400);
    });
  },
};