# Number Calculator

A polished React web application that takes 10 integers as input and performs statistical calculations.

## Features

- **Sequential Input**: Enter 10 integers one at a time with real-time progress tracking
- **Review Screen**: View all entered numbers with quick statistics before calculating
- **Multiple Operations**: Choose from 6 different calculations:
  - Sort Ascending
  - Sort Descending
  - Sum
  - Mean (Average)
  - Median
  - Mode
- **Results Modal**: Beautiful modal displaying input numbers alongside calculated results
- **Reset Functionality**: Start a new calculation with one click
- **Modern UI**: Built with Tailwind CSS for a polished, responsive design

## Tech Stack

- **React** - UI library
- **Vite** - Build tool & dev server
- **Tailwind CSS** - Utility-first CSS framework

## Installation

```bash
npm install
```

## Running the App

```bash
npm run dev
```

The app will start at `http://localhost:5173`

## Building for Production

```bash
npm run build
```

## Project Structure

```
src/
├── App.jsx                 # Main app component
├── main.jsx               # Entry point
├── index.css              # Global styles
└── components/
    ├── NumberInput.jsx    # Input form with progress
    ├── ReviewScreen.jsx   # Review & operation selection
    └── ResultModal.jsx    # Results display
```

## How to Use

1. Enter 10 integers one at a time
2. Review all numbers on the review screen
3. Select an operation from the dropdown
4. Click "Calculate" to see results in a modal
5. Click "Calculate Another Set" to start over

## Requirements

- Integers only
- Exactly 10 numbers required
- Desktop-friendly interface

---

Built with React & Tailwind CSS
