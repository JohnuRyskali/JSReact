import React, { useState, useEffect } from 'react';
import { fakeApi } from './fakeApi';

export default function App() {
  const [items, setItems] = useState([]);
  const [listLoading, setListLoading] = useState(true);
  const [listError, setListError] = useState(null);
  const [reloadTrigger, setReloadTrigger] = useState(0);

  const [selectedId, setSelectedId] = useState(null);
  const [details, setDetails] = useState(null);
  const [detailsLoading, setDetailsLoading] = useState(false);
  const [detailsError, setDetailsError] = useState(null);

  const [formName, setFormName] = useState('');
  const [formCategory, setFormCategory] = useState('GPU');
  const [formPrice, setFormPrice] = useState('');
  const [formStock, setFormStock] = useState('');
  const [editingId, setEditingId] = useState(null);

  useEffect(() => {
    let isMounted = true;
    setListLoading(true);
    setListError(null);

    fakeApi.fetchList()
      .then((data) => {
        if (isMounted) {
          setItems(data);
          setListLoading(false);
        }
      })
      .catch((err) => {
        if (isMounted) {
          setListError(err.message);
          setListLoading(false);
        }
      });

    return () => {
      isMounted = false;
    };
  }, [reloadTrigger]);

  useEffect(() => {
    if (!selectedId) {
      setDetails(null);
      return;
    }

    let active = true;
    setDetailsLoading(true);
    setDetailsError(null);

    fakeApi.fetchDetails(selectedId)
      .then((data) => {
        if (active) {
          setDetails(data);
          setDetailsLoading(false);
        }
      })
      .catch((err) => {
        if (active) {
          setDetailsError(err.message);
          setDetailsLoading(false);
        }
      });

    return () => {
      active = false;
    };
  }, [selectedId]);

  const handleSaveItem = (e) => {
    e.preventDefault();
    if (!formName || !formPrice) return;

    if (editingId) {
      fakeApi.updateItem(editingId, {
        name: formName,
        category: formCategory,
        price: Number(formPrice),
        stock: Number(formStock) || 0,
      }).then((updatedList) => {
        setItems(updatedList);
        setEditingId(null);
        resetForm();
        if (selectedId === editingId) {
          setSelectedId(null);
          setTimeout(() => setSelectedId(editingId), 10);
        }
      });
    } else {
      fakeApi.createItem({
        name: formName,
        category: formCategory,
        price: Number(formPrice),
        stock: Number(formStock) || 0,
        status: 'Available',
        manufacturer: 'Generic',
      }).then((updatedList) => {
        setItems(updatedList);
        resetForm();
      });
    }
  };

  const handleEditClick = (item) => {
    setEditingId(item.id);
    setFormName(item.name);
    setFormCategory(item.category);
    setFormPrice(item.price);
    setFormStock(item.stock);
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    fakeApi.deleteItem(id).then((updatedList) => {
      setItems(updatedList);
      if (selectedId === id) {
        setSelectedId(null);
      }
    });
  };

  const handleToggleStatus = () => {
    if (!selectedId || !details) return;
    const currentId = selectedId;
    const newStatus = details.status === 'Available' ? 'Reserved' : 'Available';

    fakeApi.updateItem(currentId, { status: newStatus }).then((updatedList) => {
      setItems(updatedList);
      if (selectedId === currentId) {
        setDetails((prev) => (prev ? { ...prev, status: newStatus } : prev));
      }
    });
  };

  const resetForm = () => {
    setFormName('');
    setFormCategory('GPU');
    setFormPrice('');
    setFormStock('');
    setEditingId(null);
  };

  return (
    <div style={{ padding: '30px', fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif', maxWidth: '1050px', margin: '0 auto', color: '#e2e8f0', background: '#121824', minHeight: '100vh', borderRadius: '12px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '20px', fontWeight: '600', letterSpacing: '-0.5px' }}>Hardware Inventory Management System</h2>

      <div style={{ textAlign: 'center', marginBottom: '25px' }}>
        <button 
          onClick={() => setReloadTrigger((prev) => prev + 1)}
          style={{ background: '#2563eb', color: '#fff', border: 'none', padding: '10px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.2)' }}
        >
          🔄 Reload List
        </button>
      </div>

      <form onSubmit={handleSaveItem} style={{ background: '#1e293b', padding: '20px', borderRadius: '10px', marginBottom: '30px', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', border: '1px solid #334155' }}>
        <h3 style={{ marginTop: 0, marginBottom: '15px', fontSize: '1.1rem', color: '#94a3b8', textAlign: 'center' }}>{editingId ? 'Edit Item' : 'Add New Item'}</h3>
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
          <input placeholder="Name" value={formName} onChange={(e) => setFormName(e.target.value)} required style={inputStyle} />
          <select value={formCategory} onChange={(e) => setFormCategory(e.target.value)} style={inputStyle}>
            <option value="GPU">GPU</option>
            <option value="CPU">CPU</option>
            <option value="RAM">RAM</option>
          </select>
          <input type="number" placeholder="Price ($)" value={formPrice} onChange={(e) => setFormPrice(e.target.value)} required style={inputStyle} />
          <input type="number" placeholder="Stock" value={formStock} onChange={(e) => setFormStock(e.target.value)} style={inputStyle} />
          <button type="submit" style={primaryBtnStyle}>{editingId ? 'Update' : 'Create'}</button>
          {editingId && <button type="button" onClick={resetForm} style={secondaryBtnStyle}>Cancel</button>}
        </div>
      </form>

      <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
        <div style={{ flex: 1, minWidth: '300px' }}>
          <h3 style={{ borderBottom: '2px solid #334155', paddingBottom: '8px', marginBottom: '15px' }}>Items List</h3>
          {listLoading && <p style={{ color: '#94a3b8' }}>Loading items...</p>}
          {listError && <p style={{ color: '#f87171' }}>Error: {listError}</p>}
          {!listLoading && !listError && items.length === 0 && <p style={{ color: '#94a3b8' }}>No items found.</p>}

          <ul style={{ listStyle: 'none', padding: 0, margin: 0 }}>
            {items.map((item) => (
              <li
                key={item.id}
                onClick={() => setSelectedId(item.id)}
                style={{
                  padding: '14px',
                  margin: '10px 0',
                  background: selectedId === item.id ? '#283548' : '#1e293b',
                  border: selectedId === item.id ? '1px solid #3b82f6' : '1px solid #334155',
                  borderRadius: '8px',
                  cursor: 'pointer',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)',
                  transition: 'all 0.2s ease',
                }}
              >
                <div>
                  <strong style={{ fontSize: '1rem', color: '#f8fafc' }}>{item.name}</strong> 
                  <span style={{ color: '#94a3b8' }}> (${item.price})</span><br />
                  <em style={{ fontSize: '0.85rem', color: item.status === 'Available' ? '#4ade80' : item.status === 'Reserved' ? '#facc15' : '#f87171', fontStyle: 'normal', fontWeight: '500' }}>
                    {item.status}
                  </em>
                </div>
                <div>
                  <button onClick={(e) => { e.stopPropagation(); handleEditClick(item); }} style={smallBtnStyle}>Edit</button>
                  <button onClick={(e) => handleDelete(item.id, e)} style={{ ...smallBtnStyle, background: '#7f1d1d', color: '#fca5a5', marginLeft: '6px' }}>Delete</button>
                </div>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ flex: 1, minWidth: '300px', background: '#1e293b', padding: '20px', borderRadius: '10px', border: '1px solid #334155', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.3)', height: 'fit-content' }}>
          <h3 style={{ borderBottom: '2px solid #334155', paddingBottom: '8px', marginTop: 0, marginBottom: '15px' }}>Item Details</h3>
          {!selectedId && <p style={{ color: '#94a3b8' }}>Select an item to view extended details.</p>}
          {detailsLoading && <p style={{ color: '#94a3b8' }}>Loading details...</p>}
          {detailsError && <p style={{ color: '#f87171' }}>{detailsError}</p>}
          {details && !detailsLoading && (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.95rem' }}>
              <p><strong>ID:</strong> <span style={{ color: '#94a3b8' }}>{details.id}</span></p>
              <p><strong>Name:</strong> <span style={{ color: '#94a3b8' }}>{details.name}</span></p>
              <p><strong>Category:</strong> <span style={{ color: '#94a3b8' }}>{details.category}</span></p>
              <p><strong>Price:</strong> <span style={{ color: '#94a3b8' }}>${details.price}</span></p>
              <p><strong>Stock:</strong> <span style={{ color: '#94a3b8' }}>{details.stock}</span></p>
              <p><strong>Status:</strong> <span style={{ color: details.status === 'Available' ? '#4ade80' : '#facc15' }}>{details.status}</span></p>
              <p><strong>Manufacturer:</strong> <span style={{ color: '#94a3b8' }}>{details.manufacturer}</span></p>
              <hr style={{ borderColor: '#334155', margin: '10px 0' }} />
              <p><strong>Warranty:</strong> <span style={{ color: '#94a3b8' }}>{details.warranty}</span></p>
              <p><strong>Warehouse Location:</strong> <span style={{ color: '#94a3b8' }}>{details.warehouseLocation}</span></p>
              <p><strong>Weight:</strong> <span style={{ color: '#94a3b8' }}>{details.weightKg} kg</span></p>
              <p><strong>Rating:</strong> <span style={{ color: '#94a3b8' }}>{details.rating} / 5.0</span></p>
              <p><strong>Last Updated:</strong> <span style={{ color: '#94a3b8' }}>{details.lastUpdated}</span></p>

              <button onClick={handleToggleStatus} style={{ marginTop: '15px', background: '#2563eb', color: '#fff', border: 'none', padding: '10px 14px', borderRadius: '6px', cursor: 'pointer', fontWeight: '500', width: '100%' }}>
                Toggle Status ({details.status === 'Available' ? 'Mark Reserved' : 'Mark Available'})
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

const inputStyle = {
  flex: '1',
  minWidth: '120px',
  padding: '10px',
  borderRadius: '6px',
  border: '1px solid #475569',
  background: '#0f172a',
  color: '#f8fafc',
  outline: 'none',
};

const primaryBtnStyle = {
  background: '#2563eb',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
};

const secondaryBtnStyle = {
  background: '#475569',
  color: '#fff',
  border: 'none',
  padding: '10px 16px',
  borderRadius: '6px',
  cursor: 'pointer',
  fontWeight: '600',
};

const smallBtnStyle = {
  background: '#334155',
  color: '#f8fafc',
  border: 'none',
  padding: '6px 10px',
  borderRadius: '4px',
  cursor: 'pointer',
  fontSize: '0.85rem',
  fontWeight: '500',
};