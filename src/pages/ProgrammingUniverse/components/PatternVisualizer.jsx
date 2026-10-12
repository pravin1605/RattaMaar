import { useState } from "react";

/** Reusable row-by-row pattern stepper with optional loop-variable trace. */
export default function PatternVisualizer({ rows, variables }) {
  const [visible, setVisible] = useState(1);
  if (!Array.isArray(rows) || rows.length === 0) return null;
  const total = rows.length;
  const clamp = (value) => Math.max(1, Math.min(value, total));
  return (
    <section className="pu-pattern-visualizer">
      <div className="pu-pattern-visualizer-head">
        <div><span className="pu-eyebrow">PATTERN VISUALIZER</span><h3>Watch the output build row by row</h3></div>
        <span>{visible} / {total} rows</span>
      </div>
      <pre className="pu-pattern-output">{rows.slice(0, visible).join("\n") || "Press Step to reveal the first row"}</pre>
      {Array.isArray(variables) && variables.length > 0 && (
        <div className="pu-pattern-variables">
          <span className="pu-eyebrow">LOOP VARIABLES</span>
          <div className="pu-pattern-var-rows">{variables.slice(0, visible).map((row, index) => <div key={index} className={index < visible ? "shown" : ""}><b>row {index + 1}</b><code>{row}</code></div>)}</div>
        </div>
      )}
      <div className="pu-pattern-controls">
        <button className="pu-secondary-btn" onClick={() => setVisible(1)} disabled={visible <= 1}>Reset</button>
        <button className="pu-secondary-btn" onClick={() => setVisible((v) => clamp(v - 1))} disabled={visible <= 1}>← Row</button>
        <button className="pu-primary-btn" onClick={() => setVisible((v) => clamp(v + 1))} disabled={visible >= total}>Step next row ↗</button>
        <button className="pu-secondary-btn" onClick={() => setVisible(total)} disabled={visible >= total}>Show all</button>
      </div>
      <p className="pu-pattern-note">Trace the row counter and inner loop before answering. The visualizer uses authored sample output; it does not execute Java code.</p>
    </section>
  );
}

/** Step-through trace table for variable tracing and numeric algorithms (Armstrong, primes…). */
export function TraceTable({ trace }) {
  const [visible, setVisible] = useState(3);
  if (!trace || !Array.isArray(trace.columns) || !Array.isArray(trace.rows)) return null;
  const total = trace.rows.length;
  return (
    <section className="pu-trace-panel">
      <div className="pu-trace-head">
        <div><span className="pu-eyebrow">{trace.title || "ITERATION TRACE"}</span><h3>{trace.subtitle || "Every step of the loop, in order"}</h3></div>
        <span>{Math.min(visible, total)} / {total} steps</span>
      </div>
      <div className="pu-trace-scroll">
        <table className="pu-trace-table">
          <thead><tr>{trace.columns.map((column) => <th key={column}>{column}</th>)}</tr></thead>
          <tbody>
            {trace.rows.slice(0, visible).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.cells.map((cell, cellIndex) => <td key={cellIndex}>{String(cell)}</td>)}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {trace.rows.slice(0, visible).map((row, i) => row.note ? <p className="pu-trace-note" key={i}><b>Step {i + 1}:</b> {row.note}</p> : null).filter(Boolean)}
      <div className="pu-trace-controls">
        <button className="pu-secondary-btn" onClick={() => setVisible(3)} disabled={visible <= 3}>Reset</button>
        <button className="pu-primary-btn" onClick={() => setVisible((v) => Math.min(v + 1, total))} disabled={visible >= total}>Next step ↗</button>
        <button className="pu-secondary-btn" onClick={() => setVisible(total)} disabled={visible >= total}>Show all</button>
      </div>
    </section>
  );
}
