# Excel Company Data Comparison Tool

This project is a React application that allows you to import Excel data containing company information, fetch additional data from an API (ARES), and compare it with the imported data.

## Features

- Import Excel file with company data
- Fetch company names from ARES API using their Business Id number (IČO)
- Compare imported company names with fetched names
- Export processed data to Excel

## Technology used

- React
- XLSX (Excel library for JavaScript)
- CSS
- API - ARES (https://ares.gov.cz/stranky/vyvojar-info)

## Project Setup

To set up the project on your local machine, follow these steps:

### `git clone <repository-url>`

Clone the repository to your local machine. Replace "<repository-url>" with the URL of our GitHub repository.

### `npm install`

Install the project dependencies. This command will read the package.json file and install all the required packages.

### `npm start`

Runs the app in the development mode.
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

## Usage

### Import Data:

Click on the "Zvolit soubor" button to select an Excel file (.xlsx) containing company data.
Click "Porovnat" (Compare) to fetch company names from ARES API and compare them with the imported data.

### Export Data:

Once comparison is done, click on "Export" to download the processed data as an Excel file (export.xlsx).


## Plan for next development

- add address comparison


