"use client";

import type { Meta, StoryObj } from "@storybook/react";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import { ChartActiveDot, ChartLegendContent, ChartTooltipContent, selectEvenlySpacedItems } from "./charts-base";

const meta: Meta = {
    title: "UI/Base/Charts",
    parameters: { layout: "padded" },
};
export default meta;

type Story = StoryObj;

const areaData = [
    { month: "Jan", portfolio: 42000, benchmark: 38000 },
    { month: "Feb", portfolio: 45500, benchmark: 39200 },
    { month: "Mar", portfolio: 43000, benchmark: 37800 },
    { month: "Apr", portfolio: 48200, benchmark: 41000 },
    { month: "May", portfolio: 51000, benchmark: 43500 },
    { month: "Jun", portfolio: 49500, benchmark: 42100 },
    { month: "Jul", portfolio: 54000, benchmark: 45000 },
    { month: "Aug", portfolio: 57200, benchmark: 47800 },
    { month: "Sep", portfolio: 55800, benchmark: 46200 },
    { month: "Oct", portfolio: 61000, benchmark: 50000 },
    { month: "Nov", portfolio: 63500, benchmark: 52100 },
    { month: "Dec", portfolio: 68000, benchmark: 55000 },
];

const xLabels = selectEvenlySpacedItems(
    areaData.map((d) => d.month),
    6,
);

export const AreaChartStory: Story = {
    name: "Area Chart",
    render: () => (
        <div className="w-full rounded-xl bg-bg-primary p-6" style={{ height: 320 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={areaData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <defs>
                        <linearGradient id="portfolioGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="var(--color-utility-brand-600)" stopOpacity={0.15} />
                            <stop offset="95%" stopColor="var(--color-utility-brand-600)" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid vertical={false} stroke="var(--color-border-secondary)" />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "var(--color-fg-quaternary-400)" }}
                        tickFormatter={(v) => (xLabels.includes(v) ? v : "")}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "var(--color-fg-quaternary-400)" }}
                        tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`}
                        width={48}
                    />
                    <Tooltip
                        content={<ChartTooltipContent formatter={(v) => `$${Number(v).toLocaleString()}`} />}
                        cursor={{ stroke: "var(--color-border-primary)", strokeWidth: 1 }}
                    />
                    <Legend content={<ChartLegendContent />} />
                    <Area
                        type="monotone"
                        dataKey="portfolio"
                        name="Portfolio"
                        stroke="var(--color-utility-brand-600)"
                        strokeWidth={2}
                        fill="url(#portfolioGrad)"
                        activeDot={<ChartActiveDot />}
                        className="text-utility-brand-600"
                    />
                    <Area
                        type="monotone"
                        dataKey="benchmark"
                        name="Benchmark"
                        stroke="var(--color-fg-quaternary-400)"
                        strokeWidth={2}
                        fill="none"
                        activeDot={<ChartActiveDot />}
                        className="text-fg-quaternary-400"
                    />
                </AreaChart>
            </ResponsiveContainer>
        </div>
    ),
};

const barData = [
    { month: "Jan", returns: 4.2 },
    { month: "Feb", returns: 7.1 },
    { month: "Mar", returns: -2.3 },
    { month: "Apr", returns: 5.8 },
    { month: "May", returns: 9.2 },
    { month: "Jun", returns: -1.5 },
    { month: "Jul", returns: 6.4 },
    { month: "Aug", returns: 3.7 },
    { month: "Sep", returns: -0.8 },
    { month: "Oct", returns: 8.1 },
    { month: "Nov", returns: 4.9 },
    { month: "Dec", returns: 11.3 },
];

export const BarChartStory: Story = {
    name: "Bar Chart — Monthly Returns",
    render: () => (
        <div className="w-full rounded-xl bg-bg-primary p-6" style={{ height: 280 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={barData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="var(--color-border-secondary)" />
                    <XAxis
                        dataKey="month"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "var(--color-fg-quaternary-400)" }}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "var(--color-fg-quaternary-400)" }}
                        tickFormatter={(v) => `${v}%`}
                        width={40}
                    />
                    <Tooltip content={<ChartTooltipContent formatter={(v) => `${Number(v).toFixed(1)}%`} />} />
                    <Bar
                        dataKey="returns"
                        name="Monthly return"
                        radius={[4, 4, 0, 0]}
                        fill="var(--color-utility-brand-600)"
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    ),
};

const lineData = [
    { date: "Q1 '23", equity: 62, bonds: 28, cash: 10 },
    { date: "Q2 '23", equity: 65, bonds: 25, cash: 10 },
    { date: "Q3 '23", equity: 60, bonds: 30, cash: 10 },
    { date: "Q4 '23", equity: 68, bonds: 24, cash: 8 },
    { date: "Q1 '24", equity: 71, bonds: 22, cash: 7 },
    { date: "Q2 '24", equity: 69, bonds: 23, cash: 8 },
    { date: "Q3 '24", equity: 74, bonds: 20, cash: 6 },
    { date: "Q4 '24", equity: 76, bonds: 18, cash: 6 },
];

export const LineChartStory: Story = {
    name: "Line Chart — Allocation",
    render: () => (
        <div className="w-full rounded-xl bg-bg-primary p-6" style={{ height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={lineData} margin={{ top: 4, right: 4, left: 0, bottom: 0 }}>
                    <CartesianGrid vertical={false} stroke="var(--color-border-secondary)" />
                    <XAxis
                        dataKey="date"
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "var(--color-fg-quaternary-400)" }}
                    />
                    <YAxis
                        tickLine={false}
                        axisLine={false}
                        tick={{ fontSize: 12, fill: "var(--color-fg-quaternary-400)" }}
                        tickFormatter={(v) => `${v}%`}
                        width={40}
                    />
                    <Tooltip content={<ChartTooltipContent formatter={(v) => `${v}%`} />} />
                    <Legend content={<ChartLegendContent />} />
                    <Line
                        type="monotone"
                        dataKey="equity"
                        name="Equities"
                        stroke="var(--color-utility-brand-600)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={<ChartActiveDot />}
                        className="text-utility-brand-600"
                    />
                    <Line
                        type="monotone"
                        dataKey="bonds"
                        name="Bonds"
                        stroke="var(--color-fg-tertiary-600)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={<ChartActiveDot />}
                        className="text-fg-tertiary-600"
                    />
                    <Line
                        type="monotone"
                        dataKey="cash"
                        name="Cash"
                        stroke="var(--color-fg-quaternary-400)"
                        strokeWidth={2}
                        dot={false}
                        activeDot={<ChartActiveDot />}
                        className="text-fg-quaternary-400"
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    ),
};
