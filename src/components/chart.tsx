import { Bar, BarChart, CartesianGrid, XAxis } from 'recharts';

import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from '@/components/ui/chart';

const chartData = [
  { month: 'January', desktop: 186, mobile: 80 },
  { month: 'February', desktop: 305, mobile: 200 },
  { month: 'March', desktop: 237, mobile: 120 },
  { month: 'April', desktop: 73, mobile: 190 },
  { month: 'May', desktop: 209, mobile: 130 },
  { month: 'June', desktop: 214, mobile: 140 },
  { month: 'July', desktop: 160, mobile: 100 },
  { month: 'August', desktop: 123, mobile: 60 },
  { month: 'September', desktop: 90, mobile: 40 },
  { month: 'October', desktop: 80, mobile: 30 },
  { month: 'November', desktop: 60, mobile: 20 },
  { month: 'December', desktop: 40, mobile: 10 },
];

const chartConfig = {
  desktop: {
    label: 'Desktop',
    // icon: Monitor,
    // A color like 'hsl(220, 98%, 61%)' or 'var(--color-name)'
    color: '#2563eb',
    // OR a theme object with 'light' and 'dark' keys
    // theme: {
    //   light: '#2563eb',
    //   dark: '#dc2626',
    // },
  },

  mobile: {
    label: 'Mobile',
    // icon: Smartphone,
    color: '#60a5fa',
    // theme: {
    //   light: '#f87171',
    //   dark: '#34d399',
    // },
  },
} satisfies ChartConfig;

export function Chart() {
  return (
    <ChartContainer config={chartConfig} className='w-full '>
      <BarChart accessibilityLayer data={chartData}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey='month'
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartTooltip content={<ChartTooltipContent labelKey='visitors' nameKey='browser' />} />
        <ChartLegend content={<ChartLegendContent />} />
        {/* <ChartLegend content={<ChartLegendContent nameKey='browser' />} /> */}
        {/* <LineChart accessibilityLayer /> */}
        <Bar dataKey='desktop' fill='var(--color-desktop)' radius={4} />
        <Bar dataKey='mobile' fill='var(--color-mobile)' radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
