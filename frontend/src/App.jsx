import { useState } from 'react';
import Navbar from './components/Navbar';
import ArticleBrowser from './pages/ArticleBrowser';
import ArticleView from './pages/ArticleView';
import NewArticle from './pages/NewArticle';

export default function App() {
  const [view, setView] = useState('browse');
  const [selectedId, setSelectedId] = useState(null);

  const openArticle = (id) => {
    setSelectedId(id);
    setView('view');
  };

  return (
    <div>
      <Navbar onNewArticle={() => setView('new')} />
      {view === 'browse' && <ArticleBrowser onSelect={openArticle} />}
      {view === 'view' && <ArticleView articleId={selectedId} onBack={() => setView('browse')} />}
      {view === 'new' && <NewArticle onCreated={openArticle} onCancel={() => setView('browse')} />}
    </div>
  );
}
