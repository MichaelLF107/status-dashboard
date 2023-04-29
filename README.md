💻 Preview it live on [Code Sandbox](https://codesandbox.io/p/github/MichaelLF107/status-dashboard/code-sandbox?layout=%257B%2522activeFilepath%2522%253A%2522%252FREADME.md%2522%252C%2522openFiles%2522%253A%255B%2522%252FREADME.md%2522%255D%252C%2522sidebarPanel%2522%253A%2522EXPLORER%2522%252C%2522gitSidebarPanel%2522%253A%2522COMMIT%2522%252C%2522fullScreenDevtools%2522%253Afalse%252C%2522rootPanelGroup%2522%253A%257B%2522direction%2522%253A%2522vertical%2522%252C%2522type%2522%253A%2522PANEL_GROUP%2522%252C%2522id%2522%253A%2522DEVTOOLS_PANELS%2522%252C%2522panels%2522%253A%255B%257B%2522type%2522%253A%2522PANEL%2522%252C%2522panelType%2522%253A%2522TABS%2522%252C%2522id%2522%253A%2522clgxvb5j900093b6n1y8b7mfg%2522%257D%255D%252C%2522sizes%2522%253A%255B100%255D%257D%252C%2522tabbedPanels%2522%253A%257B%2522clgxvb5j900093b6n1y8b7mfg%2522%253A%257B%2522id%2522%253A%2522clgxvb5j900093b6n1y8b7mfg%2522%252C%2522tabs%2522%253A%255B%257B%2522type%2522%253A%2522TASK_LOG%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522id%2522%253A%2522clgxvbn7u00693b6nnmz0pdso%2522%257D%252C%257B%2522type%2522%253A%2522TASK_PORT%2522%252C%2522taskId%2522%253A%2522dev%2522%252C%2522port%2522%253A3000%252C%2522id%2522%253A%2522clgxvbod300ai3b6n3vjz8ftg%2522%252C%2522path%2522%253A%2522%252F%2522%257D%255D%252C%2522activeTabId%2522%253A%2522clgxvbod300ai3b6n3vjz8ftg%2522%257D%257D%252C%2522showSidebar%2522%253Atrue%252C%2522showDevtools%2522%253Atrue%252C%2522sidebarPanelSize%2522%253A15%252C%2522editorPanelSize%2522%253A30.17694072089136%252C%2522devtoolsPanelSize%2522%253A53.04823953423898%257D)

## Status Dashboard

This project is a dashboard for displaying information from servers, including traffic, resource usage, and user type distribution. The project was built using Next.js, Prisma and Typescript.

## Features

- Display server traffic information.
- Display server resource usage.
- Display user type distribuition information.
- Display services status, uptime and version.

## Requirements

- Latest version of Node.js
- NPM or Yarn package manager
- Prisma CLI

## Installation

1. Clone the repository
```bash
git clone https://github.com/MichaelLF107/status-dashboard.git
```

2. Install project dependencies
```bash
npm install
#or
yarn
```

3. Create the .env file and place the url of your database on DATABASE_URL

4. Run database migrations
```bash
npx prisma migrate dev
```

### Usage

1. Start the development server
```bash
npm run dev
#or
yarn dev
```

2. Open `http://localhost:3000` on your browser
