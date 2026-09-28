import User from "../models/user.model.js";
import Vendor from "../models/vendor.model.js";

// ==========================================
// 1. Submit Vendor Request (By Customer)
// ==========================================
export const registerVendor = async (req, res) => {
    console.log("Register Vendor controller chal rha ahi")
    console.log(req.body)
    try {
        const {
            shopName,
            description,
            businessPhone,
            street,
            city,
            state,
            pinCode,
        }  = req.body;
        const userId = req.user._id; // verifyJwt middleware se user aayega
        // check karte hai ki user ne phle se to request nhi dal rakhi hai
        const existingRequest = await Vendor.findOne({ user: userId });
        if(existingRequest) {
            return res.status(400).json({
                success: true,
                message: `You already have a vendor request with status: ${existingRequest.status}`
            })
        }
        // ab ek new vendor request create karte hai
        const newVendorRequest = await Vendor.create({
            user: userId,
            shopName,
            description,
            businessPhone,
            address: {
                street,
                city,
                state,
                pinCode,
            }
        });
        console.log(newVendorRequest)
        return res.status(201).json({
            success: true,
            message: "Vendor request submitted successfully! Waiting for admin approval.",
            data: newVendorRequest 
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "Internal server error"
        })
    }
}

// ==========================================
// 2. Get All Pending Requests (For Admin Only)
// ==========================================
export const getAllPendingRequests = async (req, res) => {
    try {
        console.log("Admin pending requests check kar rha hai")
        const pendingRequests = await Vendor.find({ status: "pending" }).populate("user", "name email").sort({ createdAt: -1 });
        return res.status(200).json({
            success: true,
            data: pendingRequests
        })
    } catch (error) {
        return res.state(500).json({ success: false,
            message: error.message,
        });
    }
};

// ==========================================
// 3. Approve or Reject Request (By Admin)
// ==========================================
export const approveOrRejectVendor = async (req, res) => {
    try {
        console.log("Admin action perform kar rha hai: ", req.body);
        const { requestId, action } = req.body;// action ki value hamesha 'approved' ya 'rejected' hogi

        // 1. Validation check
        if(!requestId || !action) {
            return res.status(422).json({
                success: false,
                message: "Please provide requestId and action (approved/rejected)"
            })
        }
        if(!["approved", "rejected"].includes(action)) {
            return res.status(400).json({
                success: false,
                message: "Invalid action type! It must be 'approved' or 'rejected'"
            })
        }
        // request find karo ki hai ya fir nhai
        const vendorRequest = await Vendor.findById(requestId);
        if(!vendorRequest) {
            return res.status(404).json({
                success: false,
                message: "Request not found"
            })
        }
        
        // 3. Agar request pehle se hi processed hai toh dobara change na ho
        if(vendorRequest.status !== "pending") {
            return res.status(400).json({
                success: false,
                message: `This request has already been ${vendorRequest.status}`
            })
        }
        // Status update karte hai yahan par
        vendorRequest.status = action;
        await vendorRequest.save();
        // Agr approve hua toh user ka role bhi change
        if(action === "approved") {
            await User.findByIdAndUpdate(
                vendorRequest.user, 
                { role: "vendor" },
                { new: true },
            )
        }
        return res.status(200).json({
            success: true,
            message: `Vendor request has been ${action} successfully.`
        })
    } catch (error) {
        return res.status(500).json({ success: false, message: error.message });
    }
}