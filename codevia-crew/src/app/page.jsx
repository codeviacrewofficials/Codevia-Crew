// Import Navbar and Footer for layout
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
// Import the HomePage component
import HomePage from '@/components/homepage';

export default function Home() {
  // Render Navbar, HomePage, and Footer for the main layout
  return (
    <div>
      <Navbar />
      <HomePage />
      <Footer />
    </div>
  );
}
