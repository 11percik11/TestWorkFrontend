import { Footer } from "./componets/Footer"

import { Header } from "./componets/Header"
import { Main } from "./componets/Main"

const App = () => {
  return (
    <div className="App">
      <header>
        <Header />
      </header>
      <main>
        <Main />
      </main>
      <footer>
        <Footer />
      </footer>
    </div>
  )
}

export default App
