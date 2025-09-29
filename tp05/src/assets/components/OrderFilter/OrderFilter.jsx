import React from "react";
import "./OrderFilter.css";

export default function OrderFilter({ value, onChange }) {
  return (
    <div className="order-filter">
      <label>Filtrar por estado:</label>
      <select value={value} onChange={(e) => onChange(e.target.value)}>
        <option value="all">Todos</option>
        <option value="pending">Pendiente</option>
        <option value="shipped">Enviado</option>
        <option value="delivered">Entregado</option>
      </select>
    </div>
  );
}
