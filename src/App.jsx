import { useState } from 'react';
import './App.css';
import LayoutWebsiteClient from './components/Layouts/LayoutWebsite/LayoutClient'
import Home from './components/Home/Home'
import { Route, Routes } from 'react-router-dom'
function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
    <Routes>
      <Route path='/' element={<LayoutWebsiteClient/>}>       
        <Route index element={< Home/>} />
      </Route>
      {/* <Route path='*' element={<Result404/>} /> */}
    </Routes>
  </div>
  )
}

export default App
