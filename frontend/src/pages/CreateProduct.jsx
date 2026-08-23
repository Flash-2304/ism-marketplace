import { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import API from '../api/axiosConfig'; 

const CreateProduct = () => {
    // 1. State for the text details
    const [name, setName] = useState('');
    const [price, setPrice] = useState('');
    const [description, setDescription] = useState('');
    const [category, setCategory] = useState('Electronics'); // Default match to our Day 4 Schema
    
    // 2. State for the Image File and Loading status
    const [image, setImage] = useState(null);
    const [uploading, setUploading] = useState(false);
    
    const { user } = useContext(AuthContext);
    const navigate = useNavigate();

    // The bouncer: If they somehow got here without logging in, block them.
    if (!user) {
        return <h2 style={{ textAlign: 'center', marginTop: '50px' }}>You must be logged in to sell items.</h2>;
    }

    // Function to handle the file selection
    const handleImageChange = (e) => {
        // e.target.files is an array of selected files. We just want the first one [0].
        setImage(e.target.files[0]); 
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!image) {
            alert("Please select an image!");
            return;
        }

        setUploading(true); // Disable the button so they don't click it twice

        try {
            // STEP A: Upload the Image First
            // We must use FormData because we are sending a physical file, not just text
            const formData = new FormData();
            formData.append('image', image);

            const uploadResponse = await API.post('/upload', formData, {
                headers: { 'Content-Type': 'multipart/form-data' } // Tells the server to expect a file
            });

            // The backend responds with the secure Cloudinary URL
            const imageUrl = uploadResponse.data.imageUrl;

            // STEP B: Save the Product to the Database
            // Now we send the standard text payload, including the new image URL
            await API.post('/products', {
                name,
                price: Number(price), // Convert string to a number for our database
                description,
                category,
                imageUrl,
            });

            alert('Item listed successfully!');
            navigate('/'); // Instantly redirect them to the Home Grid to see their item!
            
        } catch (error) {
            console.error(error);
            alert('Failed to list item. Please try again.');
        } finally {
            setUploading(false); // Re-enable the button
        }
    };

    return (
        <div style={{ maxWidth: '500px', margin: '40px auto', padding: '20px', backgroundColor: '#f9f9f9', borderRadius: '8px', border: '1px solid #ddd' }}>
            <h2>Sell an Item</h2>
            
            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                
                <div>
                    <label>Item Name</label>
                    <input type="text" placeholder="e.g., Engineering Physics Textbook or iPad Air" required 
                           style={{ width: '100%', padding: '8px' }}
                           onChange={(e) => setName(e.target.value)} />
                </div>

                <div>
                    <label>Price (₹)</label>
                    <input type="number" placeholder="e.g., 500" required 
                           style={{ width: '100%', padding: '8px' }}
                           onChange={(e) => setPrice(e.target.value)} />
                </div>

                <div>
                    <label>Category</label>
                    <select value={category} onChange={(e) => setCategory(e.target.value)} style={{ width: '100%', padding: '8px' }}>
                        <option value="Electronics">Electronics</option>
                        <option value="Books">Books</option>
                        <option value="Hostel Essentials">Hostel Essentials</option>
                        <option value="Bicycles">Bicycles</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div>
                    <label>Description</label>
                    <textarea placeholder="Describe the condition, how old it is, etc." required 
                              rows="4" style={{ width: '100%', padding: '8px' }}
                              onChange={(e) => setDescription(e.target.value)} />
                </div>

                <div>
                    <label>Upload Image (Max 5MB)</label>
                    <input type="file" accept="image/*" required 
                           onChange={handleImageChange} 
                           style={{ width: '100%', marginTop: '5px' }} />
                </div>

                <button type="submit" disabled={uploading} 
                        style={{ padding: '12px', background: uploading ? '#ccc' : '#000', color: 'white', border: 'none', cursor: uploading ? 'not-allowed' : 'pointer', fontWeight: 'bold' }}>
                    {uploading ? 'Uploading to Campus Database...' : 'List Item for Sale'}
                </button>
            </form>
        </div>
    );
};

export default CreateProduct;