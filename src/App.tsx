import {Provider} from "react-redux";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css'
import store from "./store/store";
import EntryPage from "./components/pages/EntryPage";
import Layout from "./components/main/Layout";
import SangwonPage from "./components/pages/SangwonPage";
import EuigwangPage from "./components/pages/EuigwangPage";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route element={<Layout />}>
            <Route path="/sangwon" element={<SangwonPage />} />
            <Route path="/euigwang" element={<EuigwangPage />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
