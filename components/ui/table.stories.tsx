import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { Table } from './table';
import type { TableColumn, CellContent } from './table';

const FIGMA_URL =
  'https://www.figma.com/design/vr9mgx3CwlKmdGujGIumRK/Surmount-Design-System?node-id=23491-3048';

// ─── Sample data ──────────────────────────────────────────────────────────────

interface Strategy {
  id: string;
  name: string;
  manager: string;
  status: 'active' | 'paused' | 'closed';
  return1y: number;
  allocation: number;
  risk: 'low' | 'medium' | 'high';
  aum: string;
}

const SAMPLE_DATA: Strategy[] = [
  {
    id: '1',
    name: 'Global Macro Alpha',
    manager: 'Aria Investments',
    status: 'active',
    return1y: 18.42,
    allocation: 35,
    risk: 'medium',
    aum: '$2.4B',
  },
  {
    id: '2',
    name: 'Long/Short Equity',
    manager: 'Meridian Capital',
    status: 'active',
    return1y: -4.17,
    allocation: 20,
    risk: 'high',
    aum: '$890M',
  },
  {
    id: '3',
    name: 'Fixed Income Blend',
    manager: 'Vantage Asset Mgmt',
    status: 'paused',
    return1y: 6.83,
    allocation: 25,
    risk: 'low',
    aum: '$1.1B',
  },
  {
    id: '4',
    name: 'Emerging Markets Growth',
    manager: 'Horizon Partners',
    status: 'active',
    return1y: 22.05,
    allocation: 15,
    risk: 'high',
    aum: '$540M',
  },
  {
    id: '5',
    name: 'Dividend Income',
    manager: 'Keystone Advisors',
    status: 'closed',
    return1y: 9.31,
    allocation: 5,
    risk: 'low',
    aum: '$3.2B',
  },
];

// Closed is not an error state — it's an inactive/historical strategy.
// Map it to gray so the table doesn't scream danger at the user.
const statusColorMap: Record<Strategy['status'], 'success' | 'warning' | 'gray'> = {
  active: 'success',
  paused: 'warning',
  closed: 'gray',
};

const riskColorMap: Record<Strategy['risk'], 'success' | 'warning' | 'error'> = {
  low: 'success',
  medium: 'warning',
  high: 'error',
};

// ─── Columns ──────────────────────────────────────────────────────────────────

const COLUMNS: TableColumn<Strategy>[] = [
  {
    key: 'name',
    header: 'Strategy',
    sortable: true,
    minWidth: 180,
    cell: (row): CellContent => ({
      type: 'lead-text',
      primary: row.name,
      secondary: row.manager,
    }),
  },
  {
    key: 'status',
    header: 'Status',
    sortable: true,
    cell: (row): CellContent => ({
      type: 'badge',
      label: row.status.charAt(0).toUpperCase() + row.status.slice(1),
      color: statusColorMap[row.status],
    }),
  },
  {
    key: 'return1y',
    header: '1Y Return',
    sortable: true,
    align: 'right',
    cell: (row): CellContent => ({
      type: 'trend',
      value: row.return1y,
      suffix: '%',
    }),
  },
  {
    key: 'allocation',
    header: 'Allocation',
    minWidth: 160,
    cell: (row): CellContent => ({
      type: 'progress',
      value: row.allocation,
      max: 100,
    }),
  },
  {
    key: 'risk',
    header: 'Risk',
    cell: (row): CellContent => ({
      type: 'badge',
      label: row.risk.charAt(0).toUpperCase() + row.risk.slice(1),
      color: riskColorMap[row.risk],
    }),
  },
  {
    key: 'aum',
    header: 'AUM',
    align: 'right',
    cell: (row): CellContent => ({
      type: 'text',
      value: row.aum,
    }),
  },
];

const meta: Meta<typeof Table> = {
  title: 'UI/Table',
  component: Table,
  tags: ['autodocs'],
  parameters: {
    layout: 'padded',
    design: {
      type: 'figma',
      url: FIGMA_URL,
    },
  },
};

export default meta;
type Story = StoryObj<typeof Table>;

// ─── Default ──────────────────────────────────────────────────────────────────

export const Default: Story = {
  render: () => (
    <Table
      columns={COLUMNS}
      data={SAMPLE_DATA}
      rowKey={(row) => row.id}
    />
  ),
};

// ─── Selectable ───────────────────────────────────────────────────────────────

export const Selectable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [selected, setSelected] = useState<Set<string>>(new Set(['1', '3']));

    return (
      <Table
        columns={COLUMNS}
        data={SAMPLE_DATA}
        rowKey={(row) => row.id}
        selectable
        selectedKeys={selected}
        onSelectionChange={setSelected}
      />
    );
  },
};

// ─── Sortable ─────────────────────────────────────────────────────────────────

export const Sortable: Story = {
  render: () => {
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortKey, setSortKey] = useState<string>('return1y');
    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [sortDir, setSortDir] = useState<'asc' | 'desc'>('desc');

    const sorted = [...SAMPLE_DATA].sort((a, b) => {
      const av = (a as unknown as Record<string, unknown>)[sortKey];
      const bv = (b as unknown as Record<string, unknown>)[sortKey];
      if (av == null || bv == null) return 0;
      const cmp = av < bv ? -1 : av > bv ? 1 : 0;
      return sortDir === 'asc' ? cmp : -cmp;
    });

    return (
      <Table
        columns={COLUMNS}
        data={sorted}
        rowKey={(row) => row.id}
        sortKey={sortKey}
        sortDirection={sortDir}
        onSort={(key, dir) => {
          setSortKey(key);
          setSortDir(dir);
        }}
      />
    );
  },
};

// ─── Striped ─────────────────────────────────────────────────────────────────

export const Striped: Story = {
  render: () => (
    <Table
      columns={COLUMNS}
      data={SAMPLE_DATA}
      rowKey={(row) => row.id}
      striped
    />
  ),
};

// ─── Empty State ─────────────────────────────────────────────────────────────

export const EmptyState: Story = {
  render: () => (
    <Table
      columns={COLUMNS}
      data={[]}
      rowKey={(row) => row.id}
      emptyState={
        <div className="flex flex-col items-center gap-md py-2xl">
          <p className="text-text-sm text-fg-tertiary-600 font-body">No strategies found.</p>
          <p className="text-text-xs text-fg-quaternary-400 font-body">
            Add a strategy to get started.
          </p>
        </div>
      }
    />
  ),
};

// ─── Dark Mode ───────────────────────────────────────────────────────────────

export const DarkMode: Story = {
  render: () => (
    <div data-theme="dark" className="bg-bg-primary p-xl rounded-xl">
      <Table
        columns={COLUMNS}
        data={SAMPLE_DATA}
        rowKey={(row) => row.id}
      />
    </div>
  ),
};
