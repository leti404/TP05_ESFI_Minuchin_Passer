import React from "react";
import OrderItem from "../OrderItem/OrderItem";
import "./OrderList.css";

export default function OrderList({ orders, onToggleStatus, onDelete }) {
  if (orders.length === 0)
    return <div className="order-list">No hay pedidos.</div>;

  return (
    <div className="order-list">
      {orders.map((o) => (
        <OrderItem
          key={o.id}
          order={o}
          onToggleStatus={onToggleStatus}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
