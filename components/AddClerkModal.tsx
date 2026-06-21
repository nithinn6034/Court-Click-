'use client';

import React, { useState } from 'react';
import { Modal, Input, Button, Select, Typography } from 'antd';

const { Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

// Red asterisk required-field label.
function FieldLabel({ children }: { children: React.ReactNode }) {
  return (
    <Text style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>
      {children} <span style={{ color: '#E03131' }}>*</span>
    </Text>
  );
}

export default function AddClerkModal({ open, onClose }: Props) {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [clerkId, setClerkId] = useState('');

  const canSave = name.trim() && clerkId.trim();

  // +91 prefix with flag for the phone input.
  const phonePrefix = (
    <Select
      defaultValue="+91"
      style={{ width: 90 }}
      variant="borderless"
      options={[{ value: '+91', label: '🇮🇳 +91' }]}
    />
  );

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={1093}
      title={null}
      closable={false}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12, paddingTop: 8 }}>
          <Button
            shape="round"
            size="large"
            onClick={onClose}
            style={{ color: '#5B1A4D', borderColor: '#5B1A4D', minWidth: 120 }}
          >
            Cancel
          </Button>
          <Button
            type="primary"
            shape="round"
            size="large"
            disabled={!canSave}
            onClick={onClose}
            style={{ minWidth: 140 }}
          >
            Add & Save
          </Button>
        </div>
      }
    >
      {/* Close button top-right */}
      <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
        <span
          onClick={onClose}
          style={{ cursor: 'pointer', fontSize: 18, color: '#999', lineHeight: 1 }}
        >
          ✕
        </span>
      </div>

      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>Add Clerk</div>
      <Text type="secondary" style={{ fontSize: 13 }}>
        Add a new authorized person by providing details
      </Text>

      {/* Two-column field grid */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '479px 479px',
          columnGap: 40,
          rowGap: 24,
          marginTop: 28,
        }}
      >
        <div>
          <FieldLabel>Clerk Name</FieldLabel>
          <Input
            size="large"
            placeholder="Gangadharan"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <FieldLabel>Phone Number</FieldLabel>
          <Input
            size="large"
            addonBefore={phonePrefix}
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
          />
        </div>

        <div>
          <FieldLabel>Clerk ID</FieldLabel>
          <Input
            size="large"
            placeholder="Enter Clerk ID"
            value={clerkId}
            onChange={(e) => setClerkId(e.target.value)}
          />
        </div>
      </div>
    </Modal>
  );
}