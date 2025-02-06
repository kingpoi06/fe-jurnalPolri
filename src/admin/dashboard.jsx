import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Navbar = () => {
  return (
    <nav className="bg-white p-4 shadow-md border-b">
      <div className="max-w-5xl mx-auto flex justify-center sm:justify-start items-center px-4">
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
      <div className="min-h-screen bg-gradient-to-b from-gray-100 to-yellow-200 p-6 md:p-10">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-6 text-gray-900">BERITA POLDA NTB</h2>
        <div className="relative flex items-center justify-center">
          <button
            onClick={prevSlide}
            className="absolute left-2 md:left-4 z-10 p-2 md:p-4 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <ChevronLeft size={28} />
          </button>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full max-w-5xl px-4">
            {loading ? (
              <p className="text-gray-700 col-span-full text-center">Loading...</p>
            ) : (
              newsData.slice(index, index + 3).map((news) => (
                <div
                  key={news.id}
                  className="bg-white rounded-lg shadow-md overflow-hidden transform transition-transform duration-500 hover:scale-105 hover:shadow-xl flex flex-col"
                >
                  <img
                    src={news.image}
                    alt={news.title}
                    className="w-full h-44 object-cover"
                  />
                  <div className="p-4 flex flex-col flex-grow">
                    <h3 className="font-bold text-lg text-gray-900">{news.title}</h3>
                    <p className="text-sm text-gray-600 mt-3 flex-grow">{news.description}</p>
                    <button 
                      onClick={() => handleReadMore(news.id)}
                      className="mt-4 w-full bg-success-600 text-white p-3 rounded-lg hover:bg-success-700 transition"
                    >
                      Selengkapnya
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
          <button
            onClick={nextSlide}
            className="absolute right-2 md:right-4 z-10 p-2 md:p-4 bg-white rounded-full shadow-lg hover:scale-110 transition-transform"
          >
            <ChevronRight size={28} />
          </button>
        </div>
      </div>
    </div>
  );
}
