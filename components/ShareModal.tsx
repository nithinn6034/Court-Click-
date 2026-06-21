'use client';

import React from 'react';
import { Modal, Button } from 'antd';
import { CopyOutlined } from '@ant-design/icons';

interface Props {
  open: boolean;
  onClose: () => void;
}

const LABEL = '#8C8C8C';
const INK = '#11060C';

// Uppercase label / bold value row.
function Row({ label, value }: { label: string; value: React.ReactNode }) {
  return (
    <div style={{ display: 'flex', gap: 24, marginBottom: 20, fontSize: 14 }}>
      <span
        style={{
          color: LABEL,
          width: 200,
          flexShrink: 0,
          textTransform: 'uppercase',
          fontWeight: 500,
          fontSize: 14,
        }}
      >
        {label}
      </span>
      <span style={{ color: INK, fontWeight: 700, fontSize: 14 }}>{value}</span>
    </div>
  );
}

export default function ShareModal({ open, onClose }: Props) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={673}
      closable={false}
      title={null}
      styles={{ body: { fontFamily: 'Inter, sans-serif' } }}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: 24,
        }}
      >
        <span style={{ fontSize: 22, fontWeight: 700, color: INK }}>Order Details</span>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Button size="small" icon={<CopyOutlined />}>
            Copy Details
          </Button>
          <span
            onClick={onClose}
            style={{ cursor: 'pointer', fontSize: 18, color: '#999', lineHeight: 1 }}
          >
            ✕
          </span>
        </div>
      </div>

      <Row label="Applicant" value="Laisamma George (Petitioner)" />
      <Row label="Case Number" value="WA 233/2024" />
      <Row
        label="Case Name"
        value={
          <>
            Laisamma George & Other{' '}
            <span style={{ fontWeight: 400, color: '#8C8C8C' }}>vs</span> State Of Kerala &
            Others
          </>
        }
      />
      <Row label="CNR Number" value="KLHC010922112023" />
      <Row label="Court Establishment" value="JFCM 1 District Court Thrissur" />
      <Row label="Document Type" value="Certified True Copy - Judgment" />
      <Row label="Order Number" value="1/2026" />
      <Row label="Order Date" value="22-Feb-2026" />
    </Modal>
  );
}