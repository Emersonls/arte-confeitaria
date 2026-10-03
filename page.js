 "use client";

import { useEffect, useMemo, useState } from "react";

const initialProducts = [
  { id: 1, category: "Bolos", name: "Bolo de Chocolate", description: "Bolo de chocolate com cobertura cremosa.", price: "A consultar", emoji: "🍫" },
  { id: 2, category: "Bolos", name: "Bolo Decorado", description: "Decoração personalizada para sua comemoração.", price: "A consultar", emoji: "🎂" },
  { id: 3, category: "Doces", name: "Brigadeiros Gourmet", description: "Doces artesanais para festas e presentes.", price: "A consultar", emoji: "🍬" },
  { id: 4, category: "Doces", name: "Doces Especiais", description: "Seleção de doces preparados sob encomenda.", price: "A consultar", emoji: "🧁" },
  { id: 5, category: "Tortas", name: "Torta Especial", description: "Torta artesanal com sabor escolhido por você.", price: "A consultar", emoji: "🥧" },
  { id: 6, category: "Encomendas Especiais", name: "Mesa de Doces", description: "Composição personalizada para sua festa.", price: "A consultar", emoji: "🎁" },
];

const categories = ["Todos", "Bolos", "Doces", "Tortas", "Encomendas Especiais"];
const whatsapp = "5512981966694";
const instagram = "https://www.instagram.com/arte.confeitaria.012026/";

function getProducts() {
  if (typeof window === "undefined") return initialProducts;
  try {
    const saved = localStorage.getItem("arte_confeitaria_products");
    return saved ? JSON.parse(saved) : initialProducts;
  } catch {
    return initialProducts;
  }
}

export default function Home() {
  const [products, setProducts] = useState(initialProducts);
  const [category, setCategory] = useState("Todos");
  const [admin, setAdmin] = useState(false);
  const [password, setPassword] = useState("");
  const [newProduct, setNewProduct] = useState({
    name: "", category: "Bolos", description: "", price: "", image: ""
  });

  useEffect(() => setProducts(getProducts()), []);

  const filtered = useMemo(
    () => category === "Todos" ? products : products.filter(p => p.category === category),
    [products, category]
  );

  function saveProducts(list) {
    setProducts(list);
    localStorage.setItem("arte_confeitaria_products", JSON.stringify(list));
  }

  function order(product) {
    const message = `Olá! Gostaria de encomendar: ${product.name}. Categoria: ${product.category}.`;
    window.open(`https://wa.me/${whatsapp}?text=${encodeURIComponent(message)}`, "_blank");
  }

  function loginAdmin(e) {
    e.preventDefault();
    if (password === "1234") {
      setAdmin(true);
      setPassword("");
    } else {
      alert("Senha incorreta.");
    }
  }

  function addProduct(e) {
    e.preventDefault();
    if (!newProduct.name.trim()) return;
    const item = {
      ...newProduct,
      id: Date.now(),
      price: newProduct.price || "A consultar",
      emoji: "🍰"
    };
    saveProducts([item, ...products]);
    setNewProduct({ name: "", category: "Bolos", description: "", price: "", image: "" });
  }

  function removeProduct(id) {
    if (confirm("Remover este produto?")) {
      saveProducts(products.filter(p => p.id !== id));
    }
  }

  return (
    <main>
      <header className="topbar">
        <a href="#inicio" className="brand-mini">ARTE <span>CONFEITARIA</span></a>
        <nav>
          <a href="#catalogo">Catálogo</a>
          <a href="#sobre">Sobre</a>
          <a href={instagram} target="_blank">Instagram</a>
          <a className="nav-button" href={`https://wa.me/${whatsapp}`} target="_blank">WhatsApp</a>
        </nav>
      </header>

      <section id="inicio" className="hero">
        <div className="hero-copy">
          <span className="eyebrow">ARTE CONFEITARIA</span>
          <h1>Doçura que <em>Conquista</em></h1>
          <p>Aqui tem muito mais que doce… tem carinho, sabor e momentos especiais.</p>
          <div className="hero-actions">
            <a href="#catalogo" className="primary">Ver catálogo</a>
            <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Quero fazer uma encomenda.")}`} target="_blank" className="secondary">Encomendar pelo WhatsApp</a>
          </div>
        </div>
        <div className="hero-art">
          <img src="/arte-confeitaria-logo.png" alt="Arte Confeitaria - Doçura que Conquista" />
        </div>
      </section>

      <section id="catalogo" className="catalog section">
        <div className="section-title">
          <span>FEITO COM CARINHO</span>
          <h2>Nosso catálogo</h2>
          <p>Escolha uma categoria e encontre sua próxima doçura.</p>
        </div>

        <div className="filters">
          {categories.map(c => (
            <button key={c} onClick={() => setCategory(c)} className={category === c ? "active" : ""}>{c}</button>
          ))}
        </div>

        <div className="grid">
          {filtered.map(product => (
            <article className="card" key={product.id}>
              <div className="product-image">
                {product.image ? <img src={product.image} alt={product.name} /> : <span>{product.emoji}</span>}
              </div>
              <div className="card-body">
                <small>{product.category}</small>
                <h3>{product.name}</h3>
                <p>{product.description}</p>
                <div className="card-bottom">
                  <strong>{product.price}</strong>
                  <button onClick={() => order(product)}>Encomendar</button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <section id="sobre" className="about section">
        <div>
          <span className="eyebrow">ARTE CONFEITARIA</span>
          <h2>Mais que doces.<br /><em>Momentos para lembrar.</em></h2>
        </div>
        <p>Trabalhamos com bolos, doces, tortas e encomendas especiais, preparados com cuidado para deixar sua comemoração ainda mais doce.</p>
      </section>

      <section className="cta">
        <h2>Tem uma ideia especial?</h2>
        <p>Fale conosco e monte sua encomenda.</p>
        <a href={`https://wa.me/${whatsapp}?text=${encodeURIComponent("Olá! Quero fazer uma encomenda especial.")}`} target="_blank">Falar no WhatsApp</a>
      </section>

      <footer>
        <div>
          <strong>ARTE CONFEITARIA</strong>
          <p>Doçura que Conquista</p>
        </div>
        <div className="footer-links">
          <a href={instagram} target="_blank">@Arte.confeitaria.012026</a>
          <a href={`https://wa.me/${whatsapp}`} target="_blank">+55 12 98196-6694</a>
        </div>
        <button className="admin-link" onClick={() => setAdmin(true)}>Área administrativa</button>
      </footer>

      {admin && (
        <div className="admin-overlay">
          {!password && !sessionStorage.getItem("arte_admin") ? (
            <form className="admin-login" onSubmit={loginAdmin}>
              <button type="button" className="close" onClick={() => setAdmin(false)}>×</button>
              <h2>Painel Arte Confeitaria</h2>
              <p>Acesso administrativo.</p>
              <input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} autoFocus />
              <button className="primary" type="submit">Entrar</button>
              <small>Senha inicial do protótipo: 1234</small>
            </form>
          ) : (
            <div className="admin-panel">
              <div className="admin-head">
                <div><span className="eyebrow">PAINEL</span><h2>Gerenciar catálogo</h2></div>
                <button className="close" onClick={() => setAdmin(false)}>×</button>
              </div>
              <form onSubmit={addProduct} className="product-form">
                <input placeholder="Nome do produto" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} required />
                <select value={newProduct.category} onChange={e => setNewProduct({...newProduct, category: e.target.value})}>
                  {categories.slice(1).map(c => <option key={c}>{c}</option>)}
                </select>
                <input placeholder="Descrição" value={newProduct.description} onChange={e => setNewProduct({...newProduct, description: e.target.value})} />
                <input placeholder="Preço (ex.: R$ 59,90)" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                <input placeholder="URL da foto (opcional)" value={newProduct.image} onChange={e => setNewProduct({...newProduct, image: e.target.value})} />
                <button className="primary" type="submit">Adicionar produto</button>
              </form>
              <div className="admin-list">
                {products.map(p => (
                  <div key={p.id}><span>{p.emoji} <b>{p.name}</b> — {p.category}</span><button onClick={() => removeProduct(p.id)}>Excluir</button></div>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </main>
  );
}
