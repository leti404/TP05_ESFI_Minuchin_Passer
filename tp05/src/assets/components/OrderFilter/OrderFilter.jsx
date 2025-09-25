import React from "react";
export default function OrderFilter({ value, onChange }) {
return (
<div className="flex gap-2 items-center">
<label className="text-sm">Filtrar por estado:</label>
<select className="px-2 py-1 rounded border" value={value} onChange={e => onChange(e.target.value)}>
<option value="all">Todos</option>
<option value="pending">pending</option>
<option value="shipped">shipped</option>
<option value="delivered">delivered</option>
</select>
</div>
);
}


