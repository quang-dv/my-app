import './Home.css';
import Example from '../components/editor/Example';

export default function Home() {
  return (
    <>
      <header className="header">
        <nav className="navbar">
          <div className="logo">MyWebsite</div>
          <ul className="nav-links">
            <li><a href="#home">Trang Chủ</a></li>
            <li><a href="#about">Về Chúng Tôi</a></li>
            <li><a href="#services">Dịch Vụ</a></li>
            <li><a href="#contact">Liên Hệ</a></li>
          </ul>
        </nav>
      </header>

      <main className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">Chào mừng đến với website của chúng tôi</h1>
          <p className="hero-subtitle">Khám phá những nội dung tuyệt vời và dịch vụ chất lượng</p>
          <button className="cta-button">Khám Phá Ngay</button>
        </div>
      </main>

      <section>
        <Example />
      </section>

      <footer className="footer">
        <p>&copy; 2026 MyWebsite. All rights reserved.</p>
      </footer>
    </>
  );
}
