import './index.css'
import './App.css'
import { AppRouter } from './router/Router'
import { Header } from './components/templates/Header'

function App() {
  return (
    <>
      <Header />
      <AppRouter />
    </>
  )
}

export default App
