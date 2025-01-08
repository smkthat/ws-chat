# WS Chat

WS Chat is a simple WebSocket-based chat application that allows users to communicate in real-time. The application is
built using TypeScript, Vite, and FlyonUI (TailwindCSS), and it features a user-friendly interface with support for multiple
users.

## Features

- Real-time messaging using WebSockets
- User-friendly interface with TailwindCSS
- Display of online users
- Informational messages for user join and leave events
- Modular code structure for easy maintenance

## Prerequisites

Before you begin, ensure you have met the following requirements:

- `Node.js` (version 18 or higher)
- `npm` or `pnpm` (for package management)

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/smkthat/ws-chat.git
   cd ws-chat
   ```

2. Install the dependencies:

   ```bash
   pnpm install
   ```

## Usage

### Development

To start the development server, run:

```bash
pnpm dev
```

This will start the Vite development server and open the application in your default web browser.

### WebSocket Server

To start the WebSocket server, run:

```bash
pnpm ws
```

This will start the WebSocket server on `ws://localhost:8080`.

### Install & run

Setup project and run development using Makefile

```bash
make
```

### Build

To build the project for production, run:

```bash
pnpm build
```

This will compile the TypeScript code and bundle the application using Vite.

### Preview

To preview the production build, run:

```bash
pnpm preview
```

This will start a local server to preview the built application.

## Project Structure

- `src/`: Contains the source code for the application
    - `chat.ts`: Main chat functionality
    - `main.ts`: Entry point for the application
    - `assets/styles/`: Contains the CSS styles
- `server.js`: WebSocket server implementation
- `index.html`: Main HTML file
- `tailwind.config.js`: TailwindCSS configuration
- `vite.config.ts`: Vite configuration

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License. See the `LICENSE` file for more information.

---

Feel free to customize this README.md to better fit your project's specifics and add any additional information that
might be relevant to users or contributors.