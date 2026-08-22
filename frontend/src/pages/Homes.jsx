import { useState, useEffect } from 'react';
import API from '../api/axiosConfig'; // Our custom Post Office
import ProductCard from '../components/ProductCard';

const Home = () => {
    // 1. State to hold the array of products from the database
    const [products, setProducts] = useState([]);
    
    // 2. State to track if the data is currently loading
    const [loading, setLoading] = useState(true);

    // 3. The Fetcher: Runs exactly once when the Home page loads
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                // GET request to our Node.js backend (which asks MongoDB)
                const response = await API.get('/products');
                
                // Save the data into React's live memory
                setProducts(response.data);
                
                // Turn off the loading spinner
                setLoading(false);
            } catch (error) {
                console.error('Error fetching products:', error);
                setLoading(false);
            }
        };

        fetchProducts(); // Execute the function
    }, []); // Empty array ensures this only runs on the first render

    // If data is still traveling through the internet, show this:
    if (loading) {
        return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>Loading marketplace...</h2>;
    }

    return (
        <div style={{ padding: '30px', maxWidth: '1200px', margin: '0 auto' }}>
            
            {/* Header Area */}
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
                <h1 style={{ margin: 0 }}>Latest Listings on Campus</h1>
            </div>

            {/* If there are no products in the database yet */}
            {products.length === 0 ? (
                <h3 style={{ textAlign: 'center', color: '#666' }}>No items listed yet. Be the first to sell!</h3>
            ) : (
                /* The Responsive Grid */
                <div style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                    gap: '25px'
                }}>
                    {/* Loop through the array and render a Card for every product */}
                    {products.map((product) => (
                        <ProductCard key={product._id} product={product} />
                    ))}
                </div>
            )}
        </div>
    );
};

export default Home;