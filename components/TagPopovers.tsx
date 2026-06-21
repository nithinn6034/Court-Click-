'use client';

import React, { useState } from 'react';
import { Modal, Input, Button, Typography, Checkbox } from 'antd';
import { EditOutlined, TagOutlined } from '@ant-design/icons';

const { Text } = Typography;

// Tag list shown in the Choose Tag popup (label + colour from Figma).
const TAG_LIST = [
  { label: 'Subscription Pending', color: '#6B8CAE' },
  { label: 'Nakul', color: '#5BA88A' },
  { label: 'Follow up case for Details', color: '#C0654E' },
  { label: 'Add Case', color: '#9A9A9A' },
  { label: 'Aadhaar Verified', color: '#B8A04A' },
  { label: 'Autopay Concern', color: '#5BA88A' },
  { label: 'Background Check for Case', color: '#6B8CAE' },
  { label: 'Call Back', color: '#C0654E' },
  { label: 'Case Added', color: '#9A9A9A' },
  { label: 'Gouri', color: '#5BA88A' },
];

// Colour circles in the Create New Tag popup (from Figma swatch row).
const TAG_COLORS = [
  '#5B8DB8', '#7FB08A', '#C0654E', '#9C8466',
  '#D4B23C', '#9B6FB8', '#728799', '#C98B9B',
  '#A8A8A8', '#5BA88A', '#5B1A3A',
];

interface ChooseTagProps {
  open: boolean;
  onClose: () => void;
  onCreateNew: () => void;
}

export function ChooseTagModal({ open, onClose, onCreateNew }: ChooseTagProps) {
  return (
    <Modal
      open={open}
      onCancel={onClose}
      footer={null}
      width={382}
      title={null}
      closable={false}
      styles={{ body: { padding: '4px 0' } }}
    >
      <Button
        icon={<TagOutlined />}
        style={{ width: '100%', marginBottom: 12, height: 38, justifyContent: 'center' }}
        onClick={onCreateNew}
      >
        Create New Tag
      </Button>
      <div style={{ borderTop: '1px solid #EEE', paddingTop: 8, maxHeight: 360, overflowY: 'auto' }}>
        {TAG_LIST.map((t) => (
          <div
            key={t.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '6px 4px',
            }}
          >
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 26,
                background: t.color,
                color: '#fff',
                fontSize: 12,
                padding: '0 12px',
                borderRadius: 16,
              }}
            >
              {t.label}
            </span>
            <span style={{ display: 'flex', gap: 8 }}>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                <EditOutlined style={{ color: '#888', fontSize: 13 }} />
              </span>
              <span
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 28,
                  height: 28,
                  border: '1px solid #E0E0E0',
                  borderRadius: 6,
                  cursor: 'pointer',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  stroke="#888"
                  strokeWidth="1.2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  {/* lid */}
                  <path d="M2.5 4h11" />
                  <path d="M6 4V2.8a.8.8 0 0 1 .8-.8h2.4a.8.8 0 0 1 .8.8V4" />
                  {/* can body */}
                  <path d="M3.5 4l.6 8.2a1 1 0 0 0 1 .9h5.8a1 1 0 0 0 1-.9L12.5 4" />
                  {/* inner lines */}
                  <path d="M6.5 6.5v4" />
                  <path d="M9.5 6.5v4" />
                </svg>
              </span>
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

interface CreateTagProps {
  open: boolean;
  onClose: () => void;
}

export function CreateTagModal({ open, onClose }: CreateTagProps) {
  const [name, setName] = useState('');
  const [color, setColor] = useState(TAG_COLORS[0]);

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={594}
      title={null}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button shape="round" onClick={onClose}>
            Cancel
          </Button>
          <Button type="primary" shape="round" disabled={!name.trim()} onClick={onClose}>
            Add Tag
          </Button>
        </div>
      }
    >
      <div style={{ fontSize: 20, fontWeight: 700, marginBottom: 2 }}>Support Tags</div>
      <Text type="secondary" style={{ fontSize: 13 }}>
        Create new tags here
      </Text>

      <div style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 13, display: 'block', marginBottom: 6 }}>New Tag Name</Text>
        <Input
          placeholder="Enter Tag Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>

      <div style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 13, display: 'block', marginBottom: 10 }}>Choose Tag Color</Text>
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
          {TAG_COLORS.map((c) => (
            <div
              key={c}
              onClick={() => setColor(c)}
              style={{
                width: 30,
                height: 30,
                borderRadius: '50%',
                background: c,
                cursor: 'pointer',
                border: color === c ? '2px solid #333' : '2px solid transparent',
                outline: color === c ? '2px solid #fff' : 'none',
                outlineOffset: -4,
              }}
            />
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20 }}>
        <Text style={{ fontSize: 13, display: 'block', marginBottom: 10 }}>Preview</Text>
        <div style={{ minHeight: 40 }}>
          {name && (
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 26,
                background: color,
                color: '#fff',
                fontSize: 12,
                padding: '0 14px',
                borderRadius: 16,
              }}
            >
              {name}
            </span>
          )}
        </div>
      </div>
    </Modal>
  );
}

interface TagsQuickFilterProps {
  open: boolean;
  onClose: () => void;
  onApply: (selected: string[]) => void;
}

// Quick-filter popup opened from the TAGS column header (382x474 in Figma).
export function TagsQuickFilter({ open, onClose, onApply }: TagsQuickFilterProps) {
  const [checked, setChecked] = useState<string[]>(['Add Case']);

  const toggle = (label: string) => {
    setChecked((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const reset = () => setChecked([]);
  const apply = () => {
    onApply(checked);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={382}
      title={null}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button
            shape="round"
            onClick={reset}
            style={{ color: '#5B1A4D', borderColor: '#5B1A4D' }}
          >
            Reset Filter
          </Button>
          <Button type="primary" shape="round" onClick={apply}>
            Apply
          </Button>
        </div>
      }
    >
      <div style={{ maxHeight: 380, overflowY: 'auto', paddingTop: 4 }}>
        {TAG_LIST.map((t) => (
          <div
            key={t.label}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 12,
              padding: '6px 4px',
            }}
          >
            <Checkbox
              checked={checked.includes(t.label)}
              onChange={() => toggle(t.label)}
            />
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                height: 26,
                background: t.color,
                color: '#fff',
                fontSize: 12,
                padding: '0 12px',
                borderRadius: 16,
              }}
            >
              {t.label}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

interface ProductFilterProps {
  open: boolean;
  onClose: () => void;
  onApply: (selected: string[]) => void;
}

const PRODUCT_OPTIONS = ['All', 'Judgement', 'Interim Order', 'Other'];

// Product quick-filter popup (382x322 in Figma) opened from PRODUCTS column header.
export function ProductFilter({ open, onClose, onApply }: ProductFilterProps) {
  const [checked, setChecked] = useState<string[]>(['Judgement']);

  const toggle = (label: string) => {
    setChecked((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label],
    );
  };

  const reset = () => setChecked([]);
  const apply = () => {
    onApply(checked);
    onClose();
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={382}
      title={null}
      closable={false}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
          <Button
            shape="round"
            onClick={reset}
            style={{ color: '#5B1A4D', borderColor: '#5B1A4D' }}
          >
            Reset Filter
          </Button>
          <Button type="primary" shape="round" onClick={apply}>
            Apply
          </Button>
        </div>
      }
    >
      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, padding: '12px 0' }}>
        {PRODUCT_OPTIONS.map((p) => (
          <Checkbox
            key={p}
            checked={checked.includes(p)}
            onChange={() => toggle(p)}
            style={{ fontSize: 14 }}
          >
            {p}
          </Checkbox>
        ))}
      </div>
    </Modal>
  );
}