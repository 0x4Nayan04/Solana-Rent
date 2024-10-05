# Solana Rent Calculator

A simple web application to calculate the Solana rent on the blockchain.

## Overview

This application provides a user-friendly interface to calculate the Solana rent based on the account data size. It uses the `calculateRentExemptionThreshold` function to determine the minimum balance required to exempt an account from rent.

## Features

- Calculate Solana rent based on account data size
- Toggle between light and dark mode
- User-friendly interface

## How it works

1. Enter the account data size in bytes
2. Click the "Calculate Rent" button
3. The application will calculate the minimum balance required to exempt the account from rent
4. The result will be displayed on the screen

## Functions

- `calculateRent`: Calculates the Solana rent based on the account data size
- `calculateRentExemptionThreshold`: Calculates the minimum balance required to exempt an account from rent
- `toggleTheme`: Toggles between light and dark mode

## Technologies used

- React
- TypeScript
- Tailwind CSS
- Vite

## Getting started

1. Clone the repository
2. Install dependencies using `npm install` or `yarn install`
3. Start the application using `npm run dev` or `yarn dev`
4. Open the application in your web browser

## Contributing

Contributions are welcome! Please submit a pull request with your changes.

## License

This application is licensed under the MIT License.

## Acknowledgments

- Solana blockchain for providing the rent calculation formula
- Lucide React for providing the icon components
