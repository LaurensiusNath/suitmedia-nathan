import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import Banner from "../components/Banner";
import { fetchIdeas } from '../services/api';

const Ideas = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Get values from URL or use defaults
  const currentPage = parseInt(searchParams.get('page') || '1');
  const pageSize = parseInt(searchParams.get('size') || '10');
  const sortOrder = searchParams.get('sort') || '-published_at';

  useEffect(() => {
    const loadIdeas = async () => {
      try {
        setLoading(true);
        const data = await fetchIdeas(currentPage, pageSize, sortOrder);
        setIdeas(data.data);
      } catch (err) {
        setError('Failed to load ideas');
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

  const handleSort = () => {
    updateParams({ 
      sort: sortOrder === '-published_at' ? 'published_at' : '-published_at' 
    });
  };

  const handlePageSizeChange = (e) => {
    updateParams({ 
      size: e.target.value,
      page: '1' // Reset to first page when changing page size
    });
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <div className="min-h-screen bg-gray-100 pt-16">
      <Banner />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-4">
          <select
            value={pageSize}
            onChange={handlePageSizeChange}
            className="bg-white border border-gray-300 rounded px-3 py-2"
          >
            <option value="10">10 per page</option>
            <option value="20">20 per page</option>
            <option value="50">50 per page</option>
          </select>

          <button
            onClick={handleSort}
            className="bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
          >
            Sort by Date {sortOrder === '-published_at' ? '↓' : '↑'}
          </button>
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
                className="bg-white rounded-lg shadow overflow-hidden hover:shadow-lg transition-shadow duration-300"
              >
                <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                  {idea.medium_image?.[0]?.path && (
                    <img
                      src={idea.medium_image[0].path}
                      alt={idea.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2 line-clamp-3 hover:line-clamp-none min-h-[4.5rem]">
                    {idea.title}
                  </h2>
                  <p className="text-gray-600 text-sm">
                    {formatDate(idea.published_at)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-8 flex justify-center space-x-4">
          <button
            onClick={() => updateParams({ page: (currentPage - 1).toString() })}
            disabled={currentPage === 1}
            className="bg-orange-500 text-white px-4 py-2 rounded disabled:bg-gray-300"
          >
            Previous
          </button>
          <span className="py-2">Page {currentPage}</span>
          <button
            onClick={() => updateParams({ page: (currentPage + 1).toString() })}
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