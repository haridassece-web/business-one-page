import React, { useState, useId, useEffect } from "react";
import { jsPDF } from "jspdf";
import {
  SECTOR_TEMPLATES,
  DEFAULT_SECTOR_CODE,
  SectorTemplate,
  StarterItemDef,
  INDIAN_STATES,
  getSectorGroups,
} from "../data/billingSectorsData";

export interface CartItem {
  id: string;
  name: string;
  unit: string;
  selling_price: number;
  gst_rate: number;
  qty: number;
  hsn_code?: string;
}

export interface BusinessProfile {
  name: string;
  brand_name: string;
  tagline: string;
  gstin: string;
  state_code: string;
  invoice_prefix: string;
  next_sequence: number;
  address: string;
  phone: string;
  email: string;
  invoice_footer: string;
  brand_color: string;
  show_logo: boolean;
  show_contact: boolean;
  show_gstin: boolean;
  white_label: boolean;
  logo_url: string;
  bank_name: string;
  account_no: string;
  ifsc_code: string;
  upi_id: string;
}

export interface FinalizedInvoice {
  id: string;
  invoice_number: string;
  date: string;
  sector_code: string;
  sector_name: string;
  sector_category: string;
  customer_name: string;
  customer_phone: string;
  customer_state: string;
  order_type: string;
  payment_method: string;
  payment_reference: string;
  custom_fields: Record<string, string>;
  items: {
    name: string;
    hsn: string;
    qty: number;
    price: number;
    total: number;
    gst_rate: number;
    unit: string;
  }[];
  subtotal: number;
  discount: number;
  cgst: number;
  sgst: number;
  igst: number;
  round_off: number;
  total: number;
  cash_tendered: number;
  change_due: number;
  created_at: number;
}

const DEFAULT_PROFILE: BusinessProfile = {
  name: "Nexus Business Billing & POS",
  brand_name: "NEXUS BUSINESS SUITE",
  tagline: "Smart POS & GST Compliant Invoicing Platform",
  gstin: "33ABCDE1234F1Z5",
  state_code: "33",
  invoice_prefix: "NEX",
  next_sequence: 1042,
  address: "Plot 42, Silicon Corridor, Chennai, Tamil Nadu - 600096",
  phone: "+91 70102 31792",
  email: "billing@nexuscreative.site",
  invoice_footer: "Thank you for doing business with us! Visit again.",
  brand_color: "#2563eb",
  show_logo: true,
  show_contact: true,
  show_gstin: true,
  white_label: false,
  logo_url: "",
  bank_name: "HDFC Bank Ltd",
  account_no: "50200088921473",
  ifsc_code: "HDFC0001824",
  upi_id: "nexuscreative@okhdfcbank",
};

export default function BillingInvoiceHub() {
  // Sector Selection State
  const [selectedSectorCode, setSelectedSectorCode] = useState<string>(DEFAULT_SECTOR_CODE);
  const currentSector: SectorTemplate =
    SECTOR_TEMPLATES[selectedSectorCode] || SECTOR_TEMPLATES[DEFAULT_SECTOR_CODE];

  // Business Profile & Customizer State
  const [profile, setProfile] = useState<BusinessProfile>(() => {
    try {
      const saved = localStorage.getItem("nexus_invoice_profile_v1");
      return saved ? { ...DEFAULT_PROFILE, ...JSON.parse(saved) } : DEFAULT_PROFILE;
    } catch {
      return DEFAULT_PROFILE;
    }
  });

  // Local Catalog State (Pre-populated per sector + dynamic custom items)
  const [catalog, setCatalog] = useState<StarterItemDef[]>([]);
  const [catalogSearch, setCatalogSearch] = useState("");

  // Cart / Bill State
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerStateCode, setCustomerStateCode] = useState("33");
  const [orderType, setOrderType] = useState<string>("");
  const [paymentMethod, setPaymentMethod] = useState("UPI / QR Code");
  const [paymentReference, setPaymentReference] = useState("");
  const [discountAmount, setDiscountAmount] = useState<number>(0);
  const [roundOffEnabled, setRoundOffEnabled] = useState(true);
  const [cashTendered, setCashTendered] = useState<string>("");
  const [customFieldValues, setCustomFieldValues] = useState<Record<string, string>>({});

  // Dynamic user-added custom fields list
  const [extraCustomFields, setExtraCustomFields] = useState<Array<{ name: string; label: string }>>([]);

  // Modals & UI States
  const [previewModalOpen, setPreviewModalOpen] = useState(false);
  const [previewFormat, setPreviewFormat] = useState<"80mm" | "a4">("80mm");
  const [activeInvoice, setActiveInvoice] = useState<FinalizedInvoice | null>(null);
  const [quickAddModalOpen, setQuickAddModalOpen] = useState(false);
  const [customFieldModalOpen, setCustomFieldModalOpen] = useState(false);
  const [settingsModalOpen, setSettingsModalOpen] = useState(false);
  const [historyDrawerOpen, setHistoryDrawerOpen] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // New item form state
  const [newItemName, setNewItemName] = useState("");
  const [newItemUnit, setNewItemUnit] = useState("pcs");
  const [newItemPrice, setNewItemPrice] = useState("");
  const [newItemGSTRate, setNewItemGSTRate] = useState(18);
  const [newItemHSN, setNewItemHSN] = useState("");

  // New field form state
  const [newFieldLabel, setNewFieldLabel] = useState("");

  // Saved Invoices History State
  const [savedInvoices, setSavedInvoices] = useState<FinalizedInvoice[]>(() => {
    try {
      const saved = localStorage.getItem("nexus_saved_invoices_v1");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // Sync profile to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("nexus_invoice_profile_v1", JSON.stringify(profile));
    } catch (e) {
      console.warn("Could not save profile to localStorage", e);
    }
  }, [profile]);

  // Sync saved invoices to localStorage
  useEffect(() => {
    try {
      localStorage.setItem("nexus_saved_invoices_v1", JSON.stringify(savedInvoices));
    } catch (e) {
      console.warn("Could not save invoices to localStorage", e);
    }
  }, [savedInvoices]);

  // When sector changes, initialize items, order type, and reset custom fields
  useEffect(() => {
    if (currentSector) {
      setCatalog(currentSector.starter_items || []);
      setOrderType(currentSector.order_types?.[0] || "Standard Order");
      // Pre-fill default starter items in cart to give instant feedback
      const initialCart: CartItem[] = (currentSector.starter_items || []).slice(0, 2).map((item, idx) => ({
        id: `init-${idx}-${Date.now()}`,
        name: item.name,
        unit: item.unit || "unit",
        selling_price: item.selling_price || 100,
        gst_rate: item.gst_rate ?? 18,
        qty: 1,
        hsn_code: item.hsn_code || "998311",
      }));
      setCartItems(initialCart);
      setCustomFieldValues({});
    }
  }, [selectedSectorCode]);

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setTimeout(() => setToastMessage(null), 3500);
  };

  // Add Item to Cart
  const handleAddToCart = (item: StarterItemDef) => {
    setCartItems((prev) => {
      const existing = prev.find((ci) => ci.name.toLowerCase() === item.name.toLowerCase());
      if (existing) {
        return prev.map((ci) => (ci.id === existing.id ? { ...ci, qty: ci.qty + 1 } : ci));
      }
      return [
        ...prev,
        {
          id: `cart-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
          name: item.name,
          unit: item.unit || "pcs",
          selling_price: Number(item.selling_price) || 0,
          gst_rate: Number(item.gst_rate) ?? 18,
          qty: 1,
          hsn_code: item.hsn_code || "998311",
        },
      ];
    });
    showToast(`Added "${item.name}" to bill`);
  };

  // Quick Add Custom Item Handler
  const handleCreateCustomItem = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newItemName.trim()) return;
    const price = parseFloat(newItemPrice) || 0;
    const customItem: StarterItemDef = {
      name: newItemName.trim(),
      unit: newItemUnit.trim() || "pcs",
      selling_price: price,
      gst_rate: Number(newItemGSTRate),
      hsn_code: newItemHSN.trim() || "998311",
    };
    setCatalog((prev) => [customItem, ...prev]);
    handleAddToCart(customItem);
    setNewItemName("");
    setNewItemPrice("");
    setNewItemHSN("");
    setQuickAddModalOpen(false);
  };

  // Add Dynamic Custom Field Handler
  const handleAddCustomField = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newFieldLabel.trim()) return;
    const fieldKey = newFieldLabel.toLowerCase().replace(/[^a-z0-9]/g, "_");
    setExtraCustomFields((prev) => [...prev, { name: fieldKey, label: newFieldLabel.trim() }]);
    setNewFieldLabel("");
    setCustomFieldModalOpen(false);
    showToast(`Field "${newFieldLabel}" added to this invoice`);
  };

  // Update item quantity
  const handleUpdateQty = (id: string, delta: number) => {
    setCartItems((prev) =>
      prev
        .map((item) => {
          if (item.id === id) {
            const nextQty = Math.max(0, item.qty + delta);
            return nextQty === 0 ? null : { ...item, qty: nextQty };
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  // Clear Bill
  const handleClearBill = () => {
    if (cartItems.length > 0 && !window.confirm("Clear all items and reset active bill?")) {
      return;
    }
    setCartItems([]);
    setCustomerName("");
    setCustomerPhone("");
    setDiscountAmount(0);
    setCashTendered("");
    setCustomFieldValues({});
    showToast("Bill cleared successfully");
  };

  // Calculations
  const subtotal = cartItems.reduce((acc, item) => acc + item.selling_price * item.qty, 0);
  const totalTaxAmount = cartItems.reduce((acc, item) => {
    const itemSub = item.selling_price * item.qty;
    return acc + (itemSub * item.gst_rate) / 100;
  }, 0);

  const isInterState =
    customerStateCode && profile.state_code && customerStateCode.trim() !== profile.state_code.trim();

  const cgstAmount = isInterState ? 0 : totalTaxAmount / 2;
  const sgstAmount = isInterState ? 0 : totalTaxAmount / 2;
  const igstAmount = isInterState ? totalTaxAmount : 0;

  const rawTotal = Math.max(0, subtotal + totalTaxAmount - discountAmount);
  const finalTotal = roundOffEnabled ? Math.round(rawTotal) : rawTotal;
  const roundOffAmount = Number((finalTotal - rawTotal).toFixed(2));

  const parsedCash = parseFloat(cashTendered) || 0;
  const changeDue = paymentMethod.startsWith("Cash") && parsedCash > finalTotal ? parsedCash - finalTotal : 0;

  // Generate Final Invoice Object
  const compileInvoiceObject = (): FinalizedInvoice => {
    const prefix = profile.invoice_prefix || currentSector.prefix || "INV";
    const invoiceNum = `${prefix}-${new Date().getFullYear().toString().slice(-2)}${(new Date().getFullYear() + 1).toString().slice(-2)}-${profile.next_sequence}`;

    const mergedCustomFields: Record<string, string> = { ...customFieldValues };

    const inv: FinalizedInvoice = {
      id: `INV-${Date.now()}`,
      invoice_number: invoiceNum,
      date: new Date().toLocaleString("en-IN", {
        day: "2-digit",
        month: "short",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      }),
      sector_code: currentSector.code,
      sector_name: currentSector.name,
      sector_category: currentSector.sector,
      customer_name: customerName.trim() || "Walk-in Customer",
      customer_phone: customerPhone.trim(),
      customer_state: customerStateCode,
      order_type: orderType || currentSector.order_types?.[0] || "Standard",
      payment_method: paymentMethod,
      payment_reference: paymentReference.trim(),
      custom_fields: mergedCustomFields,
      items: cartItems.map((ci) => ({
        name: ci.name,
        hsn: ci.hsn_code || "998311",
        qty: ci.qty,
        price: ci.selling_price,
        total: ci.selling_price * ci.qty,
        gst_rate: ci.gst_rate,
        unit: ci.unit,
      })),
      subtotal,
      discount: discountAmount,
      cgst: cgstAmount,
      sgst: sgstAmount,
      igst: igstAmount,
      round_off: roundOffAmount,
      total: finalTotal,
      cash_tendered: parsedCash,
      change_due: changeDue,
      created_at: Date.now(),
    };
    return inv;
  };

  // Open Preview Modal
  const handleOpenPreview = (format: "80mm" | "a4") => {
    if (cartItems.length === 0) {
      alert("Please add at least one item to preview or generate the invoice.");
      return;
    }
    const compiled = compileInvoiceObject();
    setActiveInvoice(compiled);
    setPreviewFormat(format);
    setPreviewModalOpen(true);
  };

  // Finalize & Save Bill to History
  const handleSaveAndFinalize = () => {
    if (cartItems.length === 0) {
      alert("Please add items to bill before finalizing.");
      return null;
    }
    const compiled = compileInvoiceObject();
    setActiveInvoice(compiled);
    setSavedInvoices((prev) => [compiled, ...prev.slice(0, 49)]);
    setProfile((prev) => ({ ...prev, next_sequence: prev.next_sequence + 1 }));
    showToast(`Invoice ${compiled.invoice_number} saved to history!`);
    return compiled;
  };

  // Direct Browser Print (works with thermal POS or A4 sheet via printable container)
  const handleBrowserPrint = (format: "80mm" | "a4", targetInv?: FinalizedInvoice) => {
    let inv = targetInv || activeInvoice;
    if (!inv) {
      inv = handleSaveAndFinalize();
    }
    if (!inv) return;

    setActiveInvoice(inv);
    setPreviewFormat(format);

    setTimeout(() => {
      window.print();
    }, 250);
  };

  // jsPDF Vector PDF Download
  const handleDownloadPDF = (format: "80mm" | "a4", targetInv?: FinalizedInvoice) => {
    let inv = targetInv || activeInvoice;
    if (!inv) {
      inv = handleSaveAndFinalize();
    }
    if (!inv) return;

    try {
      if (format === "80mm") {
        generate80mmPDF(inv);
      } else {
        generateA4PDF(inv);
      }
      showToast(`Invoice ${inv.invoice_number} PDF downloaded!`);
    } catch (err: any) {
      console.error("PDF generation failed:", err);
      alert("Could not generate PDF: " + (err?.message || "Unknown error"));
    }
  };

  // jsPDF 80mm Thermal Receipt Generator
  const generate80mmPDF = (inv: FinalizedInvoice) => {
    const customCount = Object.keys(inv.custom_fields || {}).length;
    const estHeight = Math.max(160, 95 + inv.items.length * 8 + customCount * 5);
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: [80, estHeight],
    });

    let y = 8;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.setTextColor(30, 41, 59);
    doc.text(profile.brand_name || profile.name || "TAX INVOICE", 40, y, { align: "center" });

    y += 4;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`${inv.sector_name} (${inv.sector_category})`, 40, y, { align: "center" });

    if (profile.show_contact && profile.address) {
      y += 4;
      doc.text(profile.address.slice(0, 38), 40, y, { align: "center" });
    }
    if (profile.show_contact && profile.phone) {
      y += 4;
      doc.text(`Phone: ${profile.phone}`, 40, y, { align: "center" });
    }
    if (profile.show_gstin && profile.gstin) {
      y += 4;
      doc.text(`GSTIN: ${profile.gstin}`, 40, y, { align: "center" });
    }

    y += 3;
    doc.setDrawColor(150, 150, 150);
    doc.setLineWidth(0.3);
    doc.line(4, y, 76, y);

    y += 4;
    doc.setFontSize(8);
    doc.setTextColor(30, 41, 59);
    doc.text(`Invoice: ${inv.invoice_number}`, 4, y);

    y += 4;
    doc.text(`Date: ${inv.date}`, 4, y);
    doc.text(`Order: ${inv.order_type}`, 45, y);

    y += 4;
    doc.text(`${currentSector.customer_label}: ${inv.customer_name}`, 4, y);

    if (inv.customer_phone) {
      y += 4;
      doc.text(`Phone: ${inv.customer_phone}`, 4, y);
    }

    if (inv.custom_fields && Object.keys(inv.custom_fields).length > 0) {
      Object.entries(inv.custom_fields).forEach(([k, v]) => {
        if (v) {
          y += 4;
          const def = currentSector.custom_fields.find((f) => f.name === k);
          const label = def?.label || k;
          doc.text(`${label}: ${v}`, 4, y);
        }
      });
    }

    y += 4;
    doc.text(`Payment: ${inv.payment_method}`, 4, y);

    y += 3;
    doc.line(4, y, 76, y);

    // Items table header
    y += 4;
    doc.setFont("helvetica", "bold");
    doc.text("Item", 4, y);
    doc.text("Qty", 46, y, { align: "center" });
    doc.text("Rate", 58, y, { align: "right" });
    doc.text("Total", 76, y, { align: "right" });

    y += 2;
    doc.line(4, y, 76, y);
    doc.setFont("helvetica", "normal");

    inv.items.forEach((item) => {
      y += 4;
      doc.text(item.name.slice(0, 18), 4, y);
      doc.text(String(item.qty), 46, y, { align: "center" });
      doc.text(`Rs.${item.price.toFixed(1)}`, 58, y, { align: "right" });
      doc.text(`Rs.${item.total.toFixed(2)}`, 76, y, { align: "right" });
    });

    y += 3;
    doc.line(4, y, 76, y);

    y += 4;
    doc.text("Subtotal:", 44, y);
    doc.text(`Rs.${inv.subtotal.toFixed(2)}`, 76, y, { align: "right" });

    if (inv.discount > 0) {
      y += 4;
      doc.setTextColor(185, 28, 28);
      doc.text("Discount:", 44, y);
      doc.text(`-Rs.${inv.discount.toFixed(2)}`, 76, y, { align: "right" });
      doc.setTextColor(30, 41, 59);
    }

    if (inv.cgst > 0) {
      y += 4;
      doc.text("CGST:", 44, y);
      doc.text(`Rs.${inv.cgst.toFixed(2)}`, 76, y, { align: "right" });
    }
    if (inv.sgst > 0) {
      y += 4;
      doc.text("SGST:", 44, y);
      doc.text(`Rs.${inv.sgst.toFixed(2)}`, 76, y, { align: "right" });
    }
    if (inv.igst > 0) {
      y += 4;
      doc.text("IGST:", 44, y);
      doc.text(`Rs.${inv.igst.toFixed(2)}`, 76, y, { align: "right" });
    }
    if (Math.abs(inv.round_off) > 0.001) {
      y += 4;
      doc.text("Round Off:", 44, y);
      doc.text(`${inv.round_off > 0 ? "+" : ""}Rs.${inv.round_off.toFixed(2)}`, 76, y, { align: "right" });
    }

    y += 2;
    doc.line(4, y, 76, y);

    y += 5;
    doc.setFont("helvetica", "bold");
    doc.setFontSize(10);
    doc.text("GRAND TOTAL:", 4, y);
    doc.text(`Rs.${inv.total.toFixed(2)}`, 76, y, { align: "right" });

    if (inv.payment_method.startsWith("Cash") && inv.cash_tendered > inv.total) {
      y += 4;
      doc.setFont("helvetica", "normal");
      doc.setFontSize(8);
      doc.text(`Cash Tendered: Rs.${inv.cash_tendered.toFixed(2)}`, 4, y);
      y += 3.5;
      doc.text(`Change Returned: Rs.${inv.change_due.toFixed(2)}`, 4, y);
    }

    y += 6;
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.setTextColor(100, 116, 139);
    doc.text(profile.invoice_footer || "*** THANK YOU FOR VISITING ***", 40, y, { align: "center" });

    if (!profile.white_label) {
      y += 4;
      doc.setFontSize(7);
      doc.setTextColor(140, 140, 140);
      doc.text("Powered by Nexus Creative SaaS", 40, y, { align: "center" });
    }

    doc.save(`${inv.invoice_number}-POS-Receipt.pdf`);
  };

  // jsPDF A4 Standard Corporate Tax Invoice Generator
  const generateA4PDF = (inv: FinalizedInvoice) => {
    const doc = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    let y = 18;

    // Header Left: Brand Info
    doc.setFont("helvetica", "bold");
    doc.setFontSize(18);
    doc.setTextColor(15, 23, 42);
    doc.text(profile.brand_name || profile.name || "TAX INVOICE", 14, y);

    y += 5;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(profile.tagline || "Enterprise Invoicing & Billing Suite", 14, y);

    y += 4.5;
    doc.text(`${profile.address || "Chennai, Tamil Nadu"} | Phone: ${profile.phone}`, 14, y);

    y += 4.5;
    doc.text(`GSTIN: ${profile.gstin || "N/A"} | State: ${profile.state_code}`, 14, y);

    // Header Right: Invoice Title & Meta
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(37, 99, 235);
    doc.text("TAX INVOICE", 196, 18, { align: "right" });

    doc.setFont("helvetica", "normal");
    doc.setFontSize(9);
    doc.setTextColor(15, 23, 42);
    doc.text(`Invoice No: ${inv.invoice_number}`, 196, 25, { align: "right" });
    doc.text(`Date: ${inv.date}`, 196, 30, { align: "right" });
    doc.text(`Order Type: ${inv.order_type}`, 196, 35, { align: "right" });
    doc.text(`Payment: ${inv.payment_method}`, 196, 40, { align: "right" });

    y += 12;
    doc.setDrawColor(203, 213, 225);
    doc.setLineWidth(0.4);
    doc.line(14, y, 196, y);

    // Bill To & Sector Grid Boxes
    y += 5;
    doc.setFillColor(248, 250, 252);
    doc.roundedRect(14, y, 88, 26, 2, 2, "F");
    doc.roundedRect(108, y, 88, 26, 2, 2, "F");

    // Bill To
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text(`BILLED TO (${currentSector.customer_label.toUpperCase()})`, 18, y + 6);

    doc.setFontSize(11);
    doc.setTextColor(15, 23, 42);
    doc.text(inv.customer_name, 18, y + 13);

    doc.setFontSize(8.5);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(100, 116, 139);
    if (inv.customer_phone) {
      doc.text(`Phone: ${inv.customer_phone}`, 18, y + 19);
    }
    doc.text(`State Code: ${inv.customer_state}`, 18, y + 23);

    // Sector & Order Details
    doc.setFont("helvetica", "bold");
    doc.setFontSize(9);
    doc.setTextColor(71, 85, 105);
    doc.text("SECTOR & WORKSPACE DETAILS", 112, y + 6);

    doc.setFontSize(9);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(15, 23, 42);
    doc.text(`Sector: ${inv.sector_name} (${inv.sector_category})`, 112, y + 12);

    let cfLine = y + 17;
    const cfEntries = Object.entries(inv.custom_fields || {});
    if (cfEntries.length > 0) {
      const [k, v] = cfEntries[0];
      const def = currentSector.custom_fields.find((f) => f.name === k);
      const label = def?.label || k;
      doc.text(`${label}: ${v}`, 112, cfLine);
      cfLine += 4.5;
    }
    if (cfEntries.length > 1) {
      const [k, v] = cfEntries[1];
      const def = currentSector.custom_fields.find((f) => f.name === k);
      const label = def?.label || k;
      doc.text(`${label}: ${v}`, 112, cfLine);
    }

    // Table Header
    y += 33;
    doc.setFillColor(15, 23, 42);
    doc.rect(14, y, 182, 8, "F");

    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(255, 255, 255);
    doc.text("#", 17, y + 5.5);
    doc.text("ITEM / SERVICE DESCRIPTION", 26, y + 5.5);
    doc.text("HSN", 112, y + 5.5);
    doc.text("QTY", 132, y + 5.5, { align: "center" });
    doc.text("RATE", 152, y + 5.5, { align: "right" });
    doc.text("GST", 168, y + 5.5, { align: "right" });
    doc.text("TOTAL", 192, y + 5.5, { align: "right" });

    // Table Rows
    y += 8;
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.setTextColor(30, 41, 59);

    inv.items.forEach((item, index) => {
      const rowY = y + 6;
      doc.text(String(index + 1), 17, rowY);
      doc.text(item.name.slice(0, 42), 26, rowY);
      doc.text(item.hsn || "998311", 112, rowY);
      doc.text(`${item.qty} ${item.unit}`, 132, rowY, { align: "center" });
      doc.text(`Rs.${item.price.toFixed(2)}`, 152, rowY, { align: "right" });
      doc.text(`${item.gst_rate}%`, 168, rowY, { align: "right" });
      doc.text(`Rs.${item.total.toFixed(2)}`, 192, rowY, { align: "right" });

      y += 7.5;
      doc.setDrawColor(241, 245, 249);
      doc.line(14, y, 196, y);
    });

    // Summary & Totals
    y += 8;
    const totalsStartY = y;

    // Left Column: Bank Details & Terms
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8.5);
    doc.setTextColor(15, 23, 42);
    doc.text("Bank & Payment Details:", 14, totalsStartY);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`Bank: ${profile.bank_name} | A/C: ${profile.account_no}`, 14, totalsStartY + 4.5);
    doc.text(`IFSC: ${profile.ifsc_code} | UPI: ${profile.upi_id}`, 14, totalsStartY + 9);

    doc.setFont("helvetica", "bold");
    doc.text("Terms & Conditions:", 14, totalsStartY + 16);
    doc.setFont("helvetica", "italic");
    doc.setFontSize(7.5);
    doc.text("1. Goods/Services once billed are subject to standard verification.", 14, totalsStartY + 20.5);
    doc.text("2. Please quote invoice reference for any warranty or AMC queries.", 14, totalsStartY + 24.5);

    // Right Column: Totals Table
    let curTotalY = totalsStartY;
    const renderTotalRow = (label: string, val: string, isBold: boolean = false, isDanger: boolean = false) => {
      doc.setFont("helvetica", isBold ? "bold" : "normal");
      doc.setFontSize(isBold ? 9.5 : 8.5);
      doc.setTextColor(isDanger ? 185 : 30, isDanger ? 28 : 41, isDanger ? 28 : 59);
      doc.text(label, 135, curTotalY);
      doc.text(val, 192, curTotalY, { align: "right" });
      curTotalY += 5;
    };

    renderTotalRow("Taxable Subtotal:", `Rs.${inv.subtotal.toFixed(2)}`);
    if (inv.discount > 0) {
      renderTotalRow("Discount:", `-Rs.${inv.discount.toFixed(2)}`, false, true);
    }
    if (inv.cgst > 0) renderTotalRow("CGST:", `Rs.${inv.cgst.toFixed(2)}`);
    if (inv.sgst > 0) renderTotalRow("SGST:", `Rs.${inv.sgst.toFixed(2)}`);
    if (inv.igst > 0) renderTotalRow("IGST:", `Rs.${inv.igst.toFixed(2)}`);
    if (Math.abs(inv.round_off) > 0.001) {
      renderTotalRow("Round Off:", `${inv.round_off > 0 ? "+" : ""}Rs.${inv.round_off.toFixed(2)}`);
    }

    doc.setDrawColor(15, 23, 42);
    doc.setLineWidth(0.4);
    doc.line(130, curTotalY, 196, curTotalY);
    curTotalY += 4.5;

    doc.setFont("helvetica", "bold");
    doc.setFontSize(12);
    doc.setTextColor(37, 99, 235);
    doc.text("GRAND TOTAL:", 135, curTotalY);
    doc.text(`Rs.${inv.total.toFixed(2)}`, 192, curTotalY, { align: "right" });

    // Signatory
    const signY = Math.max(curTotalY + 14, totalsStartY + 35);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(71, 85, 105);
    doc.text(`For ${profile.brand_name || profile.name}`, 196, signY, { align: "right" });
    doc.line(148, signY + 12, 196, signY + 12);
    doc.text("Authorized Signatory", 196, signY + 16, { align: "right" });

    // Footer
    if (!profile.white_label) {
      doc.setFontSize(7.5);
      doc.setTextColor(148, 163, 184);
      doc.text("Generated with Nexus Creative Multi-Sector SaaS & POS Infrastructure", 14, 285);
    }

    doc.save(`${inv.invoice_number}-A4-Tax-Invoice.pdf`);
  };

  // 1-Click WhatsApp Share Link
  const handleWhatsAppShare = (targetInv?: FinalizedInvoice) => {
    let inv = targetInv || activeInvoice;
    if (!inv) {
      inv = handleSaveAndFinalize();
    }
    if (!inv) return;

    const phoneRaw = (inv.customer_phone || customerPhone || "").replace(/\D/g, "");
    const formattedPhone = phoneRaw.length === 10 ? `91${phoneRaw}` : phoneRaw;
    const brandTitle = profile.brand_name || profile.name || "INVOICE";
    const footer = profile.invoice_footer || "Thank you for choosing us!";

    let text = `*${brandTitle.toUpperCase()}*\n`;
    text += `*Sector:* ${inv.sector_name} (${inv.sector_category})\n`;
    text += `*Invoice #:* ${inv.invoice_number}\n`;
    text += `*Date:* ${inv.date}\n`;
    text += `*${currentSector.customer_label}:* ${inv.customer_name}\n`;

    if (inv.custom_fields) {
      Object.entries(inv.custom_fields).forEach(([k, v]) => {
        if (v) {
          const def = currentSector.custom_fields.find((f) => f.name === k);
          const label = def?.label || k;
          text += `*${label}:* ${v}\n`;
        }
      });
    }

    text += `-----------------------------\n`;
    inv.items.forEach((item) => {
      text += `• ${item.name} x ${item.qty} ${item.unit} = ₹${item.total.toFixed(2)}\n`;
    });
    text += `-----------------------------\n`;
    text += `*Taxable Subtotal:* ₹${inv.subtotal.toFixed(2)}\n`;
    if (inv.discount > 0) text += `*Discount:* -₹${inv.discount.toFixed(2)}\n`;
    if (inv.cgst > 0) text += `*CGST:* ₹${inv.cgst.toFixed(2)}\n`;
    if (inv.sgst > 0) text += `*SGST:* ₹${inv.sgst.toFixed(2)}\n`;
    if (inv.igst > 0) text += `*IGST:* ₹${inv.igst.toFixed(2)}\n`;
    text += `*TOTAL AMOUNT:* ₹${inv.total.toFixed(2)}\n`;
    text += `*Payment Mode:* ${inv.payment_method}\n\n`;
    text += `${footer}`;
    if (!profile.white_label) {
      text += `\n_Powered by Nexus Creative_`;
    }

    const waUrl = formattedPhone
      ? `https://wa.me/${formattedPhone}?text=${encodeURIComponent(text)}`
      : `https://wa.me/?text=${encodeURIComponent(text)}`;

    window.open(waUrl, "_blank");
    showToast("Opening WhatsApp with formatted invoice...");
  };

  const sectorGroups = getSectorGroups();

  return (
    <section id="billing-invoice" className="relative py-20 bg-[#040817] text-slate-100 overflow-hidden">
      {/* Background Cyber Accents */}
      <div className="absolute inset-0 bg-grid-cyber opacity-25 pointer-events-none" />
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Toast Notification */}
      {toastMessage && (
        <div className="fixed bottom-6 right-6 z-50 px-5 py-3 rounded-xl bg-cyan-500 text-black font-bold shadow-2xl shadow-cyan-500/50 flex items-center gap-2 animate-bounce">
          <span>✓</span>
          <span>{toastMessage}</span>
        </div>
      )}

      <div className="max-w-7xl mx-auto px-4 sm:px-6 relative z-10">
        {/* ========================================================================= */}
        {/* TOP HEADER & SECTOR SWITCHER RIBBON                                       */}
        {/* ========================================================================= */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-cyan-500/20 mb-8">
          <div>
            <div className="flex flex-wrap items-center gap-2.5 mb-2">
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/40">
                ✦ {currentSector.sector}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-800/90 text-slate-300 border border-white/10">
                {currentSector.name} Template
              </span>
              <span className="px-2.5 py-0.5 rounded text-[11px] font-mono bg-blue-500/15 text-blue-300 border border-blue-500/30">
                Prefix: {profile.invoice_prefix || currentSector.prefix}
              </span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white tracking-tight flex items-center gap-3">
              <span>🧾 {profile.name}</span>
            </h2>
            <p className="text-xs sm:text-sm text-slate-400 mt-1 max-w-2xl">
              Production-ready multi-sector billing suite replicating{" "}
              <a
                href="https://web-58ht.vercel.app/"
                target="_blank"
                rel="noreferrer"
                className="text-cyan-400 underline hover:text-cyan-300"
              >
                web-58ht.vercel.app
              </a>
              : 62+ business sectors, dynamic custom fields, GST intra/inter-state calculations, 80mm thermal POS slips,
              A4 tax sheets, jsPDF download, and 1-click WhatsApp dispatch.
            </p>
          </div>

          {/* Quick Header Actions */}
          <div className="flex flex-wrap items-center gap-2.5">
            <button
              type="button"
              onClick={() => setQuickAddModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-cyan-500/15 hover:bg-cyan-500/25 border border-cyan-500/40 text-cyan-300 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>➕</span>
              <span>Quick Add Item</span>
            </button>

            <button
              type="button"
              onClick={() => setCustomFieldModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-purple-500/15 hover:bg-purple-500/25 border border-purple-500/40 text-purple-300 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>🏷️</span>
              <span>Custom Field</span>
            </button>

            <button
              type="button"
              onClick={() => setSettingsModalOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 border border-white/10 text-slate-200 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>⚙️</span>
              <span>Branding</span>
            </button>

            <button
              type="button"
              onClick={() => setHistoryDrawerOpen(true)}
              className="px-3.5 py-2 rounded-xl bg-blue-500/15 hover:bg-blue-500/25 border border-blue-500/40 text-blue-300 text-xs font-bold transition-all flex items-center gap-1.5"
            >
              <span>📜</span>
              <span>History ({savedInvoices.length})</span>
            </button>

            <button
              type="button"
              onClick={handleClearBill}
              className="px-3 py-2 rounded-xl bg-red-500/10 hover:bg-red-500/20 border border-red-500/30 text-red-400 text-xs font-bold transition-all"
              title="Reset current cart"
            >
              🗑️ Clear
            </button>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* SECTOR PICKER BAR (62+ SECTORS GROUPED BY INDUSTRY)                        */}
        {/* ========================================================================= */}
        <div className="mb-8 p-4 rounded-2xl bg-[#09112a] border border-cyan-500/20 shadow-lg">
          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <span className="text-cyan-400 font-bold text-sm">🏢 Business Sector &amp; Industry Template:</span>
              <span className="text-xs text-slate-400 hidden sm:inline">
                Switches custom fields, labels, starter catalog &amp; GST presets
              </span>
            </div>

            <div className="flex-1 max-w-md">
              <select
                value={selectedSectorCode}
                onChange={(e) => setSelectedSectorCode(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-[#030712] border border-cyan-500/40 text-white text-xs font-bold focus:outline-none focus:ring-2 focus:ring-cyan-400/50 cursor-pointer"
              >
                {Object.entries(sectorGroups).map(([groupName, sectors]) => (
                  <optgroup key={groupName} label={`📁 ${groupName} (${sectors.length})`}>
                    {sectors.map((sec) => (
                      <option key={sec.code} value={sec.code}>
                        {sec.name} [{sec.prefix}]
                      </option>
                    ))}
                  </optgroup>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* ========================================================================= */}
        {/* MAIN 2-COLUMN BILLING LAYOUT                                              */}
        {/* ========================================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* LEFT COLUMN: Catalog Search & Quick Items (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            {/* Search & Sector Meta Header */}
            <div className="p-5 rounded-2xl bg-[#081028] border border-cyan-500/20 space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3">
                <div>
                  <h3 className="text-sm font-black text-white uppercase tracking-wider flex items-center gap-2">
                    <span className="text-cyan-400">✦</span>
                    <span>{currentSector.item_label} Catalog</span>
                  </h3>
                  <p className="text-xs text-slate-400 mt-0.5">
                    Click any item below to immediately add to the active invoice
                  </p>
                </div>

                {/* Instant Real-Time Search */}
                <div className="relative w-full sm:w-64">
                  <input
                    type="text"
                    value={catalogSearch}
                    onChange={(e) => setCatalogSearch(e.target.value)}
                    placeholder={`Search ${currentSector.name} items...`}
                    className="w-full pl-8 pr-7 py-2 bg-[#030612] border border-cyan-500/30 rounded-xl text-xs text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                  <span className="absolute left-2.5 top-2 text-slate-400 text-xs">🔍</span>
                  {catalogSearch && (
                    <button
                      type="button"
                      onClick={() => setCatalogSearch("")}
                      className="absolute right-2 top-2 text-slate-400 hover:text-white text-xs"
                    >
                      ✕
                    </button>
                  )}
                </div>
              </div>

              {/* Product Tiles Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 max-h-[360px] overflow-y-auto pr-1">
                {catalog
                  .filter((item) => item.name.toLowerCase().includes(catalogSearch.toLowerCase()))
                  .map((item, idx) => (
                    <button
                      key={idx}
                      type="button"
                      onClick={() => handleAddToCart(item)}
                      className="group p-3.5 rounded-xl bg-[#0c1636] hover:bg-[#13224f] border border-cyan-500/20 hover:border-cyan-400/50 text-left transition-all flex flex-col justify-between cursor-pointer"
                    >
                      <div>
                        <div className="text-xs font-bold text-white group-hover:text-cyan-300 transition-colors line-clamp-2">
                          {item.name}
                        </div>
                        <div className="text-[10px] text-slate-400 mt-1 flex items-center gap-1.5">
                          <span className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 font-mono">
                            {item.unit}
                          </span>
                          <span>GST {item.gst_rate}%</span>
                        </div>
                      </div>

                      <div className="mt-3 flex items-center justify-between pt-2 border-t border-white/5">
                        <span className="text-sm font-extrabold text-cyan-400">₹{item.selling_price}</span>
                        <span className="text-[11px] font-bold text-slate-400 group-hover:text-cyan-300">
                          + Add
                        </span>
                      </div>
                    </button>
                  ))}
              </div>
            </div>

            {/* Sector-Specific Custom Fields Card */}
            <div className="p-5 rounded-2xl bg-[#081028] border border-cyan-500/20 space-y-4">
              <div className="flex items-center justify-between pb-2 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="text-purple-400 font-bold">🏷️</span>
                  <h3 className="text-xs font-black uppercase tracking-wider text-white">
                    {currentSector.name} Custom Invoice Metadata
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCustomFieldModalOpen(true)}
                  className="text-xs text-cyan-400 hover:text-cyan-300 font-bold"
                >
                  + Add Custom Field
                </button>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {currentSector.custom_fields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="text-[11px] font-bold text-slate-300 uppercase tracking-wide">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={customFieldValues[field.name] || ""}
                      onChange={(e) =>
                        setCustomFieldValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                      }
                      placeholder={field.placeholder || `Enter ${field.label}...`}
                      className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/25 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                ))}

                {/* Extra dynamic fields */}
                {extraCustomFields.map((field) => (
                  <div key={field.name} className="space-y-1">
                    <label className="text-[11px] font-bold text-purple-300 uppercase tracking-wide">
                      {field.label}
                    </label>
                    <input
                      type="text"
                      value={customFieldValues[field.name] || ""}
                      onChange={(e) =>
                        setCustomFieldValues((prev) => ({ ...prev, [field.name]: e.target.value }))
                      }
                      placeholder={`Enter ${field.label}...`}
                      className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-purple-500/30 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-400"
                    />
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Active Cart, Customer Info & Totals (5 Cols) */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-5 rounded-2xl bg-[#09122f] border-2 border-cyan-500/30 shadow-2xl space-y-5">
              {/* Header */}
              <div className="flex items-center justify-between pb-3 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-pulse" />
                  <h3 className="text-sm font-black uppercase tracking-wider text-white">Active Invoice Bill</h3>
                </div>
                <span className="text-xs font-mono text-cyan-400 px-2.5 py-0.5 rounded-full bg-cyan-500/10 border border-cyan-500/30">
                  {cartItems.length} items
                </span>
              </div>

              {/* Customer Info Form */}
              <div className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">
                      {currentSector.customer_label} *
                    </label>
                    <input
                      type="text"
                      value={customerName}
                      onChange={(e) => setCustomerName(e.target.value)}
                      placeholder="e.g. John Doe / Walk-in"
                      className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Order Type</label>
                    <select
                      value={orderType}
                      onChange={(e) => setOrderType(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      {currentSector.order_types.map((type) => (
                        <option key={type} value={type}>
                          {type}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Phone Number (10 Digits)</label>
                    <input
                      type="text"
                      maxLength={10}
                      value={customerPhone}
                      onChange={(e) => setCustomerPhone(e.target.value.replace(/\D/g, ""))}
                      placeholder="9876543210 (for WhatsApp)"
                      className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">State (GST Rate)</label>
                    <select
                      value={customerStateCode}
                      onChange={(e) => setCustomerStateCode(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      {INDIAN_STATES.map((s) => (
                        <option key={s.code} value={s.code}>
                          {s.name}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* Cart Table / Items List */}
              <div className="border border-white/10 rounded-xl overflow-hidden bg-[#050b1e]">
                <div className="max-h-48 overflow-y-auto divide-y divide-white/5">
                  {cartItems.length === 0 ? (
                    <div className="p-6 text-center text-xs text-slate-500">
                      No items added yet. Click any product from the catalog on the left to begin billing.
                    </div>
                  ) : (
                    cartItems.map((item) => (
                      <div key={item.id} className="p-2.5 flex items-center justify-between gap-2 text-xs">
                        <div className="flex-1 min-w-0">
                          <div className="font-bold text-white truncate">{item.name}</div>
                          <div className="text-[10px] text-slate-400 font-mono">
                            ₹{item.selling_price} / {item.unit} · GST {item.gst_rate}%
                          </div>
                        </div>

                        {/* Stepper */}
                        <div className="flex items-center gap-1.5 shrink-0">
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(item.id, -1)}
                            className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-xs"
                          >
                            -
                          </button>
                          <span className="w-6 text-center font-bold text-cyan-300">{item.qty}</span>
                          <button
                            type="button"
                            onClick={() => handleUpdateQty(item.id, 1)}
                            className="w-6 h-6 rounded bg-slate-800 hover:bg-slate-700 text-white font-bold flex items-center justify-center text-xs"
                          >
                            +
                          </button>
                        </div>

                        <div className="w-16 text-right font-extrabold text-cyan-400 shrink-0">
                          ₹{(item.selling_price * item.qty).toFixed(2)}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Totals Breakdown */}
              <div className="p-3.5 rounded-xl bg-[#050b1e] border border-white/10 space-y-2 text-xs">
                <div className="flex justify-between text-slate-300">
                  <span>Subtotal:</span>
                  <span className="font-mono">₹{subtotal.toFixed(2)}</span>
                </div>

                <div className="flex items-center justify-between text-slate-300">
                  <span>Discount (₹):</span>
                  <input
                    type="number"
                    min={0}
                    value={discountAmount || ""}
                    onChange={(e) => setDiscountAmount(parseFloat(e.target.value) || 0)}
                    placeholder="0"
                    className="w-20 px-2 py-0.5 rounded bg-[#030612] border border-cyan-500/30 text-right font-mono text-xs text-white"
                  />
                </div>

                {/* GST Details */}
                {isInterState ? (
                  <div className="flex justify-between text-slate-400 text-[11px]">
                    <span>IGST (Inter-state):</span>
                    <span className="font-mono">₹{igstAmount.toFixed(2)}</span>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>CGST:</span>
                      <span className="font-mono">₹{cgstAmount.toFixed(2)}</span>
                    </div>
                    <div className="flex justify-between text-slate-400 text-[11px]">
                      <span>SGST:</span>
                      <span className="font-mono">₹{sgstAmount.toFixed(2)}</span>
                    </div>
                  </>
                )}

                <div className="flex items-center justify-between text-slate-400 text-[11px]">
                  <label className="flex items-center gap-1.5 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={roundOffEnabled}
                      onChange={(e) => setRoundOffEnabled(e.target.checked)}
                      className="rounded text-cyan-500"
                    />
                    <span>Round Off Total</span>
                  </label>
                  <span className="font-mono">
                    {roundOffAmount > 0 ? `+₹${roundOffAmount}` : `₹${roundOffAmount}`}
                  </span>
                </div>

                <div className="pt-2 border-t border-white/10 flex justify-between items-baseline">
                  <span className="text-sm font-black text-white">GRAND TOTAL:</span>
                  <span className="text-xl font-black text-cyan-400 font-mono">₹{finalTotal.toFixed(2)}</span>
                </div>
              </div>

              {/* Payment Mode & Cash Tendered */}
              <div className="space-y-2.5">
                <div className="grid grid-cols-2 gap-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Payment Method</label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value)}
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#030612] border border-cyan-500/30 text-xs text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    >
                      <option value="UPI / QR Code">UPI / QR Code</option>
                      <option value="Cash">Cash</option>
                      <option value="Card (POS Machine)">Card (POS Machine)</option>
                      <option value="Net Banking / NEFT">Net Banking / NEFT</option>
                      <option value="Credit / Due">Credit / Due</option>
                    </select>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-slate-300 block mb-1">Payment Ref / UTR</label>
                    <input
                      type="text"
                      value={paymentReference}
                      onChange={(e) => setPaymentReference(e.target.value)}
                      placeholder="e.g. UTR-998271"
                      className="w-full px-2.5 py-1.5 rounded-xl bg-[#030612] border border-cyan-500/30 text-xs text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                    />
                  </div>
                </div>

                {/* If Cash Tendered */}
                {paymentMethod.startsWith("Cash") && (
                  <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-1.5">
                    <div className="flex justify-between items-center text-xs">
                      <span className="text-emerald-300 font-bold">Cash Tendered by Customer:</span>
                      <input
                        type="number"
                        value={cashTendered}
                        onChange={(e) => setCashTendered(e.target.value)}
                        placeholder="e.g. 500"
                        className="w-24 px-2 py-1 rounded bg-[#030612] border border-emerald-500/50 text-right font-mono text-xs text-white"
                      />
                    </div>
                    {changeDue > 0 && (
                      <div className="flex justify-between text-xs font-black text-emerald-400 pt-1 border-t border-emerald-500/20">
                        <span>Change Due to Return:</span>
                        <span className="font-mono">₹{changeDue.toFixed(2)}</span>
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* ACTION BUTTONS GRID */}
              <div className="space-y-2 pt-2">
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleOpenPreview("80mm")}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>🧾</span>
                    <span>Preview 80mm Roll</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleOpenPreview("a4")}
                    className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>📄</span>
                    <span>Preview A4 Sheet</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleBrowserPrint("80mm")}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white text-xs font-bold shadow-lg shadow-cyan-900/40 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>🖨️</span>
                    <span>Print 80mm POS Slip</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleBrowserPrint("a4")}
                    className="py-2.5 px-3 rounded-xl bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-black font-extrabold text-xs shadow-lg shadow-cyan-900/40 transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>🖨️</span>
                    <span>Print A4 Tax Invoice</span>
                  </button>
                </div>

                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleDownloadPDF("a4")}
                    className="py-2.5 px-3 rounded-xl bg-purple-600/30 hover:bg-purple-600/50 border border-purple-500/40 text-purple-200 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>📥</span>
                    <span>Download Vector PDF</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => handleWhatsAppShare()}
                    className="py-2.5 px-3 rounded-xl bg-emerald-600/30 hover:bg-emerald-600/50 border border-emerald-500/40 text-emerald-300 text-xs font-bold transition-all flex items-center justify-center gap-1.5"
                  >
                    <span>💬</span>
                    <span>Share on WhatsApp</span>
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MODAL: LIVE BILL INVOICE PREVIEW (80mm Thermal & A4 Sheet)                */}
      {/* ========================================================================= */}
      {previewModalOpen && activeInvoice && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto no-print">
          <div
            className={`bg-[#0f172a] border border-cyan-500/40 rounded-2xl p-6 w-full max-h-[92vh] overflow-y-auto shadow-2xl transition-all ${
              previewFormat === "a4" ? "max-w-4xl" : "max-w-md"
            }`}
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-2">
                <span className="text-lg">🧾</span>
                <h3 className="text-base font-black text-white">Bill Invoice Preview</h3>
              </div>
              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            {/* Toggle format pill */}
            <div className="flex bg-[#030712] p-1 rounded-xl mb-4 max-w-xs mx-auto border border-white/10">
              <button
                type="button"
                onClick={() => setPreviewFormat("80mm")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  previewFormat === "80mm" ? "bg-cyan-500 text-black shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                🧾 80mm Thermal Slip
              </button>
              <button
                type="button"
                onClick={() => setPreviewFormat("a4")}
                className={`flex-1 py-1.5 px-3 rounded-lg text-xs font-bold transition-all ${
                  previewFormat === "a4" ? "bg-cyan-500 text-black shadow" : "text-slate-400 hover:text-white"
                }`}
              >
                📄 A4 Tax Sheet
              </button>
            </div>

            {/* RENDERED INVOICE PREVIEW CONTAINER */}
            <div className="p-2 sm:p-4 bg-slate-900 rounded-xl overflow-x-auto border border-white/5">
              {previewFormat === "80mm" ? (
                /* 80mm POS Slip Display */
                <div className="thermal-receipt">
                  <div className="center">
                    <div className="biz-title">{profile.brand_name || profile.name}</div>
                    <div style={{ fontSize: "11px", color: "#475569" }}>
                      {activeInvoice.sector_name} ({activeInvoice.sector_category})
                    </div>
                    {profile.show_contact && profile.address && (
                      <div style={{ fontSize: "11px" }}>{profile.address}</div>
                    )}
                    {profile.show_contact && profile.phone && (
                      <div style={{ fontSize: "11px" }}>Phone: {profile.phone}</div>
                    )}
                    {profile.show_gstin && profile.gstin && (
                      <div style={{ fontSize: "11px", fontWeight: "bold" }}>GSTIN: {profile.gstin}</div>
                    )}
                  </div>

                  <div className="divider" />
                  <div>
                    <b>Invoice:</b> {activeInvoice.invoice_number}
                  </div>
                  <div>
                    <b>Date:</b> {activeInvoice.date}
                  </div>
                  <div>
                    <b>Order Type:</b> {activeInvoice.order_type}
                  </div>
                  <div>
                    <b>{currentSector.customer_label}:</b> {activeInvoice.customer_name}
                  </div>
                  {activeInvoice.customer_phone && (
                    <div>
                      <b>Phone:</b> {activeInvoice.customer_phone}
                    </div>
                  )}

                  {activeInvoice.custom_fields &&
                    Object.entries(activeInvoice.custom_fields).map(([k, v]) => {
                      if (!v) return null;
                      const def = currentSector.custom_fields.find((f) => f.name === k);
                      const label = def?.label || k;
                      return (
                        <div key={k}>
                          <b>{label}:</b> {v}
                        </div>
                      );
                    })}

                  <div>
                    <b>Payment:</b> {activeInvoice.payment_method}
                  </div>

                  <div className="divider" />
                  <table>
                    <thead>
                      <tr>
                        <th style={{ textAlign: "left" }}>Item</th>
                        <th style={{ textAlign: "center" }}>Qty</th>
                        <th style={{ textAlign: "right" }}>Rate</th>
                        <th style={{ textAlign: "right" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeInvoice.items.map((it, idx) => (
                        <tr key={idx}>
                          <td>{it.name}</td>
                          <td style={{ textAlign: "center" }}>{it.qty}</td>
                          <td style={{ textAlign: "right" }}>₹{it.price.toFixed(1)}</td>
                          <td style={{ textAlign: "right" }}>₹{it.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="divider" />
                  <div className="summary-row">
                    <span>Subtotal:</span>
                    <span>₹{activeInvoice.subtotal.toFixed(2)}</span>
                  </div>
                  {activeInvoice.discount > 0 && (
                    <div className="summary-row" style={{ color: "#dc2626" }}>
                      <span>Discount:</span>
                      <span>-₹{activeInvoice.discount.toFixed(2)}</span>
                    </div>
                  )}
                  {activeInvoice.cgst > 0 && (
                    <div className="summary-row">
                      <span>CGST:</span>
                      <span>₹{activeInvoice.cgst.toFixed(2)}</span>
                    </div>
                  )}
                  {activeInvoice.sgst > 0 && (
                    <div className="summary-row">
                      <span>SGST:</span>
                      <span>₹{activeInvoice.sgst.toFixed(2)}</span>
                    </div>
                  )}
                  {activeInvoice.igst > 0 && (
                    <div className="summary-row">
                      <span>IGST:</span>
                      <span>₹{activeInvoice.igst.toFixed(2)}</span>
                    </div>
                  )}
                  {Math.abs(activeInvoice.round_off) > 0.001 && (
                    <div className="summary-row">
                      <span>Round Off:</span>
                      <span>
                        {activeInvoice.round_off > 0 ? "+" : ""}₹{activeInvoice.round_off.toFixed(2)}
                      </span>
                    </div>
                  )}

                  <div className="grand-total">
                    <span>TOTAL:</span>
                    <span>₹{activeInvoice.total.toFixed(2)}</span>
                  </div>

                  {activeInvoice.payment_method.startsWith("Cash") && activeInvoice.cash_tendered > activeInvoice.total && (
                    <>
                      <div className="summary-row" style={{ fontSize: "11px" }}>
                        <span>Cash Tendered:</span>
                        <span>₹{activeInvoice.cash_tendered.toFixed(2)}</span>
                      </div>
                      <div className="summary-row" style={{ fontSize: "11px", fontWeight: "bold" }}>
                        <span>Change Returned:</span>
                        <span>₹{activeInvoice.change_due.toFixed(2)}</span>
                      </div>
                    </>
                  )}

                  <div className="double-divider" />
                  <div className="center" style={{ fontSize: "11px", fontStyle: "italic", color: "#64748b" }}>
                    {profile.invoice_footer || "*** THANK YOU FOR VISITING ***"}
                  </div>
                  {!profile.white_label && (
                    <div className="center" style={{ fontSize: "10px", color: "#94a3b8", marginTop: "4px" }}>
                      Powered by Nexus Creative SaaS
                    </div>
                  )}
                </div>
              ) : (
                /* A4 Tax Sheet Display */
                <div className="a4-invoice">
                  <div className="a4-header">
                    <div>
                      <div className="a4-brand-name">{profile.brand_name || profile.name}</div>
                      <div className="a4-tagline">{profile.tagline}</div>
                      <div style={{ fontSize: "12px", color: "#475569" }}>
                        {profile.address} | Phone: {profile.phone}
                      </div>
                      <div style={{ fontSize: "12px", color: "#475569" }}>
                        GSTIN: <b>{profile.gstin}</b> | State Code: <b>{profile.state_code}</b>
                      </div>
                    </div>
                    <div className="a4-meta-box">
                      <div className="a4-invoice-title">TAX INVOICE</div>
                      <div>
                        <b>Invoice No:</b> {activeInvoice.invoice_number}
                      </div>
                      <div>
                        <b>Date:</b> {activeInvoice.date}
                      </div>
                      <div>
                        <b>Order Type:</b> {activeInvoice.order_type}
                      </div>
                      <div>
                        <b>Payment Mode:</b> {activeInvoice.payment_method}
                      </div>
                    </div>
                  </div>

                  <div className="a4-bill-to-grid">
                    <div>
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#64748b",
                          textTransform: "uppercase",
                          marginBottom: "4px",
                        }}
                      >
                        Billed To ({currentSector.customer_label})
                      </div>
                      <div style={{ fontWeight: 700, fontSize: "14px" }}>{activeInvoice.customer_name}</div>
                      {activeInvoice.customer_phone && (
                        <div style={{ color: "#475569" }}>Phone: {activeInvoice.customer_phone}</div>
                      )}
                      <div style={{ color: "#475569" }}>State Code: {activeInvoice.customer_state}</div>
                    </div>

                    <div>
                      <div
                        style={{
                          fontSize: "10px",
                          fontWeight: 800,
                          color: "#64748b",
                          textTransform: "uppercase",
                          marginBottom: "4px",
                        }}
                      >
                        Sector &amp; Order Details
                      </div>
                      <div>
                        <b>Sector:</b> {activeInvoice.sector_name} ({activeInvoice.sector_category})
                      </div>
                      {activeInvoice.custom_fields &&
                        Object.entries(activeInvoice.custom_fields).map(([k, v]) => {
                          if (!v) return null;
                          const def = currentSector.custom_fields.find((f) => f.name === k);
                          const label = def?.label || k;
                          return (
                            <div key={k}>
                              <b>{label}:</b> {v}
                            </div>
                          );
                        })}
                    </div>
                  </div>

                  <table className="a4-table">
                    <thead>
                      <tr>
                        <th style={{ width: "40px" }}>#</th>
                        <th>Item / Description</th>
                        <th style={{ width: "90px" }}>HSN</th>
                        <th style={{ width: "70px", textAlign: "center" }}>Qty</th>
                        <th style={{ width: "90px", textAlign: "right" }}>Rate</th>
                        <th style={{ width: "70px", textAlign: "right" }}>GST</th>
                        <th style={{ width: "100px", textAlign: "right" }}>Total</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeInvoice.items.map((item, idx) => (
                        <tr key={idx}>
                          <td>{idx + 1}</td>
                          <td style={{ fontWeight: 600 }}>{item.name}</td>
                          <td>{item.hsn}</td>
                          <td style={{ textAlign: "center" }}>
                            {item.qty} {item.unit}
                          </td>
                          <td style={{ textAlign: "right" }}>₹{item.price.toFixed(2)}</td>
                          <td style={{ textAlign: "right" }}>{item.gst_rate}%</td>
                          <td style={{ textAlign: "right", fontWeight: 700 }}>₹{item.total.toFixed(2)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>

                  <div className="a4-totals-grid">
                    <div>
                      <div style={{ fontSize: "11px", fontWeight: 700, color: "#0f172a", marginBottom: "4px" }}>
                        Bank &amp; Payment Details
                      </div>
                      <div style={{ fontSize: "11px", color: "#475569" }}>
                        Bank: {profile.bank_name} | A/C: {profile.account_no}
                      </div>
                      <div style={{ fontSize: "11px", color: "#475569" }}>
                        IFSC: {profile.ifsc_code} | UPI: {profile.upi_id}
                      </div>
                      <div
                        style={{
                          fontSize: "11px",
                          fontWeight: 700,
                          color: "#0f172a",
                          marginTop: "10px",
                          marginBottom: "4px",
                        }}
                      >
                        Terms &amp; Conditions
                      </div>
                      <div style={{ fontSize: "10px", color: "#64748b", fontStyle: "italic" }}>
                        1. Payment due upon receipt of invoice unless agreed otherwise.
                        <br />
                        2. Goods or services delivered are subject to standard verification.
                      </div>
                    </div>

                    <div>
                      <table className="a4-totals-table">
                        <tbody>
                          <tr>
                            <td>Subtotal:</td>
                            <td style={{ textAlign: "right" }}>₹{activeInvoice.subtotal.toFixed(2)}</td>
                          </tr>
                          {activeInvoice.discount > 0 && (
                            <tr style={{ color: "#dc2626" }}>
                              <td>Discount:</td>
                              <td style={{ textAlign: "right" }}>-₹{activeInvoice.discount.toFixed(2)}</td>
                            </tr>
                          )}
                          {activeInvoice.cgst > 0 && (
                            <tr>
                              <td>CGST:</td>
                              <td style={{ textAlign: "right" }}>₹{activeInvoice.cgst.toFixed(2)}</td>
                            </tr>
                          )}
                          {activeInvoice.sgst > 0 && (
                            <tr>
                              <td>SGST:</td>
                              <td style={{ textAlign: "right" }}>₹{activeInvoice.sgst.toFixed(2)}</td>
                            </tr>
                          )}
                          {activeInvoice.igst > 0 && (
                            <tr>
                              <td>IGST:</td>
                              <td style={{ textAlign: "right" }}>₹{activeInvoice.igst.toFixed(2)}</td>
                            </tr>
                          )}
                          {Math.abs(activeInvoice.round_off) > 0.001 && (
                            <tr>
                              <td>Round Off:</td>
                              <td style={{ textAlign: "right" }}>
                                {activeInvoice.round_off > 0 ? "+" : ""}₹{activeInvoice.round_off.toFixed(2)}
                              </td>
                            </tr>
                          )}
                          <tr className="a4-grand-row">
                            <td>GRAND TOTAL:</td>
                            <td style={{ textAlign: "right", color: "#2563eb" }}>
                              ₹{activeInvoice.total.toFixed(2)}
                            </td>
                          </tr>
                        </tbody>
                      </table>
                    </div>
                  </div>

                  <div className="a4-footer-sign">
                    <div style={{ fontStyle: "italic", color: "#64748b" }}>
                      {profile.invoice_footer || "Thank you for doing business with us!"}
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div style={{ color: "#475569", marginBottom: "30px" }}>
                        For {profile.brand_name || profile.name}
                      </div>
                      <div style={{ borderTop: "1px solid #94a3b8", paddingTop: "4px", fontWeight: 700 }}>
                        Authorized Signatory
                      </div>
                    </div>
                  </div>

                  {!profile.white_label && (
                    <div
                      style={{
                        textAlign: "center",
                        fontSize: "10px",
                        color: "#94a3b8",
                        marginTop: "16px",
                        borderTop: "1px dashed #e2e8f0",
                        paddingTop: "6px",
                      }}
                    >
                      Powered by Nexus Creative SaaS Platform
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Modal Bottom Actions */}
            <div className="mt-6 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => handleBrowserPrint(previewFormat, activeInvoice)}
                  className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs flex items-center gap-1.5"
                >
                  <span>🖨️</span>
                  <span>Print {previewFormat === "80mm" ? "POS Slip" : "A4 Sheet"}</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleDownloadPDF(previewFormat, activeInvoice)}
                  className="px-4 py-2 rounded-xl bg-purple-600 hover:bg-purple-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <span>📥</span>
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => handleWhatsAppShare(activeInvoice)}
                  className="px-4 py-2 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1.5"
                >
                  <span>💬</span>
                  <span>WhatsApp</span>
                </button>
              </div>

              <button
                type="button"
                onClick={() => setPreviewModalOpen(false)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold text-xs"
              >
                Close Preview
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: QUICK ADD CUSTOM / UNLISTED ITEM                                   */}
      {/* ========================================================================= */}
      {quickAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print">
          <div className="bg-[#0f172a] border border-cyan-500/40 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>➕</span>
                <span>Quick Add Item to {currentSector.name}</span>
              </h3>
              <button
                type="button"
                onClick={() => setQuickAddModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleCreateCustomItem} className="space-y-3.5 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">Item / Service Name *</label>
                <input
                  type="text"
                  required
                  value={newItemName}
                  onChange={(e) => setNewItemName(e.target.value)}
                  placeholder="e.g. Diagnostic Ultrasound / Engine Oil Flush"
                  className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Selling Price (₹) *</label>
                  <input
                    type="number"
                    required
                    step="0.01"
                    value={newItemPrice}
                    onChange={(e) => setNewItemPrice(e.target.value)}
                    placeholder="0.00"
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Unit</label>
                  <input
                    type="text"
                    value={newItemUnit}
                    onChange={(e) => setNewItemUnit(e.target.value)}
                    placeholder="e.g. pcs, hr, session, kg"
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">GST Rate (%)</label>
                  <select
                    value={newItemGSTRate}
                    onChange={(e) => setNewItemGSTRate(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  >
                    <option value={0}>0% (Exempt)</option>
                    <option value={5}>5%</option>
                    <option value={12}>12%</option>
                    <option value={18}>18% (Standard)</option>
                    <option value={28}>28%</option>
                  </select>
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">HSN / SAC Code</label>
                  <input
                    type="text"
                    value={newItemHSN}
                    onChange={(e) => setNewItemHSN(e.target.value)}
                    placeholder="e.g. 998311"
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-cyan-400 font-mono"
                  />
                </div>
              </div>

              <div className="pt-3 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setQuickAddModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold shadow-md"
                >
                  Add to Active Bill
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: ADD CUSTOM INVOICE FIELD                                           */}
      {/* ========================================================================= */}
      {customFieldModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 no-print">
          <div className="bg-[#0f172a] border border-purple-500/40 rounded-2xl p-6 w-full max-w-md shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-4">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>🏷️</span>
                <span>Add Custom Field to Bill</span>
              </h3>
              <button
                type="button"
                onClick={() => setCustomFieldModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddCustomField} className="space-y-4 text-xs">
              <div>
                <label className="text-slate-300 font-bold block mb-1">
                  Field Label (e.g. Doctor Reg No, Vehicle Chasis #, Table No, Room No) *
                </label>
                <input
                  type="text"
                  required
                  value={newFieldLabel}
                  onChange={(e) => setNewFieldLabel(e.target.value)}
                  placeholder="e.g. Vehicle Chassis Number"
                  className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-purple-500/30 text-white placeholder-slate-600 focus:outline-none focus:ring-1 focus:ring-purple-400"
                />
              </div>

              <p className="text-[11px] text-slate-400">
                This custom field will be appended to this invoice and automatically printed on both the 80mm thermal
                POS receipt and the A4 standard sheet tax invoice.
              </p>

              <div className="pt-2 flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setCustomFieldModalOpen(false)}
                  className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-purple-500 hover:bg-purple-400 text-white font-extrabold shadow-md"
                >
                  Create Field
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* MODAL: BUSINESS BRANDING & INVOICE SETTINGS                               */}
      {/* ========================================================================= */}
      {settingsModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 overflow-y-auto no-print">
          <div className="bg-[#0f172a] border border-cyan-500/40 rounded-2xl p-6 w-full max-w-2xl max-h-[92vh] overflow-y-auto shadow-2xl">
            <div className="flex items-center justify-between pb-3 border-b border-white/10 mb-5">
              <h3 className="text-base font-black text-white flex items-center gap-2">
                <span>⚙️</span>
                <span>Invoice Branding &amp; Business Profile Settings</span>
              </h3>
              <button
                type="button"
                onClick={() => setSettingsModalOpen(false)}
                className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Business / Brand Name</label>
                  <input
                    type="text"
                    value={profile.brand_name}
                    onChange={(e) => setProfile((p) => ({ ...p, brand_name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Tagline</label>
                  <input
                    type="text"
                    value={profile.tagline}
                    onChange={(e) => setProfile((p) => ({ ...p, tagline: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">GSTIN Number</label>
                  <input
                    type="text"
                    value={profile.gstin}
                    onChange={(e) => setProfile((p) => ({ ...p, gstin: e.target.value.toUpperCase() }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">GST State Code</label>
                  <input
                    type="text"
                    maxLength={2}
                    value={profile.state_code}
                    onChange={(e) => setProfile((p) => ({ ...p, state_code: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Invoice Prefix</label>
                  <input
                    type="text"
                    value={profile.invoice_prefix}
                    onChange={(e) => setProfile((p) => ({ ...p, invoice_prefix: e.target.value.toUpperCase() }))}
                    placeholder="e.g. NEX / INV / HOSP"
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Store / Business Address</label>
                  <input
                    type="text"
                    value={profile.address}
                    onChange={(e) => setProfile((p) => ({ ...p, address: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Phone Number</label>
                  <input
                    type="text"
                    value={profile.phone}
                    onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3.5">
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Bank Name</label>
                  <input
                    type="text"
                    value={profile.bank_name}
                    onChange={(e) => setProfile((p) => ({ ...p, bank_name: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">Bank Account Number</label>
                  <input
                    type="text"
                    value={profile.account_no}
                    onChange={(e) => setProfile((p) => ({ ...p, account_no: e.target.value }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
                <div>
                  <label className="text-slate-300 font-bold block mb-1">IFSC Code</label>
                  <input
                    type="text"
                    value={profile.ifsc_code}
                    onChange={(e) => setProfile((p) => ({ ...p, ifsc_code: e.target.value.toUpperCase() }))}
                    className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white font-mono focus:outline-none focus:ring-1 focus:ring-cyan-400"
                  />
                </div>
              </div>

              <div>
                <label className="text-slate-300 font-bold block mb-1">Invoice Footer Greeting</label>
                <input
                  type="text"
                  value={profile.invoice_footer}
                  onChange={(e) => setProfile((p) => ({ ...p, invoice_footer: e.target.value }))}
                  className="w-full px-3 py-2 rounded-xl bg-[#030612] border border-cyan-500/30 text-white focus:outline-none focus:ring-1 focus:ring-cyan-400"
                />
              </div>

              <div className="pt-2 flex items-center justify-between border-t border-white/10">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={profile.white_label}
                    onChange={(e) => setProfile((p) => ({ ...p, white_label: e.target.checked }))}
                    className="rounded text-cyan-500"
                  />
                  <span className="text-xs text-slate-300">
                    White-label Mode (Remove "Powered by Nexus Creative" on bills)
                  </span>
                </label>

                <button
                  type="button"
                  onClick={() => {
                    setSettingsModalOpen(false);
                    showToast("Business profile updated!");
                  }}
                  className="px-5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-black font-extrabold text-xs shadow-md"
                >
                  Save Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* DRAWER: RECENT INVOICES & PAST BILLS HISTORY                              */}
      {/* ========================================================================= */}
      {historyDrawerOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-end bg-black/70 backdrop-blur-sm p-4 no-print">
          <div className="bg-[#0a122e] border-l border-cyan-500/40 w-full max-w-xl h-full max-h-[95vh] rounded-2xl p-6 shadow-2xl flex flex-col">
            <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
              <div>
                <h3 className="text-base font-black text-white flex items-center gap-2">
                  <span>📜</span>
                  <span>Past Invoices &amp; Bills ({savedInvoices.length})</span>
                </h3>
                <p className="text-xs text-slate-400">Re-print thermal slips or download A4 sheets for past orders</p>
              </div>
              <button
                type="button"
                onClick={() => setHistoryDrawerOpen(false)}
                className="w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="flex-1 overflow-y-auto space-y-3 pr-1">
              {savedInvoices.length === 0 ? (
                <div className="text-center py-12 text-slate-500 text-xs">
                  No saved invoices yet. Finalize an active bill to see past history here.
                </div>
              ) : (
                savedInvoices.map((inv) => (
                  <div
                    key={inv.id}
                    className="p-3.5 rounded-xl bg-[#060c22] border border-cyan-500/20 hover:border-cyan-400/50 transition-all space-y-2.5 text-xs"
                  >
                    <div className="flex items-start justify-between">
                      <div>
                        <div className="font-bold text-white flex items-center gap-2">
                          <span>{inv.invoice_number}</span>
                          <span className="px-2 py-0.5 rounded text-[10px] font-mono bg-cyan-500/20 text-cyan-300">
                            {inv.sector_name}
                          </span>
                        </div>
                        <div className="text-slate-400 text-[11px] mt-0.5">
                          {inv.customer_name} {inv.customer_phone ? `· ${inv.customer_phone}` : ""} · {inv.date}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="font-extrabold text-cyan-400 text-sm">₹{inv.total.toFixed(2)}</div>
                        <div className="text-[10px] text-slate-400">{inv.payment_method}</div>
                      </div>
                    </div>

                    <div className="text-[11px] text-slate-400 truncate">
                      {inv.items.map((it) => `${it.name} (${it.qty})`).join(", ")}
                    </div>

                    {/* Action buttons */}
                    <div className="pt-2 border-t border-white/5 flex flex-wrap items-center gap-2">
                      <button
                        type="button"
                        onClick={() => {
                          setActiveInvoice(inv);
                          setPreviewFormat("80mm");
                          setPreviewModalOpen(true);
                          setHistoryDrawerOpen(false);
                        }}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-cyan-300 text-[11px] font-bold"
                      >
                        👁️ View
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBrowserPrint("80mm", inv)}
                        className="px-2.5 py-1 rounded bg-blue-600/30 hover:bg-blue-600/50 text-blue-300 text-[11px] font-bold"
                      >
                        🖨️ 80mm
                      </button>
                      <button
                        type="button"
                        onClick={() => handleBrowserPrint("a4", inv)}
                        className="px-2.5 py-1 rounded bg-cyan-600/30 hover:bg-cyan-600/50 text-cyan-300 text-[11px] font-bold"
                      >
                        🖨️ A4
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDownloadPDF("a4", inv)}
                        className="px-2.5 py-1 rounded bg-purple-600/30 hover:bg-purple-600/50 text-purple-300 text-[11px] font-bold"
                      >
                        📥 PDF
                      </button>
                      <button
                        type="button"
                        onClick={() => handleWhatsAppShare(inv)}
                        className="px-2.5 py-1 rounded bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 text-[11px] font-bold"
                      >
                        💬 WhatsApp
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>

            {savedInvoices.length > 0 && (
              <div className="pt-3 border-t border-white/10 flex justify-between items-center text-xs">
                <button
                  type="button"
                  onClick={() => {
                    if (window.confirm("Clear all invoice history?")) {
                      setSavedInvoices([]);
                      showToast("History cleared");
                    }
                  }}
                  className="text-red-400 hover:text-red-300 font-bold"
                >
                  Clear History
                </button>
                <button
                  type="button"
                  onClick={() => setHistoryDrawerOpen(false)}
                  className="px-4 py-1.5 rounded-xl bg-slate-800 text-white font-bold"
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* HIDDEN PRINTABLE CONTAINER FOR BROWSER PRINT                               */}
      {/* ========================================================================= */}
      {activeInvoice && (
        <div
          id="printable-receipt"
          className={previewFormat === "80mm" ? "print-80mm thermal-receipt" : "print-a4 a4-invoice"}
          style={{ display: "none" }}
        >
          {previewFormat === "80mm" ? (
            <div>
              <div className="center">
                <div className="biz-title">{profile.brand_name || profile.name}</div>
                <div style={{ fontSize: "11px" }}>
                  {activeInvoice.sector_name} ({activeInvoice.sector_category})
                </div>
                {profile.show_contact && profile.address && <div>{profile.address}</div>}
                {profile.show_contact && profile.phone && <div>Phone: {profile.phone}</div>}
                {profile.show_gstin && profile.gstin && <div>GSTIN: {profile.gstin}</div>}
              </div>
              <div className="divider" />
              <div>
                <b>Invoice:</b> {activeInvoice.invoice_number}
              </div>
              <div>
                <b>Date:</b> {activeInvoice.date}
              </div>
              <div>
                <b>Order Type:</b> {activeInvoice.order_type}
              </div>
              <div>
                <b>{currentSector.customer_label}:</b> {activeInvoice.customer_name}
              </div>
              {activeInvoice.customer_phone && (
                <div>
                  <b>Phone:</b> {activeInvoice.customer_phone}
                </div>
              )}
              {activeInvoice.custom_fields &&
                Object.entries(activeInvoice.custom_fields).map(([k, v]) => {
                  if (!v) return null;
                  const def = currentSector.custom_fields.find((f) => f.name === k);
                  const label = def?.label || k;
                  return (
                    <div key={k}>
                      <b>{label}:</b> {v}
                    </div>
                  );
                })}
              <div>
                <b>Payment:</b> {activeInvoice.payment_method}
              </div>
              <div className="divider" />
              <table>
                <thead>
                  <tr>
                    <th style={{ textAlign: "left" }}>Item</th>
                    <th style={{ textAlign: "center" }}>Qty</th>
                    <th style={{ textAlign: "right" }}>Rate</th>
                    <th style={{ textAlign: "right" }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {activeInvoice.items.map((it, idx) => (
                    <tr key={idx}>
                      <td>{it.name}</td>
                      <td style={{ textAlign: "center" }}>{it.qty}</td>
                      <td style={{ textAlign: "right" }}>₹{it.price.toFixed(1)}</td>
                      <td style={{ textAlign: "right" }}>₹{it.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
              <div className="divider" />
              <div className="summary-row">
                <span>Subtotal:</span>
                <span>₹{activeInvoice.subtotal.toFixed(2)}</span>
              </div>
              {activeInvoice.discount > 0 && (
                <div className="summary-row">
                  <span>Discount:</span>
                  <span>-₹{activeInvoice.discount.toFixed(2)}</span>
                </div>
              )}
              {activeInvoice.cgst > 0 && (
                <div className="summary-row">
                  <span>CGST:</span>
                  <span>₹{activeInvoice.cgst.toFixed(2)}</span>
                </div>
              )}
              {activeInvoice.sgst > 0 && (
                <div className="summary-row">
                  <span>SGST:</span>
                  <span>₹{activeInvoice.sgst.toFixed(2)}</span>
                </div>
              )}
              {activeInvoice.igst > 0 && (
                <div className="summary-row">
                  <span>IGST:</span>
                  <span>₹{activeInvoice.igst.toFixed(2)}</span>
                </div>
              )}
              {Math.abs(activeInvoice.round_off) > 0.001 && (
                <div className="summary-row">
                  <span>Round Off:</span>
                  <span>
                    {activeInvoice.round_off > 0 ? "+" : ""}₹{activeInvoice.round_off.toFixed(2)}
                  </span>
                </div>
              )}
              <div className="grand-total">
                <span>TOTAL:</span>
                <span>₹{activeInvoice.total.toFixed(2)}</span>
              </div>
              <div className="double-divider" />
              <div className="center" style={{ fontStyle: "italic", fontSize: "11px" }}>
                {profile.invoice_footer}
              </div>
              {!profile.white_label && (
                <div className="center" style={{ fontSize: "10px", marginTop: "4px" }}>
                  Powered by Nexus Creative SaaS
                </div>
              )}
            </div>
          ) : (
            <div>
              <div className="a4-header">
                <div>
                  <div className="a4-brand-name">{profile.brand_name || profile.name}</div>
                  <div className="a4-tagline">{profile.tagline}</div>
                  <div>
                    {profile.address} | Phone: {profile.phone}
                  </div>
                  <div>
                    GSTIN: <b>{profile.gstin}</b> | State Code: <b>{profile.state_code}</b>
                  </div>
                </div>
                <div className="a4-meta-box">
                  <div className="a4-invoice-title">TAX INVOICE</div>
                  <div>
                    <b>Invoice No:</b> {activeInvoice.invoice_number}
                  </div>
                  <div>
                    <b>Date:</b> {activeInvoice.date}
                  </div>
                  <div>
                    <b>Order Type:</b> {activeInvoice.order_type}
                  </div>
                  <div>
                    <b>Payment:</b> {activeInvoice.payment_method}
                  </div>
                </div>
              </div>

              <div className="a4-bill-to-grid">
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 800 }}>BILLED TO ({currentSector.customer_label})</div>
                  <div style={{ fontWeight: 700, fontSize: "14px" }}>{activeInvoice.customer_name}</div>
                  {activeInvoice.customer_phone && <div>Phone: {activeInvoice.customer_phone}</div>}
                  <div>State Code: {activeInvoice.customer_state}</div>
                </div>
                <div>
                  <div style={{ fontSize: "10px", fontWeight: 800 }}>SECTOR &amp; ORDER DETAILS</div>
                  <div>
                    <b>Sector:</b> {activeInvoice.sector_name} ({activeInvoice.sector_category})
                  </div>
                  {activeInvoice.custom_fields &&
                    Object.entries(activeInvoice.custom_fields).map(([k, v]) => {
                      if (!v) return null;
                      const def = currentSector.custom_fields.find((f) => f.name === k);
                      const label = def?.label || k;
                      return (
                        <div key={k}>
                          <b>{label}:</b> {v}
                        </div>
                      );
                    })}
                </div>
              </div>

              <table className="a4-table">
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Item Description</th>
                    <th>HSN</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>GST</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {activeInvoice.items.map((item, idx) => (
                    <tr key={idx}>
                      <td>{idx + 1}</td>
                      <td>{item.name}</td>
                      <td>{item.hsn}</td>
                      <td>
                        {item.qty} {item.unit}
                      </td>
                      <td>₹{item.price.toFixed(2)}</td>
                      <td>{item.gst_rate}%</td>
                      <td>₹{item.total.toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              <div className="a4-totals-grid">
                <div>
                  <div>
                    <b>Bank:</b> {profile.bank_name} | <b>A/C:</b> {profile.account_no}
                  </div>
                  <div>
                    <b>IFSC:</b> {profile.ifsc_code} | <b>UPI:</b> {profile.upi_id}
                  </div>
                  <div style={{ marginTop: "10px", fontStyle: "italic", fontSize: "11px" }}>
                    Terms: Payment due upon receipt of invoice.
                  </div>
                </div>
                <div>
                  <table className="a4-totals-table">
                    <tbody>
                      <tr>
                        <td>Subtotal:</td>
                        <td style={{ textAlign: "right" }}>₹{activeInvoice.subtotal.toFixed(2)}</td>
                      </tr>
                      {activeInvoice.discount > 0 && (
                        <tr>
                          <td>Discount:</td>
                          <td style={{ textAlign: "right" }}>-₹{activeInvoice.discount.toFixed(2)}</td>
                        </tr>
                      )}
                      {activeInvoice.cgst > 0 && (
                        <tr>
                          <td>CGST:</td>
                          <td style={{ textAlign: "right" }}>₹{activeInvoice.cgst.toFixed(2)}</td>
                        </tr>
                      )}
                      {activeInvoice.sgst > 0 && (
                        <tr>
                          <td>SGST:</td>
                          <td style={{ textAlign: "right" }}>₹{activeInvoice.sgst.toFixed(2)}</td>
                        </tr>
                      )}
                      {activeInvoice.igst > 0 && (
                        <tr>
                          <td>IGST:</td>
                          <td style={{ textAlign: "right" }}>₹{activeInvoice.igst.toFixed(2)}</td>
                        </tr>
                      )}
                      <tr className="a4-grand-row">
                        <td>GRAND TOTAL:</td>
                        <td style={{ textAlign: "right" }}>₹{activeInvoice.total.toFixed(2)}</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="a4-footer-sign">
                <div style={{ fontStyle: "italic" }}>{profile.invoice_footer}</div>
                <div style={{ textAlign: "right" }}>
                  <div>For {profile.brand_name || profile.name}</div>
                  <div style={{ borderTop: "1px solid #333", paddingTop: "4px" }}>Authorized Signatory</div>
                </div>
              </div>
            </div>
          )}
        </div>
      )}
    </section>
  );
}

