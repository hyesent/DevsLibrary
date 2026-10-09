import { useEffect } from 'react';
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

import Layout from './components/Layout.jsx';
import Lesson from './components/Lesson.jsx';
import { Home, Book, Lists, Glossary } from './components/Modals.jsx';
import { applyTheme, applyFontSize, getTheme, getFontSize } from './lib/storage.js';

/* ------------------------------------------------------------------ */
/* Android hardware back button → router back (not app close)         */
/* ------------------------------------------------------------------ */
function BackButtonHandler() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    if (!Capacitor.isNativePlatform()) return;

    const sub = CapApp.addListener('backButton', () => {
      if (location.pathname === '/') {
        CapApp.exitApp();
      } else {
        navigate(-1);
      }
    });

    return () => {
      sub.then((s) => s.remove());
    };
  }, [location.pathname, navigate]);

  return null;
}

/* ------------------------------------------------------------------ */
/* Scroll to top on route change (unless lesson restore kicks in)     */
/* ------------------------------------------------------------------ */
function ScrollReset() {
  const { pathname } = useLocation();

  useEffect(() => {
    // Lesson page handles its own scroll restore, so skip there
    if (pathname.startsWith('/book/') && pathname.split('/').length === 4) return;
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

/* ------------------------------------------------------------------ */
/* App                                                                */
/* ------------------------------------------------------------------ */
export default function App() {
  // apply saved theme + font size on boot
  useEffect(() => {
    applyTheme(getTheme());
    applyFontSize(getFontSize());
  }, []);

  return (
    <BrowserRouter>
      <BackButtonHandler />
      <ScrollReset />

      <Layout>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/book/:bookId" element={<Book />} />
          <Route path="/book/:bookId/:lessonId" element={<Lesson />} />
          <Route path="/favourites" element={<Lists type="favourite" />} />
          <Route path="/bookmarks" element={<Lists type="bookmark" />} />
          <Route path="/notes" element={<Lists type="note" />} />
          <Route path="/glossary" element={<Glossary />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </Layout>
    </BrowserRouter>
  );
}