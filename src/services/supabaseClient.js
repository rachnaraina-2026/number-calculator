import { createClient } from '@supabase/supabase-js'

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

export const saveCalculation = async (numbers, operation, result) => {
  try {
    const { data, error } = await supabase
      .from('calculations')
      .insert([
        {
          numbers: numbers,
          operation: operation,
          result: result,
          created_at: new Date().toISOString(),
        },
      ])
      .select()

    if (error) {
      console.error('Error saving calculation:', error)
      return null
    }

    return data[0]
  } catch (err) {
    console.error('Error:', err)
    return null
  }
}

export const getCalculationHistory = async () => {
  try {
    const { data, error } = await supabase
      .from('calculations')
      .select('*')
      .order('created_at', { ascending: false })
      .limit(50)

    if (error) {
      console.error('Error fetching history:', error)
      return []
    }

    return data
  } catch (err) {
    console.error('Error:', err)
    return []
  }
}

export const deleteCalculation = async (id) => {
  try {
    const { error } = await supabase
      .from('calculations')
      .delete()
      .eq('id', id)

    if (error) {
      console.error('Error deleting calculation:', error)
      return false
    }

    return true
  } catch (err) {
    console.error('Error:', err)
    return false
  }
}
