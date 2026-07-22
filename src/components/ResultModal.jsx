export default function ResultModal({ numbers, operation, result, onReset, onViewHistory }) {
  const getOperationLabel = (op) => {
    const labels = {
      ascending: 'Sort Ascending',
      descending: 'Sort Descending',
      sum: 'Sum',
      mean: 'Mean (Average)',
      median: 'Median',
      mode: 'Mode',
    }
    return labels[op] || op
  }

  const formatResult = () => {
    if (Array.isArray(result)) {
      return result.join(', ')
    }
    return result
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black bg-opacity-50" />

      {/* Modal */}
      <div className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="px-8 py-6" style={{ background: 'linear-gradient(to right, #c8a7ff, #c8a7ff)' }}>
          <h2 className="text-2xl font-bold text-white">Calculation Result</h2>
          <p className="text-blue-100 text-sm mt-1">{getOperationLabel(operation)}</p>
        </div>

        {/* Content */}
        <div className="p-8">
          {/* Input Numbers */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Input Numbers</h3>
            <div className="grid grid-cols-5 gap-3 p-4 bg-slate-50 rounded-lg">
              {numbers.map((num, idx) => (
                <div
                  key={idx}
                  className="border-2 border-slate-200 rounded-lg p-3 text-center font-semibold text-white"
                  style={{ backgroundColor: '#c8a7ff' }}
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Operation & Result */}
          <div className="mb-8 p-6 border-2 rounded-lg" style={{ backgroundColor: '#f5f4fe', borderColor: '#c8a7ff' }}>
            <p className="text-sm font-medium text-slate-600 mb-2">Operation</p>
            <p className="text-lg font-semibold text-slate-900 mb-4">
              {getOperationLabel(operation)}
            </p>

            <div className="pt-4 mt-4" style={{ borderTop: '1px solid #c8a7ff' }}>
              <p className="text-sm font-medium text-slate-600 mb-2">Result</p>
              <p className="text-4xl font-bold" style={{ color: '#c8a7ff' }}>
                {formatResult()}
              </p>
            </div>
          </div>

          {/* Additional Info */}
          {(operation === 'sum' || operation === 'mean' || operation === 'median' || operation === 'mode') && (
            <div className="grid grid-cols-2 gap-4 mb-8 p-4 bg-slate-50 rounded-lg">
              <div>
                <p className="text-sm text-slate-600 font-medium">Count</p>
                <p className="text-2xl font-bold text-slate-900">{numbers.length}</p>
              </div>
              <div>
                <p className="text-sm text-slate-600 font-medium">Sum</p>
                <p className="text-2xl font-bold text-slate-900">
                  {numbers.reduce((a, b) => a + b, 0)}
                </p>
              </div>
            </div>
          )}

          {/* Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button
              onClick={onReset}
              className="text-white font-semibold py-3 px-4 rounded-lg transition-opacity duration-200"
              style={{ backgroundColor: '#c8a7ff' }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              New Calculation
            </button>
            <button
              onClick={onViewHistory}
              className="text-white font-semibold py-3 px-4 rounded-lg transition-opacity duration-200"
              style={{ backgroundColor: '#c8a7ff' }}
              onMouseEnter={(e) => e.target.style.opacity = '0.8'}
              onMouseLeave={(e) => e.target.style.opacity = '1'}
            >
              View History
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
