const pdfParse = require("pdf-parse")
const { generateInterviewReport, generateResumePdf } = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterViewReportController(req, res) {
    try {
        let resumeText = ""
        if (req.file && req.file.buffer) {
            const uint8Array = new Uint8Array(req.file.buffer);
            const parser = new pdfParse.PDFParse(uint8Array);
            const resumeContent = await parser.getText();
            resumeText = resumeContent.text || "";
        }
   
        const { selfDescription, jobDescription } = req.body

        const interViewReportByAi = await generateInterviewReport({
            resume: resumeText,
            selfDescription: selfDescription || "",
            jobDescription: jobDescription || ""
        })
        console.log(interViewReportByAi);

        const interviewReport = await interviewReportModel.create({
            user: req.user.id,
            resume: resumeText,
            selfDescription: selfDescription || "",
            jobDescription: jobDescription || "",
            ...interViewReportByAi
        })

        // Clean up older reports to keep only the latest 3 in database
        const userReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 })
        if (userReports.length > 3) {
            const idsToDelete = userReports.slice(3).map(r => r._id)
            await interviewReportModel.deleteMany({ _id: { $in: idsToDelete } })
        }

        res.status(200).json({
            message: "Interview report generated successfully",
            interviewReport
        })
    } catch (err) {
        console.error(err);
        res.status(500).json({
            message: "Failed to generate interview report",
            error: err.message
        });
    }
}

async function getInterviewReportByIdController(req, res) {
    const { interviewId } = req.params

    const interviewReport = await interviewReportModel.findOne({ _id: interviewId, user: req.user.id })

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found"
        })
    }

    res.status(200).json({
        message: "Interview report fetched successfully.",
        interviewReport
    })
}

async function getAllInterviewReportsController(req, res) {
    // 1. Check all reports for this user sorted by newest first
    const allReports = await interviewReportModel.find({ user: req.user.id }).sort({ createdAt: -1 })

    // 2. If there are more than 3, delete older reports from database
    if (allReports.length > 3) {
        const idsToDelete = allReports.slice(3).map(r => r._id)
        await interviewReportModel.deleteMany({ _id: { $in: idsToDelete } })
    }

    // 3. Fetch only the top 3 reports
    const interviewReports = await interviewReportModel.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .limit(3)
        .select("-resume -selfDescription -jobDescription -__v -technicalQuestions -behavioralQuestions -skillGaps -preparationPlan")

    res.status(200).json({
        message: "Interview reports fetched successfully.",
        interviewReports
    })
}

async function generateResumePdfController(req, res) {
    const { interviewReportId } = req.params

    const interviewReport = await interviewReportModel.findById(interviewReportId)

    if (!interviewReport) {
        return res.status(404).json({
            message: "Interview report not found."
        })
    }

    const { resume, jobDescription, selfDescription } = interviewReport

    const pdfBuffer = await generateResumePdf({ resume, jobDescription, selfDescription })

    res.set({
        "Content-Type": "application/pdf",
        "Content-Disposition": `attachment; filename=resume_${interviewReportId}.pdf`
    })

    res.send(pdfBuffer)
}

module.exports = {  
    generateInterViewReportController, 
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController 
}