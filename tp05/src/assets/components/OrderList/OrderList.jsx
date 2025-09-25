import React from "react";
import OrderItem from "../OrderItem/OrderItem"; 

export default function OrderList({ orders, onToggleStatus, onDelete }) {
if (orders.length === 0) return <div className="text-center text-sm p-4">No hay pedidos.</div>;
return (
<div>
{orders.map(o => (
<OrderItem key={o.id} order={o} onToggleStatus={onToggleStatus} onDelete={onDelete} />
))}
</div>
);
}