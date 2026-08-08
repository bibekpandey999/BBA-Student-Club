import Footer from '@/components/Footer';
import Login from '@/components/login';

export default function LoginPage() {
  return (
    <main className="min-h-screen flex flex-col bg-gray-50">
      <div className="flex-grow flex items-center justify-center  pb-12 px-4">
        <Login />
      </div>
      <Footer />
    </main>
  );
}