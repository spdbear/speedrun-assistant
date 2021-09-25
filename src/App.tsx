import React from 'react';

import { initClient, getSheetData } from "./client/spreadsheet"

function App() {
  return (
    <div className="App">
      <h1>React App</h1>
      <button onClick={initClient}>Initialize</button>
      <button onClick={getSheetData}>Get Data</button>
    </div>
  );
}

export default App;
