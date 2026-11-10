import React, { lazy, Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { LanguageProvider } from "./LanguageContext";
import { PrecisionPortfolio } from "./components/PrecisionPortfolio";
const ConseilApp = lazy(() => import("./components/conseil/ConseilApp").then(({ ConseilApp }) => ({ default: ConseilApp })));

const App: React.FC = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <LanguageProvider>
                <PrecisionPortfolio />
              </LanguageProvider>
            }
          />
          <Route path="/es/*" element={<LanguageProvider><PrecisionPortfolio /></LanguageProvider>} />
          <Route
            path="/en/*"
            element={
              <LanguageProvider>
                <PrecisionPortfolio />
              </LanguageProvider>
            }
          />
          <Route
            path="/conseil/*"
            element={
              <Suspense
                fallback={<div className="min-h-screen bg-stone-50" aria-label="Chargement de la page Conseil" />}
              >
                <ConseilApp />
              </Suspense>
            }
          />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
