import { defineRouteConfig } from "@medusajs/admin-sdk";
import { Receipt } from "@medusajs/icons";
import { Container, Heading } from "@medusajs/ui";
import { useEffect, useState } from "react";

function IconComponent() {
  return <Receipt color="#FDB813" />;
}
function useTabFocus() {
  const [isTabFocused, setIsTabFocused] = useState(document.hasFocus());

  useEffect(() => {
    const handleFocus = () => setIsTabFocused(true);
    const handleBlur = () => setIsTabFocused(false);

    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);

    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
    };
  }, []);

  return isTabFocused;
}
function BarcodeScanner() {
  const isTabFocused = useTabFocus();
  const [barcode, setBarcode] = useState("");

  useEffect(() => {
    let scanned = "";
    let timer: any;

    const handleKeyPress = (e: any) => {
      if (e.key === "Enter") {
        setBarcode(scanned);
        console.log("Scanned Barcode:", scanned);
        scanned = "";
        clearTimeout(timer);
      } else {
        scanned += e.key;
        // Reset if typing stops
        clearTimeout(timer);
        timer = setTimeout(() => {
          scanned = "";
        }, 200); // 200ms between keys considered same scan
      }
    };

    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, []);

  useEffect(() => {
    if (barcode) {
      const timer = setTimeout(() => {
        setBarcode("");
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [barcode]);

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-2">
        Scan Barcode {isTabFocused ? "Ready to Scan" : "Not Ready"}
      </h1>
      <p>
        Latest Scanned Code: <span className="font-mono">{barcode}</span>
      </p>
    </div>
  );
}

const CustomPage = () => {
  return (
    <Container className="divide-y p-0">
      <div className="flex items-center justify-between px-6 py-4">
        <Heading level="h2">This is my custom route</Heading>
        <BarcodeScanner />
      </div>
    </Container>
  );
};

export const config = defineRouteConfig({
  label: "POS",
  icon: Receipt,
});

export default CustomPage;
