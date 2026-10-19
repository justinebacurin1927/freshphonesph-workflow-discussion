import type {
	DesignSystem,
	Page,
	SlideMeta,
	SlideTransition,
} from "@open-slide/core";
import {
	createContext,
	useContext,
	useEffect,
	useRef,
	useState,
	type ReactNode,
} from "react";
import { createPortal } from "react-dom";
import content from "./assets/content.json";
import freshPhonesLogo from "./assets/fresh-phones-logo.png";
import desktopOverview from "./assets/prototype-desktop-overview.png";
import desktopSupport from "./assets/prototype-desktop-support.png";
import desktopDocuments from "./assets/prototype-desktop-documents.png";
import mobileOverview from "./assets/prototype-overview.png";
import mobileSupport from "./assets/prototype-support.png";
import mobileDocuments from "./assets/prototype-documents.png";
import "./assets/deck.css";

export const meta: SlideMeta = {
	title: "Fresh Phones PH — Workflow alignment",
	createdAt: "2026-10-19T03:55:16.793Z",
};

export const design: DesignSystem = {
	palette: { bg: "#F4F7F3", text: "#042329", accent: "#008C5E" },
	fonts: {
		display: '"Fresh Sora", sans-serif',
		body: '"Fresh DM Sans", sans-serif',
	},
	typeScale: { hero: 112, body: 32 },
	radius: 18,
};

export const transition: SlideTransition = {
	duration: 240,
	enter: {
		easing: "cubic-bezier(0, 0, 0.2, 1)",
		keyframes: [{ opacity: 0 }, { opacity: 1 }],
	},
};

type Slide = {
	id: string;
	chapter: string;
	type: string;
	status: string;
	eyebrow: string;
	title: string;
	summary: string;
	notes: string;
	source: string;
	callout?: string;
	items?: (string | string[])[][];
	steps?: string[] | string[][];
	rows?: string[][];
	left?: { label: string; title: string; items: string[] };
	right?: { label: string; title: string; items: string[] };
	stages?: { title: string; role: string; detail: string; result: string }[];
};
const slides = content.slides as unknown as Slide[];
export const notes: (string | undefined)[] = [
  "Open with the purpose: demonstrate the working foundation, confirm the client operating model, and agree the revision backlog. The earlier prototype was built around the previous scope; the supplied workflow and Organizational Structure V4 add specific roles and handoffs. This is a discussion proposal, not a production acceptance record. No new cost or delivery-date commitment is made by this presentation.",
  "These are code and repository-documentation findings as of 18 October 2026. They do not claim a fresh end-to-end runtime test, signed UAT, or production readiness. The active local project is freshphonesph-main-run; the freshphonesph path points to it. Keep existing useful features while aligning roles, states, and approvals.",
  "Desktop screenshots capture the current local Next.js portal interface at 1600×1000 in October 2026, rendered with isolated illustrative API responses for the presentation. They demonstrate interface layout, not a live financial transaction or backend acceptance test. Mobile screenshots are the existing recorded 27 September 2026 synthetic-account captures. Both use sample figures, not company collections. Choose a screen-size view or click a capture to enlarge it.",
  "Use only synthetic or explicitly approved demo records. Rehearse before the meeting and retain screenshots as a fallback. The current prototype permits Owner/Finance verification, which differs from V4. Explain this when showing the payment screen. This presentation does not launch or control the live operational system.",
  "The supplied documents keep Facebook and Messenger as the primary communication channels. V4 allows manual cross-checks against official GCs; it does not require a Messenger API or automated chat import. Customer application and purchasing depth remains to be confirmed against the existing scope.",
  "Arrows run from supervisor to direct report. CEO → COO. The COO directly supervises Batch Manager, HR & Payroll, Records & Monitoring, Finance, KPI, Operations Coordinator & Moderator, and CSR. Batch Handlers report to Batch Manager. Pioneer Agents report to Operations Coordinator & Moderator, and Agents report through Pioneer Agents. Roles are not headcounts. Technical administration is a separate access function, not an extra business position inferred from the PDF.",
  "The DOCX specifies recruitment → orientation → training → enrollment → start working. V4 assigns personnel enrollment and authorized roles to HR. The prototype currently reserves ACCOUNT_MANAGE for Owner, so this is an access-policy change. Confirm the personnel approver and role-assignment limits; avoid granting HR unrestricted technical administration.",
  "Eight confirmed prospective members trigger a unique Batch ID before official enrollment. Do not treat eight as the stated total batch capacity or as automatic activation. The Batch Manager enrolls approved members and adds them to the official GC. Confirm final membership approval authority, capacity, requirement checks, withdrawals, replacements, and enrollment after activation.",
  "The current createClient service generates schedules during enrollment. updateBatch prevents changing terms when schedules exist. The client documents say the batch officially starts after readiness. A draft schedule versus issued schedule is a proposed design option, not a confirmed client requirement. Confirm date and schedule policy before changing data structures.",
  "Payment and receipt sharing remain external. V4 presents Records → Batch Manager → Finance. The DOCX automation section also mentions a Finance task on receipt upload. Confirm whether Finance may inspect receipts early while final verification remains gated. Current code goes directly from Pending to Owner/Finance decision and lacks separate operational review stages. The stage interaction is explanatory and writes no payment data.",
  "The state wording and return paths are proposals for client validation. Separate operational review from financial status rather than treating a generic approved flag as verification. Existing append-only financial adjustments can be reused. Revisions to amount, member, or reference should invalidate dependent reviews according to agreed rules. Define the submission/receipt completeness gate and who handles returned claims.",
  "Current contracts grant OWNER every permission; CORE_HANDLER only reads assigned batches and clients; HR lacks ACCOUNT_MANAGE; RECORDS has CLIENT_MANAGE; ANALYTICS has report visibility but no KPI evaluation role. Customer Service Head/Team mapping to CSR also needs confirmation. These are proposed mappings, not an instruction to silently rename existing accounts.",
  "The current Agent model is a directory entry with name, code, active flag, and batch associations; it has no login linkage or Pioneer/Coordinator hierarchy. Current recruitment includes careers/job applicants, which is not the same entity as a prospective Paluwagan member. Add supervisor and recruiter ownership without exposing unrelated customer records.",
  "The current Client belongs to one Batch and has one optional linked account. If customers can join multiple batches, distinguish a person/account from individual memberships. The current Batch has one optional Handler and one Agent, but no assigned Batch Manager, capacity, prospect-confirmation model, or GC confirmation fields. The proposed fields should be minimized to the agreed operational need.",
  "Existing generic tasks, notifications, durable email outboxes, and workers can support the revision. Payment review needs domain-specific routing, not only manually assigned employee tasks. Current staff payment scope is broad; add batch-level restrictions before granting Handler payment permissions. Reassignment and role changes should immediately remove obsolete access. No Messenger bot or automatic GC import is assumed.",
  "V4 calls for payroll preparation and commission records, but the existing scope excludes a full payroll engine. The DOCX mentions product purchases while existing scope excludes online checkout. Neither requires silently adding an entire payroll or commerce product. Device release, delivery, and roulette rules need client detail. Assistive AI remains deferred in the current repository and is not part of this alignment priority.",
  "Avoid changing only role names or screen labels. Update schema, services, permissions, forms, reports, exports, background jobs, live-event access, tests, and documentation together. Preserve historical decision attribution; do not fabricate operational approvals for old records. Client policies and production provisioning remain separate acceptance work.",
  "This is a dependency order, not a replacement for the previously discussed calendar window and not a new commitment to dates or cost. Keep a stable prototype version for demonstration while implementing changes in isolated branches. Agree acceptance criteria per slice and review with actual role holders before proceeding to release.",
  "These are intended outcomes, not measured improvements or guarantees. Do not promise percentage reductions or faster collection without a baseline. Agree practical indicators such as review aging, unresolved discrepancies, incomplete batches, and reconciliation exceptions after the client confirms definitions.",
  "These are proposed acceptance criteria. Named representatives from Records, Batch Management, Finance, HR, recruitment coordination, CSR, and management should validate their flows. Test permissions directly through the API as well as the interface. Rehearse private file access, failed/retried routing, concurrent decisions, reassignment, backup/restore, and financial reconciliation.",
  "Do not assume silence is confirmation. For each open item, capture the decision, accountable person, and any example or policy the team must supply. The browser-local decision log provides a discussion aid; exported notes should be reviewed before being treated as approved requirements. The questions come from gaps in the documents, not a claim that the business has no existing policies.",
  "Close by reading the decisions back to the client and identifying unresolved questions with owners. Reconcile the new operating requirements with the earlier scope, then update the approved delivery plan. Save exported decision notes with the project record. The prototype remains useful as the reference for what already exists.",
  "This inventory groups all major areas from the preceding assessment. Cross-cutting work includes API access, private files, validation, audit history, job idempotency, report/export scoping, documentation, schema migrations, session/access revocation, and production provisioning. Detailed scope expansion such as full checkout or a payroll engine needs its own agreement.",
  "Primary references: both supplied client files. Implementation references: packages/contracts/src/index.ts; apps/api-ts/prisma/schema.prisma; src/records/records.service.ts and scope.ts; src/finance/finance.service.ts; docs/BUILD_STATUS.md; docs/36-scope-handoff.md; docs/08-commercials-boundaries.md. Current code includes uncommitted work and is not a claim about the latest remote deployment. Desktop screenshots render the actual local portal components with isolated illustrative API responses; mobile captures come from docs/uat/customer-mobile-walkthrough-2026-09-27.md. No operational backend acceptance or real financial transaction was performed for these captures.",
];
const labels: Record<string, string> = {
	existing: "Existing prototype",
	documented: "Client workflow",
	proposed: "Proposed design",
	decision: "Client decision",
	expected: "Expected outcome",
	discussion: "Discussion",
	reference: "Reference",
};
const Emphasis = createContext<string[]>([]);

function Text({ value }: { value: string }) {
	const phrases = useContext(Emphasis);
	if (!phrases.length) return <>{value}</>;
	const pattern = phrases
		.slice()
		.sort((a, b) => b.length - a.length)
		.map((phrase) => phrase.replace(/[.*+?^${}()|[\]\\]/g, "\\$&"))
		.join("|");
	const parts = value.split(
		new RegExp(`(?<![\\w])(${pattern})(?![\\w])`, "gi"),
	);
	return (
		<>
			{parts.map((part, index) =>
				index % 2 ? <strong key={index}>{part}</strong> : part,
			)}
		</>
	);
}

function Card({
	title,
	children,
	number,
}: {
	title: string;
	children: ReactNode;
	number?: string;
}) {
	return (
		<article className="fp-card">
			{number && <span className="fp-number">{number}</span>}
			<h3>
				<Text value={title} />
			</h3>
			<div className="fp-card-copy">{children}</div>
		</article>
	);
}

function Grid({
	slide,
	columns = 3,
	numbered = false,
}: {
	slide: Slide;
	columns?: number;
	numbered?: boolean;
}) {
	return (
		<div className={`fp-grid fp-cols-${columns}`}>
			{slide.items?.map((item, index) => (
				<Card
					key={index}
					title={String(item[0])}
					number={numbered ? String(index + 1).padStart(2, "0") : undefined}
				>
					<p>
						<Text value={String(item[1])} />
					</p>
				</Card>
			))}
		</div>
	);
}

function Cover({ slide }: { slide: Slide }) {
	return (
		<div className="fp-cover-layout">
			<div className="fp-cover-copy">
				<span className="fp-kicker">FRESH PHONES PH / THE NEXT CHAPTER</span>
				<h1>
					From prototype.
					<br />
					To <em>aligned</em>
					<br />
					operations.
				</h1>
				<p>{slide.summary}</p>
				<div className="fp-cover-chapters">
					{content.chapters.slice(0, 4).map((chapter) => (
						<span key={chapter.id}>
							{chapter.number} / {chapter.title}
						</span>
					))}
				</div>
			</div>
			<div className="fp-cover-model">
				<span className="fp-kicker">THE OPERATING MODEL ↗</span>
				{[
					[
						"01",
						"THE FOUNDATION",
						"The prototype",
						"Working tools. A starting point.",
					],
					[
						"02",
						"THE DIRECTION",
						"The client workflow",
						"Real roles. Clear handoffs.",
					],
					[
						"03",
						"THE OUTCOME",
						"Aligned operations",
						"One shared operating model.",
					],
				].map(([number, label, title, description], index) => (
					<div key={number} className={`fp-model-step fp-model-${index}`}>
						<span>{number}</span>
						<div>
							<small>{label}</small>
							<h3>{title}</h3>
							<p>{description}</p>
						</div>
					</div>
				))}
				<span className="fp-model-caption">
					CONNECT THE TOOLS TO THE WAY THE TEAM WORKS.
				</span>
			</div>
		</div>
	);
}

function Organization() {
	const branches = [
		["Batch Manager", "Batch Handlers"],
		["HR & Payroll Officer"],
		["Records & Monitoring Officer"],
		["Finance Officer"],
		["KPI Officer"],
		["Operations Coordinator & Moderator", "Pioneer Agents", "Agents"],
		["Customer Service Representative (CSR)"],
	];
	return (
		<div className="fp-org">
			<div className="fp-org-trunk">
				<div>
					Chief Executive Officer <b>CEO</b>
				</div>
				<span>↓</span>
				<div>
					Chief Operating Officer <b>COO</b>
				</div>
			</div>
			<div className="fp-org-branches">
				{branches.map((branch) => (
					<div className="fp-org-branch" key={branch[0]}>
						{branch.map((role, index) => (
							<div key={role} className={index ? "fp-org-team" : ""}>
								{role}
							</div>
						))}
					</div>
				))}
			</div>
			<p className="fp-org-caption">
				Supervisor → direct report <span>Role categories, not headcounts</span>
			</p>
		</div>
	);
}

function Flow({ slide }: { slide: Slide }) {
	const rows = slide.steps as string[][];
	return (
		<div className={`fp-flow fp-flow-${rows.length}`}>
			{rows.map((row, index) => {
				const numbered = row.length === 3;
				const membership = slide.type === "memberJourney";
				return (
					<article
						key={index}
						className={membership && index === 1 ? "fp-threshold" : ""}
					>
						<span className="fp-number">
							{membership && index === 1
								? "8"
								: numbered
									? row[0]
									: String(index + 1).padStart(2, "0")}
						</span>
						{membership && <small>{row[0]}</small>}
						<h3>
							<Text value={membership ? row[1] : numbered ? row[1] : row[0]} />
						</h3>
						{!membership && (
							<p>
								<Text value={numbered ? row[2] : row[1]} />
							</p>
						)}
					</article>
				);
			})}
		</div>
	);
}

function PaymentFlow({ slide }: { slide: Slide }) {
	const [index, setIndex] = useState(0);
	const stages = slide.stages!;
	return (
		<div className="fp-payment">
			<div className="fp-current">
				<small>PROTOTYPE TODAY</small>
				<p>
					Authorized staff records <b>→</b> Pending <b>→</b> Owner / Finance
					decision
				</p>
			</div>
			<span className="fp-kicker">V4 WORKFLOW TO IMPLEMENT</span>
			<div
				className="fp-payment-stages"
				role="group"
				aria-label="Payment workflow stages"
			>
				{stages.map((stage, i) => (
					<button
						type="button"
						key={stage.title}
						aria-pressed={index === i}
						onClick={() => setIndex(i)}
					>
						<span className="fp-number">0{i + 1}</span>
						<strong>{stage.title}</strong>
						<small>{stage.role}</small>
					</button>
				))}
			</div>
			<div className="fp-stage-detail" aria-live="polite">
				<div>
					<small>{stages[index].role}</small>
					<p>
						<Text value={stages[index].detail} />
					</p>
				</div>
				<div>
					<small>OUTPUT</small>
					<p>
						<Text value={stages[index].result} />
					</p>
				</div>
			</div>
		</div>
	);
}

function Modal({
	title,
	onClose,
	children,
	wide = false,
}: {
	title: string;
	onClose: () => void;
	children: ReactNode;
	wide?: boolean;
}) {
	const ref = useRef<HTMLDialogElement>(null);
	useEffect(() => {
		const dialog = ref.current!;
		dialog.showModal();
		return () => dialog.close();
	}, []);
	return createPortal(
		<dialog
			ref={ref}
			className={`fp-dialog ${wide ? "fp-dialog-wide" : ""}`}
			aria-label={title}
			onClose={onClose}
			onCancel={(event) => {
				event.preventDefault();
				event.stopPropagation();
				onClose();
			}}
			onKeyDown={(event) => event.stopPropagation()}
			onClick={(event) => {
				if (event.target === event.currentTarget) onClose();
			}}
		>
			<header>
				<div>
					<small>FRESH PHONES PH / WORKFLOW DISCUSSION</small>
					<h2>{title}</h2>
				</div>
				<button type="button" onClick={onClose} aria-label={`Close ${title}`}>
					Close ×
				</button>
			</header>
			{children}
		</dialog>,
		document.fullscreenElement ?? document.body,
	);
}

const captures = [
	{ label: "Overview", desktop: desktopOverview, mobile: mobileOverview },
	{ label: "Support", desktop: desktopSupport, mobile: mobileSupport },
	{ label: "Documents", desktop: desktopDocuments, mobile: mobileDocuments },
];

function Prototype({ slide }: { slide: Slide }) {
	const [index, setIndex] = useState(0);
	const [device, setDevice] = useState("both");
	const [enlarged, setEnlarged] = useState<"desktop" | "mobile" | null>(null);
	const capture = captures[index];
	return (
		<div className="fp-prototype">
			<div className="fp-prototype-copy">
				{slide.items?.map(([title, description]) => (
					<div key={String(title)}>
						<h3>{title}</h3>
						<p>
							<Text value={String(description)} />
						</p>
					</div>
				))}
				<p className="fp-provenance">
					Desktop: October 2026, illustrative data.
					<br />
					Mobile: 27 September 2026, synthetic account.
				</p>
			</div>
			<div className={`fp-gallery fp-device-${device}`}>
				<div className="fp-gallery-tools">
					<div role="group" aria-label="Prototype screen">
						{captures.map((item, i) => (
							<button
								type="button"
								key={item.label}
								aria-pressed={index === i}
								onClick={() => setIndex(i)}
							>
								{item.label}
							</button>
						))}
					</div>
					<div role="group" aria-label="Screen size">
						{["desktop", "mobile", "both"].map((item) => (
							<button
								type="button"
								key={item}
								aria-pressed={device === item}
								onClick={() => setDevice(item)}
							>
								{item}
							</button>
						))}
					</div>
				</div>
				<div className="fp-devices">
					{device !== "mobile" && (
						<button
							className="fp-desktop"
							type="button"
							onClick={() => setEnlarged("desktop")}
							aria-label="Enlarge desktop prototype"
						>
							<span>DESKTOP / {capture.label} ↗</span>
							<img
								src={capture.desktop}
								alt={`Desktop customer portal ${capture.label.toLowerCase()} with illustrative data`}
							/>
						</button>
					)}
					{device !== "desktop" && (
						<button
							className="fp-mobile"
							type="button"
							onClick={() => setEnlarged("mobile")}
							aria-label="Enlarge mobile prototype"
						>
							<span>MOBILE ↗</span>
							<img
								src={capture.mobile}
								alt={`Earlier synthetic-account mobile ${capture.label.toLowerCase()}`}
							/>
						</button>
					)}
				</div>
			</div>
			{enlarged && (
				<Modal
					title={`${enlarged === "desktop" ? "Desktop" : "Mobile"} prototype — ${capture.label}`}
					onClose={() => setEnlarged(null)}
					wide
				>
					<img
						className="fp-enlarged"
						src={capture[enlarged]}
						alt={`Enlarged ${enlarged} ${capture.label} prototype`}
					/>
					<p>
						Desktop: current interface with illustrative data, October 2026.
						Mobile: recorded synthetic account, September 2026.
					</p>
				</Modal>
			)}
		</div>
	);
}

const storageKey = "freshphonesph-workflow-decisions-v1";
const decisionLabels: Record<string, string> = {
	discuss: "To discuss",
	confirmed: "Confirmed",
	revise: "Needs revision",
	later: "Later",
};
type DecisionData = Record<string, { status: string; note: string }>;

function readDecisions(): { data: DecisionData; saved: boolean } {
	try {
		const raw = JSON.parse(localStorage.getItem(storageKey) || "{}");
		const data: DecisionData = {};
		if (raw && typeof raw === "object" && !Array.isArray(raw))
			for (const decision of content.decisions) {
				const entry = raw[decision.id];
				if (entry && typeof entry === "object")
					data[decision.id] = {
						status: Object.hasOwn(decisionLabels, entry.status)
							? entry.status
							: "discuss",
						note:
							typeof entry.note === "string" ? entry.note.slice(0, 5000) : "",
					};
			}
		return { data, saved: true };
	} catch {
		return { data: {}, saved: false };
	}
}

function exportDecisions(data = readDecisions().data) {
	const lines = [
		"# Fresh Phones PH workflow discussion",
		"",
		`Exported: ${new Date().toISOString()}`,
		"",
		"Discussion notes for review. These notes do not constitute signed acceptance.",
		"",
	];
	for (const decision of content.decisions) {
		const entry = data[decision.id];
		lines.push(
			`## ${decision.title}`,
			"",
			decision.question,
			"",
			`Status: ${decisionLabels[entry?.status] ?? "To discuss"}`,
			"",
			entry?.note.trim() || "No decision recorded.",
			"",
		);
	}
	const url = URL.createObjectURL(
		new Blob([lines.join("\n")], { type: "text/markdown;charset=utf-8" }),
	);
	const link = document.createElement("a");
	link.href = url;
	link.download = `FreshPhonesPH-discussion-${new Date().toISOString().slice(0, 10)}.md`;
	link.click();
	setTimeout(() => URL.revokeObjectURL(url), 1000);
}

function DecisionLog({ onClose }: { onClose: () => void }) {
	const [state, setState] = useState(readDecisions);
	function update(id: string, field: "status" | "note", value: string) {
		const entry = state.data[id] ?? { status: "discuss", note: "" };
		const data = { ...state.data, [id]: { ...entry, [field]: value } };
		let saved = true;
		try {
			localStorage.setItem(storageKey, JSON.stringify(data));
		} catch {
			saved = false;
		}
		setState({ data, saved });
	}
	const recorded = Object.values(state.data).filter(
		(entry) => entry.note.trim() || entry.status !== "discuss",
	).length;
	return (
		<Modal title="Decision log" onClose={onClose}>
			<p>
				Record the client’s answers. Notes stay in this browser; export a copy
				to share with the team. These notes do not constitute signed acceptance.
			</p>
			<p role="status" className="fp-save-status">
				{state.saved
					? "Saved on this browser. Export a copy before changing devices."
					: "Browser storage is unavailable. Keep this dialog open and export your notes."}
			</p>
			<div className="fp-decision-fields">
				{content.decisions.map((decision, i) => (
					<section key={decision.id}>
						<div className="fp-decision-heading">
							<h3>
								{String(i + 1).padStart(2, "0")} / {decision.title}
							</h3>
							<select
								aria-label={`${decision.title} status`}
								value={state.data[decision.id]?.status ?? "discuss"}
								onChange={(event) =>
									update(decision.id, "status", event.target.value)
								}
							>
								{Object.entries(decisionLabels).map(([value, label]) => (
									<option key={value} value={value}>
										{label}
									</option>
								))}
							</select>
						</div>
						<p>{decision.question}</p>
						<textarea
							rows={2}
							maxLength={5000}
							aria-label={`${decision.title}: decision, owner, and follow-up`}
							placeholder="Decision, owner, and follow-up…"
							value={state.data[decision.id]?.note ?? ""}
							onChange={(event) =>
								update(decision.id, "note", event.target.value)
							}
						/>
					</section>
				))}
			</div>
			<footer>
				<span>
					{recorded} of {content.decisions.length} decisions recorded
				</span>
				<button type="button" onClick={() => exportDecisions(state.data)}>
					Export notes ↓
				</button>
			</footer>
		</Modal>
	);
}

function Body({ slide }: { slide: Slide }) {
	switch (slide.type) {
		case "cover":
			return <Cover slide={slide} />;
		case "prototype":
			return <Prototype slide={slide} />;
		case "foundation":
			return (
				<div className="fp-grid fp-cols-3">
					{slide.items?.map(([icon, title, description], i) => (
						<Card key={String(icon)} title={String(title)} number={`0${i + 1}`}>
							<p>
								<Text value={String(description)} />
							</p>
						</Card>
					))}
				</div>
			);
		case "channels":
			return (
				<div className="fp-grid fp-cols-3 fp-channels">
					{slide.items?.map(([, title, subtitle, bullets], i) => (
						<Card
							key={String(title)}
							title={String(title)}
							number={`0${i + 1}`}
						>
							<small>{subtitle}</small>
							<ul>
								{(bullets as string[]).map((item) => (
									<li key={item}>
										<Text value={item} />
									</li>
								))}
							</ul>
						</Card>
					))}
				</div>
			);
		case "organization":
			return <Organization />;
		case "demo":
		case "memberJourney":
		case "delivery":
			return <Flow slide={slide} />;
		case "onboarding":
			return (
				<>
					<Flow slide={slide} />
					<Grid slide={slide} columns={2} />
				</>
			);
		case "comparison":
			return (
				<div className="fp-grid fp-cols-2 fp-comparison">
					{[slide.left!, slide.right!].map((panel) => (
						<article key={panel.label}>
							<small>{panel.label}</small>
							<h3>{panel.title}</h3>
							<ul>
								{panel.items.map((item) => (
									<li key={item}>
										<Text value={item} />
									</li>
								))}
							</ul>
						</article>
					))}
				</div>
			);
		case "paymentFlow":
			return <PaymentFlow slide={slide} />;
		case "states":
			return (
				<>
					<div className="fp-state-flow">
						{(slide.steps as string[]).map((item, i) => (
							<div key={item}>
								<span>{i === 3 ? "✓" : `0${i + 1}`}</span>
								{item}
							</div>
						))}
					</div>
					<Grid slide={slide} columns={3} />
				</>
			);
		case "roles":
			return (
				<div className="fp-roles" role="table" aria-label="Role alignment">
					<div className="fp-role-head" role="row">
						<span role="columnheader">PROTOTYPE ROLE</span>
						<span role="columnheader">V4 ROLE</span>
						<span role="columnheader">ALIGNMENT NEEDED</span>
					</div>
					{slide.rows?.map(([before, after, change]) => (
						<div role="row" key={before}>
							<span role="cell">{before}</span>
							<strong role="cell">{after}</strong>
							<p role="cell">
								<Text value={change} />
							</p>
						</div>
					))}
				</div>
			);
		case "workspaces":
		case "next":
			return (
				<div className={`fp-grid fp-cols-${slide.type === "next" ? 2 : 3}`}>
					{slide.items?.map(([number, title, description]) => (
						<Card
							key={String(number)}
							number={String(number)}
							title={String(title)}
						>
							<p>
								<Text value={String(description)} />
							</p>
						</Card>
					))}
				</div>
			);
		case "coreRecords":
		case "supporting":
			return <Grid slide={slide} columns={2} numbered />;
		case "implementation":
		case "acceptance":
		case "discussion":
			return <Grid slide={slide} numbered />;
		case "automation":
			return (
				<div className="fp-automation">
					{slide.items?.map(([title, description], i) => (
						<article key={String(title)}>
							<span className="fp-number">0{i + 1}</span>
							<h3>{title}</h3>
							<p>
								<Text value={String(description)} />
							</p>
							<b>↗</b>
						</article>
					))}
				</div>
			);
		case "outcomes":
			return (
				<div className="fp-grid fp-cols-2 fp-outcomes">
					{slide.items?.map(([title, description, evidence], i) => (
						<Card
							key={String(title)}
							title={String(title)}
							number={`0${i + 1}`}
						>
							<p>
								<Text value={String(description)} />
							</p>
							<div className="fp-evidence">
								<small>DEMONSTRATE IT</small>
								<p>
									<Text value={String(evidence)} />
								</p>
							</div>
						</Card>
					))}
				</div>
			);
		case "backlog":
			return <Grid slide={slide} columns={4} numbered />;
		case "sources":
			return (
				<div className="fp-sources">
					{slide.items?.map(([title, name, description], i) => (
						<article key={String(title)}>
							<span className="fp-number">0{i + 1}</span>
							<div>
								<h3>{title}</h3>
								<code>{name}</code>
								<p>{description}</p>
							</div>
						</article>
					))}
				</div>
			);
		default:
			return null;
	}
}

function DeckPage({ slide, number }: { slide: Slide; number: number }) {
	const [decisionOpen, setDecisionOpen] = useState(false);
	const chapter = content.chapters.find((item) => item.id === slide.chapter)!;
	const emphasis =
		(content as typeof content & { emphasis?: Record<string, string[]> })
			.emphasis?.[slide.id] ?? [];
	const dark = ["cover", "next", "outcomes"].includes(slide.type);
	return (
		<Emphasis.Provider value={emphasis}>
			<section
				className={`fp-page fp-type-${slide.type}${dark ? " fp-dark" : ""}`}
				data-slide-id={slide.id}
				aria-label={`Slide ${number}: ${slide.title}`}
			>
				<div className="fp-topline">
					<span className="fp-brand">
						<span className="fp-brand-logo">
							<img src={freshPhonesLogo} alt="Fresh Phones PH logo" />
						</span>
						<span className="fp-chapter-label">
							{" "}
							/ {chapter.number} {chapter.title}
						</span>
					</span>
					<span className={`fp-status fp-status-${slide.status}`}>
						{labels[slide.status]}
					</span>
				</div>
				{slide.type !== "cover" && (
					<header className="fp-heading">
						<span className="fp-kicker">{slide.eyebrow}</span>
						<h1>
							<Text value={slide.title} />
						</h1>
						<p>
							<Text value={slide.summary} />
						</p>
					</header>
				)}
				<div className="fp-body">
					<Body slide={slide} />
				</div>
				{slide.callout && (
					<p className="fp-callout">
						<Text value={slide.callout} />
					</p>
				)}
				{["discussion", "next"].includes(slide.type) && (
					<div className="fp-discussion-actions">
						<button type="button" onClick={() => setDecisionOpen(true)}>
							Open the decision log ↗
						</button>
						<button type="button" onClick={() => exportDecisions()}>
							Export discussion notes ↓
						</button>
					</div>
				)}
				<footer className="fp-footer">
					<span>{slide.source}</span>
					<span>
						{String(number).padStart(2, "0")} / {slides.length}
					</span>
				</footer>
				{decisionOpen && <DecisionLog onClose={() => setDecisionOpen(false)} />}
			</section>
		</Emphasis.Provider>
	);
}

const Start: Page = () => <DeckPage slide={slides[0]} number={1} />;
const Today: Page = () => <DeckPage slide={slides[1]} number={2} />;
const Screens: Page = () => <DeckPage slide={slides[2]} number={3} />;
const Demo: Page = () => <DeckPage slide={slides[3]} number={4} />;
const OperatingModel: Page = () => <DeckPage slide={slides[4]} number={5} />;
const OrganizationPage: Page = () => <DeckPage slide={slides[5]} number={6} />;
const Onboarding: Page = () => <DeckPage slide={slides[6]} number={7} />;
const MemberJourney: Page = () => <DeckPage slide={slides[7]} number={8} />;
const BatchReadiness: Page = () => <DeckPage slide={slides[8]} number={9} />;
const Payments: Page = () => <DeckPage slide={slides[9]} number={10} />;
const PaymentExceptions: Page = () => (
	<DeckPage slide={slides[10]} number={11} />
);
const RoleAlignment: Page = () => <DeckPage slide={slides[11]} number={12} />;
const Workspaces: Page = () => <DeckPage slide={slides[12]} number={13} />;
const CoreRecords: Page = () => <DeckPage slide={slides[13]} number={14} />;
const Automation: Page = () => <DeckPage slide={slides[14]} number={15} />;
const SupportingModules: Page = () => (
	<DeckPage slide={slides[15]} number={16} />
);
const Implementation: Page = () => <DeckPage slide={slides[16]} number={17} />;
const Delivery: Page = () => <DeckPage slide={slides[17]} number={18} />;
const Outcomes: Page = () => <DeckPage slide={slides[18]} number={19} />;
const Acceptance: Page = () => <DeckPage slide={slides[19]} number={20} />;
const Discussion: Page = () => <DeckPage slide={slides[20]} number={21} />;
const NextSteps: Page = () => <DeckPage slide={slides[21]} number={22} />;
const Backlog: Page = () => <DeckPage slide={slides[22]} number={23} />;
const Sources: Page = () => <DeckPage slide={slides[23]} number={24} />;

export default [
	Start,
	Today,
	Screens,
	Demo,
	OperatingModel,
	OrganizationPage,
	Onboarding,
	MemberJourney,
	BatchReadiness,
	Payments,
	PaymentExceptions,
	RoleAlignment,
	Workspaces,
	CoreRecords,
	Automation,
	SupportingModules,
	Implementation,
	Delivery,
	Outcomes,
	Acceptance,
	Discussion,
	NextSteps,
	Backlog,
	Sources,
] satisfies Page[];
