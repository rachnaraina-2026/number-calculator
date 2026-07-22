import { useState } from 'react'

export default function NumberInput({ currentIndex, numbers, onSubmit, onRemove, onViewHistory }) {
  const [input, setInput] = useState('')
  const [error, setError] = useState('')

  const handleSubmit = (e) => {
    e.preventDefault()
    setError('')

    if (!input.trim()) {
      setError('Please enter a number')
      return
    }

    const num = parseInt(input, 10)
    if (isNaN(num)) {
      setError('Please enter a valid integer')
      return
    }

    onSubmit(num)
    setInput('')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">Number Calculator</h1>
          <p className="text-slate-400">Enter 10 integers to perform calculations</p>
        </div>

        {/* Main Card */}
        <div className="bg-white rounded-2xl shadow-2xl p-8 mb-6">
          {/* Progress */}
          <div className="mb-8">
            <div className="flex justify-between items-center mb-2">
              <span className="text-sm font-semibold text-slate-700">
                Number {currentIndex} of 10
              </span>
              <span className="text-sm font-semibold" style={{ color: '#c8a7ff' }}>
                {Math.round((currentIndex / 10) * 100)}%
              </span>
            </div>
            <div className="w-full bg-slate-200 rounded-full h-2 overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-300"
                style={{ backgroundColor: '#c8a7ff' }}
                style={{ width: `${(currentIndex / 10) * 100}%` }}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit}>
            <label className="block text-sm font-semibold text-slate-700 mb-3">
              Enter Number {currentIndex}
            </label>
            <input
              type="text"
              value={input}
              onChange={(e) => {
                setInput(e.target.value)
                setError('')
              }}
              placeholder="e.g. 42"
              className="w-full px-4 py-3 text-lg border-2 border-slate-200 rounded-lg focus:outline-none focus:border-blue-600 transition-colors"
              autoFocus
            />
            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

            <div className="grid grid-cols-2 gap-3 mt-6">
              <button
                type="submit"
                className="text-white font-semibold py-3 px-4 rounded-lg transition-opacity duration-200"
                style={{ backgroundColor: '#c8a7ff' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                Next
              </button>
              <button
                type="button"
                onClick={onViewHistory}
                className="text-white font-semibold py-3 px-4 rounded-lg transition-opacity duration-200"
                style={{ backgroundColor: '#c8a7ff' }}
                onMouseEnter={(e) => e.target.style.opacity = '0.8'}
                onMouseLeave={(e) => e.target.style.opacity = '1'}
              >
                History
              </button>
            </div>
          </form>
        </div>

        {/* Numbers List */}
        {numbers.length > 0 && (
          <div className="bg-white bg-opacity-10 backdrop-blur-lg rounded-2xl p-6">
            <h3 className="text-white font-semibold mb-4">Entered Numbers ({numbers.length})</h3>
            <div className="grid grid-cols-5 gap-2">
              {numbers.map((num, idx) => (
                <div
                  key={idx}
                  className="relative group"
                >
                  <div className="text-white rounded-lg p-2 text-center font-semibold text-sm" style={{ backgroundColor: '#c8a7ff' }}>
                    {num}
                  </div>
                  <button
                    onClick={() => onRemove(idx)}
                    className="absolute -top-2 -right-2 opacity-0 group-hover:opacity-100 transition-opacity bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs font-bold"
                  >
                    ×
                  </button>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
