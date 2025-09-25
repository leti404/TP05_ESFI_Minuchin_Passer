import React from "react";
export default function OrderItem({ order, onToggleStatus, onDelete }) {
const subtotal = order.products.reduce((s, p) => s + p.quantity * p.price, 0);
return (
<div className="border rounded p-3 mb-3">
<div className="flex justify-between items-start">
<div>
<div className="text-sm text-slate-600">ID: {order.id}</div>
<div className="text-lg font-semibold">{order.customer}</div>
<div className="text-sm">Fecha: {order.date}</div>
<div className="text-sm">Estado: <strong className={order.status === 'pending' ? 'text-yellow-600' : order.status === 'shipped' ? 'text-blue-600' : 'text-green-600'}>{order.status}</strong></div>
</div>
<div className="text-right space-y-2">
<button className="px-3 py-1 rounded bg-slate-200" onClick={() => onToggleStatus(order.id)}>Cambiar estado</button>
<button className="px-3 py-1 rounded bg-red-100" onClick={() => onDelete(order.id)}>Eliminar</button>
</div>
</div>
<div className="mt-3">
<div className="font-medium">Productos</div>
<table className="w-full text-sm mt-2 border-collapse">
<thead>
<tr className="text-left">
<th>Nombre</th>
<th>Cantidad</th>
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
<tr className="font-semibold">
<td colSpan={3}>Total</td>
<td>{subtotal.toFixed(2)}</td>
</tr>
</tbody>
</table>
</div>
</div>
);
}