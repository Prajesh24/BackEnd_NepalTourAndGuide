const Package = require('../models/Package');

const createPackage = async (req, res) => {
    try {
        const { title, description, price, duration } = req.body;
        const newPackage = await Package.create({ title, description, price, duration });
        res.status(201).json({ message: "Package created successfully", package: newPackage });
    } catch (error) {
        res.status(500).json({ error: "Failed to create package" });
    }
};

const getAllPackages = async (req, res) => {
    try {
        const packages = await Package.findAll();
        res.status(200).json(packages);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch packages" });
    }
};

const updatePackage = async (req, res) => {
    try {
        const package = await Package.findByPk(req.params.id);
        if (!package) {
            return res.status(404).json({ error: "Package not found" });
        }
        await package.update(req.body);
        res.json({ message: "Package updated successfully", package });
    } catch (error) {
        res.status(500).json({ error: "Failed to update package" });
    }
};

const deletePackage = async (req, res) => {
    try {
        const package = await Package.findByPk(req.params.id);
        if (!package) {
            return res.status(404).json({ error: "Package not found" });
        }
        await package.destroy();
        res.json({ message: "Package deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to delete package" });
    }
};

module.exports = { createPackage, getAllPackages, updatePackage, deletePackage };
