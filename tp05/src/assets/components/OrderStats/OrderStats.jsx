import React from "react";
import "./OrderStats.css";

export default function OrderStats({ orders }) {
  const total = orders.length;
  const pending = orders.filter((o) => o.status === "pending").length;
  const shipped = orders.filter((o) => o.status === "shipped").length;
  const delivered = orders.filter((o) => o.status === "delivered").length;

  return (
    <div className="order-stats">
      <div className="stat-card"><h3>Total</h3><p>{total}</p></div>
      <div className="stat-card warning"><h3>Pendientes</h3><p>{pending}</p></div>
      <div className="stat-card info"><h3>Enviados</h3><p>{shipped}</p></div>
      <div className="stat-card success"><h3>Entregados</h3><p>{delivered}</p></div>
    </div>
  );
}
