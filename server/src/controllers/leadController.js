import Lead from "../models/Lead.js";

/**
 * GET /api/leads
 * Query params:
 *  - q: text search across name/email/phone/state/city
 *  - status: filter by status
 *  - page (default 1), limit (default 10)
 *  - sort (default: -updatedAt) e.g. "name" or "-createdAt"
 */
export const listLeads = async(req, res, next) => {
    try {
        const {
            q = "",
                status,
                page = 1,
                limit = 10,
                sort = "-updatedAt"
        } = req.query;

        const query = {};
        if (q) {
            // Flexible search
            query.$or = [
                { name: { $regex: q, $options: "i" } },
                { email: { $regex: q, $options: "i" } },
                { phone: { $regex: q, $options: "i" } },
                { city: { $regex: q, $options: "i" } },
                { state: { $regex: q, $options: "i" } }
            ];
        }
        if (status) query.status = status;

        const skip = (Number(page) - 1) * Number(limit);

        const [items, total] = await Promise.all([
            Lead.find(query).sort(sort).skip(skip).limit(Number(limit)),
            Lead.countDocuments(query)
        ]);

        res.json({
            items,
            total,
            page: Number(page),
            pages: Math.ceil(total / Number(limit))
        });
    } catch (err) {
        next(err);
    }
};

export const getLead = async(req, res, next) => {
    try {
        const lead = await Lead.findById(req.params.id);
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.json(lead);
    } catch (err) {
        next(err);
    }
};

export const createLead = async(req, res, next) => {
    try {
        const lead = await Lead.create(req.body); // timestamps sets updatedAt
        res.status(201).json(lead);
    } catch (err) {
        next(err);
    }
};

export const updateLead = async(req, res, next) => {
    try {
        const lead = await Lead.findByIdAndUpdate(
            req.params.id,
            req.body, { new: true, runValidators: true }
        );
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.json(lead); // updatedAt auto-updated
    } catch (err) {
        next(err);
    }
};

export const deleteLead = async(req, res, next) => {
    try {
        const lead = await Lead.findByIdAndDelete(req.params.id);
        if (!lead) return res.status(404).json({ message: "Lead not found" });
        res.json({ message: "Lead deleted" });
    } catch (err) {
        next(err);
    }
};