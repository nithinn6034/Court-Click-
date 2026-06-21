'use client';

import React from 'react';
import { Modal, Tabs, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';
import { OrderDetails } from '@/types/order';

interface Props {
  open: boolean;
  onClose: () => void;
  details: OrderDetails | null;
}

const INK = '#11060C';
const LABEL = '#8C8C8C';
const CARD_GREY = '#F5F5F5';

// A label / value row: label in a fixed-width left column, value to its right.
function Row({ label, value, accent }: { label: string; value: string; accent?: boolean }) {
  return (
    <div style={{ display: 'flex', gap: 24, marginBottom: 14, fontSize: 14 }}>
      <span style={{ color: LABEL, width: 180, flexShrink: 0 }}>{label}</span>
      <span style={{ color: accent ? '#2D9CDB' : INK, fontWeight: 600 }}>{value}</span>
    </div>
  );
}

export default function OrderDetailsModal({ open, onClose, details }: Props) {
  if (!details) return null;
  const { caseCustomer } = details;

  // Timestamp block shown above the tabs (two-column label/value).
  const timeline = (
    <div style={{ marginBottom: 20 }}>
      <Row label="Order ID:" value={caseCustomer.orderId} />
      <Row label="Tracking ID:" value={caseCustomer.trackingId} />
      <Row label="Payment completed:" value={caseCustomer.paymentCompleted} />
      <Row label="Order placed:" value={caseCustomer.orderPlaced} />
      <Row label="Assigned:" value={caseCustomer.assigned} />
      <Row label="Applied:" value={caseCustomer.applied} />
      <Row label="Dispatched:" value={caseCustomer.dispatched} />
      <Row label="Delivered:" value={caseCustomer.delivered} />
    </div>
  );

  // Wraps tab content in the grey rounded "Cardbox" panel.
  const card = (children: React.ReactNode) => (
    <div style={{ background: CARD_GREY, borderRadius: 16, padding: 24, marginTop: 8 }}>
      {children}
    </div>
  );

  const caseTab = card(
    <div>
      <Row label="Case Number:" value="OS/300179/2024" />
      <Row label="Legal Name:" value="Anil philip" />
      <Row label="Name:" value="Anil philip" />
      <Row label="Email:" value="anilphilipka@gmail.com" />
      <Row label="Phone:" value="919495862301" />
      <div style={{ display: 'flex', gap: 24, marginBottom: 8, fontSize: 14 }}>
        <span style={{ color: LABEL, width: 180, flexShrink: 0 }}>Delivery Feedback:</span>
      </div>
      <div style={{ fontSize: 14, color: INK, fontWeight: 600, paddingLeft: 8 }}>
        • Issue: N/A
      </div>
    </div>,
  );

  const addressTab = card(
    <div>
      <div style={{ position: 'relative' }}>
        <div style={{ position: 'absolute', top: 0, right: 0 }}>
          <Button size="small" icon={<CopyOutlined />}>
            Copy Address
          </Button>
        </div>
        <Row label="Pincode:" value="682028" />
        <Row label="Address Line 1:" value="67/67A flat no D 1st floor" />
        <Row label="Address Line 2:" value="attaniyathu road vennal" />
        <Row label="City:" value="kochi" />
        <Row label="District:" value="kochi" />
        <Row label="State:" value="kerala" />
        <Row label="Country:" value="India" />
      </div>
    </div>,
  );

  const productsTab = card(
    <div>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14, color: INK }}>
        Product 1
      </div>
      <Row label="Type:" value="judgement" />
      <Row label="Order Date:" value="attaniyathu road vennal" />
      <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
        <span style={{ color: LABEL, width: 180, flexShrink: 0 }}>File:</span>
        <a href="#" style={{ color: '#2D9CDB' }}>N/A</a>
      </div>
    </div>,
  );

  const esignTab = card(
    <div>
      <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 14, color: INK }}>
        eSign 1
      </div>
      <Row label="Digio ID:" value="DID260227135944268625QRGSUK5WP37" />
      <Row label="Status:" value="Completed" />
      <div style={{ display: 'flex', gap: 24, marginBottom: 14, fontSize: 14 }}>
        <span style={{ color: LABEL, width: 180, flexShrink: 0 }}>Signed Document:</span>
        <a href="#" style={{ color: '#2D9CDB' }}>View Signed Document</a>
      </div>
      <div style={{ display: 'flex', gap: 24, fontSize: 14 }}>
        <span style={{ color: LABEL, width: 180, flexShrink: 0 }}>Audit Log:</span>
        <a href="#" style={{ color: '#2D9CDB' }}>View Audit Log</a>
      </div>
    </div>,
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={877}
      title={<span style={{ fontSize: 22, fontWeight: 700, color: INK }}>Order Details</span>}
      styles={{ body: { fontFamily: 'Inter, sans-serif', paddingTop: 12 } }}
    >
      {timeline}
      <div style={{ borderTop: '1px solid #EEE', paddingTop: 12 }}>
        <Tabs
          defaultActiveKey="case"
          items={[
            { key: 'case', label: 'Case & Customer Details', children: caseTab },
            { key: 'address', label: 'Address', children: addressTab },
            { key: 'products', label: 'Products', children: productsTab },
            { key: 'esign', label: 'Digio eSign Documents', children: esignTab },
          ]}
        />
      </div>
    </Modal>
  );
}