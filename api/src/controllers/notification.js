const Notification = require('../models/notification');

exports.addNotification = async (req, res) => {
    try {
        const { type, message, userRole , userId } = req.body;
        console.log(req.body);
        const notification = new Notification(type, message, userRole, userId);
        await notification.addNotification();
        res.status(201).json({ message: "Notification added successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getNotifications = async (req, res) => {
    try {
        const { userId , userRole } = req.params;
        console.log(userId , userRole);
        const notifications = await Notification.getNotifications(userId , userRole);
        res.status(200).json({ message: "Notification found successfully", notifications });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.getAllNotifications = async (req, res) => {
    try {
        const notifications = await Notification.getAll();
        res.status(200).json({ message: "Notifications found successfully", notifications });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.deleteNotification = async (req, res) => {
    try {
        const { id } = req.params;
        console.log(id);
        await Notification.deleteNotification(id);
        res.status(200).json({ message: "Notification deleted successfully" });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};

exports.updateNotification = async (req, res) => {
    try {
        const { id } = req.params;
        const { type, message, userRole } = req.body;
        const notification = new Notification(type, message, userRole);
        const response = await notification.updateNotification(id);
        res.status(200).json({ message: "Notification updated successfully", response });
    } catch (error) {
        console.error(error.message);
        res.status(500).json({ error: "An error occurred" });
    }
};
