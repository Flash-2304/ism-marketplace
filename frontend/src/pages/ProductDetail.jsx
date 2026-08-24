import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import API from '../api/axiosConfig';

const ProductDetail = () => {
    // Grab the specific ID directly out of the web browser's URL
    const { id } = useParams(); 
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);

    // Fetch the data the exact millisecond the page loads
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await API.get(`/products/${id}`);
                setProduct(response.data);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching product", error);
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>Loading details...</h2>;
    if (!product) return <h2 style={{ textAlign: 'center', marginTop: '50px', color: 'white' }}>Item not found.</h2>;

    //The WhatsApp Generator
    // This formats a clickable link that opens WhatsApp directly on a phone or Mac/PC
    const whatsappMessage = `Hi ${product.user?.name}, I am interested in buying your "${product.name}" listed on the IIT ISM Marketplace.`;
    const whatsappLink = `https://wa.me/91${product.user?.whatsappNumber}?text=${encodeURIComponent(whatsappMessage)}`;

    return (
        <div style={{ maxWidth: '900px', margin: '40px auto', padding: '20px', color: 'white' }}>
            <Link to="/" style={{ color: '#00ffcc', textDecoration: 'none', marginBottom: '20px', display: 'inline-block' }}>
                &larr; Back to Listings
            </Link>

            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '40px', backgroundColor: '#1a1a1a', padding: '30px', borderRadius: '12px' }}>
                
                {/* Left Column: Image */}
                <div style={{ flex: '1 1 400px' }}>
                    <img 
                        src={product.imageUrl} 
                        alt={product.name} 
                        style={{ width: '100%', borderRadius: '8px', objectFit: 'cover' }} 
                    />
                </div>

                {/* Right Column: Details */}
                <div style={{ flex: '1 1 300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                    <span style={{ alignSelf: 'flex-start', backgroundColor: '#333', color: '#bbb', padding: '5px 10px', borderRadius: '4px', fontSize: '14px' }}>
                        {product.category}
                    </span>
                    
                    <h1 style={{ margin: 0 }}>{product.name}</h1>
                    <h2 style={{ margin: 0, color: '#00ffcc', fontSize: '32px' }}>₹{product.price}</h2>
                    
                    <div style={{ backgroundColor: '#2a2a2a', padding: '15px', borderRadius: '8px', marginTop: '10px' }}>
                        <h4 style={{ margin: '0 0 10px 0', color: '#888' }}>Description</h4>
                        <p style={{ margin: 0, lineHeight: '1.6' }}>{product.description}</p>
                    </div>

                    <div style={{ marginTop: '20px', padding: '20px', border: '1px solid #333', borderRadius: '8px' }}>
                        <p style={{ margin: '0 0 15px 0' }}>Listed by: **{product.user?.name}**</p>
                        
                        {/* The Magic Contact Button */}
                        <a href={whatsappLink} target="_blank" rel="noopener noreferrer" style={{
                            display: 'block',
                            textAlign: 'center',
                            backgroundColor: '#25D366', // Official WhatsApp Green
                            color: 'white',
                            padding: '12px',
                            borderRadius: '6px',
                            textDecoration: 'none',
                            fontWeight: 'bold',
                            fontSize: '16px'
                        }}>
                            Message Seller on WhatsApp
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;