import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Banner from "../components/Banner";
import { fetchIdeas } from "../services/api";
import IdeasCard from "../components/IdeasCard";

const Ideas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    current_page: 1,
    total_pages: 1,
    total: 0,
  });

  const currentPage = parseInt(searchParams.get("page") || "1");
  const pageSize = parseInt(searchParams.get("size") || "10");
  const sortOrder = searchParams.get("sort") || "-published_at";

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        setLoading(true);
        const response = await fetchIdeas(currentPage, pageSize, sortOrder);
        setIdeas(response.data);
        setPagination({
          current_page: response.meta.current_page,
          total_pages: response.meta.last_page,
          total: response.meta.total,
        });
      } catch (err) {
        setError("Failed to load ideas");
      } finally {
        setLoading(false);
      }
    };

    loadIdeas();
  }, [currentPage, pageSize, sortOrder]);

  const updateParams = (updates) => {
    const newParams = new URLSearchParams(searchParams);
    Object.entries(updates).forEach(([key, value]) => {
      newParams.set(key, value);
    });
    setSearchParams(newParams);
  };

  const handleSort = (e) => {
    updateParams({
      sort: e.target.value,
      page: "1",
    });
  };

  const handlePageSizeChange = (e) => {
    updateParams({
      size: e.target.value,
      page: "1",
    });
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= pagination.total_pages) {
      updateParams({ page: newPage.toString() });
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(
      pagination.total_pages,
      startPage + maxVisiblePages - 1
    );

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(i);
    }

    return pageNumbers;
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Banner />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center">
            <p className="text-gray-600">
              Showing {(currentPage - 1) * pageSize + 1} -{" "}
              {Math.min(currentPage * pageSize, pagination.total)} of{" "}
              {pagination.total}
            </p>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <label htmlFor="showPerPage">Show per page:</label>
              <select
                value={pageSize}
                onChange={handlePageSizeChange}
                className="bg-white border border-gray-300 rounded px-3 py-2 rounded-full"
                name="showPerPage"
              >
                <option value="10">10</option>
                <option value="20">20</option>
                <option value="50">50</option>
              </select>
            </div>

            <div className="flex items-center gap-2">
              <label htmlFor="sortTime">Sort by:</label>

              <select
                value={sortOrder}
                onChange={handleSort}
                className="bg-white border border-gray-300 px-3 py-2 rounded-full"
                name="sortTime"
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
              <IdeasCard key={idea.id} idea={idea} formatDate={formatDate} />
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center items-center space-x-2">
          <button
            onClick={() => handlePageChange(1)}
            disabled={currentPage === 1}
            className="bg-orange-500 text-white px-3 py-1 rounded disabled:bg-gray-300"
          >
            First
          </button>
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-orange-500 text-white px-3 py-1 rounded disabled:bg-gray-300"
          >
            Previous
          </button>

          {getPageNumbers().map((pageNum) => (
            <button
              key={pageNum}
              onClick={() => handlePageChange(pageNum)}
              className={`px-3 py-1 rounded ${
                pageNum === currentPage
                  ? "bg-orange-600 text-white"
                  : "bg-white text-orange-500 hover:bg-orange-100"
              }`}
            >
              {pageNum}
            </button>
          ))}

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === pagination.total_pages}
            className="bg-orange-500 text-white px-3 py-1 rounded disabled:bg-gray-300"
          >
            Next
          </button>
          <button
            onClick={() => handlePageChange(pagination.total_pages)}
            disabled={currentPage === pagination.total_pages}
            className="bg-orange-500 text-white px-3 py-1 rounded disabled:bg-gray-300"
          >
            Last
          </button>
        </div>

        <div className="mt-4 text-center text-gray-600">
          Page {currentPage} of {pagination.total_pages}
        </div>
      </div>
    </div>
  );
};

export default Ideas;
