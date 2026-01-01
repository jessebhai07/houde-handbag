"use client";
import React from "react";

export default function WhatsAppButton() {
  const phone = "+8801915159977";
  const text = encodeURIComponent("Hello! I found you via my React app.");
  const url = `https://wa.me/${phone}?text=${text}`;

  return (
    <button
      onClick={() => window.open(url, "_blank", "noopener,noreferrer")}
      type="button"
    >
      Open WhatsApp
    </button>
  );
}
