require("dotenv").config({ path: require("path").resolve(__dirname, "../.env") });
const mongoose = require("mongoose");
const interviewReportModel = require("../src/models/interviewReport.model");

async function cleanup() {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for cleanup.");

        // Group reports by user or find all distinct users
        const users = await interviewReportModel.distinct("user");
        console.log(`Found ${users.length} user(s) with interview reports.`);

        let totalDeleted = 0;

        for (const userId of users) {
            const reports = await interviewReportModel.find({ user: userId }).sort({ createdAt: -1 });
            console.log(`User ${userId} has ${reports.length} report(s).`);

            if (reports.length > 3) {
                const reportsToDelete = reports.slice(3);
                const idsToDelete = reportsToDelete.map(r => r._id);
                const result = await interviewReportModel.deleteMany({ _id: { $in: idsToDelete } });
                console.log(`Deleted ${result.deletedCount} older report(s) for user ${userId}.`);
                totalDeleted += result.deletedCount;
            }
        }

        // Also check if any reports have null/undefined user
        const orphanReports = await interviewReportModel.find({ user: null }).sort({ createdAt: -1 });
        if (orphanReports.length > 3) {
            const orphanToDelete = orphanReports.slice(3).map(r => r._id);
            const orphanResult = await interviewReportModel.deleteMany({ _id: { $in: orphanToDelete } });
            console.log(`Deleted ${orphanResult.deletedCount} orphan report(s).`);
            totalDeleted += orphanResult.deletedCount;
        }

        console.log(`Cleanup complete! Total deleted reports: ${totalDeleted}`);
    } catch (err) {
        console.error("Cleanup error:", err);
    } finally {
        await mongoose.disconnect();
        process.exit(0);
    }
}

cleanup();
