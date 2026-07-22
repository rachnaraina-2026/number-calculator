import { useState, useEffect } from 'react'
import { getCalculationHistory, deleteCalculation } from '../services/supabaseClient'

export default function HistoryView({ onBack, onNewCalculation }) {
  const [history, setHistory] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchHistory = async () => {
      setLoading(true)
      const data = await getCalculationHistory()
      setHistory(data)
      setLoading(false)
    }
    fetchHistory()
  }, [])

  const handleDelete = async (id) => {
    const success = await deleteCalculation(id)
    if (success) {
      setHistory(history.filter(item => item.id !== id))
    }
  }

  const getOperationLabel = (op) => {
    const labels = {
      ascending: 'Sort Ascending',
      descending: 'Sort Descending',
      sum: 'Sum',
      mean: 'Mean',
      median: 'Median',
      mode: 'Mode',
    }
    return labels[op] || op
  }

  const formatResult = (result) => {
    if (Array.isArray(result)) {
      return result.join(', ')
    }
    return result
  }

  const formatDate = (dateString) => {
    const date = new Date(dateString)
    return date.toLocaleString()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 p-4">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-4xl font-bold text-white mb-2">Calculation History</h1>
            <p className="text-slate-400">Your saved calculations</p>
          </div>
          <button
            onClick={onBack}
            className="text-slate-900 font-semibold py-3 px-6 rounded-lg transition-opacity duration-200"
            style={{ backgroundColor: '#f5f4fe' }}
            onMouseEnter={(e) => e.target.style.opacity = '0.8'}
            onMouseLeave={(e) => e.target.style.opacity = '1'}
          >
            ← Back
          </button>
        </div>

        {loading ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <p className="text-slate-600 text-lg">Loading history...</p>
          </div>
        ) : history.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-2xl p-8 text-center">
            <p className="text-slate-600 text-lg mb-6">No calculations yet</p>
            <button
              onClick={onNewCalculation}
              className="text-white font-semibold py-3 px-6 rounded-lg transition-opacity duration-200"
              style={{ backgroundColor: '#c8a7ff' }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              Start Calculating
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {history.map((item) => (
              <div
                key={item.id}
                className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow duration-200"
              >
                <div className="grid grid-cols-1 md:grid-cols-4 gap-4 items-center">
                  {/* Operation */}
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Operation</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {getOperationLabel(item.operation)}
                    </p>
                  </div>

                  {/* Result */}
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Result</p>
                    <p className="text-2xl font-bold" style={{ color: '#c8a7ff' }}>
                      {formatResult(item.result)}
                    </p>
                  </div>

                  {/* Numbers Count */}
                  <div>
                    <p className="text-sm text-slate-600 font-medium">Numbers</p>
                    <p className="text-lg font-semibold text-slate-900">
                      {item.numbers?.length || 0} values
                    </p>
                  </div>

                  {/* Timestamp & Actions */}
                  <div className="flex flex-col gap-2">
                    <p className="text-xs text-slate-500">
                      {formatDate(item.created_at)}
                    </p>
                    <div className="flex gap-2">
                      <button
                        onClick={() => handleDelete(item.id)}
                        className="flex-1 text-white font-semibold py-2 px-3 rounded transition-opacity duration-200 text-sm"
                        style={{ backgroundColor: '#c8a7ff' }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(formatResult(item.result))
                        }}
                        className="flex-1 text-white font-semibold py-2 px-3 rounded transition-opacity duration-200 text-sm"
                        style={{ backgroundColor: '#c8a7ff' }}
                        onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                        onMouseLeave={(e) => e.target.style.opacity = '1'}
                      >
                        Copy Result
                      </button>
                    </div>
                  </div>
                </div>

                {/* Numbers Display */}
                <div className="mt-4 pt-4 border-t border-slate-200">
                  <p className="text-sm text-slate-600 font-medium mb-2">Input Numbers</p>
                  <div className="flex flex-wrap gap-2">
                    {item.numbers?.map((num, idx) => (
                      <span
                        key={idx}
                        className="text-white px-3 py-1 rounded-full text-sm font-medium"
                        style={{ backgroundColor: '#c8a7ff' }}
                      >
                        {num}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Footer Button */}
        {history.length > 0 && (
          <div className="mt-8 text-center">
            <button
              onClick={onNewCalculation}
              className="text-white font-semibold py-3 px-8 rounded-lg transition-opacity duration-200 text-lg"
              style={{ backgroundColor: '#c8a7ff' }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              New Calculation
            </button>
          </div>
        )}
      </div>
    </div>
  )
}
