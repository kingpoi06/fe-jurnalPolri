import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  return (
    <nav className="bg-white p-4 flex justify-between items-center shadow-md border-b">
      <div className="flex items-center space-x-2">
        <img src="/logo.png" alt="Jurnal POLRI" className="w-8 h-8" />
        <h1 className="text-lg font-bold text-gray-800">JURNAL POLRI</h1>
      </div>
    </nav>
  );
};

export default function Dashboard() {
  const [newsData, setNewsData] = useState([]);
  const [index, setIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("/news");
        setNewsData(response.data);
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const nextSlide = () => {
    setIndex((prev) => (prev + 1) % newsData.length);
  };

  const prevSlide = () => {
    setIndex((prev) => (prev - 1 + newsData.length) % newsData.length);
  };

  const handleReadMore = (id) => {
    navigate(`/news/${id}`);
  };

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-yellow-200 p-10">
        <h2 className="text-4xl font-bold text-center mb-8 text-gray-900">BERITA POLDA NTB</h2>
        <div className="relative flex items-center justify-center">
          <button onClick={prevSlide} className="absolute left-4 z-10 p-4 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
            <ChevronLeft size={32} />
          </button>
          <div className="flex space-x-6 overflow-hidden w-full max-w-5xl">
            {loading ? (
              <p className="text-gray-700">Loading...</p>
            ) : (
              newsData.slice(index, index + 3).map((news) => (
                <div
                  key={news.id}
                  className="w-80 bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-xl flex flex-col justify-between"
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-5 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-gray-900">{news.title}</h3>
                    <p className="text-sm text-gray-600 mt-3 flex-grow">{news.description}</p>
                    <button 
                      onClick={() => handleReadMore(news.id)}
                      className="mt-5 w-full bg-blue-600 text-white p-3 rounded-lg hover:bg-blue-700 transition"
                    >
                      Selengkapnya
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <button onClick={nextSlide} className="absolute right-4 z-10 p-4 bg-white rounded-full shadow-lg hover:scale-110 transition-transform">
            <ChevronRight size={32} />
          </button>
        </div>
      </div>
    </div>
  );
}
