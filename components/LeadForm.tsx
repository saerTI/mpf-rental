// components/LeadForm.tsx
'use client';

import { useState, useEffect } from 'react';
import { machineryData } from '@/data/machinery';
import { captureTrackingFromUrl, getTracking } from '@/lib/tracking';

type Status = 'idle' | 'sending' | 'success' | 'error';

const EMPTY = {
  nombre: '',
  telefono: '',
  email: '',
  maquinariaInteres: '',
  mensaje: '',
};

export default function LeadForm() {
  const [form, setForm] = useState(EMPTY);
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState<string | null>(null);

  // Captura gclid/UTM de la URL al montar (atribución de campaña).
  useEffect(() => {
    captureTrackingFromUrl();
  }, []);

  const update =
    (field: keyof typeof form) =>
    (
      e: React.ChangeEvent<
        HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      >,
    ) =>
      setForm((f) => ({ ...f, [field]: e.target.value }));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!form.telefono.trim()) {
      setError('Ingresa un teléfono de contacto.');
      setStatus('error');
      return;
    }
    setStatus('sending');
    setError(null);
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...form, tracking: getTracking() }),
      });
      if (!res.ok) {
        const data = (await res.json().catch(() => null)) as
          | { error?: string }
          | null;
        throw new Error(data?.error ?? 'No pudimos enviar tu solicitud.');
      }
      setForm(EMPTY);
      setStatus('success');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error inesperado.');
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100 text-center">
        <div className="w-14 h-14 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
          <svg
            className="w-8 h-8 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>
        <h3 className="text-xl font-bold text-primary mb-2">
          ¡Solicitud recibida!
        </h3>
        <p className="text-gray-600 mb-6">
          Un ejecutivo te contactará por WhatsApp en breve.
        </p>
        <button
          onClick={() => setStatus('idle')}
          className="text-primary font-semibold hover:text-primary-hover transition"
        >
          Enviar otra solicitud
        </button>
      </div>
    );
  }

  const inputClass =
    'w-full px-4 py-3 rounded-lg border border-gray-200 focus:border-accent focus:ring-2 focus:ring-accent/30 outline-none transition';

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white p-8 rounded-2xl shadow-lg border border-gray-100"
    >
      <h3 className="text-2xl font-bold text-primary mb-1">
        Solicita tu cotización
      </h3>
      <p className="text-gray-600 mb-6">
        Déjanos tus datos y te contactamos por WhatsApp.
      </p>

      <div className="grid sm:grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Nombre
          </label>
          <input
            type="text"
            value={form.nombre}
            onChange={update('nombre')}
            placeholder="Tu nombre"
            className={inputClass}
          />
        </div>
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1">
            Teléfono <span className="text-accent">*</span>
          </label>
          <input
            type="tel"
            required
            value={form.telefono}
            onChange={update('telefono')}
            placeholder="+56 9 ..."
            className={inputClass}
          />
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Email
        </label>
        <input
          type="email"
          value={form.email}
          onChange={update('email')}
          placeholder="tucorreo@ejemplo.cl"
          className={inputClass}
        />
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Maquinaria de interés
        </label>
        <select
          value={form.maquinariaInteres}
          onChange={update('maquinariaInteres')}
          className={inputClass}
        >
          <option value="">Selecciona una opción</option>
          {machineryData.map((m) => (
            <option key={m.id} value={m.name}>
              {m.name}
            </option>
          ))}
          <option value="Otra / No estoy seguro">Otra / No estoy seguro</option>
        </select>
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1">
          Mensaje
        </label>
        <textarea
          rows={3}
          value={form.mensaje}
          onChange={update('mensaje')}
          placeholder="Fechas, zona de la obra, dudas..."
          className={inputClass}
        />
      </div>

      {status === 'error' && error && (
        <p className="text-red-600 text-sm mb-4">{error}</p>
      )}

      <button
        type="submit"
        disabled={status === 'sending'}
        className="w-full bg-accent hover:bg-accent-hover text-primary font-bold py-3 rounded-lg transition-all disabled:opacity-60 disabled:cursor-not-allowed"
      >
        {status === 'sending' ? 'Enviando...' : 'Solicitar cotización'}
      </button>
    </form>
  );
}
