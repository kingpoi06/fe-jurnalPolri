import React, { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
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

export default function NewsDetail() {
  const { id } = useParams();
  const [newsData, setNewsData] = useState([]);
  const [article, setArticle] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const response = await axios.get("https://api-jurnalpolri.onrender.com/news");
        setNewsData(response.data);
        const foundArticle = response.data.find((news) => news.id.toString() === id);
        setArticle(foundArticle);
      } catch (error) {
        console.error("Error fetching news data:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchNews();
  }, [id]);

  if (loading) {
    return <p className="text-center text-gray-700">Loading...</p>;
  }

  if (!article) {
    return <p className="text-center text-red-500">Artikel tidak ditemukan</p>;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-screen bg-gray-100 p-6 md:p-10">
        <div className="max-w-5xl mx-auto bg-white p-6 rounded-lg shadow-lg flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">
          <div className="w-full md:w-2/3">
            <h1 className="text-2xl md:text-3xl font-bold mb-2">{article.title}</h1>
            <p className="text-gray-500 mb-4">
              <strong>{article.date}</strong> | <span>{article.author}</span>
            </p>
            <img
              src={article.image}
              alt={article.title}
              className="w-full rounded-lg mb-4"
            />
            <p className="text-gray-700 leading-relaxed text-justify">{article.content}</p>
          </div>

          {/* BERITA LAINNYA */}
          <div className="w-full md:w-1/3">
            <h2 className="text-lg font-bold mb-4">Berita Lainnya</h2>
            {newsData
              .filter((n) => n.id.toString() !== id)
              .map((news) => (
                <Link to={`/news/${news.id}`} key={news.id}>
                  <div className="mb-4 flex space-x-4 items-center hover:bg-gray-100 p-2 rounded-lg transition">
                    <img src={news.image} alt={news.title} className="w-16 h-16 rounded-lg" />
                    <p className="text-sm font-semibold text-gray-800">{news.title}</p>
                  </div>
                </Link>
              ))}
          </div>
        </div>
      </div>
    </div>
  );
}
