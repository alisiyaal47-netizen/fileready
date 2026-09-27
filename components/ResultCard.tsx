import { CheckIcon, CloseIcon } from "@/components/Icons";
import type { PlatformRule } from "@/data/platformRules";
import type { ValidationResult } from "@/lib/validateFile";

export function ResultCard({ result, platform, onBack }: { result: ValidationResult; platform: PlatformRule; onBack: () => void }) {
  const failedChecks = result.checks.filter((check) => check.status === "failed");
  return <section className={`result-card diagnostic-panel ${result.ready ? "result-ready" : "result-failed"}`} aria-labelledby="result-heading" aria-live="polite">
    <div className="result-connection" aria-hidden="true"><span>YOUR FILE</span><i><i /></i><span>{platform.name.toUpperCase()}</span></div>
    <div className="result-top"><span className={`result-emblem ${result.ready ? "success" : "failure"}`}>{result.ready ? <CheckIcon /> : <CloseIcon />}</span><div><span className="overline">{platform.name.toUpperCase()} / {platform.useCase.toUpperCase()}</span><h3 id="result-heading" className={result.ready ? "success-text" : "failure-text"}>{result.ready ? "Ready to Upload" : "Needs a Fix"}</h3><p>{result.ready ? "Meets the checked requirements in this reference profile." : result.firstFailure?.detail}</p></div></div>
    <div className="checks-list" aria-label="Validation results">{result.checks.map((check, index) => <div className={`check-row check-row-${check.status}`} key={check.label} style={{ animationDelay: `${index * .13}s` }}><div className="check-row-header"><span>{check.label === "File size" ? "Size" : check.label === "Resolution" ? "Dimensions" : check.label}</span><span className={`check-status ${check.status}`}>{check.status === "passed" ? "Passed" : check.status === "failed" ? "Failed" : "Not checked"}</span></div><span className="check-rail" aria-hidden="true"><span /></span><small>{check.detail}</small></div>)}</div>
    {failedChecks.length > 0 && <div className="recommendation"><strong>What to do</strong><ul>{failedChecks.map((check) => <li key={check.label}><b>{check.label}:</b> {check.recommendation}</li>)}</ul></div>}
    <p className="result-note">{platform.note} <a href={platform.sourceUrl} target="_blank" rel="noopener noreferrer">View reference ↗</a></p>
    <button type="button" className="button button-outline" onClick={onBack}>Check another destination</button>
  </section>;
}
