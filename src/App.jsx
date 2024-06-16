import { Suspense, lazy } from "react";
// import SearchPage from "./pages/SearchPage"
const SearchPage = lazy(() => import("./pages/SearchPage"))
import { BrowserRouter, Routes, Route } from "react-router-dom"

function App() {

  return (
    <>
      <Suspense fallback={<div className="flex items-center justify-center h-screen w-screen bg-indigo-100">
        <h2 className=" text-5xl text-gray-700 font-semibold">Loading...</h2>
      </div>}>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<SearchPage />} />
          </Routes>
        </BrowserRouter>
      </Suspense>
    </>
  )
}

export default App
