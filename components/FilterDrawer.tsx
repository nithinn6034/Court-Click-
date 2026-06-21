'use client';

import React, { useState } from 'react';
import { Drawer, Select, Checkbox, Button, Typography } from 'antd';
import { DISTRICTS, COURT_ESTABLISHMENTS, PRODUCTS } from '@/data/mockData';
import { FilterValues } from '@/types/order';

const { Text } = Typography;

interface Props {
  open: boolean;
  onClose: () => void;
  onApply: (values: FilterValues) => void;
}

const LABEL = '#555';

export default function FilterDrawer({ open, onClose, onApply }: Props) {
  const [district, setDistrict] = useState<string | undefined>();
  const [court, setCourt] = useState<string | undefined>();
  const [product, setProduct] = useState<string>('All');
  const [testUsers, setTestUsers] = useState(true);

  const reset = () => {
    setDistrict(undefined);
    setCourt(undefined);
    setProduct('All');
    setTestUsers(true);
  };

  const apply = () => {
    onApply({ district, courtEstablishment: court, product, testUsers });
    onClose();
  };

  const fieldLabel: React.CSSProperties = {
    display: 'block',
    fontSize: 14,
    color: LABEL,
    marginBottom: 8,
    marginTop: 24,
  };

  return (
    <Drawer
      open={open}
      onClose={onClose}
      width={559}
      title={<span style={{ fontSize: 22, fontWeight: 600 }}>Filter Users</span>}
      footer={
        <div style={{ display: 'flex', justifyContent: 'space-between', gap: 16, padding: '8px 0' }}>
          <Button
            onClick={reset}
            shape="round"
            size="large"
            style={{ flex: 1, color: '#5B1A4D', borderColor: '#5B1A4D' }}
          >
            Reset Filter
          </Button>
          <Button
            type="primary"
            onClick={apply}
            shape="round"
            size="large"
            style={{ flex: 1 }}
          >
            Apply Filter
          </Button>
        </div>
      }
    >
      <div>
        <Text style={fieldLabel}>District</Text>
        <Select
          allowClear
          size="large"
          placeholder="Choose District"
          value={district}
          onChange={setDistrict}
          style={{ width: '100%' }}
          options={DISTRICTS.map((d) => ({ value: d, label: d }))}
        />

        <Text style={fieldLabel}>Court Establishment</Text>
        <Select
          allowClear
          size="large"
          placeholder="Choose Court Establishment"
          value={court}
          onChange={setCourt}
          style={{ width: '100%' }}
          options={COURT_ESTABLISHMENTS.map((c) => ({ value: c, label: c }))}
        />

        <Text style={fieldLabel}>Product</Text>
        <Select
          size="large"
          value={product}
          onChange={setProduct}
          style={{ width: '100%' }}
          options={PRODUCTS.map((p) => ({ value: p, label: p }))}
        />

        <div style={{ marginTop: 28 }}>
          <Checkbox
            checked={testUsers}
            onChange={(e) => setTestUsers(e.target.checked)}
          >
            <span style={{ fontSize: 14 }}>Test Users</span>
          </Checkbox>
        </div>
      </div>
    </Drawer>
  );
}