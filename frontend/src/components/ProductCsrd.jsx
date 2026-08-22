import { Link } from 'react-router-dom';

// We pass 'product' as a prop. This object contains all the details from MongoDB.
const ProductCard = ({ product }) => {
    return (
        <div style={{
            border: '1px solid #e0e0e0',
            borderRadius: '12px',
            overflow: 'hidden',
            backgroundColor: '#ffffff',
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s',
            cursor: 'pointer',
            display: 'flex',
            flexDirection: 'column'
        }}>
            {/* The Product Image from Cloudinary */}
            <div style={{ height: '200px', overflow: 'hidden' }}>
                <img 
                    src={product.imageUrl} 
                    alt={product.name} 
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
            </div>

            {/* The Product Details */}
            <div style={{ padding: '15px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                
                {/* Category Badge */}
                <span style={{
                    alignSelf: 'flex-start',
                    backgroundColor: '#e6f7ff',
                    color: '#0050b3',
                    padding: '4px 8px',
                    borderRadius: '4px',
                    fontSize: '12px',
                    fontWeight: 'bold'
                }}>
                    {product.category}
                </span>

                <h3 style={{ margin: 0, fontSize: '18px', color: '#333' }}>{product.name}</h3>
                <h4 style={{ margin: 0, color: '#28a745', fontSize: '20px' }}>₹{product.price}</h4>
                
                {/* We will build the actual details page on Day 12 */}
                <Link to={`/product/${product._id}`} style={{
                    marginTop: '10px',
                    padding: '10px',
                    backgroundColor: '#000',
                    color: '#fff',
                    textAlign: 'center',
                    textDecoration: 'none',
                    borderRadius: '6px',
                    fontWeight: 'bold'
                }}>
                    View Details
                </Link>
            </div>
        </div>
    );
};

export default ProductCard;