const express = require("express");
const cors = require("cors");
const conectDb = require("./connectDb");
const session = require('express-session');
const Bod = require("./models/bod.js");
const PresidentMessage = require("./models/messageOfPresident.js");
const Image = require("./models/image.js");
const Event = require("./models/event.js");
const Login = require("./models/login.js");
const Alumni = require("./models/alumni.js");
const Notice = require("./models/notice.js");
const Result = require('./models/result.js');
const MongoStore = require('connect-mongo').default || require('connect-mongo');
const mongoose = require('mongoose');
const multer = require('multer');
const { v2: cloudinary } = require('cloudinary');

const app = express();
const PORT = process.env.PORT || 5000;

app.set('trust proxy', 1);

const allowedOrigins = [
    "https://bba-student-club.vercel.app/",
    "http://127.0.0.1:3000",
];

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});
const upload = multer({ storage: multer.memoryStorage() });

// CORS and JSON parsing set up immediately
app.use(cors({
    origin: function (origin, callback) {
        if (!origin) return callback(null, true);
        if (allowedOrigins.includes(origin)) {
            return callback(null, true);
        }
        if (/^https:\/\/pharmacy-management-system-.*-ramitnpns-projects\.vercel\.app$/.test(origin)) {
            return callback(null, true);
        }
        callback(new Error("Not allowed by CORS: " + origin));
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
    optionsSuccessStatus: 200
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Global Helper functions
const getValue = (val, fallback) => (val !== undefined && val !== null && String(val).trim() !== "") ? val : fallback;

// ==========================================
// ☁️ CLOUDINARY HELPER — extract public_id from a secure_url and delete it
// ==========================================

/**
 * Cloudinary secure_urls look like:
 * https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/restaurant-notices/abc123.jpg
 * or without a folder:
 * https://res.cloudinary.com/<cloud_name>/image/upload/v1234567890/abc123.jpg
 *
 * The public_id is everything after the version segment (vXXXXXXXXXX/), minus the file extension.
 */
function extractPublicIdFromUrl(url) {
    if (!url || typeof url !== "string") return null;
    if (!url.includes("res.cloudinary.com")) return null;

    try {
        const uploadIndex = url.indexOf("/upload/");
        if (uploadIndex === -1) return null;

        let pathAfterUpload = url.substring(uploadIndex + "/upload/".length);

        // Strip a leading version segment like "v1234567890/"
        pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, "");

        // Strip the file extension
        const lastDotIndex = pathAfterUpload.lastIndexOf(".");
        const publicId = lastDotIndex !== -1
            ? pathAfterUpload.substring(0, lastDotIndex)
            : pathAfterUpload;

        return publicId || null;
    } catch (err) {
        console.error("🔴 Failed to extract Cloudinary public_id from URL:", url, err.message);
        return null;
    }
}

/**
 * Deletes an image from Cloudinary given its secure_url.
 * Safe to call even if imageUrl is empty/not a Cloudinary URL — it just skips silently.
 * Never throws — logs and returns false on failure so a failed image delete
 * never blocks the MongoDB record delete from succeeding.
 */
async function deleteCloudinaryImage(imageUrl) {
    const publicId = extractPublicIdFromUrl(imageUrl);
    if (!publicId) return false;

    try {
        const result = await cloudinary.uploader.destroy(publicId);
        console.log(`☁️ Cloudinary delete for "${publicId}":`, result.result);
        return result.result === "ok" || result.result === "not found";
    } catch (err) {
        console.error(`🔴 Cloudinary delete failed for "${publicId}":`, err.message);
        return false;
    }
}

// ==========================================
// 👥 BOD (BOARD OF DIRECTORS) ROUTES
// ==========================================

// POST Route to Save BOD Member Details
app.post("/api/bod", async (req, res) => {
    try {
        const formData = req.body;

        const newBodMember = await Bod.create({
            name: getValue(formData.name, ""),
            role: getValue(formData.role, ""),
            description: getValue(formData.description, ""),
            image: getValue(formData.image, ""),
            email: getValue(formData.email, ""),
            socialLinks: {
                linkedin: getValue(formData.socialLinks?.linkedin, ""),
                github: getValue(formData.socialLinks?.github, ""),
                instagram: getValue(formData.socialLinks?.instagram, "")
            }
        });

        return res.status(201).json({ 
            success: true, 
            message: "BOD member record saved successfully!", 
            data: newBodMember 
        });

    } catch (error) {
        console.error("🔴 DATABASE WRITE CRASH:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to write BOD data to MongoDB.",
            error: error.message 
        });
    }
});

// GET Route to fetch all BOD members
app.get("/api/bod", async (req, res) => {
    console.log("DEBUG: Request received for /api/bod");
    try {
        const dbBodMembers = await Bod.find({});

        const bodMembers = dbBodMembers.map(member => ({
            id: member._id,
            _id: member._id,
            name: member.name,
            role: member.role,
            description: member.description,
            image: member.image,
            email: member.email,
            socialLinks: member.socialLinks,
            createdAt: member.createdAt || new Date().toISOString()
        }));

        return res.status(200).json({
            success: true,
            count: bodMembers.length,
            data: bodMembers 
        });
    } catch (error) {
        console.error("🔴 Backend fetch failed:", error);
        return res.status(500).json({ success: false, message: "Error fetching BOD records." });
    }
});

// PUT Route to Update BOD Member Details by ID
app.put("/api/bod/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;
        console.log(`=== UPDATING BOD MEMBER ID: ${id} ===`);

        // Fetch the existing record first so we know the OLD image URL
        const existingMember = await Bod.findById(id);
        if (!existingMember) {
            return res.status(404).json({ success: false, message: "BOD member record not found." });
        }

        const newImage = getValue(formData.image, "");
        const oldImage = existingMember.image;

        const updatedFields = {
            name: getValue(formData.name, ""),
            role: getValue(formData.role, ""),
            description: getValue(formData.description, ""),
            image: newImage,
            email: getValue(formData.email, ""),
            socialLinks: {
                linkedin: getValue(formData.socialLinks?.linkedin, ""),
                github: getValue(formData.socialLinks?.github, ""),
                instagram: getValue(formData.socialLinks?.instagram, "")
            }
        };

        const updatedBodMember = await Bod.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        // If the image actually changed, delete the OLD one from Cloudinary
        if (oldImage && oldImage !== newImage) {
            deleteCloudinaryImage(oldImage);
        }

        return res.status(200).json({
            success: true,
            message: "BOD member record updated successfully!",
            data: updatedBodMember
        });

    } catch (error) {
        console.error("🔴 Backend update failed:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Error updating BOD member record.",
            error: error.message 
        });
    }
});

// DELETE Route to Remove a BOD Member Record by ID
app.delete("/api/bod/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`=== DELETING BOD MEMBER ID: ${id} ===`);

        const deletedBodMember = await Bod.findByIdAndDelete(id);

        if (!deletedBodMember) {
            return res.status(404).json({ success: false, message: "BOD member record not found." });
        }

        // Delete the image from Cloudinary too (fire-and-forget-safe, never throws)
        await deleteCloudinaryImage(deletedBodMember.image);

        return res.status(200).json({
            success: true,
            message: "BOD member record deleted successfully!",
            deletedBodMemberId: id
        });
    } catch (error) {
        console.error("🔴 Backend deletion failed:", error);
        return res.status(500).json({ success: false, message: "Error deleting BOD member record." });
    }
});


// ==========================================
// 🏛️ PRESIDENT MESSAGE ROUTES
// ==========================================

// POST Route to Save President Message Details
app.post("/api/president-message", async (req, res) => {
    try {
        const formData = req.body;

        const newMessage = await PresidentMessage.create({
            name: getValue(formData.name, ""),
            description: getValue(formData.description, ""),
            image: getValue(formData.image, "")
        });

        return res.status(201).json({ 
            success: true, 
            message: "President message saved successfully!", 
            data: newMessage 
        });

    } catch (error) {
        console.error("🔴 DATABASE WRITE CRASH:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Failed to write President message data to MongoDB.",
            error: error.message 
        });
    }
});

// GET Route to fetch President Message(s)
app.get("/api/president-message", async (req, res) => {
    console.log("DEBUG: Request received for /api/president-message");
    try {
        const dbMessages = await PresidentMessage.find({});

        const messages = dbMessages.map(msg => ({
            id: msg._id,
            _id: msg._id,
            name: msg.name,
            description: msg.description,
            image: msg.image,
            createdAt: msg.createdAt || new Date().toISOString()
        }));

        return res.status(200).json({
            success: true,
            count: messages.length,
            data: messages 
        });
    } catch (error) {
        console.error("🔴 Backend fetch failed:", error);
        return res.status(500).json({ success: false, message: "Error fetching President message records." });
    }
});

// PUT Route to Update President Message Details by ID
app.put("/api/president-message/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;
        console.log(`=== UPDATING PRESIDENT MESSAGE ID: ${id} ===`);

        const existingMessage = await PresidentMessage.findById(id);
        if (!existingMessage) {
            return res.status(404).json({ success: false, message: "President message record not found." });
        }

        const newImage = getValue(formData.image, "");
        const oldImage = existingMessage.image;

        const updatedFields = {
            name: getValue(formData.name, ""),
            description: getValue(formData.description, ""),
            image: newImage
        };

        const updatedMessage = await PresidentMessage.findByIdAndUpdate(
            id,
            { $set: updatedFields },
            { new: true, runValidators: true }
        );

        if (oldImage && oldImage !== newImage) {
            deleteCloudinaryImage(oldImage);
        }

        return res.status(200).json({
            success: true,
            message: "President message record updated successfully!",
            data: updatedMessage
        });

    } catch (error) {
        console.error("🔴 Backend update failed:", error);
        return res.status(500).json({ 
            success: false, 
            message: "Error updating President message record.",
            error: error.message 
        });
    }
});

// DELETE Route to Remove a President Message Record by ID
app.delete("/api/president-message/:id", async (req, res) => {
    try {
        const { id } = req.params;
        console.log(`=== DELETING PRESIDENT MESSAGE ID: ${id} ===`);

        const deletedMessage = await PresidentMessage.findByIdAndDelete(id);

        if (!deletedMessage) {
            return res.status(404).json({ success: false, message: "President message record not found." });
        }

        await deleteCloudinaryImage(deletedMessage.image);

        return res.status(200).json({
            success: true,
            message: "President message record deleted successfully!",
            deletedMessageId: id
        });
    } catch (error) {
        console.error("🔴 Backend deletion failed:", error);
        return res.status(500).json({ success: false, message: "Error deleting President message record." });
    }
});


// ==========================================
// 🖼️ GALLERY IMAGE ROUTES
// ==========================================

// POST Route to Create an Image
app.post("/api/images", async (req, res) => {
    try {
        const formData = req.body;
        const newImage = await Image.create({
            image: getValue(formData.image, "")
        });
        return res.status(201).json({ success: true, message: "Image saved successfully!", data: newImage });
    } catch (error) {
        console.error("🔴 DATABASE WRITE CRASH:", error);
        return res.status(500).json({ success: false, message: "Failed to write image data to MongoDB.", error: error.message });
    }
});

// GET Route to fetch all Images
app.get("/api/images", async (req, res) => {
    try {
        const dbImages = await Image.find({});
        const images = dbImages.map(img => ({
            id: img._id,
            _id: img._id,
            image: img.image,
            createdAt: img.createdAt || new Date().toISOString()
        }));
        return res.status(200).json({ success: true, count: images.length, data: images });
    } catch (error) {
        console.error("🔴 Backend fetch failed:", error);
        return res.status(500).json({ success: false, message: "Error fetching image records." });
    }
});

// PUT Route to Update Image Details by ID
app.put("/api/images/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;

        const existingImage = await Image.findById(id);
        if (!existingImage) return res.status(404).json({ success: false, message: "Image record not found." });

        const newImageUrl = getValue(formData.image, "");
        const oldImageUrl = existingImage.image;

        const updatedFields = {
            image: newImageUrl
        };
        const updatedImage = await Image.findByIdAndUpdate(id, { $set: updatedFields }, { new: true, runValidators: true });

        if (oldImageUrl && oldImageUrl !== newImageUrl) {
            deleteCloudinaryImage(oldImageUrl);
        }

        return res.status(200).json({ success: true, message: "Image record updated successfully!", data: updatedImage });
    } catch (error) {
        console.error("🔴 Backend update failed:", error);
        return res.status(500).json({ success: false, message: "Error updating image record.", error: error.message });
    }
});

// DELETE Route to Remove an Image Record by ID (Gallery)
app.delete("/api/images/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedImage = await Image.findByIdAndDelete(id);
        if (!deletedImage) return res.status(404).json({ success: false, message: "Image record not found." });

        // This is the gallery — deleting the record means deleting the Cloudinary image
        await deleteCloudinaryImage(deletedImage.image);

        return res.status(200).json({ success: true, message: "Image record deleted successfully!", deletedImageId: id });
    } catch (error) {
        console.error("🔴 Backend deletion failed:", error);
        return res.status(500).json({ success: false, message: "Error deleting image record." });
    }
});


// ==========================================
// 🎉 EVENT ROUTES
// ==========================================

// POST Route to Save Event Details
app.post("/api/events", async (req, res) => {
    try {
        const formData = req.body;
        const newEvent = await Event.create({
            title: getValue(formData.title, ""),
            description: getValue(formData.description, ""),
            image: getValue(formData.image, ""),
            location: getValue(formData.location, ""),
            date: getValue(formData.date, "")
        });
        return res.status(201).json({ success: true, message: "Event saved successfully!", data: newEvent });
    } catch (error) {
        console.error("🔴 DATABASE WRITE CRASH:", error);
        return res.status(500).json({ success: false, message: "Failed to write event data to MongoDB.", error: error.message });
    }
});

// GET Route to fetch all Events
app.get("/api/events", async (req, res) => {
    try {
        const dbEvents = await Event.find({});
        const events = dbEvents.map(ev => ({
            id: ev._id,
            _id: ev._id,
            title: ev.title,
            description: ev.description,
            image: ev.image,
            location: ev.location,
            date: ev.date,
            createdAt: ev.createdAt || new Date().toISOString()
        }));
        return res.status(200).json({ success: true, count: events.length, data: events });
    } catch (error) {
        console.error("🔴 Backend fetch failed:", error);
        return res.status(500).json({ success: false, message: "Error fetching event records." });
    }
});

// PUT Route to Update Event Details by ID
app.put("/api/events/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;

        const existingEvent = await Event.findById(id);
        if (!existingEvent) return res.status(404).json({ success: false, message: "Event record not found." });

        const newImage = getValue(formData.image, "");
        const oldImage = existingEvent.image;

        const updatedFields = {
            title: getValue(formData.title, ""),
            description: getValue(formData.description, ""),
            image: newImage,
            location: getValue(formData.location, ""),
            date: getValue(formData.date, "")
        };
        const updatedEvent = await Event.findByIdAndUpdate(id, { $set: updatedFields }, { new: true, runValidators: true });

        if (oldImage && oldImage !== newImage) {
            deleteCloudinaryImage(oldImage);
        }

        return res.status(200).json({ success: true, message: "Event record updated successfully!", data: updatedEvent });
    } catch (error) {
        console.error("🔴 Backend update failed:", error);
        return res.status(500).json({ success: false, message: "Error updating event record.", error: error.message });
    }
});

// DELETE Route to Remove an Event Record by ID
app.delete("/api/events/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedEvent = await Event.findByIdAndDelete(id);
        if (!deletedEvent) return res.status(404).json({ success: false, message: "Event record not found." });

        await deleteCloudinaryImage(deletedEvent.image);

        return res.status(200).json({ success: true, message: "Event record deleted successfully!", deletedEventId: id });
    } catch (error) {
        console.error("🔴 Backend deletion failed:", error);
        return res.status(500).json({ success: false, message: "Error deleting event record." });
    }
});



// ==========================================
// 🔑 LOGIN / USER AUTHENTICATION ROUTES
// ==========================================

// POST Route to Create a User/Admin Account
app.post("/api/users", async (req, res) => {
    try {
        const formData = req.body;
        const newUser = await Login.create({
            id: getValue(formData.id, ""),
            password: getValue(formData.password, "")
        });
        return res.status(201).json({ success: true, message: "User created successfully!", data: newUser });
    } catch (error) {
        console.error("🔴 DATABASE WRITE CRASH:", error);
        return res.status(500).json({ success: false, message: "Failed to create user record in MongoDB.", error: error.message });
    }
});

// GET Route to fetch all Users/Admins
app.get("/api/users", async (req, res) => {
    try {
        const dbUsers = await Login.find({});
        const users = dbUsers.map(usr => ({
            id: usr._id,
            _id: usr._id,
            userId: usr.id,
            createdAt: usr.createdAt || new Date().toISOString()
        }));
        return res.status(200).json({ success: true, count: users.length, data: users });
    } catch (error) {
        console.error("🔴 Backend fetch failed:", error);
        return res.status(500).json({ success: false, message: "Error fetching user records." });
    }
});

// PUT Route to Update User/Admin Details by ID
app.put("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const formData = req.body;
        const updatedFields = {
            id: getValue(formData.id, ""),
            password: getValue(formData.password, "")
        };
        const updatedUser = await Login.findByIdAndUpdate(id, { $set: updatedFields }, { new: true, runValidators: true });
        if (!updatedUser) return res.status(404).json({ success: false, message: "User record not found." });
        return res.status(200).json({ success: true, message: "User record updated successfully!", data: updatedUser });
    } catch (error) {
        console.error("🔴 Backend update failed:", error);
        return res.status(500).json({ success: false, message: "Error updating user record.", error: error.message });
    }
});

// DELETE Route to Remove a User/Admin Record by ID
app.delete("/api/users/:id", async (req, res) => {
    try {
        const { id } = req.params;
        const deletedUser = await Login.findByIdAndDelete(id);
        if (!deletedUser) return res.status(404).json({ success: false, message: "User record not found." });
        return res.status(200).json({ success: true, message: "User record deleted successfully!", deletedUserId: id });
    } catch (error) {
        console.error("🔴 Backend deletion failed:", error);
        return res.status(500).json({ success: false, message: "Error deleting user record." });
    }
});


// ==========================================
// 🔐 CHECK LOGIN FROM DATABASE USERS
// ==========================================

app.post("/api/auth/login", async (req, res) => {
    try {
        const { adminId, password } = req.body;

        const user = await Login.findOne({ id: adminId });

        if (!user || user.password !== password) {
            return res.status(401).json({
                success: false,
                message: "Invalid Admin ID or Password."
            });
        }

        return res.status(200).json({
            success: true,
            message: "Login successful!",
            data: { userId: user.id }
        });
    } catch (error) {
        console.error("🔴 Login check failed:", error);
        return res.status(500).json({
            success: false,
            message: "Internal server error during login."
        });
    }
});


// ==========================================
// 🎓 Alumni Routes
// ==========================================

// ### 1. CREATE (POST) - Create New Alumni
app.post("/api/alumni", async (req, res) => {
    console.log("BODY RECEIVED:", req.body);
    try {
        const newAlumni = new Alumni(req.body);
        const savedAlumni = await newAlumni.save();
        
        res.status(201).json({
            success: true,
            message: "Alumni created successfully",
            data: savedAlumni,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});


// ### 2. READ (GET) - Get All Alumni
app.get("/api/alumni", async (req, res) => {
    try {
        const alumniList = await Alumni.find({});
        
        res.status(200).json({
            success: true,
            count: alumniList.length,
            data: alumniList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// ### 3. READ (GET) - Get Single Alumni by ID
app.get("/api/alumni/:id", async (req, res) => {
    try {
        const alumni = await Alumni.findById(req.params.id);
        
        if (!alumni) {
            return res.status(404).json({
                success: false,
                message: "Alumni record not found",
            });
        }
        
        res.status(200).json({
            success: true,
            data: alumni,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// ### 4. UPDATE (PUT) - Update Alumni by ID
app.put("/api/alumni/:id", async (req, res) => {
    try {
        const existingAlumni = await Alumni.findById(req.params.id);
        if (!existingAlumni) {
            return res.status(404).json({
                success: false,
                message: "Alumni record not found",
            });
        }

        const newImage = getValue(req.body.image, "");
        const oldImage = existingAlumni.image;

        const updatedAlumni = await Alumni.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (oldImage && oldImage !== newImage) {
            deleteCloudinaryImage(oldImage);
        }
        
        res.status(200).json({
            success: true,
            message: "Alumni updated successfully",
            data: updatedAlumni,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});


// ### 5. DELETE - Delete Alumni by ID
app.delete("/api/alumni/:id", async (req, res) => {
    try {
        const deletedAlumni = await Alumni.findByIdAndDelete(req.params.id);
        
        if (!deletedAlumni) {
            return res.status(404).json({
                success: false,
                message: "Alumni record not found",
            });
        }

        await deleteCloudinaryImage(deletedAlumni.image);
        
        res.status(200).json({
            success: true,
            message: "Alumni deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// ==========================================
// 📢 NOTICE ROUTES (single, correct version — image comes as a Cloudinary URL from the frontend)
// ==========================================

// ### 1. CREATE (POST) - Create New Notice
app.post("/api/notices", async (req, res) => {
    try {
        const newNotice = new Notice(req.body);
        const savedNotice = await newNotice.save();
        
        res.status(201).json({
            success: true,
            message: "Notice created successfully",
            data: savedNotice,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});


// ### 2. READ (GET) - Get All Notices
app.get("/api/notices", async (req, res) => {
    try {
        const noticesList = await Notice.find({}).sort({ createdAt: -1 });
        
        res.status(200).json({
            success: true,
            count: noticesList.length,
            data: noticesList,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// ### 3. READ (GET) - Get Single Notice by ID
app.get("/api/notices/:id", async (req, res) => {
    try {
        const notice = await Notice.findById(req.params.id);
        
        if (!notice) {
            return res.status(404).json({
                success: false,
                message: "Notice record not found",
            });
        }
        
        res.status(200).json({
            success: true,
            data: notice,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// ### 4. UPDATE (PUT) - Update Notice by ID
app.put("/api/notices/:id", async (req, res) => {
    try {
        const existingNotice = await Notice.findById(req.params.id);
        if (!existingNotice) {
            return res.status(404).json({
                success: false,
                message: "Notice record not found",
            });
        }

        const newImage = getValue(req.body.image, "");
        const oldImage = existingNotice.image;

        const updatedNotice = await Notice.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );

        if (oldImage && oldImage !== newImage) {
            deleteCloudinaryImage(oldImage);
        }
        
        res.status(200).json({
            success: true,
            message: "Notice updated successfully",
            data: updatedNotice,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: error.message,
        });
    }
});


// ### 5. DELETE - Delete Notice by ID
app.delete("/api/notices/:id", async (req, res) => {
    try {
        const deletedNotice = await Notice.findByIdAndDelete(req.params.id);
        
        if (!deletedNotice) {
            return res.status(404).json({
                success: false,
                message: "Notice record not found",
            });
        }

        await deleteCloudinaryImage(deletedNotice.image);
        
        res.status(200).json({
            success: true,
            message: "Notice deleted successfully",
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message,
        });
    }
});


// ==========================================
// 🏆 ROUTES FOR RESULTS
// ==========================================

// 1. GET: Fetch all results
app.get('/api/results', async (req, res) => {
    try {
        const results = await Result.find().sort({ createdAt: -1 });
        res.status(200).json({
            success: true,
            count: results.length,
            data: results,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch results',
            error: error.message,
        });
    }
});

// 2. GET: Fetch a single result by ID
app.get('/api/results/:id', async (req, res) => {
    try {
        const result = await Result.findById(req.params.id);
        if (!result) {
            return res.status(404).json({
                success: false,
                message: 'Result not found',
            });
        }
        res.status(200).json({
            success: true,
            data: result,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to fetch result',
            error: error.message,
        });
    }
});

// 3. POST: Create a new result
app.post('/api/results', async (req, res) => {
    try {
        const { title, description, image, date } = req.body;

        const newResult = new Result({
            title,
            description,
            image,
            date: date || Date.now(),
        });

        const savedResult = await newResult.save();
        res.status(201).json({
            success: true,
            message: 'Result created successfully',
            data: savedResult,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to create result',
            error: error.message,
        });
    }
});

// 4. PUT: Update an existing result by ID
app.put('/api/results/:id', async (req, res) => {
    try {
        const { title, description, image, date } = req.body;

        const existingResult = await Result.findById(req.params.id);
        if (!existingResult) {
            return res.status(404).json({
                success: false,
                message: 'Result not found',
            });
        }

        const oldImage = existingResult.image;

        const updatedResult = await Result.findByIdAndUpdate(
            req.params.id,
            { title, description, image, date },
            { new: true, runValidators: true }
        );

        if (oldImage && oldImage !== image) {
            deleteCloudinaryImage(oldImage);
        }

        res.status(200).json({
            success: true,
            message: 'Result updated successfully',
            data: updatedResult,
        });
    } catch (error) {
        res.status(400).json({
            success: false,
            message: 'Failed to update result',
            error: error.message,
        });
    }
});

// 5. DELETE: Delete a result by ID
app.delete('/api/results/:id', async (req, res) => {
    try {
        const deletedResult = await Result.findByIdAndDelete(req.params.id);

        if (!deletedResult) {
            return res.status(404).json({
                success: false,
                message: 'Result not found',
            });
        }

        await deleteCloudinaryImage(deletedResult.image);

        res.status(200).json({
            success: true,
            message: 'Result deleted successfully',
            data: deletedResult,
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: 'Failed to delete result',
            error: error.message,
        });
    }
});


// ==========================================
// 📊 CLOUDINARY STORAGE STATUS / ALERT ROUTE
// ==========================================

/**
 * GET /api/storage-status
 * Calls Cloudinary's Admin API to check how much of your plan's storage
 * you've used. Returns percentUsed so the dashboard can show a warning banner.
 *
 * Cloudinary's free plan doesn't always expose a hard storage cap through this
 * endpoint the same way paid plans do, so this also works off credits when
 * a storage limit isn't present, and always fails safely (percentUsed: 0)
 * rather than crashing your dashboard if the usage call errors out.
 */
app.get("/api/storage-status", async (req, res) => {
    try {
        const usage = await cloudinary.api.usage();

        let percentUsed = 0;
        let usedGB = null;
        let limitGB = null;

        if (usage.storage && usage.storage.limit) {
            usedGB = usage.storage.usage / (1024 * 1024 * 1024);
            limitGB = usage.storage.limit / (1024 * 1024 * 1024);
            percentUsed = Math.round((usage.storage.usage / usage.storage.limit) * 100);
        } else if (usage.credits && usage.credits.limit) {
            // Some plans report usage in "credits" instead of raw storage bytes
            percentUsed = Math.round((usage.credits.usage / usage.credits.limit) * 100);
        }

        return res.status(200).json({
            success: true,
            percentUsed,
            usedGB: usedGB !== null ? Number(usedGB.toFixed(2)) : null,
            limitGB: limitGB !== null ? Number(limitGB.toFixed(2)) : null,
            raw: usage,
        });
    } catch (error) {
        console.error("🔴 Cloudinary usage check failed:", error.message);
        // Fail safe: never break the dashboard just because the usage check failed
        return res.status(200).json({
            success: false,
            percentUsed: 0,
            message: "Could not retrieve Cloudinary storage status.",
            error: error.message,
        });
    }
});


// ==========================================
// SERVER INITIALIZATION & SESSIONS
// ==========================================

mongoose.connection.once('open', () => {
    console.log("MongoDB connection established for sessions.");

    app.use(session({
        secret: process.env.SESSION_SECRET || 'your_secret',
        resave: false,
        saveUninitialized: false,
        store: MongoStore.create({
            client: mongoose.connection.getClient()
        }),
        cookie: {
            secure: process.env.NODE_ENV === 'production',
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            httpOnly: true,
            maxAge: 24 * 60 * 60 * 1000
        }
    }));
});

mongoose.connection.on('error', (err) => {
    console.error("MongoDB connection error:", err);
});

// Start DB connection before starting server
conectDb().then(() => {
  app.listen(Number(PORT), "0.0.0.0", () => {
    console.log(`Club full-stack server running on port ${PORT}`);
  });
}).catch((err) => {
  console.error("❌ Critical System Halt: Server could not start because Database connection failed.");
});