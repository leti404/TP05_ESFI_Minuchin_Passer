// components/OrderStats.jsx
import React from "react";
export default function OrderStats({ orders }) {
const total = orders.length;
const pending = orders.filter(o => o.status === "pending").length;
const shipped = orders.filter(o => o.status === "shipped").length;
const delivered = orders.filter(o => o.status === "delivered").length;
return (
<div className="grid grid-cols-4 gap-4 text-sm">
<div className="p-3 rounded shadow">Total: <strong>{total}</strong></div>
<div className="p-3 rounded shadow">Pending: <strong>{pending}</strong></div>
<div className="p-3 rounded shadow">Shipped: <strong>{shipped}</strong></div>
<div className="p-3 rounded shadow">Delivered: <strong>{delivered}</strong></div>
</div>
);
}