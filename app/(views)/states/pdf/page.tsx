"use client";

import React from "react";
import ReactPDF, { Page, Text, View, Document, StyleSheet, pdf } from "@react-pdf/renderer";
import { Button } from "flowbite-react";

export default function page() {
  return (
    <div>
      <MyDocument />
      <Button
        onClick={async () => {
          const doc = pdf(<MyDocument />);
          const pdfBlob = await doc.toBlob(); // Convertir en Blob
          const link = document.createElement("a");
          link.href = URL.createObjectURL(pdfBlob);
          link.download = "document.pdf"; // Nom du fichier PDF
          link.click();
        }}
      >
        Down
      </Button>
    </div>
  );
}

// Create styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "row",
    backgroundColor: "#E4E4E4",
  },
  section: {
    margin: 10,
    padding: 10,
    flexGrow: 1,
  },
});

// Create Document Component
const MyDocument = () => (
  <Document>
    <Page size="A4" style={styles.page}>
      <View style={styles.section}>
        <Text>Section #1</Text>
      </View>
      <View style={styles.section}>
        <Text>Section #2</Text>
      </View>
    </Page>
  </Document>
);
