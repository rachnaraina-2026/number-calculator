-- Create the calculations table
CREATE TABLE IF NOT EXISTS calculations (
  id BIGINT PRIMARY KEY GENERATED ALWAYS AS IDENTITY,
  numbers INTEGER[] NOT NULL,
  operation VARCHAR(50) NOT NULL,
  result JSONB NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create an index on created_at for faster queries
CREATE INDEX IF NOT EXISTS idx_calculations_created_at
ON calculations(created_at DESC);

-- Enable RLS (Row Level Security)
ALTER TABLE calculations ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows anyone to read all calculations
CREATE POLICY "Allow public read" ON calculations
  FOR SELECT USING (true);

-- Create a policy that allows anyone to insert calculations
CREATE POLICY "Allow public insert" ON calculations
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows anyone to delete their own calculations
CREATE POLICY "Allow public delete" ON calculations
  FOR DELETE USING (true);
