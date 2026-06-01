import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
export default function MainLayout({
  children
}) {
  return (
    <div className="dashboard-page">
      {/* =====================================================
      NAVBAR
      ===================================================== */}
      <Navbar />
      {/* =====================================================
      MAIN CONTENT
      ===================================================== */}
      <main className="dashboard-main">
        {children}
      </main>
      {/* =====================================================
      FOOTER
      ===================================================== */}
      <Footer />
    </div>
  );
}