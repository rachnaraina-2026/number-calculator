import { useState } from 'react'
import NumberInput from './components/NumberInput'
import ReviewScreen from './components/ReviewScreen'
import ResultModal from './components/ResultModal'

export default function App() {
  const [numbers, setNumbers] = useState([])
  const [operation, setOperation] = useState('sum')
  const [showResult, setShowResult] = useState(false)
  const [result, setResult] = useState(null)

  const handleNumberSubmit = (num) => {
    if (numbers.length < 10) {
      setNumbers([...numbers, num])
    }
  }

  const handleRemoveNumber = (index) => {
    setNumbers(numbers.filter((_, i) => i !== index))
  }

  const calculateResult = () => {
    const nums = [...numbers].sort((a, b) => a - b)

    let res
    switch (operation) {
      case 'ascending':
        res = [...numbers].sort((a, b) => a - b)
        break
      case 'descending':
        res = [...numbers].sort((a, b) => b - a)
        break
      case 'sum':
        res = numbers.reduce((acc, n) => acc + n, 0)
        break
      case 'mean':
        res = (numbers.reduce((acc, n) => acc + n, 0) / numbers.length).toFixed(2)
        break
      case 'median':
        const mid = Math.floor(nums.length / 2)
        res = nums.length % 2 !== 0 ? nums[mid] : ((nums[mid - 1] + nums[mid]) / 2).toFixed(2)
        break
      case 'mode':
        const frequency = {}
        numbers.forEach(num => {
          frequency[num] = (frequency[num] || 0) + 1
        })
        const maxFreq = Math.max(...Object.values(frequency))
        const modes = Object.keys(frequency).filter(key => frequency[key] === maxFreq).map(Number)
        res = modes.length === numbers.length ? 'No mode' : modes.length === 1 ? modes[0] : modes
        break
      default:
        res = null
    }

    setResult(res)
    setShowResult(true)
  }

  const handleReset = () => {
    setNumbers([])
    setOperation('sum')
    setShowResult(false)
    setResult(null)
  }

  if (showResult) {
    return <ResultModal numbers={numbers} operation={operation} result={result} onReset={handleReset} />
  }

  if (numbers.length === 10) {
    return (
      <ReviewScreen
        numbers={numbers}
        operation={operation}
        onOperationChange={setOperation}
        onCalculate={calculateResult}
        onEditNumbers={() => setNumbers([])}
      />
    )
  }

  return (
    <NumberInput
      currentIndex={numbers.length + 1}
      numbers={numbers}
      onSubmit={handleNumberSubmit}
      onRemove={handleRemoveNumber}
    />
  )
}
