import React, { useState } from "react";
import "./NewOrderForm.css";

export default function NewOrderForm({ onAdd, uid }) {
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("pending");
  const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);

  function handleProductChange(index, field, value) {
    const newProducts = [...products];
    newProducts[index][field] = field === "quantity" || field === "price"
      ? Number(value)
      : value;
    setProducts(newProducts);
  }

  function addProduct() {
    setProducts([...products, { name: "", quantity: 1, price: 0 }]);
  }

  function removeProduct(index) {
    setProducts(products.filter((_, i) => i !== index));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!customer.trim()) return;

    const order = {
      id: uid(),
      customer,
      date: new Date().toLocaleDateString(),
      status,
      products
    };

    onAdd(order);
    setCustomer("");
    setStatus("pending");
    setProducts([{ name: "", quantity: 1, price: 0 }]);
  }

  return (
    <form className="new-order-form" onSubmit={handleSubmit}>
      <h2>Nuevo Pedido</h2>

      <label>Cliente</label>
      <input
        type="text"
        value={customer}
        onChange={(e) => setCustomer(e.target.value)}
        placeholder="Nombre del cliente"
      />

      <label>Estado</label>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value="pending">Pendiente</option>
        <option value="shipped">Enviado</option>
        <option value="delivered">Entregado</option>
      </select>

      <h3>Productos</h3>
      {products.map((p, index) => (
        <div key={index} className="product-row">
          <input
            type="text"
            placeholder="Nombre"
            value={p.name}
            onChange={(e) => handleProductChange(index, "name", e.target.value)}
          />
          <input
            type="number"
            placeholder="Cant."
            value={p.quantity}
            min="1"
            onChange={(e) => handleProductChange(index, "quantity", e.target.value)}
          />
          <input
            type="number"
            placeholder="Precio"
            value={p.price}
            min="0"
            step="0.01"
            onChange={(e) => handleProductChange(index, "price", e.target.value)}
          />
          {products.length > 1 && (
            <button type="button" onClick={() => removeProduct(index)}>
              ❌
            </button>
          )}
        </div>
      ))}

      <button type="button" onClick={addProduct}>
        ➕ Agregar producto
      </button>

      <button type="submit">✅ Crear pedido</button>
    </form>
  );
}
