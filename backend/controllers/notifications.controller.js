import Notification from "../models/notification.model.js";

export const getNotifactions = async (req, res) => {
    try {
        const userId = req.user._id;

        const notifications = await Notification.find({to: userId}).populate({
            path: "from",
            select: "username profileImg",
        });

        await Notification.updateMany({to: userId}, {read: true});

        res.status(200).json(notifications);
    }
    catch (error) {
        console.log("Error in getNotifactions", error.message);
        res.status(500).json({error: "Internal Server Error", description: error.message});
    }
}

export const deleteNotifications = async (req, res) => {
    try {
        const userId = req.user._id;
        await Notification.deleteMany({to: userId});
        res.status(200).json({message: `Deleted notifications successfully.`});
    }
    catch (error) {
        console.log("Error in deleteNotification", error.message);
        res.status(500).json({error: "Internal Server Error", description: error.message});
    }
}

export const deleteNotification = async (req, res) => {
    try {
        const notificationID = req.param.id;
        const userId = req.user._id;
        const notification = await Notification.findById(notificationID);

        if(!notification) res.status(404).json({message: `Notification not found`});
        if(userId != notification.to.toString()) res.status(403).json({message: `Unauthorized user`});
        await Notification.findByIdAndDelete(notification._id);
    }
    catch (error) {
        console.log("Error in deleteNotification", error.message);
        res.status(500).json({error: "Internal Server Error", description: error.message});
    }
}