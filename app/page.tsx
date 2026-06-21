'use client';

import React, { useMemo, useState } from 'react';
import {
  Table,
  Button,
  Input,
  Select,
  Typography,
  Tooltip,
  Popover,
  ConfigProvider,
  theme,
} from 'antd';
import type { ColumnsType } from 'antd/es/table';
import {
  SearchOutlined,
  EyeOutlined,
  EditOutlined,
  DeleteOutlined,
  ShareAltOutlined,
  CopyOutlined,
  CloseOutlined,
  AppstoreOutlined,
  TeamOutlined,
  FileTextOutlined,
  PieChartOutlined,
  ApartmentOutlined,
  MoreOutlined,
  UserOutlined,
  FilterOutlined,
  CloudUploadOutlined,
  CalendarOutlined,
  BorderOuterOutlined,
  BulbOutlined,
  BulbFilled,
} from '@ant-design/icons';
import { Order, OrderStatus, FilterValues } from '@/types/order';
import { ORDERS, TABS, ORDER_DETAILS } from '@/data/mockData';
import OrderDetailsModal from '@/components/OrderDetailsModal';
import FilterDrawer from '@/components/FilterDrawer';
import { ChooseTagModal, CreateTagModal, TagsQuickFilter, ProductFilter } from '@/components/TagPopovers';
import AssignClerkModal from '@/components/AssignClerkModal';
import ShareModal from '@/components/ShareModal';

const { Text } = Typography;

const STATUS_META: Record<OrderStatus, { label: string; bg: string; color: string; border: string }> = {
  cancelled: { label: 'cancelled', bg: '#FDECEC', color: '#EB5757', border: '#F5C6C6' },
  order_placed: { label: 'order placed', bg: '#EAF7EE', color: '#27AE60', border: '#BFE6CC' },
  payment_completed: { label: 'payment completed', bg: '#FEF6E6', color: '#E8923B', border: '#F5D9A8' },
  completed: { label: 'completed', bg: '#EAF7EE', color: '#27AE60', border: '#BFE6CC' },
};

const INK = '#1A1A2E';
const SIDEBAR = '#000000';
const LOGO_PLUM = '#3D1228';
const CARD_GREY = '#FFFFFF';
const BORDER = '#E8E8E8';
const TAG_BLUE = '#6B8CAE';
const TAG_GREEN = '#5BA88A';
const TAG_GOLD = '#B8A04A';

export default function OrdersTablePage() {
  const [search, setSearch] = useState('');
  const [activeTab, setActiveTab] = useState('orders');
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState<string | null>(null);
  const [filterOpen, setFilterOpen] = useState(false);
  const [filters, setFilters] = useState<FilterValues>({});
  const [chooseTagOpen, setChooseTagOpen] = useState(false);
  const [createTagOpen, setCreateTagOpen] = useState(false);
  const [tagsFilterOpen, setTagsFilterOpen] = useState(false);
  const [selectedTags, setSelectedTags] = useState<string[]>([]);
  const [productFilterOpen, setProductFilterOpen] = useState(false);
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [assignOpen, setAssignOpen] = useState(false);
  const [shareOpen, setShareOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const openDetails = (orderId: string) => {
    setSelectedOrderId(orderId);
    setDetailsOpen(true);
  };

  const filtered = useMemo(() => {
    const q = search.trim().toLowerCase();
    return ORDERS.filter((o) => {
      // text search
      const matchesSearch =
        !q ||
        o.customerName.toLowerCase().includes(q) ||
        o.courtComplex.toLowerCase().includes(q) ||
        o.product.toLowerCase().includes(q) ||
        o.orderRefs.join(' ').toLowerCase().includes(q);
      // drawer filters
      const matchesCourt =
        !filters.courtEstablishment ||
        o.courtComplex.includes(filters.courtEstablishment);
      const matchesProduct =
        !filters.product ||
        filters.product === 'All' ||
        o.product.toLowerCase().includes(filters.product.toLowerCase());
      // tags quick filter: row must have at least one of the selected tags
      const matchesTags =
        selectedTags.length === 0 ||
        o.tags.some((t) => selectedTags.includes(t.label));
      // product quick filter: row product matches a selected product
      const matchesProductFilter =
        selectedProducts.length === 0 ||
        selectedProducts.includes('All') ||
        selectedProducts.some((p) => o.product.toLowerCase().includes(p.toLowerCase()));
      return matchesSearch && matchesCourt && matchesProduct && matchesTags && matchesProductFilter;
    });
  }, [search, filters, selectedTags, selectedProducts]);

  const columns: ColumnsType<Order> = [
    {
      title: '#',
      dataIndex: 'serial',
      key: 'serial',
      width: 44,
      render: (s: number) => <Text style={{ fontSize: 13 }}>{s}</Text>,
    },
    {
      title: 'USER INFO',
      key: 'userInfo',
      width: 180,
      render: (_, r) => (
        <div style={{ lineHeight: 1.4 }}>
          <div style={{ fontWeight: 600, fontSize: 13 }}>{r.customerName}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{r.phone}</div>
          {r.orderRefs.map((ref) => (
            <div key={ref} style={{ fontSize: 12, color: '#888' }}>
              {ref}
            </div>
          ))}
          <Popover
            trigger="click"
            placement="bottomLeft"
            content={
              <div style={{ width: 228, fontFamily: 'Inter, sans-serif', color: '#11060C' }}>
                <div style={{ fontSize: 16, fontWeight: 700, marginBottom: 8 }}>
                  {r.customerName}
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, lineHeight: '20px' }}>
                  67/67A flat no D 1st floor, attaniyathu road vennala, Kochi, Kerala, 654321
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, marginTop: 8 }}>
                  +91 9876543210
                </div>
              </div>
            }
          >
            <Button
              size="small"
              icon={<CopyOutlined style={{ fontSize: 11 }} />}
              style={{ marginTop: 4, fontSize: 11, height: 24, padding: '0 8px' }}
            >
              Copy Address
            </Button>
          </Popover>
        </div>
      ),
    },
    {
      title: 'COURT COMPLEX',
      key: 'courtComplex',
      width: 140,
      render: (_, r) => (
        <div style={{ lineHeight: 1.4 }}>
          <div style={{ fontSize: 13 }}>{r.courtComplex}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{r.courtSub}</div>
        </div>
      ),
    },
    {
      title: (
        <span
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          onClick={() => setProductFilterOpen(true)}
        >
          PRODUCTS <FilterOutlined style={{ fontSize: 11 }} />
        </span>
      ),
      key: 'product',
      width: 130,
      render: (_, r) => (
        <div style={{ lineHeight: 1.4 }}>
          <div style={{ fontSize: 13 }}>{r.product}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{r.productPrice}</div>
        </div>
      ),
    },
    {
      title: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          ORDER DATE <CalendarOutlined style={{ fontSize: 11 }} />
        </span>
      ),
      key: 'orderDate',
      width: 100,
      render: (_, r) => (
        <div style={{ lineHeight: 1.4 }}>
          <div style={{ fontSize: 13 }}>{r.orderDate}</div>
          <div style={{ fontSize: 12, color: '#888' }}>{r.orderDateTime}</div>
          {r.ageInfo && (
            <div style={{ fontSize: 11, color: '#E8923B', marginTop: 2 }}>{r.ageInfo}</div>
          )}
        </div>
      ),
    },
    {
      title: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          STATUS <BorderOuterOutlined style={{ fontSize: 11 }} />
        </span>
      ),
      key: 'status',
      width: 130,
      render: (_, r) => {
        const meta = STATUS_META[r.status];
        return (
          <div>
            <Select
              size="small"
              value="update"
              disabled
              suffixIcon={<span style={{ fontSize: 10 }}>▾</span>}
              style={{ width: 120, marginBottom: 10 }}
              options={[{ value: 'update', label: 'Update status' }]}
            />
            <div>
              <span
                style={{
                  display: 'inline-block',
                  background: '#fff',
                  color: meta.color,
                  border: `1px solid ${meta.color}`,
                  fontSize: 12,
                  padding: '2px 12px',
                  borderRadius: 12,
                }}
              >
                {meta.label}
              </span>
            </div>
          </div>
        );
      },
    },
    {
      title: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          ORDER DETAILS/ E-SIGN <BorderOuterOutlined style={{ fontSize: 11 }} />
        </span>
      ),
      key: 'details',
      width: 110,
      render: (_, r) => (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
          <Button size="small" style={{ fontSize: 12 }} onClick={() => openDetails(r.id)}>
            View
          </Button>
          <Button
            size="small"
            icon={<EyeOutlined style={{ fontSize: 11 }} />}
            style={{ fontSize: 12 }}
          >
            E-sign
          </Button>
        </div>
      ),
    },
    {
      title: (
        <span
          style={{ cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: 4 }}
          onClick={() => setTagsFilterOpen(true)}
        >
          TAGS / NOTE <BorderOuterOutlined style={{ fontSize: 11 }} />
        </span>
      ),
      key: 'tags',
      width: 190,
      render: (_, r) => (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: 4, marginBottom: 6 }}>
            <Select
              size="small"
              value="choose"
              open={false}
              onClick={() => setChooseTagOpen(true)}
              style={{ width: 105 }}
              options={[{ value: 'choose', label: 'Choose Tag' }]}
            />
            <Button
              size="small"
              icon={<EditOutlined style={{ fontSize: 12 }} />}
              style={{ width: 24, height: 24, padding: 0 }}
            />
          </div>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 4, marginBottom: 6 }}>
            {r.tags.map((t) => (
              <span
                key={t.id}
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 4,
                  height: 26,
                  background: t.color,
                  color: '#fff',
                  fontSize: 10,
                  padding: '0 8px',
                  borderRadius: 16,
                }}
              >
                {t.label}
                <CloseOutlined style={{ fontSize: 8 }} />
              </span>
            ))}
          </div>
          <div style={{ display: 'flex', gap: 4 }}>
            <Button size="small" style={{ fontSize: 10, height: 22, padding: '0 8px' }}>
              Add Case
            </Button>
            <Button
              size="small"
              style={{
                fontSize: 10,
                height: 22,
                padding: '0 8px',
                background: TAG_GOLD,
                color: '#fff',
                border: 'none',
              }}
            >
              Aadhaar Verified
            </Button>
          </div>
        </div>
      ),
    },
    {
      title: (
        <span style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
          CLERK <BorderOuterOutlined style={{ fontSize: 11 }} />
        </span>
      ),
      key: 'clerk',
      width: 110,
      render: (_, r) =>
        r.showAssign ? (
          <Button
            size="small"
            icon={<UserOutlined style={{ fontSize: 11 }} />}
            onClick={() => setAssignOpen(true)}
            style={{
              fontSize: 12,
              background: INK,
              color: '#fff',
              border: 'none',
            }}
          >
            Assign
          </Button>
        ) : (
          <div>
            <Text style={{ fontSize: 13 }}>{r.clerk}</Text>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 8 }}>
              <EditOutlined style={{ fontSize: 13, color: '#999', cursor: 'pointer' }} />
              <DeleteOutlined style={{ fontSize: 13, color: '#999', cursor: 'pointer' }} />
              <ShareAltOutlined style={{ fontSize: 13, color: '#999', cursor: 'pointer' }} />
            </div>
          </div>
        ),
    },
    {
      title: 'ECOPY',
      key: 'ecopy',
      width: 100,
      render: () => (
        <Button
          size="small"
          icon={<CloudUploadOutlined style={{ fontSize: 12 }} />}
          style={{
            fontSize: 12,
            background: '#50223C',
            color: '#fff',
            border: 'none',
            borderRadius: 6,
          }}
        >
          Upload
        </Button>
      ),
    },
  ];

  const navIcons = [
    AppstoreOutlined,
    TeamOutlined,
    UserOutlined,
    FileTextOutlined,
    PieChartOutlined,
    ApartmentOutlined,
    MoreOutlined,
  ];

  return (
    <ConfigProvider
      theme={{
        algorithm: darkMode ? theme.darkAlgorithm : theme.defaultAlgorithm,
        token: {
          colorPrimary: '#5B1A4D',
          borderRadius: 6,
        },
        components: {
          Table: {
            cellPaddingBlock: 10,
            cellPaddingInline: 12,
            headerBg: darkMode ? '#1F1F1F' : '#FAFAFA',
            headerColor: darkMode ? '#aaa' : '#999',
            borderColor: darkMode ? '#303030' : '#EDEDED',
            fontSize: 13,
          },
        },
      }}
    >
      <div style={{ display: 'flex', minHeight: '100vh', background: darkMode ? '#141414' : '#fff' }}>
        {/* Sidebar */}
        <div
          style={{
            width: 64,
            background: SIDEBAR,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            flexShrink: 0,
          }}
        >
          <div
            style={{
              width: '100%',
              height: 64,
              background: LOGO_PLUM,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              marginBottom: 8,
            }}
          >
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path
                d="M16 4 C10 4 5 9 5 16 C5 20 7 23 10 25 C8 22 8 18 11 15 C14 12 19 12 22 15 C21 10 19 6 16 4 Z"
                fill="#fff"
              />
              <circle cx="16" cy="19" r="4.5" fill="#fff" />
            </svg>
          </div>
          {navIcons.map((Icon, i) => (
            <div
              key={i}
              style={{
                width: '100%',
                padding: '14px 0',
                display: 'flex',
                justifyContent: 'center',
                color: i === 0 ? '#F2C94C' : '#7A7A7A',
                borderLeft: i === 0 ? '3px solid #F2C94C' : '3px solid transparent',
                cursor: 'pointer',
              }}
            >
              <Icon style={{ fontSize: 18 }} />
            </div>
          ))}
          <div style={{ flex: 1 }} />
          <div
            style={{
              padding: '16px 0',
              marginBottom: 8,
              color: '#999',
            }}
          >
            <div
              style={{
                width: 34,
                height: 34,
                borderRadius: '50%',
                background: '#333',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <UserOutlined style={{ fontSize: 18, color: '#bbb' }} />
            </div>
          </div>
        </div>

        {/* Main */}
        <div style={{ flex: 1, minWidth: 0 }}>
          {/* Header */}
          <div
            style={{
              display: 'flex',
              alignItems: 'flex-start',
              justifyContent: 'space-between',
              padding: '20px 24px 16px',
            }}
          >
            <div>
              <div style={{ fontSize: 22, fontWeight: 700, color: darkMode ? '#fff' : INK }}>
                Certified True Copy (47834)
              </div>
              <div style={{ fontSize: 13, color: '#888' }}>Manage Your CTC Orders Here</div>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <Tooltip title={darkMode ? 'Light mode' : 'Dark mode'}>
                <Button
                  icon={darkMode ? <BulbFilled /> : <BulbOutlined />}
                  onClick={() => setDarkMode((d) => !d)}
                />
              </Tooltip>
              <Tooltip title="Share">
                <Button icon={<ShareAltOutlined />} onClick={() => setShareOpen(true)} />
              </Tooltip>
              <Tooltip title="Filter">
                <Button icon={<FilterOutlined />} onClick={() => setFilterOpen(true)} />
              </Tooltip>
              <Input
                allowClear
                prefix={<SearchOutlined style={{ color: '#bbb' }} />}
                placeholder="Search"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                style={{ width: 240 }}
              />
            </div>
          </div>

          {/* Tabs + type select */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              padding: '0 24px 16px',
            }}
          >
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                border: `1px solid #1C1C2E`,
                borderRadius: 22,
                padding: 4,
                background: '#1C1C2E',
              }}
            >
              {TABS.map((t) => {
                const active = t.key === activeTab;
                return (
                  <button
                    key={t.key}
                    onClick={() => setActiveTab(t.key)}
                    style={{
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: 6,
                      border: 'none',
                      background: active ? '#fff' : '#1C1C2E',
                      color: active ? '#1C1C2E' : '#fff',
                      borderRadius: 18,
                      padding: '6px 16px',
                      fontSize: 13,
                      fontWeight: active ? 600 : 400,
                      cursor: 'pointer',
                      whiteSpace: 'nowrap',
                    }}
                  >
                    {t.label} ({t.count})
                    {t.key === 'clerks' && (
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 16,
                          height: 16,
                          background: active ? '#1C1C2E' : '#fff',
                          color: active ? '#fff' : '#1C1C2E',
                          borderRadius: 4,
                          fontSize: 11,
                          lineHeight: 1,
                        }}
                      >
                        +
                      </span>
                    )}
                  </button>
                );
              })}
            </div>
            <div
              style={{
                border: `1px solid ${BORDER}`,
                borderRadius: 8,
                padding: '4px 12px',
                fontSize: 11,
                color: '#888',
                display: 'flex',
                flexDirection: 'column',
                lineHeight: 1.2,
                cursor: 'pointer',
              }}
            >
              <span style={{ fontSize: 9 }}>Types</span>
              <span style={{ fontSize: 13, color: '#333', fontWeight: 500 }}>
                ORDERS ▾
              </span>
            </div>
          </div>

          {/* Table */}
          <div style={{ padding: '0 24px 24px' }}>
            <Table<Order>
              rowKey="id"
              columns={columns}
              dataSource={filtered}
              bordered
              size="small"
              scroll={{ x: 1250 }}
              pagination={{
                pageSize: 10,
                showSizeChanger: false,
                total: 4810,
                showQuickJumper: true,
              }}
              locale={{ emptyText: 'No orders found' }}
              style={{ background: darkMode ? '#1F1F1F' : '#FFFFFF', borderRadius: 8 }}
            />
          </div>
        </div>
      </div>

      <OrderDetailsModal
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        details={selectedOrderId ? ORDER_DETAILS[selectedOrderId] ?? null : null}
      />

      <FilterDrawer
        open={filterOpen}
        onClose={() => setFilterOpen(false)}
        onApply={(values) => setFilters(values)}
      />

      <ChooseTagModal
        open={chooseTagOpen}
        onClose={() => setChooseTagOpen(false)}
        onCreateNew={() => {
          setChooseTagOpen(false);
          setCreateTagOpen(true);
        }}
      />

      <CreateTagModal
        open={createTagOpen}
        onClose={() => setCreateTagOpen(false)}
      />

      <TagsQuickFilter
        open={tagsFilterOpen}
        onClose={() => setTagsFilterOpen(false)}
        onApply={(tags) => setSelectedTags(tags)}
      />

      <ProductFilter
        open={productFilterOpen}
        onClose={() => setProductFilterOpen(false)}
        onApply={(products) => setSelectedProducts(products)}
      />

      <AssignClerkModal
        open={assignOpen}
        onClose={() => setAssignOpen(false)}
      />

      <ShareModal open={shareOpen} onClose={() => setShareOpen(false)} />
    </ConfigProvider>
  );
}