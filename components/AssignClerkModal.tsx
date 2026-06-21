'use client';

import React, { useState } from 'react';
import { Modal, Button, Checkbox, Select, Typography, Avatar } from 'antd';
import { PlusOutlined, UserOutlined } from '@ant-design/icons';
import AddClerkModal from '@/components/AddClerkModal';

const { Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
}

// Personnel shown in the Assign Clerk popup.
const PERSONNEL = [
  { id: 'p1', name: 'Shaman' },
  { id: 'p2', name: 'Shaman' },
  { id: 'p3', name: 'Shaman' },
];

const MORE_CLERKS = ['Shabarinath', 'Gopalan', 'Nakul', 'Anand'];

export default function AssignClerkModal({ open, onClose }: Props) {
  const [checked, setChecked] = useState<string[]>([]);
  const [moreClerk, setMoreClerk] = useState<string | undefined>();
  const [addClerkOpen, setAddClerkOpen] = useState(false);

  const toggle = (id: string) => {
    setChecked((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );
  };

  return (
    <Modal
      open={open}
      onCancel={onClose}
      width={594}
      title={null}
      closable={false}
      footer={
        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: 12 }}>
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
            onClick={onClose}
            style={{ minWidth: 160 }}
          >
            Assign Personnel
          </Button>
        </div>
      }
    >
      {/* Add New button top-right */}
      <div style={{ display: 'flex', justifyContent: 'flex-end', marginBottom: 8 }}>
        <Button type="primary" icon={<PlusOutlined />} shape="round" onClick={() => setAddClerkOpen(true)}>
          Add New
        </Button>
      </div>

      <div style={{ fontSize: 22, fontWeight: 700, marginBottom: 4 }}>
        Assign Authorized Personnel
      </div>
      <Text type="secondary" style={{ fontSize: 13 }}>
        Select the person who is authorized to collect CTC document.
      </Text>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16, margin: '24px 0' }}>
        {PERSONNEL.map((p) => (
          <div
            key={p.id}
            style={{ display: 'flex', alignItems: 'center', gap: 12 }}
          >
            <Checkbox
              checked={checked.includes(p.id)}
              onChange={() => toggle(p.id)}
            />
            <Avatar size={36} icon={<UserOutlined />} />
            <Text style={{ fontSize: 14 }}>{p.name}</Text>
          </div>
        ))}
      </div>

      <div>
        <Text style={{ fontSize: 14, display: 'block', marginBottom: 8 }}>More Clerks</Text>
        <Select
          size="large"
          placeholder="Choose Clerks"
          value={moreClerk}
          onChange={setMoreClerk}
          style={{ width: '100%' }}
          options={MORE_CLERKS.map((c) => ({ value: c, label: c }))}
        />
      </div>

      <AddClerkModal open={addClerkOpen} onClose={() => setAddClerkOpen(false)} />
    </Modal>
  );
}