const CustomizePackage = require('./../model/CustomizeModel');
const User = require('./../model/UserModel');
// Create a new customized package request
const createCustomizePackage = async (req, res) => {
    try {
      const { userId, region, selectedPlaces, selectedActivities, numberOfTravelers, duration, includeHotel, includeFood, budget } = req.body;
  
      // Debugging: Print received data
      console.log("Received Data:", req.body);
  
      // Validate input
      if (!userId || !region || !selectedPlaces || !selectedActivities || !numberOfTravelers || !duration || !budget) {
        return res.status(400).json({ message: "All required fields must be provided." });
      }
  
      // Create package
      const newPackage = await CustomizePackage.create({
        userId,
        region,
        selectedPlaces,
        selectedActivities,
        numberOfTravelers,
        duration,
        includeHotel,
        includeFood,
        budget,
      });
  
      return res.status(201).json(newPackage);
    } catch (error) {
      console.error("Error creating package:", error);
      return res.status(500).json({ error: "Internal Server Error" });
    }
  };


// Get all custom packages for admin (admin view all packages)
const getAllCustomPackages = async (req, res) => {
  try {
    const customPackages = await CustomizePackage.findAll({
      include: [{
        model: User,
        attributes: ['username']
      }]
    });

    if (customPackages.length === 0) {
      return res.status(404).json({ message: "No custom packages found." });
    }

    res.status(200).json(customPackages);
  } catch (error) {
    console.error(error);  // Log the error to console
    res.status(500).json({ message: "Error fetching custom packages.", error: error.message });  // Return error message
  }
};


// Get custom packages by user ID (for travelers)
const getCustomPackagesByUser = async (req, res) => {
  const { userId } = req.params;

  try {
    const customPackages = await CustomizePackage.findAll({
      where: { userId },
    });

    if (customPackages.length === 0) {
      return res.status(404).json({ message: "No custom packages found for this user." });
    }

    res.status(200).json(customPackages);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error fetching custom packages." });
  }
};
// Update the status of a customized package
const updateCustomPackageStatus = async (req, res) => {
  try {
    const { id } = req.params; // Get the package ID from the route parameter
    const { status } = req.body; // Get the new status from the request body

    console.log("Updating custom package ID:", id, "New status:", status);

    if (!status) {
      return res.status(400).json({ error: "Status is required" });
    }

    // Find the package by ID
    const customPackage = await CustomizePackage.findByPk(id);
    if (!customPackage) {
      return res.status(404).json({ error: "Custom package not found" });
    }

    // Update the package's status
    customPackage.status = status; // Assuming the column is named 'status'
    await customPackage.save();

    console.log("Updated custom package:", customPackage);

    res.json({ message: "Custom package status updated successfully", customPackage });
  } catch (error) {
    console.error("Error updating custom package status:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};


// Delete a customized package request
exports.deletePackage = async (req, res) => {
  try {
    const packageData = await CustomizePackage.findByPk(req.params.id);
    if (!packageData) {
      return res.status(404).json({ success: false, message: "Package not found" });
    }
    await packageData.destroy();
    res.status(200).json({ success: true, message: "Package deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, error: error.message });
  }
};


module.exports={createCustomizePackage,getCustomPackagesByUser,getAllCustomPackages,updateCustomPackageStatus}