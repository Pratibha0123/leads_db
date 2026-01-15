import mongoose from "mongoose";

const LeadSchema = new mongoose.Schema({
    name: { type: String, required: true, trim: true },
    phone: { type: String, required: true, trim: true },
    altPhone: { type: String, trim: true },
    email: { type: String, required: true, trim: true, lowercase: true },
    altEmail: { type: String, trim: true, lowercase: true },

    status: {
        type: String,
        enum: ["New", "Contacted", "In Progress", "Converted", "Closed", "Qualified", "Lost"],
        default: "New"
    },

    qualification: { type: String, trim: true },
    interest: { type: String, trim: true },

    source: {
        type: String,
        enum: ["Website", "Advertisement", "Referral", "Social Media", "Other"],
        default: "Website"
    },

    assigned: { type: String, trim: true },
    jobInterest: { type: String, trim: true },
    state: { type: String, trim: true },
    city: { type: String, trim: true },
    passoutYear: { type: Number },
    heardFrom: { type: String, trim: true }
}, {
    timestamps: true // adds createdAt & updatedAt, auto-updates on save/update
});

// Useful compound / text indexes for search
LeadSchema.index({ name: "text", email: "text", phone: "text", city: "text", state: "text" });

export default mongoose.model("Lead", LeadSchema);