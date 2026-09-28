export default function Navbar({ onNewArticle }) {
  return (
    <div className="navbar">
      <h1>📚 IT Support Knowledge Base</h1>
      <button className="new-article" onClick={onNewArticle}>+ New Article</button>
    </div>
  );
}
