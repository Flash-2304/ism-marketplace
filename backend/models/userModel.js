const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'Please add a name'],
        },
        email: {
            type: String,
            required: [true, 'Please add an email'],
            unique: true, // No two users can have the same email
            trim: true,//Trim extra spaces if any
            lowercase: true,
            validate: {
                // This function tests the email string using a Regular Expression (Regex)
                validator: function (v) {
                    return /^[a-zA-Z0-9]+@iitism\.ac\.in$/.test(v);
                },
                message: props => `${props.value} is not a valid IIT ISM email address!`
            }
        },
        password: {
            type: String,
            required: [true, 'Please add a password'],
        },
        whatsappNumber: {
            type: String,
            required: [true, 'Please add a WhatsApp number for buyers to contact you'],
        }
    },
    {
        timestamps: true, // Automatically adds createdAt and updatedAt dates
    }
);

const User = mongoose.model('User', userSchema);

module.exports = User;