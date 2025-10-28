import React from 'react';
import { XCircle, Download } from 'lucide-react';

const ReportModal = ({ data, onClose, exportToCSV }) => {
    if (!data || data.length === 0) return null;

    const headers = Object.keys(data[0]);

    return (
        <div className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4">
            <div className="bg-slate-800 rounded-2xl p-8 max-w-5xl w-full border-2 border-amber-600 max-h-[90vh] overflow-y-auto">

                {/* Encabezado del Modal */}
                <div className="flex justify-between items-center mb-6 border-b border-amber-700 pb-3">
                    <h3 className="text-2xl font-bold text-amber-100 flex items-center gap-2">
                        📋 Reporte de Inventario y Ventas
                    </h3>
                    <button
                        onClick={onClose}
                        className="text-red-400 hover:text-red-300 transition"
                    >
                        <XCircle size={28} />
                    </button>
                </div>

                {/* Botones de Acción */}
                <div className="flex justify-end mb-4">
                    <button
                        onClick={() => exportToCSV(data, 'Reporte_Inventario')}
                        className="flex items-center gap-2 bg-green-600 text-white px-4 py-2 rounded-xl font-semibold hover:bg-green-700 transition"
                    >
                        <Download size={18} />
                        Exportar a CSV
                    </button>
                </div>

                {/* Tabla de Datos */}
                <div className="overflow-x-auto rounded-lg border border-amber-900">
                    <table className="w-full text-sm text-left">
                        <thead className="text-amber-200 uppercase bg-slate-700">
                        <tr>
                            {headers.map(header => (
                                <th key={header} scope="col" className="px-6 py-3 whitespace-nowrap">
                                    {header.replace(/_/g, ' ')}
                                </th>
                            ))}
                        </tr>
                        </thead>
                        <tbody>
                        {data.map((row, index) => (
                            <tr key={index} className="bg-slate-800 border-b border-amber-900/50 text-amber-100 hover:bg-slate-700">
                                {headers.map(header => (
                                    <td key={header} className="px-6 py-4 whitespace-nowrap">
                                        {row[header]}
                                    </td>
                                ))}
                            </tr>
                        ))}
                        </tbody>
                    </table>
                </div>

                <div className="mt-6 text-center">
                    <button
                        onClick={onClose}
                        className="mt-4 bg-amber-600 text-white py-2 px-6 rounded-xl font-bold hover:bg-amber-700 transition"
                    >
                        Cerrar
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ReportModal;