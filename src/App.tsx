import {Provider} from "react-redux";
import {BrowserRouter as Router,Routes,Route} from "react-router-dom";
import './App.css'
import store from "./store/store";
import EntryPage from "./components/pages/main/EntryPage";
import Layout from "./components/main/Layout";
import SangwonPage from "./components/pages/main/SangwonPage";
import EuigwangPage from "./components/pages/main/EuigwangPage";
import QnA from "./components/pages/qna/qna";
import BoardList from "./components/pages/qna/BoardList";
import Boardwrite from "./components/pages/qna/Boardwrite";
import Faq from "./components/pages/qna/faq";

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
            <Route path="/BoardList" element={<BoardList />} />
            <Route path="/Boardwrite" element={<Boardwrite />} />
            <Route path="/faq" element={<Faq />} />
          </Route>
        </Routes>
      </Router>
    </Provider>
  )
}

export default App
