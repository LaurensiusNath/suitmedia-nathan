const API_BASE_URL = process.env.API_BASE_URL;

const fetchIdeas = async (pageNumber = 1, pageSize = 10, sort = '-published_at') => {
  try {
    const response = await fetch(
      `${API_BASE_URL}/ideas?page[number]=${pageNumber}&page[size]=${pageSize}&append[]=small_image&append[]=medium_image&sort=${sort}`,
      {
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
      }
    );
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    return await response.json();
  } catch (error) {
    console.error('Error fetching ideas:', error);
    throw error;
  }
};

export { fetchIdeas };
