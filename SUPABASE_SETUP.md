# Supabase Setup Guide

## Step 1: Create the Database Table

1. Go to your Supabase project: https://szyklxpjzxeaeaxecqtu.supabase.co
2. Navigate to **SQL Editor** in the left sidebar
3. Click **"New Query"**
4. Copy and paste the SQL from `supabase-setup.sql` file
5. Click **"Run"** to execute the query

This will create:
- `calculations` table with columns: `id`, `numbers`, `operation`, `result`, `created_at`
- An index for faster queries
- Row Level Security policies for public access

## Step 2: Verify Your Environment Variables

The app uses these environment variables from `.env`:
```
VITE_SUPABASE_URL=https://szyklxpjzxeaeaxecqtu.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_rgnqw7QgIZYVnt3rjzYpOA_zXOGs7fw
```

✅ These are already configured in your project.

## Step 3: Run the App

```bash
npm run dev
```

The app will start at `http://localhost:5173`

## Features Now Available

### 1. **Automatic Calculation Persistence**
Every time you perform a calculation, it's automatically saved to the database with:
- Input numbers (array of 10 integers)
- Operation performed (sort, sum, mean, median, mode)
- Result of the calculation
- Timestamp

### 2. **Calculation History**
- Click **"History"** button from any screen
- View all your past calculations
- See when each calculation was performed
- Input numbers displayed as tags

### 3. **History Actions**
- **Delete**: Remove a calculation from history
- **Copy Result**: Copy the result to clipboard
- **New Calculation**: Start a fresh calculation

## Data Flow

```
User enters 10 numbers
         ↓
User selects operation
         ↓
User clicks Calculate
         ↓
Result is calculated
         ↓
Result is saved to Supabase
         ↓
Result modal displays
         ↓
User can click "View History" to see all past calculations
```

## Troubleshooting

### Table Not Found Error
- Make sure you ran the SQL from `supabase-setup.sql`
- Check that the table appears in your Supabase dashboard under "Tables"

### Calculations Not Saving
- Open browser console (F12) and check for errors
- Verify Supabase URL and anon key are correct in `.env`
- Make sure you have internet connection

### History Not Loading
- Check browser console for errors
- Verify RLS policies are enabled (should be from the SQL setup)
- Try refreshing the page

## Database Schema

```sql
Table: calculations

Column      | Type                    | Description
------------|-------------------------|------------------------
id          | BIGINT (Primary Key)    | Auto-generated unique ID
numbers     | INTEGER[]               | Array of 10 input numbers
operation   | VARCHAR(50)             | Operation name (sum, mean, etc)
result      | JSONB                   | Result of calculation
created_at  | TIMESTAMP WITH TIME ZONE| When calculation was created
```

## Next Steps

You can extend this app by:
- Adding user authentication (email/password)
- Adding filters and sorting to history
- Exporting calculations as CSV
- Adding data visualization
- Setting up automatic backups
