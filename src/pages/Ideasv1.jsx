import React, { useState, useEffect } from "react";
import { fetchIdeas } from "../services/api";
import Banner from "../components/Banner";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]); // Menyimpan data ideas
  const [loading, setLoading] = useState(true); // Status loading
  const [error, setError] = useState(null); // Menyimpan pesan error
  const [currentPage, setCurrentPage] = useState(1); // Halaman saat ini
  const [sortOrder, setSortOrder] = useState("-published_at"); // Urutan sorting
  const pageSize = 10; // Jumlah item per halaman

  // Mengambil data ideas dari API
  useEffect(() => {
    const loadIdeas = async () => {
      try {
        setLoading(true); // Mengaktifkan status loading
        const data = await fetchIdeas(currentPage, pageSize, sortOrder); // Panggil API
        console.log(data); // Debugging: Melihat data di console
        setIdeas(data.data); // Simpan data ke state
      } catch (err) {
        setError("Failed to load ideas"); // Set pesan error
      } finally {
        setLoading(false); // Matikan status loading
      }
    };

    loadIdeas();
  }, [currentPage, sortOrder]); // Efek berjalan setiap currentPage atau sortOrder berubah

  // Fungsi untuk toggle urutan sorting
  const handleSort = () => {
    setSortOrder((prev) =>
      prev === "-published_at" ? "published_at" : "-published_at"
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Banner */}
      <Banner />

      {/* Konten */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tombol Sort */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleSort}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Sort by Date {sortOrder === "-published_at" ? "↓" : "↑"}
          </button>
        </div>

        {/* Loading dan Error Handling */}
        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          // Grid Card Ideas
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                {/* Gambar Idea */}
                <img
                  src={idea.medium_image[0]?.url} // Ambil URL gambar dari medium_image
                  alt={idea.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  {/* Judul */}
                  <h2 className="text-xl font-semibold mb-2">{idea.title}</h2>
                  {/* Tanggal Publish */}
                  <p className="text-gray-600">{idea.published_at}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigasi Halaman */}
        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))} // Ke halaman sebelumnya
            disabled={currentPage === 1} // Disable jika sudah di halaman pertama
            className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="py-2">Page {currentPage}</span>
          <button
            onClick={() => setCurrentPage((prev) => prev + 1)} // Ke halaman berikutnya
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ideas;
