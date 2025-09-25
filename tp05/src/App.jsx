import React, { useState, useEffect }from "react"; 
import OrderFilter from "./assets/components/OrderFilter/OrderFilter";
import OrderStats from "./assets/components/OrderStats/OrderStats";
import OrderList from "./assets/components/OrderList/OrderList";
import NewOrderForm from "./assets/components/NewOrderForm/NewOrderForm";

function uid() {
  return Math.floor(Math.random() * 10000);
}

export default function App() {
  const [orders, setOrders] = useState([
    {
      id: uid(),
      customer: "Juan López",
      date: new Date().toISOString().slice(0, 10),
      status: "shipped",
      products: [
        { name: "Gorra", quantity: 1, price: 10 },
        { name: "Zapatos", quantity: 1, price: 60 }
      ]
    },
    {
      id: uid(),
      customer: "Ana",
      date: new Date().toISOString().slice(0, 10),
      status: "delivered",
      products: [{ name: "Libro", quantity: 3, price: 12 }]
    }
  ]);

  const [filter, setFilter] = useState("all");

  function handleAddOrder(order) {
    setOrders([...orders, order]);
  }

  const filteredOrders =
    filter === "all" ? orders : orders.filter((o) => o.status === filter);

  return (
    <div className="p-4 space-y-4">
      <h1 className="text-xl font-bold">Pedidos</h1>

      <OrderFilter selected={filter} onChange={setFilter} />

      <OrderStats orders={orders} />

      <OrderList orders={filteredOrders} />

      <NewOrderForm onAdd={handleAddOrder} uid={uid} />
    </div>
  );
}