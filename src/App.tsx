import { useEffect, useState } from "react";
import { IntlProvider } from "react-intl";
import { Home } from "./pages/Home";
import { Link, Route, Routes, matchPath, useLocation } from "react-router-dom";
import "./App.css"

function App() {
  const [locale, setLocale] = useState(undefined);
  const { pathname } = useLocation();
  const match = matchPath({ path: "/:lang/*" }, pathname);

  useEffect(() => {
    (async () => {
      const resp = await fetch(`/lang/${match?.params?.["lang"]}.json`);
      const data = await resp.json();
      setLocale(data);
    })();
  });
  return (
    <IntlProvider locale="en" messages={locale}>
      <div className="App">
        <Link className="link" to="zh-tw/home">繁體中文</Link>
        <Link className="link" to="zh-cn/home">簡體中文</Link>
        <Routes>
          <Route path=":lang/home" element={<Home />}></Route>
        </Routes>
      </div>
    </IntlProvider>
  );
}

export default App;
