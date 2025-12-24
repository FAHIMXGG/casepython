"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Download, Loader2 } from "lucide-react";
import jsPDF from "jspdf";
import QRCode from "qrcode";

// Color mapping for PDF (RGB values)
const COLOR_MAP: Record<string, [number, number, number]> = {
  black: [24, 24, 27], // zinc-900
  blue: [30, 64, 175], // blue-800
  rose: [136, 19, 55], // rose-900
  pink: [255, 231, 231], // #FFE7E7
  green: [243, 245, 231], // #F3F5E7
  yellow: [255, 251, 226], // #FFFBE2
};

interface DownloadPDFButtonProps {
  orderId: string;
  model: string;
  designImageUrl: string;
  caseColor?: string;
  color?: string;
  material?: string;
  finish?: string;
}

export default function DownloadPDFButton({
  orderId,
  model,
  designImageUrl,
  caseColor,
  color,
  material,
  finish,
}: DownloadPDFButtonProps) {
  const [isGenerating, setIsGenerating] = useState(false);

  const generatePDF = async () => {
    setIsGenerating(true);
    try {
      // Create new PDF document
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });

      const pageWidth = 210;
      const pageHeight = 297;
      const margin = 15;
      const contentWidth = pageWidth - 2 * margin;

      // Header Section with background
      pdf.setFillColor(240, 240, 240);
      pdf.rect(0, 0, pageWidth, 35, "F");
      
      // Company/Title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(24);
      pdf.setTextColor(30, 30, 30);
      pdf.text("Order Design Specification", pageWidth / 2, 18, { align: "center" });
      
      // Subtitle
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(100, 100, 100);
      pdf.text("Custom Phone Case Design Document", pageWidth / 2, 25, { align: "center" });

      // Generate and add website QR code (small, under subtitle)
      try {
        const websiteQRCode = await QRCode.toDataURL("https://casepython.vercel.app/", {
          width: 200,
          margin: 1,
          color: {
            dark: "#000000",
            light: "#FFFFFF",
          },
        });
        const qrSize = 15; // Small QR code size in mm
        const qrX = pageWidth / 2 - qrSize / 2; // Center horizontally
        const qrY = 28; // Position under subtitle
        pdf.addImage(websiteQRCode, "PNG", qrX, qrY, qrSize, qrSize);
      } catch (error) {
        console.error("Error generating website QR code:", error);
      }

      // Divider line
      pdf.setDrawColor(200, 200, 200);
      pdf.setLineWidth(0.5);
      pdf.line(margin, 45, pageWidth - margin, 45);

      // Order Information Section
      let currentY = 55; // Adjusted for QR code space
      
      // Order ID Box
      pdf.setFillColor(245, 245, 245);
      pdf.roundedRect(margin, currentY, contentWidth, 12, 2, 2, "F");
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(11);
      pdf.setTextColor(60, 60, 60);
      pdf.text("ORDER ID", margin + 3, currentY + 7);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(30, 30, 30);
      pdf.text(orderId, margin + 35, currentY + 7);

      currentY += 18;

      // Specifications Section Title
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(14);
      pdf.setTextColor(30, 30, 30);
      pdf.text("Product Specifications", margin, currentY);

      currentY += 8;

      // Specifications Box
      pdf.setFillColor(255, 255, 255);
      pdf.setDrawColor(220, 220, 220);
      pdf.setLineWidth(0.3);
      pdf.roundedRect(margin, currentY, contentWidth, 35, 2, 2, "FD");

      // Left column specs
      const leftX = margin + 5;
      const rightX = margin + contentWidth / 2 + 5;
      let specY = currentY + 8;

      // Model
      pdf.setFont("helvetica", "bold");
      pdf.setFontSize(9);
      pdf.setTextColor(100, 100, 100);
      pdf.text("Model:", leftX, specY);
      pdf.setFont("helvetica", "normal");
      pdf.setFontSize(10);
      pdf.setTextColor(30, 30, 30);
      pdf.text(model.toUpperCase(), leftX + 18, specY);
      specY += 7;

      // Color
      if (color) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.text("Color:", leftX, specY);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(30, 30, 30);
        pdf.text(color.charAt(0).toUpperCase() + color.slice(1), leftX + 18, specY);
        specY += 7;
      }

      // Material
      if (material) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.text("Material:", leftX, specY);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(30, 30, 30);
        pdf.text(material.charAt(0).toUpperCase() + material.slice(1), leftX + 18, specY);
        specY += 7;
      }

      // Finish (right column)
      if (finish) {
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(9);
        pdf.setTextColor(100, 100, 100);
        pdf.text("Finish:", rightX, currentY + 8);
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(10);
        pdf.setTextColor(30, 30, 30);
        pdf.text(finish.charAt(0).toUpperCase() + finish.slice(1), rightX + 18, currentY + 8);
      }

      currentY += 42;

      // Load phone template and design image, then composite them
      try {
        // Load phone template (use white edges for PDF)
        const phoneTemplate = new Image();
        phoneTemplate.crossOrigin = "anonymous";
        
        // Load design image
        const designImg = new Image();
        designImg.crossOrigin = "anonymous";

        // Load both images
        await Promise.all([
          new Promise<void>((resolve, reject) => {
            phoneTemplate.onload = () => resolve();
            phoneTemplate.onerror = reject;
            phoneTemplate.src = "/phone-template-white-edges.png";
          }),
          new Promise<void>((resolve, reject) => {
            designImg.onload = () => resolve();
            designImg.onerror = async () => {
              // Fallback: try fetching as blob
              try {
                const response = await fetch(designImageUrl);
                const blob = await response.blob();
                const imageUrl = URL.createObjectURL(blob);
                const fallbackImg = new Image();
                fallbackImg.onload = () => {
                  URL.revokeObjectURL(imageUrl);
                  Object.assign(designImg, {
                    width: fallbackImg.width,
                    height: fallbackImg.height,
                    src: imageUrl,
                  });
                  resolve();
                };
                fallbackImg.onerror = reject;
                fallbackImg.src = imageUrl;
              } catch (err) {
                reject(err);
              }
            };
            designImg.src = designImageUrl;
          }),
        ]);

        // Create canvas to composite phone case with design
        const canvas = document.createElement("canvas");
        // Use phone template dimensions
        canvas.width = phoneTemplate.width;
        canvas.height = phoneTemplate.height;
        const ctx = canvas.getContext("2d");
        
        if (!ctx) {
          throw new Error("Could not get canvas context");
        }

        // Fill canvas with case color background if color is provided
        if (caseColor && COLOR_MAP[caseColor]) {
          const [r, g, b] = COLOR_MAP[caseColor];
          ctx.fillStyle = `rgb(${r}, ${g}, ${b})`;
          ctx.fillRect(0, 0, canvas.width, canvas.height);
        }

        // Calculate design image scaling to cover entire canvas (like object-cover)
        const designAspect = designImg.width / designImg.height;
        const canvasAspect = canvas.width / canvas.height;
        
        let drawWidth = canvas.width;
        let drawHeight = canvas.height;
        let drawX = 0;
        let drawY = 0;

        if (designAspect > canvasAspect) {
          // Design is wider - fit to height
          drawHeight = canvas.height;
          drawWidth = designImg.width * (canvas.height / designImg.height);
          drawX = (canvas.width - drawWidth) / 2;
        } else {
          // Design is taller - fit to width
          drawWidth = canvas.width;
          drawHeight = designImg.height * (canvas.width / designImg.width);
          drawY = (canvas.height - drawHeight) / 2;
        }

        // Draw design image first (background) - covering entire canvas
        ctx.drawImage(designImg, drawX, drawY, drawWidth, drawHeight);
        
        // Draw phone template on top (foreground)
        ctx.drawImage(phoneTemplate, 0, 0, canvas.width, canvas.height);

        // Convert canvas to image data
        const compositeImageData = canvas.toDataURL("image/png");

        // Design Preview Section Title
        pdf.setFont("helvetica", "bold");
        pdf.setFontSize(14);
        pdf.setTextColor(30, 30, 30);
        pdf.text("Design Preview", pageWidth / 2, currentY, { align: "center" });

        currentY += 8;

        // Calculate image dimensions to fit in PDF
        const maxWidth = 120; // mm - smaller for better presentation
        const maxHeight = 120; // mm
        const imgWidth = canvas.width;
        const imgHeight = canvas.height;
        const ratio = Math.min(maxWidth / imgWidth, maxHeight / imgHeight);
        const width = imgWidth * ratio;
        const height = imgHeight * ratio;

        // Image frame/box
        const imageBoxPadding = 5;
        const imageBoxWidth = width + imageBoxPadding * 2;
        const imageBoxHeight = height + imageBoxPadding * 2;
        const imageBoxX = (pageWidth - imageBoxWidth) / 2;
        const imageBoxY = currentY;

        // Draw image frame
        pdf.setFillColor(255, 255, 255); // Pure white background
        pdf.setDrawColor(220, 220, 220);
        pdf.setLineWidth(0.5);
        pdf.roundedRect(imageBoxX, imageBoxY, imageBoxWidth, imageBoxHeight, 3, 3, "FD");

        // Center the image within the frame
        const x = imageBoxX + imageBoxPadding;
        const y = imageBoxY + imageBoxPadding;

        // Add composite image to PDF
        pdf.addImage(compositeImageData, "PNG", x, y, width, height);

        // Footer
        const footerY = pageHeight - 15;
        pdf.setDrawColor(200, 200, 200);
        pdf.setLineWidth(0.3);
        pdf.line(margin, footerY - 5, pageWidth - margin, footerY - 5);
        
        // Generate and add Order ID QR code at bottom right corner of page
        try {
          const orderQRCode = await QRCode.toDataURL(orderId, {
            width: 300,
            margin: 2,
            color: {
              dark: "#000000",
              light: "#FFFFFF",
            },
          });
          const qrSize = 20; // Medium size QR code in mm
          const qrX = pageWidth - margin - qrSize; // Right side aligned with margin
          const gapFromLine = 3; // Good visible gap from horizontal line
          const qrY = footerY - 5 - qrSize - gapFromLine; // Positioned up to the horizontal line with visible gap
          
          // Add white background for QR code visibility
          pdf.setFillColor(255, 255, 255);
          pdf.roundedRect(qrX - 1, qrY - 1, qrSize + 2, qrSize + 2, 1, 1, "F");
          
          pdf.addImage(orderQRCode, "PNG", qrX, qrY, qrSize, qrSize);
        } catch (error) {
          console.error("Error generating Order ID QR code:", error);
        }
        
        pdf.setFont("helvetica", "normal");
        pdf.setFontSize(8);
        pdf.setTextColor(150, 150, 150);
        const currentDate = new Date().toLocaleDateString("en-US", {
          year: "numeric",
          month: "long",
          day: "numeric",
        });
        pdf.text(`Generated on ${currentDate}`, margin, footerY);
        pdf.text("CasePython - Custom Phone Cases", pageWidth - margin - 20, footerY, { align: "right" }); // Adjusted to avoid QR code overlap
      } catch (error) {
        console.error("Error loading images:", error);
        pdf.setFontSize(12);
        pdf.setTextColor(255, 0, 0);
        pdf.text("Error loading design image", 20, 80);
        pdf.setTextColor(0, 0, 0);
      }

      // Save the PDF
      pdf.save(`Order-${orderId.slice(0, 8)}-${model}.pdf`);
    } catch (error) {
      console.error("Error generating PDF:", error);
      alert("Failed to generate PDF. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <Button
      onClick={generatePDF}
      disabled={isGenerating}
      variant="default"
      size="sm"
      className="w-full gap-2"
    >
      {isGenerating ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" />
          Generating PDF...
        </>
      ) : (
        <>
          <Download className="h-4 w-4" />
          Download Design PDF
        </>
      )}
    </Button>
  );
}

