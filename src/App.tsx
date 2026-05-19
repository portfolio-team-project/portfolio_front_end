import {Provider} from "react-redux";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css'
import store from "./store/store";
import EntryPage from "./components/pages/main/EntryPage";
import Layout from "./components/main/Layout";
import SangwonPage from "./components/pages/main/SangwonPage";
import EuigwangPage from "./components/pages/main/EuigwangPage";
import QnA from "./components/pages/qna/qna";

function App() {

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/" element={<EntryPage />} />
          <Route element={<Layout />}>
            <Route path="/sangwon" element={<SangwonPage />} />
            <Route path="/euigwang" element={<EuigwangPage />} />
            <Route path="/qna" element={<QnA />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
