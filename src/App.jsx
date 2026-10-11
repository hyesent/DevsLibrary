import { useEffect, useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { Capacitor } from '@capacitor/core';
import { App as CapApp } from '@capacitor/app';

import OpeningScreen from './OpeningScreen.jsx';
import ErrorBoundary from './components/ErrorBoundary.jsx';
import Layout from './components/Layout.jsx';
import Lesson from './components/Lesson.jsx';
import LabMode, {
  LabLanding,
  LabSaved,
  LabHistory,
} from './components/Lab.jsx';
import { Home, Book, Lists, Glossary } from './components/Modals.jsx';
import { applyTheme, applyFontSize, getTheme, getFontSize } from './lib/storage.js';

function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;
    const sub = CapApp.addListener('backButton', () => {
      if (location.pathname === '/') CapApp.exitApp();
      else navigate(-1);
    });
    return () => { sub.then((s) => s.remove()); };
  }, [location.pathname, navigate]);

  return null;
}

function ScrollReset() {
  const { pathname } = useLocation();
  useEffect(() => {
    if (pathname.startsWith('/book/') && pathname.split('/').length === 4) return;
    if (pathname.startsWith('/lab/')) return;
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

/* Routes wrapped in an error boundary that resets on navigation */
function AppRoutes() {
  const location = useLocation();
  return (
    <ErrorBoundary key={location.pathname}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/book/:bookId" element={<Book />} />
        <Route path="/book/:bookId/:lessonId" element={<Lesson />} />
        <Route path="/favourites" element={<Lists type="favourite" />} />
        <Route path="/bookmarks" element={<Lists type="bookmark" />} />
        <Route path="/notes" element={<Lists type="note" />} />
        <Route path="/glossary" element={<Glossary />} />

        <Route path="/lab" element={<LabLanding />} />
        <Route path="/lab/saved" element={<LabSaved />} />
        <Route path="/lab/history" element={<LabHistory />} />
        <Route path="/lab/:mode" element={<LabMode />} />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </ErrorBoundary>
  );
}

export default function App() {
  const [showOpening, setShowOpening] = useState(true);

  useEffect(() => {
    applyTheme(getTheme());
    applyFontSize(getFontSize());
  }, []);

  return (
    <>
      {showOpening && <OpeningScreen onFinish={() => setShowOpening(false)} />}

      <BrowserRouter>
        <BackButtonHandler />
        <ScrollReset />

        <Layout>
          <AppRoutes />
        </Layout>
      </BrowserRouter>
    </>
  );
}