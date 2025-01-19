import React, { useState, useEffect } from "react";
import { fetchIdeas } from "../services/api";
import Banner from "../components/Banner";

const Ideas = () => {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [sortOrder, setSortOrder] = useState("-published_at");
  const [pageSize, setPageSize] = useState(10);
  const totalItems = 280; // Sesuaikan total item dengan API

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        setLoading(true);
        const data = await fetchIdeas(currentPage, pageSize, sortOrder);
        setIdeas(data.data);
      } catch (err) {
        setError("Failed to load ideas");
      } finally {
        setLoading(false);
      }
    };

    loadIdeas();
  }, [currentPage, sortOrder, pageSize]);

  const handleSortChange = (e) => {
    setSortOrder(e.target.value);
  };

  const handlePageSizeChange = (e) => {
    setPageSize(Number(e.target.value));
  };

  return (
    <div className="min-h-screen bg-gray-100 mt-10">
      <Banner />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          {/* Info jumlah data */}
          <span>
            Showing {(currentPage - 1) * pageSize + 1} -{" "}
            {Math.min(currentPage * pageSize, totalItems)} of {totalItems}
          </span>

          {/* Pilihan per halaman */}
          <div className="flex space-x-4">
            <div>
              <label htmlFor="pageSize" className="mr-2">
                Show per page:
              </label>
              <select
                id="pageSize"
                value={pageSize}
                onChange={handlePageSizeChange}
                className="px-2 py-1 border rounded"
              >
                <option value={10}>10</option>
                <option value={20}>20</option>
                <option value={50}>50</option>
              </select>
            </div>

            {/* Pilihan sorting */}
            <div>
              <label htmlFor="sortOrder" className="mr-2">
                Sort by:
              </label>
              <select
                id="sortOrder"
                value={sortOrder}
                onChange={handleSortChange}
                className="px-2 py-1 border rounded"
              >
                <option value="-published_at">Newest</option>
                <option value="published_at">Oldest</option>
              </select>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="text-center py-8">Loading...</div>
        ) : error ? (
          <div className="text-center text-red-500 py-8">{error}</div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {ideas.map((idea) => (
              <div
                key={idea.id}
                className="bg-white rounded-lg shadow overflow-hidden"
              >
                <img
                  src={idea.medium_image[0]?.url}
                  alt={idea.title}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <p className="text-sm text-gray-500 mb-1">
                    {new Date(idea.published_at).toLocaleDateString("en-GB", {
                      day: "numeric",
                      month: "long",
                      year: "numeric",
                    })}
                  </p>
                  <h2 className="text-lg font-semibold text-gray-900 truncate">
                    {idea.title}
                  </h2>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Navigasi Halaman */}
        <div className="mt-8 flex justify-center space-x-2">
          {/* Tombol Previous */}
          <button
            onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            &laquo;
          </button>

          {/* Tombol Pagination */}
          {Array.from({ length: Math.ceil(totalItems / pageSize) }).map(
            (_, index) => {
              const page = index + 1;
              // Logika untuk menampilkan tombol yang relevan
              if (
                page === 1 || // Tombol pertama
                page === Math.ceil(totalItems / pageSize) || // Tombol terakhir
                (page >= currentPage - 1 && page <= currentPage + 1) // Tombol sekitar halaman aktif
              ) {
                return (
                  <button
                    key={page}
                    onClick={() => setCurrentPage(page)}
                    className={`px-3 py-1 rounded ${
                      currentPage === page
                        ? "bg-orange-500 text-white"
                        : "bg-gray-200 hover:bg-gray-300"
                    }`}
                  >
                    {page}
                  </button>
                );
              }

              // Menampilkan ellipsis sebagai placeholder
              if (
                (page === currentPage - 2 && page > 2) || // Ellipsis sebelum halaman aktif
                (page === currentPage + 2 &&
                  page < Math.ceil(totalItems / pageSize) - 1) // Ellipsis setelah halaman aktif
              ) {
                return (
                  <span key={page} className="px-2 py-1">
                    ...
                  </span>
                );
              }

              return null; // Tidak menampilkan tombol yang tidak relevan
            }
          )}

          {/* Tombol Next */}
          <button
            onClick={() =>
              setCurrentPage((prev) =>
                Math.min(prev + 1, Math.ceil(totalItems / pageSize))
              )
            }
            disabled={currentPage === Math.ceil(totalItems / pageSize)}
            className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
          >
            &raquo;
          </button>
        </div>
      </div>
    </div>
  );
};

export default Ideas;
