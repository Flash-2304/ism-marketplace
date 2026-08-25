import { useState, useEffect, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Link } from 'react-router-dom';
import API from '../api/axiosConfig';

const Profile = () => {
    const { user } = useContext(AuthContext);
    const [myProducts, setMyProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchMyProducts = async () => {
            try {
                const response = await API.get('/products/my-listings');
                setMyProducts(response.data);
            } catch (error) {
                console.error("Error fetching your listings", error);
            } finally {
                setLoading(false);
            }
        };
        fetchMyProducts();
    }, []);

    // --- THE DAY 7 ACTIONS WIRING ---
    
    const handleDelete = async (id) => {
        if (window.confirm("Are you sure you want to permanently delete this listing?")) {
            try {
                await API.delete(`/products/${id}`);
                // Magically remove the item from the screen without refreshing the page!
                setMyProducts(myProducts.filter((item) => item._id !== id));
                alert("Item deleted.");
            } catch (error) {
                alert("Failed to delete item.");
            }
        }
    };

    const handleMarkSold = async (id) => {
        try {
            const response = await API.put(`/products/${id}/sold`);
            // Find the specific item in our state array and update its isSold status
            setMyProducts(myProducts.map((item) => 
                item._id === id ? response.data : item
            ));
        } catch (error) {
            alert("Failed to update status.");
        }
    };

    if (!user) return <h2 style={{ textAlign: 'center', color: 'white' }}>Please log in.</h2>;
    if (loading) return <h2 style={{ textAlign: 'center', color: 'white' }}>Loading your dashboard...</h2>;

    return (
        <div style={{ maxWidth: '1000px', margin: '40px auto', padding: '20px', color: 'white' }}>
            <h2 style={{ borderBottom: '1px solid #333', paddingBottom: '10px' }}>
                Dashboard for {user.name}
            </h2>

            {myProducts.length === 0 ? (
                <p style={{ color: '#888' }}>You haven't listed any items for sale yet.</p>
            ) : (
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '20px', marginTop: '20px' }}>
                    
                    {myProducts.map((product) => (
                        <div key={product._id} style={{ backgroundColor: '#1a1a1a', border: '1px solid #333', borderRadius: '8px', padding: '15px', display: 'flex', flexDirection: 'column' }}>
                            
                            <h3 style={{ margin: '0 0 10px 0' }}>{product.name}</h3>
                            <p style={{ margin: '0 0 15px 0', color: '#00ffcc', fontSize: '18px', fontWeight: 'bold' }}>₹{product.price}</p>
                            
                            {/* Status Badge */}
                            <div style={{ marginBottom: '15px' }}>
                                {product.isSold ? (
                                    <span style={{ backgroundColor: '#ff4444', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>SOLD OUT</span>
                                ) : (
                                    <span style={{ backgroundColor: '#28a745', color: 'white', padding: '4px 8px', borderRadius: '4px', fontSize: '12px' }}>ACTIVE</span>
                                )}
                            </div>

                            {/* Action Buttons */}
                            <div style={{ display: 'flex', gap: '10px', marginTop: 'auto' }}>
                                <Link to={`/product/${product._id}`} style={{ flex: 1, textAlign: 'center', padding: '8px', backgroundColor: '#333', color: 'white', textDecoration: 'none', borderRadius: '4px' }}>
                                    View
                                </Link>
                                
                                {!product.isSold && (
                                    <button onClick={() => handleMarkSold(product._id)} style={{ flex: 1, padding: '8px', backgroundColor: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                        Mark Sold
                                    </button>
                                )}
                                
                                <button onClick={() => handleDelete(product._id)} style={{ padding: '8px 12px', backgroundColor: '#dc3545', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>
                                    Delete
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default Profile;