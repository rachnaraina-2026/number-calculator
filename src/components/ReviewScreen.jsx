export default function ReviewScreen({
  numbers,
  operation,
  onOperationChange,
  onCalculate,
  onEditNumbers,
  onViewHistory,
}) {
  const operations = [
    { value: 'ascending', label: 'Sort Ascending' },
    { value: 'descending', label: 'Sort Descending' },
    { value: 'sum', label: 'Sum' },
    { value: 'mean', label: 'Mean (Average)' },
    { value: 'median', label: 'Median' },
    { value: 'mode', label: 'Mode' },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Review Numbers</h1>
          <p className="text-slate-400">All 10 numbers entered. Select an operation.</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          {/* Numbers Grid */}
          <div className="mb-8">
            <h3 className="text-lg font-semibold text-slate-900 mb-4">Your Numbers</h3>
            <div className="grid grid-cols-5 gap-3">
              {numbers.map((num, idx) => (
                <div
                  key={idx}
                  className="bg-gradient-to-br from-blue-50 to-blue-100 border-2 border-blue-200 rounded-lg p-3 text-center font-semibold text-lg text-blue-900"
                >
                  {num}
                </div>
              ))}
            </div>
          </div>

          {/* Operation Selector */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-slate-900 mb-4">
              Select Operation
            </label>
            <select
              value={operation}
              onChange={(e) => onOperationChange(e.target.value)}
              className="w-full px-4 py-3 text-base border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors cursor-pointer bg-white"
            >
              {operations.map((op) => (
                <option key={op.value} value={op.value}>
                  {op.label}
                </option>
              ))}
            </select>
          </div>

          {/* Quick Info */}
          <div className="grid grid-cols-3 gap-4 mb-8 p-4 bg-slate-50 rounded-lg">
            <div className="text-center">
              <p className="text-sm text-slate-600 font-medium">Sum</p>
              <p className="text-2xl font-bold text-slate-900">
                {numbers.reduce((a, b) => a + b, 0)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 font-medium">Mean</p>
              <p className="text-2xl font-bold text-slate-900">
                {(numbers.reduce((a, b) => a + b, 0) / numbers.length).toFixed(2)}
              </p>
            </div>
            <div className="text-center">
              <p className="text-sm text-slate-600 font-medium">Count</p>
              <p className="text-2xl font-bold text-slate-900">{numbers.length}</p>
            </div>
          </div>

          {/* Buttons */}
          <div className="grid grid-cols-3 gap-4">
            <button
              onClick={onEditNumbers}
              className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              ← Edit
            </button>
            <button
              onClick={onViewHistory}
              className="bg-slate-200 hover:bg-slate-300 text-slate-900 font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              History
            </button>
            <button
              onClick={onCalculate}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-4 rounded-lg transition-colors duration-200"
            >
              Calculate →
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
