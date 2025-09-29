import React, { useState } from "react";
import OrderFilter from "./assets/components/OrderFilter/OrderFilter";
import OrderStats from "./assets/components/OrderStats/OrderStats";
import OrderList from "./assets/components/OrderList/OrderList";
import NewOrderForm from "./assets/components/NewOrderForm/NewOrderForm";
import "./App.css";

function uid() {
  return Math.floor(Math.random() * 10000);
}

export default function App() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("all");

  function handleAddOrder(order) {
    setOrders([...orders, order]);
  }

  function handleDeleteOrder(id) {
    setOrders(orders.filter((o) => o.id !== id));
  }

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="app-container">
      <h1 className="page-title">Pedidos</h1>
      <OrderFilter value={filter} onChange={setFilter} />
      <OrderStats orders={orders} />
      <NewOrderForm onAdd={handleAddOrder} uid={uid} />
      <OrderList orders={filteredOrders} onDelete={handleDeleteOrder} />
    </div>
  );
}
