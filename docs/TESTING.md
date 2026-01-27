# Testing Guide

This project includes comprehensive automated tests for all testing tools.

## Running Tests Locally

### Prerequisites
- Node.js 16.x or higher
- npm

### Installation
```bash
npm install
```

### Run All Tests
```bash
npm test
```

### Run Tests in Watch Mode
```bash
npm run test:watch
```

### Run Tests with Coverage Report
```bash
npm run test:coverage
```

## Test Suite Overview

### Counter String Tests (5 tests)
- Validates string generation with correct length
- Tests various input lengths (1, 5, 35, 100, 1000, 50000)
- Verifies pattern content (asterisks and numbers)
- Ensures edge cases are handled correctly

### Paragraph Generator Tests (6 tests)
- Validates word pool exists and has content
- Tests paragraph generation with correct word count
- Verifies capitalization (starts with capital letter)
- Verifies punctuation (ends with period)
- Tests various word counts (1, 5, 50, 100, 10000)
- Ensures proper formatting throughout

### Text Counter Tests (3 tests)
- Validates MAX_LENGTH constant (100000)
- Tests character, word, letter, number, special char, and space counting
- Tests empty string handling
- Verifies distinction between different character types

### File Generator Tests (6 tests)
- Validates tool structure and required methods
- Tests all 11 file types (PNG, JPG, GIF, PDF, SVG, TIFF, DOCX, XLSX, PPTX, XML, CSV)
- Verifies correct file extensions
- Validates content structure for text-based formats
- Checks for required metadata in files

### Integration Tests (2 tests)
- Verifies all tools are properly exported
- Validates all tools have required properties (id, name, render function)

## Continuous Integration

Tests run automatically on:
- **Push to main branch** - All tests must pass
- **Pull requests** - Tests verify changes before merge

### GitHub Actions Workflow
The workflow file `.github/workflows/test.yml` specifies:
- Runs on Node 16.x, 18.x, and 20.x for compatibility
- Installs dependencies with `npm ci`
- Runs test suite with coverage
- Uploads coverage to codecov on Node 20.x

## Test Results

After running tests, you should see output like:
```
PASS  testing-tools/tools.test.js
  Counter String Tool
    ✓ generateCounterstring creates correct length
    ✓ generateCounterstring creates exact length for various inputs
    ✓ generateCounterstring contains asterisks and numbers
    ...
  
  Paragraph Generator Tool
    ✓ wordPool exists and has content
    ✓ generateParagraph creates correct word count
    ...
    
  Text Counter Tool
    ✓ MAX_LENGTH constant exists
    ✓ updateCounts correctly counts characters
    ...
    
  File Generator Tool
    ✓ Tool object structure
    ✓ generateFile supports all file types
    ...
    
  Integration Tests
    ✓ All tools are properly exported
    ✓ All tools have required properties

Test Suites: 1 passed, 1 total
Tests:       30 passed, 30 total
```

## Adding New Tests

When adding new features to the tools, please add corresponding tests:

1. Edit `testing-tools/tools.test.js`
2. Add test cases for the new functionality
3. Run `npm test` to verify tests pass
4. Commit both code and test changes together

## Test Framework

This project uses **Jest** for testing:
- Official documentation: https://jestjs.io/
- Jest matchers guide: https://jestjs.io/docs/expect

## Troubleshooting

### Tests fail on Windows
Some line-ending issues may occur. Try:
```bash
git config core.autocrlf true
npm test
```

### Module not found errors
Ensure you've run `npm install` and all dependencies are installed.

### Performance issues
If tests are slow, try running a single test file:
```bash
npm test -- testing-tools/tools.test.js
```
