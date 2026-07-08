const pdfParse = require("pdf-parse")
const generateInterviewReport = require("../services/ai.service")
const interviewReportModel = require("../models/interviewReport.model")

async function generateInterViewReportController(req, res) {

   // const resumeContent = await (new pdfParse.PDFParse(req.file.buffer)).getText()
    
   const uint8Array = new Uint8Array(req.file.buffer);

    const parser = new pdfParse.PDFParse(uint8Array);

    const resumeContent = await parser.getText();
   
    const {selfDescription, jobDescription } = req.body

    const interViewReportByAi = await generateInterviewReport({
        resume: resumeContent.text,
        selfDescription,
        jobDescription
    })

    const interviewReport = await interviewReportModel.create({
        user: req.user.id,
        resume: resumeContent.text,
        selfDescription,
        jobDescription,
        ...interViewReportByAi
    })

    res.status(200).json({
        message: "Interview report generated successfully ",
        interviewReport
    })
}


module.exports = {  generateInterViewReportController}