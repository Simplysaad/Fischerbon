import Header from '../../Components/Header';
import Hero from '../../Components/Hero';

const PublicLayout = ({ children, header, hero }) => {
  return (
    <div className="min-h-screen flex flex-col font-sans text-gray-900 bg-gray-50">
      {/* Header */}
      <Header type={header} />
      {/* Hero Section */}
      {hero && <Hero hero={hero} />}
      {children}
      <footer className="bg-gray-100 relative bottom-0 min-w-screen py-8 text-center text-gray-600 select-none text-sm">
        &copy; {new Date().getFullYear()} FISCHERBON inc. All rights reserved.
      </footer>
    </div>
  );
};

export default PublicLayout;
