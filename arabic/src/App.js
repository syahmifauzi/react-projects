import React, { useState } from 'react';
import './App.css';

import AppLogo from './components/AppLogo';
import AppHeader from './components/AppHeader';
import AppContent from './components/AppContent';
import AppFooter from './components/AppFooter';

const LESSONS = [
  {
    title: 'الضَّمَائِرُ',
    subtitle: 'Kata Ganti Nama',
    description: 'Learn Dhomir Munfasil & Muttasil Interactively',
  },
  {
    title: 'أَسْمَاءُ الْإِشَارَةِ',
    subtitle: 'Kata Nama Tunjuk',
    description: 'Learn Ism Isyarah Interactively',
  },
  {
    title: 'الفِعْلُ الْمَاضِي',
    subtitle: 'Kata Kerja Masa Lampau',
    description: "Learn Fi'il Madhi Interactively",
  },
  {
    title: 'الفِعْلُ الْمُضَارِعُ',
    subtitle: 'Kata Kerja Masa Kini',
    description: "Learn Fi'il Mudhori' Interactively",
  },
];

const App = () => {
  const [states, setStates] = useState({ active: -1, en: false, ms: false });

  return (
    <div className="app-wrapper">
      <AppLogo />
      <AppHeader lessons={LESSONS} states={states} setStates={setStates} />
      <AppContent lessons={LESSONS} states={states} setStates={setStates} />
      <AppFooter />
    </div>
  );
};

export default App;
