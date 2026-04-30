import Certificate from "../models/Certificate.js";
import User from "../models/User.js";
import PDFDocument from "pdfkit";

export const downloadCertificate = async (req, res) => {
  try {
    const certificate = await Certificate.findById(req.params.id)
      .populate("user");

    if (!certificate) {
      return res.status(404).json({ message: "Certificate not found" });
    }

    const doc = new PDFDocument();

    res.setHeader("Content-Type", "application/pdf");
    res.setHeader(
      "Content-Disposition",
      `attachment; filename=certificate-${certificate.certificateId}.pdf`
    );

    doc.pipe(res);

    doc.fontSize(25).text("Certificate of Appreciation", {
      align: "center"
    });

    doc.moveDown();

    doc.fontSize(16).text(
      `This is to certify that ${certificate.user.name}`,
      { align: "center" }
    );

    doc.moveDown();

    doc.text(
      `has successfully contributed to the Multi Donation Coordination System.`,
      { align: "center" }
    );

    doc.moveDown();

    doc.text(`Total Contribution: ₹${certificate.totalDonations}`, {
      align: "center"
    });

    doc.moveDown();

    doc.text(`Certificate ID: ${certificate.certificateId}`, {
      align: "center"
    });

    doc.moveDown();

    doc.text(`Date: ${new Date().toLocaleDateString()}`, {
      align: "center"
    });

    doc.end();

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};