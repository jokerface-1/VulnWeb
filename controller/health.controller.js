export const getHealth = (req, res) => {
    res.status(200).json({
        success: true,
        status: "OK",
        message: "Server is running",
        timestamp: new Date().toISOString(),
        uptime: process.uptime()
    });
};
