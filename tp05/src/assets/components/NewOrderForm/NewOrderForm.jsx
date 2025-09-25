import React, { useState } from "react";

export default function NewOrderForm({ onAdd, uid }) {
  const [customer, setCustomer] = useState("");
  const [status, setStatus] = useState("pending");
  const [date, setDate] = useState(new Date().toISOString().slice(0, 10));
  const [products, setProducts] = useState([{ name: "", quantity: 1, price: 0 }]);
  const [errors, setErrors] = useState([]);

  function validate() {
    const e = [];
    if (!customer || customer.trim().length < 3)
      e.push("El nombre del cliente debe tener al menos 3 caracteres.");
    if (!["pending", "shipped", "delivered"].includes(status))
      e.push("Estado inválido.");
    if (!date) e.push("Fecha inválida.");
    if (!products.length) e.push("Debe haber al menos un producto.");

    products.forEach((p, i) => {
      if (!p.name || p.name.trim().length === 0)
        e.push(`Producto #${i + 1}: nombre requerido.`);
      const q = Number(p.quantity);
      if (!Number.isFinite(q) || q <= 0)
        e.push(`Producto #${i + 1}: la cantidad debe ser > 0.`);
      const pr = Number(p.price);
      if (!Number.isFinite(pr) || pr < 0)
        e.push(`Producto #${i + 1}: precio inválido.`);
    });

    setErrors(e);
    return e.length === 0;
  }

  function submit(e) {
    e.preventDefault();
    if (!validate()) return;

    const order = {
      id: uid(),
      customer: customer.trim(),
      status: status || "pending",
      date: date || new Date().toISOString().slice(0, 10),
      products: products.map((p) => ({
        name: p.name.trim(),
        quantity: Number(p.quantity),
        price: Number(p.price),
      })),
    };

    onAdd(order);
    setCustomer("");
    setStatus("pending");
    setDate(new Date().toISOString().slice(0, 10));
    setProducts([{ name: "", quantity: 1, price: 0 }]);
    setErrors([]);
  }

  function updateProduct(index, field, value) {
    const copy = [...products];
    copy[index] = { ...copy[index], [field]: value };
    setProducts(copy);
  }

  function removeProduct(index) {
    setProducts(products.filter((_, i) => i !== index));
  }

  function addProduct() {
    setProducts([...products, { name: "", quantity: 1, price: 0 }]);
  }

  return (
    <form className="space-y-3 border rounded p-3" onSubmit={submit}>
      <div>
        <label className="block text-sm">Cliente</label>
        <input
          className="border rounded px-2 py-1 w-full"
          value={customer}
          onChange={(e) => setCustomer(e.target.value)}
        />
      </div>

      <div>
        <label className="block text-sm">Estado</label>
        <select
          className="border rounded px-2 py-1 w-full"
          value={status}
          onChange={(e) => setStatus(e.target.value)}
        >
          <option value="pending">pending</option>
          <option value="shipped">shipped</option>
          <option value="delivered">delivered</option>
        </select>
      </div>

      <div>
        <label className="block text-sm">Fecha</label>
        <input
          type="date"
          className="border rounded px-2 py-1 w-full"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />
      </div>

      <div>
        <div className="font-medium">Productos</div>
        {products.map((p, i) => (
          <div key={i} className="flex gap-2 items-center mt-1">
            <input
              className="border px-2 py-1 flex-1"
              placeholder="Nombre"
              value={p.name}
              onChange={(e) => updateProduct(i, "name", e.target.value)}
            />
            <input
              type="number"
              className="border px-2 py-1 w-20"
              value={p.quantity}
              onChange={(e) => updateProduct(i, "quantity", e.target.value)}
            />
            <input
              type="number"
              className="border px-2 py-1 w-24"
              value={p.price}
              onChange={(e) => updateProduct(i, "price", e.target.value)}
            />
            <button
              type="button"
              className="px-2 bg-red-100 rounded"
              onClick={() => removeProduct(i)}
            >
              x
            </button>
          </div>
        ))}
        <button
          type="button"
          className="mt-2 px-3 py-1 rounded bg-slate-200"
          onClick={addProduct}
        >
          Agregar producto
        </button>
      </div>

      {errors.length > 0 && (
        <ul className="text-red-600 text-sm list-disc pl-5">
          {errors.map((e, i) => (
            <li key={i}>{e}</li>
          ))}
        </ul>
      )}

      <button type="submit" className="px-3 py-1 rounded bg-green-200">
        Agregar pedido
      </button>
    </form>
  );
}
