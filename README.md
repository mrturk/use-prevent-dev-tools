# use-prevent-dev-tools

A React hook that prevents opening the browser's developer tools in production mode.

## Installation

```bash
npm install use-prevent-dev-tools
```

## Usage

```bash
import React from "react";
import usePreventDevTools from "use-prevent-dev-tools";

const App = () => {
  //To lock the developer tools, set lockDevTools to true.

  const devtoolsOpen = usePreventDevTools({ lockDevTools: false });

  return (
    <div>
      <h1>My React App</h1>
      {devtoolsOpen && <p>Developer tools are open!</p>}
      {!devtoolsOpen && <p>Developer tools are closed.</p>}
    </div>
  );
};

export default App;
```

### Author

Yunus Emre Çıracı  
[LinkedIn](https://www.linkedin.com/in/yunus-emre-%C3%A7%C4%B1rac%C4%B1-a92860200/) <!-- LinkedIn profil bağlantınızı buraya ekleyin -->
