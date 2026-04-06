import React, { useRef, useState, useId } from "react";

// ─── Types ───────────────────────────────────────────────────────────────────

export interface ChartDataPoint {
  /** X-axis label */
  label: string;
  /** Numeric value */
  value: number;
}

export interface ChartSeries {
  /** Series name (shown in legend/tooltip) */
  name: string;
  /** Data points */
  data: ChartDataPoint[];
  /** Color override (defaults to token palette) */
  color?: string;
}

export type ChartSize = "sm" | "md" | "lg" | "full";

export interface BaseChartProps {
  /** Chart series (single or multiple) */
  series: ChartSeries[];
  /** Chart height */
  height?: number;
  /** Chart width (default: 100% of container) */
  width?: number;
  /** Show X-axis labels */
  showXAxis?: boolean;
  /** Show Y-axis labels */
  showYAxis?: boolean;
  /** Show grid lines */
  showGrid?: boolean;
  /** Show legend */
  showLegend?: boolean;
  /** Show tooltip on hover */
  showTooltip?: boolean;
  /** Y-axis label */
  yAxisLabel?: string;
  /** Additional class name */
  className?: string;
}

export interface LineChartProps extends BaseChartProps {
  /** Show dots on data points */
  showDots?: boolean;
  /** Smooth curves (catmull-rom) */
  smooth?: boolean;
}

export interface BarChartProps extends BaseChartProps {
  /** Horizontal bar chart */
  horizontal?: boolean;
  /** Stack bars (when multiple series) */
  stacked?: boolean;
  /** Bar corner radius */
  radius?: number;
}

export interface AreaChartProps extends LineChartProps {
  /** Opacity of fill area */
  fillOpacity?: number;
}

export interface DonutChartProps {
  /** Data segments */
  data: { label: string; value: number; color?: string }[];
  /** Outer radius */
  size?: number;
  /** Inner radius ratio (0=pie, 0.6=donut) */
  innerRatio?: number;
  /** Center label */
  centerLabel?: string;
  /** Center value (overrides auto-sum) */
  centerValue?: string;
  /** Show legend */
  showLegend?: boolean;
  /** Show tooltip */
  showTooltip?: boolean;
  /** Additional class name */
  className?: string;
}

export interface MiniSparklineProps {
  /** Data values (no labels needed) */
  values: number[];
  /** Type */
  type?: "line" | "bar" | "area";
  /** Width */
  width?: number;
  /** Height */
  height?: number;
  /** Color */
  color?: string;
  /** Show last value as label */
  showValue?: boolean;
  /** Trend direction override (auto-computed if omitted) */
  trend?: "up" | "down" | "neutral";
  /** Additional class name */
  className?: string;
}

// ─── Token Colors ─────────────────────────────────────────────────────────────

const CHART_COLORS = [
  "var(--chart-1, #32a9ff)",
  "var(--chart-2, #22c55e)",
  "var(--chart-3, #f59e0b)",
  "var(--chart-4, #ef4444)",
  "var(--chart-5, #a855f7)",
  "var(--chart-6, #06b6d4)",
];

function getColor(series: ChartSeries, idx: number): string {
  return series.color ?? CHART_COLORS[idx % CHART_COLORS.length];
}

// ─── Helpers ─────────────────────────────────────────────────────────────────

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-label)",
  fontSize: "var(--text-label)",
  fontWeight: "var(--weight-label)",
};

function clamp(v: number, min: number, max: number) {
  return Math.max(min, Math.min(max, v));
}

function niceMax(values: number[]): number {
  const max = Math.max(...values, 0);
  if (max === 0) return 10;
  const mag = Math.pow(10, Math.floor(Math.log10(max)));
  return Math.ceil(max / mag) * mag;
}

function buildLinePath(points: [number, number][], smooth: boolean): string {
  if (points.length === 0) return "";
  if (!smooth || points.length < 3) {
    return points.map((p, i) => `${i === 0 ? "M" : "L"}${p[0]},${p[1]}`).join(" ");
  }
  let d = `M${points[0][0]},${points[0][1]}`;
  for (let i = 1; i < points.length; i++) {
    const prev = points[i - 1];
    const curr = points[i];
    const cpx1 = prev[0] + (curr[0] - prev[0]) * 0.4;
    const cpx2 = curr[0] - (curr[0] - prev[0]) * 0.4;
    d += ` C${cpx1},${prev[1]} ${cpx2},${curr[1]} ${curr[0]},${curr[1]}`;
  }
  return d;
}

// ─── Tooltip ─────────────────────────────────────────────────────────────────

function ChartTooltip({
  x, y, label, items,
}: {
  x: number; y: number; label: string; items: { name: string; value: number; color: string }[];
}) {
  return (
    <foreignObject x={x} y={y} width={160} height={40 + items.length * 22} style={{ overflow: "visible" }}>
      <div
        className="bg-card border border-border rounded-[var(--radius-md)] shadow-[0_4px_16px_rgba(0,0,0,0.12)] p-2 pointer-events-none"
        style={{ width: "max-content", ...labelStyle }}
      >
        <div className="text-muted-foreground mb-1">{label}</div>
        {items.map((item) => (
          <div key={item.name} className="flex items-center gap-1.5 text-foreground">
            <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ backgroundColor: item.color }} />
            <span className="truncate">{item.name}:</span>
            <span className="font-medium ml-auto pl-2">{item.value.toLocaleString()}</span>
          </div>
        ))}
      </div>
    </foreignObject>
  );
}

// ─── LineChart ────────────────────────────────────────────────────────────────

export function LineChart({
  series,
  height = 240,
  width,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showDots = true,
  smooth = false,
  className = "",
}: LineChartProps) {
  const uid = useId();
  const svgRef = useRef<SVGSVGElement>(null);
  const [tooltip, setTooltip] = useState<{ x: number; y: number; labelIdx: number } | null>(null);

  if (!series.length || !series[0].data.length) return null;

  const labels = series[0].data.map((d) => d.label);
  const allValues = series.flatMap((s) => s.data.map((d) => d.value));
  const yMax = niceMax(allValues);
  const yMin = 0;

  const pad = { top: 12, right: 16, bottom: showXAxis ? 36 : 12, left: showYAxis ? 48 : 16 };
  const svgW = width ?? 600;
  const svgH = height;
  const chartW = svgW - pad.left - pad.right;
  const chartH = svgH - pad.top - pad.bottom;

  const xStep = labels.length > 1 ? chartW / (labels.length - 1) : chartW;

  function toX(i: number) { return pad.left + i * xStep; }
  function toY(v: number) { return pad.top + chartH - ((v - yMin) / (yMax - yMin || 1)) * chartH; }

  const yTicks = Array.from({ length: 5 }, (_, i) => yMin + (i / 4) * (yMax - yMin));

  return (
    <div className={`w-full ${className}`}>
      <svg
        ref={svgRef}
        width={width ? svgW : "100%"}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Grid */}
        {showGrid && yTicks.map((tick, i) => (
          <line
            key={i}
            x1={pad.left} y1={toY(tick)}
            x2={svgW - pad.right} y2={toY(tick)}
            stroke="var(--border)"
            strokeWidth={0.5}
            strokeDasharray="4 2"
          />
        ))}

        {/* Y axis labels */}
        {showYAxis && yTicks.map((tick, i) => (
          <text
            key={i}
            x={pad.left - 8}
            y={toY(tick) + 4}
            textAnchor="end"
            fill="var(--muted-foreground)"
            style={labelStyle}
          >
            {tick >= 1000 ? `${(tick / 1000).toFixed(1)}k` : tick}
          </text>
        ))}

        {/* X axis labels */}
        {showXAxis && labels.map((lbl, i) => {
          const step = Math.max(1, Math.floor(labels.length / 8));
          if (i % step !== 0 && i !== labels.length - 1) return null;
          return (
            <text
              key={i}
              x={toX(i)}
              y={svgH - pad.bottom + 16}
              textAnchor="middle"
              fill="var(--muted-foreground)"
              style={labelStyle}
            >
              {lbl}
            </text>
          );
        })}

        {/* Series lines */}
        {series.map((s, si) => {
          const color = getColor(s, si);
          const pts: [number, number][] = s.data.map((d, i) => [toX(i), toY(d.value)]);
          const path = buildLinePath(pts, smooth);

          return (
            <g key={si}>
              <path
                d={path}
                fill="none"
                stroke={color}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {showDots && pts.map(([x, y], i) => (
                <circle
                  key={i}
                  cx={x} cy={y} r={3}
                  fill="var(--card)"
                  stroke={color}
                  strokeWidth={2}
                />
              ))}
            </g>
          );
        })}

        {/* Hover interaction zones */}
        {showTooltip && labels.map((_, i) => (
          <rect
            key={i}
            x={toX(i) - xStep / 2}
            y={pad.top}
            width={xStep}
            height={chartH}
            fill="transparent"
            onMouseEnter={() => setTooltip({ x: toX(i), y: pad.top, labelIdx: i })}
          />
        ))}

        {/* Hover line */}
        {tooltip && (
          <line
            x1={toX(tooltip.labelIdx)} y1={pad.top}
            x2={toX(tooltip.labelIdx)} y2={pad.top + chartH}
            stroke="var(--border)"
            strokeWidth={1}
            strokeDasharray="4 2"
          />
        )}

        {/* Tooltip */}
        {tooltip && showTooltip && (
          <ChartTooltip
            x={clamp(toX(tooltip.labelIdx) + 8, pad.left, svgW - 180)}
            y={pad.top}
            label={labels[tooltip.labelIdx]}
            items={series.map((s, si) => ({
              name: s.name,
              value: s.data[tooltip.labelIdx]?.value ?? 0,
              color: getColor(s, si),
            }))}
          />
        )}
      </svg>

      {/* Legend */}
      {showLegend && series.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-2 justify-center">
          {series.map((s, si) => (
            <div key={si} className="flex items-center gap-1.5" style={labelStyle}>
              <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: getColor(s, si) }} />
              <span className="text-muted-foreground">{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

LineChart.displayName = "LineChart";

// ─── AreaChart ────────────────────────────────────────────────────────────────

export function AreaChart({
  series,
  height = 240,
  width,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  showDots = false,
  smooth = true,
  fillOpacity = 0.15,
  className = "",
}: AreaChartProps) {
  const uid = useId();
  const [tooltip, setTooltip] = useState<{ x: number; y: number; labelIdx: number } | null>(null);

  if (!series.length || !series[0].data.length) return null;

  const labels = series[0].data.map((d) => d.label);
  const allValues = series.flatMap((s) => s.data.map((d) => d.value));
  const yMax = niceMax(allValues);
  const yMin = 0;

  const pad = { top: 12, right: 16, bottom: showXAxis ? 36 : 12, left: showYAxis ? 48 : 16 };
  const svgW = width ?? 600;
  const svgH = height;
  const chartW = svgW - pad.left - pad.right;
  const chartH = svgH - pad.top - pad.bottom;
  const xStep = labels.length > 1 ? chartW / (labels.length - 1) : chartW;

  function toX(i: number) { return pad.left + i * xStep; }
  function toY(v: number) { return pad.top + chartH - ((v - yMin) / (yMax - yMin || 1)) * chartH; }

  const yTicks = Array.from({ length: 5 }, (_, i) => yMin + (i / 4) * (yMax - yMin));
  const baseY = pad.top + chartH;

  return (
    <div className={`w-full ${className}`}>
      <svg
        width={width ? svgW : "100%"}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        onMouseLeave={() => setTooltip(null)}
      >
        <defs>
          {series.map((s, si) => (
            <linearGradient key={si} id={`${uid}-grad-${si}`} x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={getColor(s, si)} stopOpacity={fillOpacity * 4} />
              <stop offset="100%" stopColor={getColor(s, si)} stopOpacity={0} />
            </linearGradient>
          ))}
        </defs>

        {/* Grid */}
        {showGrid && yTicks.map((tick, i) => (
          <line key={i} x1={pad.left} y1={toY(tick)} x2={svgW - pad.right} y2={toY(tick)}
            stroke="var(--border)" strokeWidth={0.5} strokeDasharray="4 2" />
        ))}

        {/* Y labels */}
        {showYAxis && yTicks.map((tick, i) => (
          <text key={i} x={pad.left - 8} y={toY(tick) + 4} textAnchor="end"
            fill="var(--muted-foreground)" style={labelStyle}>
            {tick >= 1000 ? `${(tick / 1000).toFixed(1)}k` : tick}
          </text>
        ))}

        {/* X labels */}
        {showXAxis && labels.map((lbl, i) => {
          const step = Math.max(1, Math.floor(labels.length / 8));
          if (i % step !== 0 && i !== labels.length - 1) return null;
          return (
            <text key={i} x={toX(i)} y={svgH - pad.bottom + 16} textAnchor="middle"
              fill="var(--muted-foreground)" style={labelStyle}>
              {lbl}
            </text>
          );
        })}

        {/* Areas + lines */}
        {series.map((s, si) => {
          const color = getColor(s, si);
          const pts: [number, number][] = s.data.map((d, i) => [toX(i), toY(d.value)]);
          const linePath = buildLinePath(pts, smooth);
          const areaPath = linePath + ` L${pts[pts.length - 1][0]},${baseY} L${pts[0][0]},${baseY} Z`;

          return (
            <g key={si}>
              <path d={areaPath} fill={`url(#${uid}-grad-${si})`} />
              <path d={linePath} fill="none" stroke={color} strokeWidth={2} strokeLinecap="round" />
              {showDots && pts.map(([x, y], i) => (
                <circle key={i} cx={x} cy={y} r={3} fill="var(--card)" stroke={color} strokeWidth={2} />
              ))}
            </g>
          );
        })}

        {/* Hover zones */}
        {showTooltip && labels.map((_, i) => (
          <rect key={i} x={toX(i) - xStep / 2} y={pad.top} width={xStep} height={chartH}
            fill="transparent" onMouseEnter={() => setTooltip({ x: toX(i), y: pad.top, labelIdx: i })} />
        ))}

        {tooltip && (
          <line x1={toX(tooltip.labelIdx)} y1={pad.top} x2={toX(tooltip.labelIdx)} y2={pad.top + chartH}
            stroke="var(--border)" strokeWidth={1} strokeDasharray="4 2" />
        )}

        {tooltip && (
          <ChartTooltip
            x={clamp(toX(tooltip.labelIdx) + 8, pad.left, svgW - 180)}
            y={pad.top}
            label={labels[tooltip.labelIdx]}
            items={series.map((s, si) => ({
              name: s.name,
              value: s.data[tooltip.labelIdx]?.value ?? 0,
              color: getColor(s, si),
            }))}
          />
        )}
      </svg>

      {showLegend && series.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-2 justify-center">
          {series.map((s, si) => (
            <div key={si} className="flex items-center gap-1.5" style={labelStyle}>
              <div className="w-3 h-0.5 rounded-full" style={{ backgroundColor: getColor(s, si) }} />
              <span className="text-muted-foreground">{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

AreaChart.displayName = "AreaChart";

// ─── BarChart ─────────────────────────────────────────────────────────────────

export function BarChart({
  series,
  height = 240,
  width,
  showXAxis = true,
  showYAxis = true,
  showGrid = true,
  showLegend = true,
  showTooltip = true,
  stacked = false,
  radius = 4,
  className = "",
}: BarChartProps) {
  const [tooltip, setTooltip] = useState<{ x: number; y: number; labelIdx: number } | null>(null);

  if (!series.length || !series[0].data.length) return null;

  const labels = series[0].data.map((d) => d.label);

  let yMax: number;
  if (stacked) {
    yMax = niceMax(
      labels.map((_, i) => series.reduce((sum, s) => sum + (s.data[i]?.value ?? 0), 0))
    );
  } else {
    yMax = niceMax(series.flatMap((s) => s.data.map((d) => d.value)));
  }

  const pad = { top: 12, right: 16, bottom: showXAxis ? 36 : 12, left: showYAxis ? 48 : 16 };
  const svgW = width ?? 600;
  const svgH = height;
  const chartW = svgW - pad.left - pad.right;
  const chartH = svgH - pad.top - pad.bottom;

  const groupWidth = chartW / labels.length;
  const barPad = groupWidth * 0.2;
  const barGroupW = groupWidth - barPad * 2;
  const barW = stacked ? barGroupW : barGroupW / series.length;

  function toY(v: number) { return pad.top + chartH - (v / yMax) * chartH; }
  function toH(v: number) { return (v / yMax) * chartH; }
  function groupX(i: number) { return pad.left + i * groupWidth + barPad; }

  const yTicks = Array.from({ length: 5 }, (_, i) => (i / 4) * yMax);

  return (
    <div className={`w-full ${className}`}>
      <svg
        width={width ? svgW : "100%"}
        height={svgH}
        viewBox={`0 0 ${svgW} ${svgH}`}
        onMouseLeave={() => setTooltip(null)}
      >
        {/* Grid */}
        {showGrid && yTicks.map((tick, i) => (
          <line key={i} x1={pad.left} y1={toY(tick)} x2={svgW - pad.right} y2={toY(tick)}
            stroke="var(--border)" strokeWidth={0.5} strokeDasharray="4 2" />
        ))}

        {/* Y labels */}
        {showYAxis && yTicks.map((tick, i) => (
          <text key={i} x={pad.left - 8} y={toY(tick) + 4} textAnchor="end"
            fill="var(--muted-foreground)" style={labelStyle}>
            {tick >= 1000 ? `${(tick / 1000).toFixed(1)}k` : tick}
          </text>
        ))}

        {/* X labels */}
        {showXAxis && labels.map((lbl, i) => (
          <text key={i} x={groupX(i) + barGroupW / 2} y={svgH - pad.bottom + 16}
            textAnchor="middle" fill="var(--muted-foreground)" style={labelStyle}>
            {lbl}
          </text>
        ))}

        {/* Bars */}
        {labels.map((_, gi) => {
          if (stacked) {
            let stackY = pad.top + chartH;
            return (
              <g key={gi}>
                {series.map((s, si) => {
                  const val = s.data[gi]?.value ?? 0;
                  const barH = toH(val);
                  const y = stackY - barH;
                  stackY = y;
                  const color = getColor(s, si);
                  const isTop = si === series.length - 1;
                  const isBottom = si === 0;
                  const r = radius;
                  const x = groupX(gi);
                  const w = barGroupW;
                  const h = barH;
                  const path = isTop && isBottom
                    ? `M${x},${y + r} Q${x},${y} ${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} L${x},${y + h} Z`
                    : isTop
                    ? `M${x},${y + r} Q${x},${y} ${x + r},${y} L${x + w - r},${y} Q${x + w},${y} ${x + w},${y + r} L${x + w},${y + h} L${x},${y + h} Z`
                    : `M${x},${y} L${x + w},${y} L${x + w},${y + h} L${x},${y + h} Z`;
                  return <path key={si} d={path} fill={color} />;
                })}
              </g>
            );
          } else {
            return (
              <g key={gi}>
                {series.map((s, si) => {
                  const val = s.data[gi]?.value ?? 0;
                  const barH = toH(val);
                  const x = groupX(gi) + si * barW;
                  const y = toY(val);
                  const color = getColor(s, si);
                  const r = Math.min(radius, barW / 2);
                  return (
                    <path
                      key={si}
                      d={`M${x},${y + r} Q${x},${y} ${x + r},${y} L${x + barW - r},${y} Q${x + barW},${y} ${x + barW},${y + r} L${x + barW},${y + barH} L${x},${y + barH} Z`}
                      fill={color}
                    />
                  );
                })}
              </g>
            );
          }
        })}

        {/* Hover zones */}
        {showTooltip && labels.map((_, i) => (
          <rect key={i} x={groupX(i)} y={pad.top} width={barGroupW} height={chartH}
            fill="transparent" style={{ cursor: "default" }}
            onMouseEnter={() => setTooltip({ x: groupX(i) + barGroupW / 2, y: pad.top, labelIdx: i })} />
        ))}

        {tooltip && (
          <ChartTooltip
            x={clamp(tooltip.x + 8, pad.left, svgW - 180)}
            y={pad.top}
            label={labels[tooltip.labelIdx]}
            items={series.map((s, si) => ({
              name: s.name,
              value: s.data[tooltip.labelIdx]?.value ?? 0,
              color: getColor(s, si),
            }))}
          />
        )}
      </svg>

      {showLegend && series.length > 1 && (
        <div className="flex flex-wrap gap-4 mt-2 justify-center">
          {series.map((s, si) => (
            <div key={si} className="flex items-center gap-1.5" style={labelStyle}>
              <div className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: getColor(s, si) }} />
              <span className="text-muted-foreground">{s.name}</span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

BarChart.displayName = "BarChart";

// ─── DonutChart ───────────────────────────────────────────────────────────────

export function DonutChart({
  data,
  size = 200,
  innerRatio = 0.6,
  centerLabel,
  centerValue,
  showLegend = true,
  showTooltip = true,
  className = "",
}: DonutChartProps) {
  const [hovered, setHovered] = useState<number | null>(null);
  const total = data.reduce((sum, d) => sum + d.value, 0);

  if (total === 0 || data.length === 0) return null;

  const cx = size / 2;
  const cy = size / 2;
  const outerR = size / 2 - 4;
  const innerR = outerR * innerRatio;

  // Build arcs
  let angle = -Math.PI / 2;
  const arcs = data.map((d, i) => {
    const ratio = d.value / total;
    const startAngle = angle;
    const endAngle = angle + ratio * 2 * Math.PI;
    angle = endAngle;

    const x1 = cx + outerR * Math.cos(startAngle);
    const y1 = cy + outerR * Math.sin(startAngle);
    const x2 = cx + outerR * Math.cos(endAngle);
    const y2 = cy + outerR * Math.sin(endAngle);
    const x3 = cx + innerR * Math.cos(endAngle);
    const y3 = cy + innerR * Math.sin(endAngle);
    const x4 = cx + innerR * Math.cos(startAngle);
    const y4 = cy + innerR * Math.sin(startAngle);
    const large = ratio > 0.5 ? 1 : 0;

    const path = [
      `M${x1},${y1}`,
      `A${outerR},${outerR} 0 ${large} 1 ${x2},${y2}`,
      `L${x3},${y3}`,
      `A${innerR},${innerR} 0 ${large} 0 ${x4},${y4}`,
      "Z",
    ].join(" ");

    return { path, color: d.color ?? CHART_COLORS[i % CHART_COLORS.length], ratio, d, i };
  });

  const displayValue = centerValue ?? total.toLocaleString();
  const hoveredItem = hovered !== null ? data[hovered] : null;

  return (
    <div className={`flex items-center gap-6 ${className}`}>
      <div className="relative flex-shrink-0">
        <svg width={size} height={size} viewBox={`0 0 ${size} ${size}`}>
          {arcs.map((arc) => (
            <path
              key={arc.i}
              d={arc.path}
              fill={arc.color}
              opacity={hovered === null || hovered === arc.i ? 1 : 0.4}
              style={{ transition: "opacity 0.15s" }}
              onMouseEnter={() => setHovered(arc.i)}
              onMouseLeave={() => setHovered(null)}
            />
          ))}
          {/* Center text */}
          {innerRatio > 0 && (
            <>
              <text
                x={cx} y={cy - 6}
                textAnchor="middle"
                fill="var(--foreground)"
                style={{ ...labelStyle, fontWeight: "700", fontSize: "18px" }}
              >
                {hoveredItem ? hoveredItem.value.toLocaleString() : displayValue}
              </text>
              {(centerLabel || hoveredItem) && (
                <text
                  x={cx} y={cy + 12}
                  textAnchor="middle"
                  fill="var(--muted-foreground)"
                  style={{ ...labelStyle, fontSize: "var(--text-caption)" }}
                >
                  {hoveredItem ? hoveredItem.label : centerLabel}
                </text>
              )}
            </>
          )}
        </svg>
      </div>

      {/* Legend */}
      {showLegend && (
        <div className="flex flex-col gap-2">
          {data.map((d, i) => (
            <div
              key={i}
              className="flex items-center gap-2 cursor-default"
              style={labelStyle}
              onMouseEnter={() => setHovered(i)}
              onMouseLeave={() => setHovered(null)}
            >
              <div
                className="w-2.5 h-2.5 rounded-sm flex-shrink-0"
                style={{ backgroundColor: d.color ?? CHART_COLORS[i % CHART_COLORS.length] }}
              />
              <span className="text-foreground">{d.label}</span>
              <span className="text-muted-foreground ml-auto pl-4">
                {((d.value / total) * 100).toFixed(1)}%
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

DonutChart.displayName = "DonutChart";

// ─── MiniSparkline ────────────────────────────────────────────────────────────

export function MiniSparkline({
  values,
  type = "line",
  width = 80,
  height = 32,
  color,
  showValue = false,
  trend,
  className = "",
}: MiniSparklineProps) {
  if (!values.length) return null;

  const min = Math.min(...values);
  const max = Math.max(...values);
  const range = max - min || 1;

  const autoTrend: "up" | "down" | "neutral" =
    values[values.length - 1] > values[0]
      ? "up"
      : values[values.length - 1] < values[0]
      ? "down"
      : "neutral";

  const effectiveTrend = trend ?? autoTrend;

  const defaultColor =
    effectiveTrend === "up"
      ? "var(--chart-1, #22c55e)"
      : effectiveTrend === "down"
      ? "var(--chart-4, #ef4444)"
      : "var(--muted-foreground)";

  const effectiveColor = color ?? defaultColor;

  const pad = 2;
  const drawW = width - pad * 2;
  const drawH = height - pad * 2;

  function toX(i: number) { return pad + (i / (values.length - 1 || 1)) * drawW; }
  function toY(v: number) { return pad + drawH - ((v - min) / range) * drawH; }

  if (type === "bar") {
    const barW = drawW / values.length - 1;
    return (
      <div className={`inline-flex items-center gap-1.5 ${className}`}>
        <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
          {values.map((v, i) => {
            const bH = ((v - min) / range) * drawH;
            return (
              <rect
                key={i}
                x={pad + i * (drawW / values.length)}
                y={pad + drawH - bH}
                width={barW}
                height={bH}
                fill={effectiveColor}
                rx={1}
                opacity={i === values.length - 1 ? 1 : 0.5}
              />
            );
          })}
        </svg>
        {showValue && (
          <span style={{ ...labelStyle, color: effectiveColor }}>
            {values[values.length - 1].toLocaleString()}
          </span>
        )}
      </div>
    );
  }

  const pts: [number, number][] = values.map((v, i) => [toX(i), toY(v)]);
  const linePath = buildLinePath(pts, false);
  const areaPath = linePath + ` L${pts[pts.length - 1][0]},${pad + drawH} L${pts[0][0]},${pad + drawH} Z`;

  return (
    <div className={`inline-flex items-center gap-1.5 ${className}`}>
      <svg width={width} height={height} viewBox={`0 0 ${width} ${height}`}>
        {type === "area" && (
          <path d={areaPath} fill={effectiveColor} fillOpacity={0.15} />
        )}
        <path d={linePath} fill="none" stroke={effectiveColor} strokeWidth={1.5} strokeLinecap="round" />
        <circle cx={pts[pts.length - 1][0]} cy={pts[pts.length - 1][1]} r={2} fill={effectiveColor} />
      </svg>
      {showValue && (
        <span style={{ ...labelStyle, color: effectiveColor }}>
          {values[values.length - 1].toLocaleString()}
        </span>
      )}
    </div>
  );
}

MiniSparkline.displayName = "MiniSparkline";
