import React from "react";
import "./OrderItem.css";

export default function OrderItem({ order, onToggleStatus, onDelete }) {
  const subtotal = order.products.reduce(
    (s, p) => s + p.quantity * p.price,
    0
  );

  return (
    <div className="order-item">
      <div className="details">
        <h4>{order.customer}</h4>
        <p>ID: {order.id}</p>
        <p>Fecha: {order.date}</p>
        <p>
          Estado:{" "}
          <span className={`status ${order.status}`}>{order.status}</span>
        </p>
      </div>
      <div className="actions">
        <button onClick={() => onToggleStatus(order.id)}>Cambiar estado</button>
        <button onClick={() => onDelete(order.id)}>Eliminar</button>
      </div>
      <div className="products">
        <h5>Productos</h5>
        <table>
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Cant.</th>
              <th>Precio</th>
              <th>Subtotal</th>
            </tr>
          </thead>
          <tbody>
            {order.products.map((p, i) => (
              <tr key={i}>
                <td>{p.name}</td>
                <td>{p.quantity}</td>
                <td>{p.price.toFixed(2)}</td>
                <td>{(p.quantity * p.price).toFixed(2)}</td>
              </tr>
            ))}
            <tr className="total">
              <td colSpan={3}>Total</td>
              <td>{subtotal.toFixed(2)}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
