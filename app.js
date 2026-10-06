const team = {
  NC: { name: "Nora Chen", role: "Producer", job: "Point person. Scope, schedule, crew and final delivery." },
  LP: { name: "Leo Park", role: "Creative director", job: "Concepts, visual direction and creative quality." },
  AN: { name: "Ari Nguyen", role: "Researcher & scriptwriter", job: "Audience research, hooks, script and claims." },
  MT: { name: "Minh Tran", role: "Camera & lighting", job: "Shot list, lighting and original footage. Shoot 14 October." },
  SR: { name: "Sam Rivera", role: "Editor, sound & color", job: "Main film, six cutdowns, mix and grade." },
  MP: { name: "Maya Patel", role: "Motion designer", job: "Brand animation, product titles and graphics." }
};

const seed = () => ({
  view: "client",
  screen: "home",
  selected: "hero",
  time: 12,
  playing: false,
  version: "v2",
  toast: "",
  modal: null,
  draft: "",
  message: "",
  ai: null,
  files: [
    { name: "Luma product footage", meta: "8 clips · 4.2 GB · ready for editing" },
    { name: "Brand kit", meta: "Logo, type, autumn palette · verified" }
  ],
  messages: [
    { by: "NC", text: "Your team is set. Send footage here or through Files. I coordinate the crew and bring the next decision.", t: "10:32" }
  ],
  deliverables: [
    { id: "hero", name: "Hero film 16:9", version: "v2", status: "needs", owner: "NC", due: "9 Oct", duration: 36, title: "Luma — A daily ritual" },
    { id: "c916", name: "Cut 9:16", version: "v1", status: "progress", owner: "SR", due: "11 Oct", duration: 18, title: "Luma — vertical" },
    { id: "c11", name: "Cut 1:1", version: "v1", status: "approved", owner: "NC", due: "7 Oct", duration: 15, title: "Luma — square" },
    { id: "c45", name: "Cut 4:5", version: "v1", status: "approved", owner: "SR", due: "7 Oct", duration: 15, title: "Luma — feed" },
    { id: "story", name: "Cut 16:9 story", version: "v1", status: "approved", owner: "NC", due: "6 Oct", duration: 30, title: "Luma — story" },
    { id: "macro", name: "Cut product macro", version: "v1", status: "progress", owner: "SR", due: "12 Oct", duration: 12, title: "Luma — macro" },
    { id: "end", name: "End card", version: "v1", status: "delivered", owner: "MP", due: "5 Oct", duration: 4, title: "Luma — end card" }
  ],
  notes: {
    hero: [
      { by: "NC", t: 4, text: "Updated the opening and kept the contrast." },
      { by: "NC", t: 12, text: "Simplified the end card. Ready for your call." }
    ],
    c916: [{ by: "SR", t: 3, text: "Caption safe area checked. Waiting on the hero decision." }],
    c11: [{ by: "NC", t: 2, text: "Approved. This cut is locked." }],
    c45: [{ by: "SR", t: 2, text: "Grade matched to the hero." }],
    story: [{ by: "LP", t: 8, text: "Hook stays. Approved." }],
    macro: [{ by: "MP", t: 1, text: "Title lockup still in progress." }],
    end: [{ by: "MP", t: 0, text: "Delivered with the brand package." }]
  },
  tasks: [
    { id: "dir", col: "done", tag: "Done", title: "Direction & script", body: "Client approved, shot list ready", who: "Leo → Ari" },
    { id: "ingest", col: "done", tag: "Done", title: "Shoot & footage ingest", body: "Coverage checked, originals organized", who: "Minh → Sam" },
    { id: "review", col: "now", tag: "Active", title: "Client review", body: "Hero cut v2 waiting for a decision", who: "Nora" },
    { id: "final", col: "next", tag: "Queued", title: "Final delivery", body: "QC passed and approved version to client package", who: "Nora" }
  ],
  frame: 0,
  line: "",
  shots: [
    { id: "s1", name: "Product hero", frame: "Wide", lens: "35mm", status: "planned", note: "Morning light, label readable", time: "08:30" },
    { id: "s2", name: "Macro label", frame: "Macro", lens: "90mm", status: "planned", note: "luma wordmark, no crop", time: "09:15" },
    { id: "s3", name: "Daily ritual", frame: "Medium", lens: "50mm", status: "planned", note: "Hands, pour, first sip", time: "10:00" },
    { id: "s4", name: "End card plate", frame: "Locked", lens: "35mm", status: "planned", note: "Clean plate for Maya", time: "11:00" }
  ],
  day: [
    { t: "07:30", name: "Call", who: "Nora + Minh" },
    { t: "08:00", name: "Setup", who: "Minh" },
    { t: "08:30", name: "Product hero", who: "Minh" },
    { t: "09:15", name: "Macro label", who: "Minh" },
    { t: "10:00", name: "Daily ritual", who: "Minh" },
    { t: "11:00", name: "End card plate", who: "Minh → Maya" },
    { t: "12:00", name: "Wrap / handoff", who: "Minh → Sam" }
  ],
  script: [
    { kind: "scene", text: "Scene 1 · Kitchen, morning" },
    { kind: "action", text: "The bottle sits in soft side light. No logo animation yet." },
    { kind: "vo", text: "A daily ritual. Less noise." },
    { kind: "scene", text: "Scene 2 · Hands" },
    { kind: "action", text: "Pour. First sip. Label stays readable." },
    { kind: "vo", text: "The bottle stays in frame." }
  ],
  sync: [],
  apps: [
    { id: "drive", name: "Google Drive", state: "connected", job: "Footage intake. Pull a folder, Nora still verifies." },
    { id: "calendar", name: "Google Calendar", state: "connected", job: "Shoot and delivery only. Personal events stay out." },
    { id: "notion", name: "Notion", state: "connected", job: "Brief, rate card, and shot list." },
    { id: "gmail", name: "Gmail", state: "connected", job: "Client update when a cut is approved. Nora sends it." },
    { id: "slack", name: "Slack", state: "connected", job: "Crew handoff ping. Decision stays in Relay." },
    { id: "frame", name: "Frame.io", state: "connected", job: "Export timecoded notes. Approval stays here." }
  ]
});

let state = seed();
let timer = null;

const statusLabel = { needs: "Needs you", progress: "In progress", approved: "Approved", delivered: "Delivered", changes: "Changes" };

function esc(s) {
  return String(s).replace(/&/g, "\u0026amp;").replace(/</g, "\u0026lt;").replace(/"/g, "\u0026quot;");
}
function fmt(t) {
  return String(Math.floor(t / 60)).padStart(2, "0") + ":" + String(t % 60).padStart(2, "0");
}
function current() { return state.deliverables.find((d) => d.id === state.selected); }
function nextAsk() { return state.deliverables.find((d) => d.status === "needs" || d.status === "changes"); }
function setToast(msg) {
  state.toast = msg;
  render();
  setTimeout(() => { if (state.toast === msg) { state.toast = ""; render(); } }, 2400);
}
function approve(id) {
  const d = state.deliverables.find((x) => x.id === id);
  if (!d || d.status === "approved" || d.status === "delivered") return;
  d.status = "approved";
  state.tasks = state.tasks.filter((t) => t.id !== "review" && t.id !== "changes-" + id);
  if (!state.deliverables.some((x) => x.status === "needs" || x.status === "changes")) {
    const review = state.tasks.find((t) => t.id === "review");
    if (review) review.col = "done";
  }
  setToast(d.name + " locked. Other open cuts stay in play.");
}
function requestChanges(id, text) {
  const d = state.deliverables.find((x) => x.id === id);
  if (!d || d.status === "delivered") return;
  d.status = "changes";
  state.notes[id].push({ by: "YOU", t: state.time, text });
  state.tasks = state.tasks.filter((t) => t.id !== "changes-" + id);
  state.tasks.splice(2, 0, { id: "changes-" + id, col: "next", tag: "Queued", title: "Version changes · " + d.name, body: text, who: "Sam → Nora" });
  state.modal = null;
  setToast("Change request is a handoff. Sam owns the next cut.");
}
function addNote() {
  if (!state.draft.trim()) return;
  state.notes[current().id].push({ by: "YOU", t: state.time, text: state.draft.trim() });
  state.draft = "";
  render();
}
function sendMessage() {
  if (!state.message.trim()) return;
  state.messages.push({ by: "YOU", text: state.message.trim(), t: "now" });
  state.message = "";
  setToast("Sent to Nora. No agent replies.");
}
function runAi() {
  const approved = state.deliverables.filter((d) => d.status === "approved" || d.status === "delivered");
  state.ai = approved.map((d) => d.name + ": A daily ritual. Less noise. The bottle stays in frame.");
  setToast("Caption draft ran once, on the cuts you already approved.");
}

function pullDrive() {
  const incoming = [
    { name: "Drive · Barber Portfolio", meta: "IG screenshots folder · waiting on Nora" },
    { name: "Drive · Agency", meta: "Shared folder · waiting on Nora" }
  ];
  incoming.forEach((f) => { if (!state.files.some((x) => x.name === f.name)) state.files.push(f); });
  state.sync.unshift("Drive pulled 2 folders into Files. Nora verifies before Sam.");
  setToast("Drive folders are in Files. Not assigned to the editor yet.");
}
function stageCalendar() {
  state.sync.unshift("Calendar staged: Luma shoot 14 Oct, delivery 21 Oct. Not written yet.");
  setToast("Shoot and delivery are staged. Say the word and I write them to Calendar.");
}
function linkNotion() {
  state.sync.unshift("Notion linked: Nham Media, Video content, Video Production Rate Card.");
  setToast("Notion brief linked. Rate card stays the source for scope.");
}
function stageMail() {
  state.messages.push({ by: "NC", text: "Draft ready for Gmail: hero cut v2 is waiting on your decision. I have not sent it.", t: "now" });
  state.sync.unshift("Gmail draft staged. Nora sends it. Nothing left the project.");
  setToast("Client update drafted. Not sent.");
}
function postSlack() {
  const ask = nextAsk();
  const line = ask
    ? "Slack #luma-crew: " + ask.name + " needs a client call. Nora owns the reply."
    : "Slack #luma-crew: no client call waiting. Sam keeps the open cuts.";
  state.sync.unshift(line);
  state.messages.push({ by: "NC", text: line, t: "now" });
  setToast("Handoff posted to #luma-crew. Relay still holds the decision.");
}
function exportFrame() {
  const d = current();
  const notes = state.notes[d.id] || [];
  const pack = notes.map((n) => fmt(n.t) + " " + n.text).join(" · ") || "No notes yet";
  const name = "Frame.io · " + d.name + " notes";
  if (!state.files.some((f) => f.name === name)) {
    state.files.push({ name: name, meta: pack });
  }
  state.sync.unshift("Frame.io export: " + d.name + " · " + notes.length + " timecoded notes. Approval not moved.");
  setToast("Notes exported for Frame.io. Approve still happens in Relay.");
}
function navFor() {
  const apps = ["apps", "Apps"];
  return state.view === "client"
    ? [["home", "Home"], ["review", "Review"], ["story", "Storyboard"], ["files", "Files"], ["messages", "Messages"], ["team", "Team"], apps]
    : [["board", "Board"], ["shoot", "Shoot plan"], ["shotlist", "Shot list"], ["script", "Script"], ["story", "Storyboard"], ["review", "Review"], ["files", "Files"], ["messages", "Messages"], ["team", "Team"], ["ai", "AI desk"], apps];
}

function render() {
  const ask = nextAsk();
  const d = current();
  const locked = d.status === "approved" || d.status === "delivered";
  const rows = state.deliverables.map((item) => `
    <tr class="click" data-open="${item.id}">
      <td>${item.name}</td>
      <td><span class="pill ${item.status}">${statusLabel[item.status]}</span><span class="ver">${item.version}</span></td>
      <td><span class="avatar">${item.owner}</span></td>
      <td>${item.due}</td>
    </tr>`).join("");
  const noteHtml = (state.notes[d.id] || []).map((n) => `
    <div class="note"><b>${n.by === "YOU" ? "You" : team[n.by].name}</b><span class="ts" data-seek="${n.t}">${fmt(n.t)}</span><p>${esc(n.text)}</p></div>`).join("");
  const cuts = state.deliverables.map((item) => `
    <button class="cutbtn ${item.id === d.id ? "on" : ""}" data-open="${item.id}">${item.name}<small>${statusLabel[item.status]} · ${item.version}</small></button>`).join("");

  const screens = {
    home: `
      <section class="card call">
        <div class="ico">✓</div>
        <div>
          <h1>${ask ? "Nora needs your call on " + ask.name : "Nothing is waiting on you."}</h1>
          <p>${ask ? "Due " + ask.due + ". Approval locks that cut only." : "Open cuts are with the crew. Nora still owns delivery on 21 October."}</p>
        </div>
        <div class="actions">
          <button class="btn primary" data-approve="${ask ? ask.id : ""}" ${ask ? "" : "disabled"}>Approve</button>
          <button class="btn" data-change="${ask ? ask.id : ""}" ${ask ? "" : "disabled"}>Request changes</button>
        </div>
      </section>
      <section class="card"><table><thead><tr><th>DELIVERABLE</th><th>VERSION</th><th>OWNER</th><th>DUE</th></tr></thead><tbody>${rows}</tbody></table></section>`,
    review: `
      <div class="layout">
        <section class="card cuts">${cuts}</section>
        <section class="card player">
          <div class="stage ${state.version}">
            <img src="luma.jpg" alt="Luma product still" />
            <div class="badge">${esc(d.title)} · ${state.version}</div>
            <div class="versions">
              <button data-ver="v1" class="${state.version === "v1" ? "on" : ""}">v1</button>
              <button data-ver="v2" class="${state.version === "v2" ? "on" : ""}">v2</button>
            </div>
          </div>
          <div class="timebar">
            <button class="btn" data-play>${state.playing ? "Pause" : "Play"}</button>
            <input type="range" min="0" max="${d.duration}" value="${state.time}" data-scrub />
            <span>${fmt(state.time)} / ${fmt(d.duration)}</span>
          </div>
        </section>
        <section class="card notes">
          <h2>Notes on ${esc(d.name)}</h2>
          <p class="muted">${team[d.owner].name} · ${d.owner === "NC" ? "producer" : team[d.owner].role}</p>
          ${noteHtml || "<p class='muted'>No notes on this cut yet.</p>"}
          <div class="composer"><input placeholder="What should change at this moment?" data-draft value="${esc(state.draft)}" /><button class="btn" data-add>Add</button></div>
        </section>
      </div>
      <section class="card decision">
        <div><strong>Decision</strong><small>${locked ? "This cut is locked." : "Scoped to this deliverable. A comment is feedback. Approval locks the cut."}</small></div>
        <div class="actions">
          <button class="btn primary" data-approve="${d.id}" ${locked ? "disabled" : ""}>Approve ${esc(d.name)}</button>
          <button class="btn" data-change="${d.id}" ${d.status === "delivered" ? "disabled" : ""}>Request changes</button>
        </div>
      </section>`,
    files: `
      <section class="page"><div class="kicker">Luma Autumn Launch</div><h1>Send it to the team.</h1><p class="lead">Footage and brand files stay on the project. Nora verifies, then Sam gets the handoff.</p></section>
      <section class="card files">
        <h2>Project intake <span class="pill needs">Producer · Nora</span></h2>
        <div class="drop" data-sample>Drop footage, brand files, or references</div>
        <button class="btn" data-sample>Attach sample batch</button>
        <h2 style="margin-top:18px">Already with the team</h2>
        ${state.files.map((f) => `<div class="note"><b>${esc(f.name)}</b><p>${esc(f.meta)}</p></div>`).join("")}
      </section>`,
    messages: `
      <section class="page"><div class="kicker">Luma Autumn Launch</div><h1>Talk to the team.</h1><p class="lead">Human conversation. AI runs only from the AI desk, and only when you ask.</p></section>
      <section class="card files thread">
        <div class="own" style="padding:0 0 12px;border:0"><div><strong>Nora + production team</strong><p>Client conversation · Luma launch</p></div><span class="pill needs">Client + team</span></div>
        ${state.messages.map((m) => `<div class="msg"><b>${m.by === "YOU" ? "You" : team[m.by].name}</b> <span class="muted">${m.t}</span><p>${esc(m.text)}</p></div>`).join("")}
        <div class="composer"><input placeholder="Tell Nora what you need" data-message value="${esc(state.message)}" /><button class="btn primary" data-send>Send</button></div>
        <p class="muted">No agent is listening or writing replies.</p>
      </section>`,
    team: `
      <section class="page"><div class="kicker">Assembled at kickoff</div><h1>Your production team</h1><p class="lead">One accountable producer throughout. Six roles, no empty seats.</p></section>
      <div class="team">${Object.entries(team).map(([id, p]) => `
        <article class="card person"><span class="av lg">${id}</span><h3>${p.name}</h3><div class="role">${p.role}</div><p>${p.job}</p></article>`).join("")}</div>`,
    board: `
      <section class="page"><div class="kicker">Every task has an owner</div><h1>The team behind the result.</h1><p class="lead">Input, owner, next handoff. Delivery is 21 October.</p></section>
      <section class="card own"><div><strong>Nora owns delivery</strong><p>Main film + 6 social cuts</p></div><span class="pill needs">Client review</span></section>
      <div class="board">${["done", "now", "next"].map((col) => `
        <div class="col"><h3>${col === "done" ? "Complete" : col === "now" ? "In progress" : "Next"} · ${state.tasks.filter((t) => t.col === col).length}</h3>
        ${state.tasks.filter((t) => t.col === col).map((t) => `<article class="card task"><div class="pill ${col === "done" ? "approved" : col === "now" ? "progress" : "needs"}">${t.tag}</div><strong>${esc(t.title)}</strong><p>${esc(t.body)}</p><p style="margin-top:8px">${esc(t.who)}</p></article>`).join("") || "<p class='muted'>Empty</p>"}
        </div>`).join("")}</div>`,
    shoot: `
      <section class="page"><div class="kicker">14 October · still planned</div><h1>Shoot day</h1><p class="lead">One location. Minh owns camera. Wrap hands originals to Sam the same day.</p></section>
      <div class="split">
        <section class="card day">${state.day.map((b) => `<div class="block"><b>${b.t}</b><strong>${esc(b.name)}</strong><span class="muted">${esc(b.who)}</span></div>`).join("")}</section>
        <section class="card files"><h2>Crew</h2><p>Nora runs the day. Minh shoots. Maya needs the end-card plate.</p><div class="note"><b>Not done</b><p>Do not mark Shoot complete until files are verified.</p></div><button class="btn" data-shot="s1">Mark hero shot covered</button></section>
      </div>`,
    shotlist: `
      <section class="page"><div class="kicker">Minh · 4 setups</div><h1>Shot list</h1><p class="lead">Each setup has a frame, a lens, and a storyboard frame. Covered only after Nora checks it.</p></section>
      <div class="strip">${state.shots.map((s, i) => `
        <article class="card frame ${state.frame === i ? "on" : ""}" data-frame="${i}">
          <img src="luma.jpg" alt="" style="object-position:${20 + i * 15}% 40%" />
          <div><span class="pill ${s.status === "covered" ? "approved" : "progress"}">${s.status}</span><strong style="display:block;margin-top:6px">${esc(s.name)}</strong><p>${s.frame} · ${s.lens} · ${s.time}</p><p>${esc(s.note)}</p></div>
        </article>`).join("")}</div>`,
    script: `
      <section class="page"><div class="kicker">Ari · approved direction</div><h1>Script</h1><p class="lead">Action and voiceover only. Claims stay with Ari. Client approval already locked the direction.</p></section>
      <section class="card">${state.script.map((line) => `<div class="scriptline ${line.kind}">${esc(line.text)}</div>`).join("")}
        <div class="composer" style="padding:12px"><input placeholder="Add a line" data-line /><button class="btn" data-add-line>Add line</button></div>
      </section>`,
    story: `
      <section class="page"><div class="kicker">Leo · frames before the cut</div><h1>Storyboard</h1><p class="lead">Four frames. Click one to open its shot. This is not the review decision.</p></section>
      <div class="strip">${state.shots.map((s, i) => `
        <article class="card frame ${state.frame === i ? "on" : ""}" data-frame="${i}">
          <img src="luma.jpg" alt="" style="filter:${i === 1 ? "contrast(1.2)" : i === 2 ? "saturate(0.7)" : i === 3 ? "grayscale(0.4)" : "none"}" />
          <div><b>0${i + 1}</b> ${esc(s.name)}<p>${esc(s.note)}</p></div>
        </article>`).join("")}</div>
      <section class="card files" style="margin-top:12px"><strong>${esc(state.shots[state.frame].name)}</strong><p>${state.shots[state.frame].frame} · ${state.shots[state.frame].lens} · ${state.shots[state.frame].time} · Minh</p></section>`,
    ai: `
      <section class="page"><div class="kicker">Off until asked</div><h1>AI desk</h1><p class="lead">One job: draft captions from cuts you already approved. It does not reply in Messages.</p></section>
      <section class="card ai">
        <strong>Caption draft</strong>
        <p>Uses approved and delivered cuts only. Nothing is sent to the client until Nora posts it.</p>
        <div class="row" style="margin-top:12px"><button class="btn primary" data-ai>Run caption draft</button></div>
        ${state.ai ? state.ai.map((line) => `<div class="caption">${esc(line)}</div>`).join("") : "<p class='muted'>Not running.</p>"}
      </section>`,
    apps: `
      <section class="page"><div class="kicker">Relay stays the decision</div><h1>Other apps do the carrying.</h1><p class="lead">Drive holds footage. Calendar holds dates. Notion holds the brief. Approval still happens here.</p></section>
      <div class="apps">${state.apps.map((app) => `
        <article class="card appcard">
          <div class="row" style="justify-content:space-between"><strong>${app.name}</strong><span class="pill ${app.state === "connected" ? "approved" : "delivered"}">${app.state}</span></div>
          <p>${app.job}</p>
          <div class="row">
            ${app.id === "drive" ? "<button class='btn primary' data-drive>Pull folders</button>" : ""}
            ${app.id === "calendar" ? "<button class='btn primary' data-cal>Stage shoot + delivery</button>" : ""}
            ${app.id === "notion" ? "<button class='btn primary' data-notion>Link brief</button>" : ""}
            ${app.id === "gmail" ? "<button class='btn primary' data-mail>Draft client update</button>" : ""}
            ${app.id === "slack" ? "<button class='btn primary' data-slack>Post handoff</button>" : ""}
            ${app.id === "frame" ? "<button class='btn primary' data-frameio>Export notes</button>" : ""}
          </div>
        </article>`).join("")}</div>
      <section class="card log"><strong>Sync log</strong>${state.sync.length ? state.sync.map((line) => `<div class="note"><p>${esc(line)}</p></div>`).join("") : "<p class='muted'>Nothing synced yet.</p>"}</section>`
  };

  document.getElementById("app").innerHTML = `
    <div class="shell">
      <aside class="side">
        <div class="brand"><div class="mark"><span></span></div> relay</div>
        <nav class="nav">${navFor().map(([id, label]) => `<button data-screen="${id}" class="${state.screen === id ? "active" : ""}">${label}${id === "review" && ask ? "<i class='dot'></i>" : ""}</button>`).join("")}</nav>
        <div class="producer"><strong>Nora Chen</strong><small>One person accountable for the whole result.</small></div>
      </aside>
      <main class="main">
        <header class="top">
          <div class="project"><i></i> Luma Autumn Launch · delivery 21 Oct</div>
          <div class="toggle">
            <button data-view="client" class="${state.view === "client" ? "on" : ""}">Client view</button>
            <button data-view="production" class="${state.view === "production" ? "on" : ""}">Production view</button>
          </div>
        </header>
        ${screens[state.screen] || screens.home}
      </main>
    </div>
    ${state.toast ? `<div class="toast">${esc(state.toast)}</div>` : ""}
    ${state.modal ? modal(state.modal) : ""}`;
  bind();
}

function modal(id) {
  const d = state.deliverables.find((x) => x.id === id);
  return `<div class="modal-back"><form class="card modal" data-form><h3>Request changes · ${esc(d.name)}</h3><p class="muted">This becomes a handoff to Sam, then back to Nora. It does not approve the cut.</p><textarea name="note" rows="4" placeholder="What should change, and where?" required></textarea><div class="row"><button type="button" class="btn" data-close>Cancel</button><button class="btn primary">Send to Nora</button></div></form></div>`;
}

function bind() {
  document.querySelectorAll("[data-screen]").forEach((b) => b.onclick = () => { state.screen = b.dataset.screen; render(); });
  document.querySelectorAll("[data-view]").forEach((b) => b.onclick = () => {
    state.view = b.dataset.view;
    state.screen = state.view === "client" ? "home" : "board";
    render();
  });
  document.querySelectorAll("[data-open]").forEach((row) => row.onclick = () => { state.selected = row.dataset.open; state.screen = "review"; render(); });
  document.querySelectorAll("[data-approve]").forEach((b) => b.onclick = () => { if (b.dataset.approve) approve(b.dataset.approve); });
  document.querySelectorAll("[data-change]").forEach((b) => b.onclick = () => { if (!b.dataset.change) return; state.selected = b.dataset.change; state.modal = b.dataset.change; render(); });
  document.querySelectorAll("[data-seek]").forEach((b) => b.onclick = () => { state.time = Number(b.dataset.seek); render(); });
  document.querySelectorAll("[data-ver]").forEach((b) => b.onclick = () => { state.version = b.dataset.ver; render(); });
  const scrub = document.querySelector("[data-scrub]");
  if (scrub) scrub.oninput = (e) => { state.time = Number(e.target.value); };
  const play = document.querySelector("[data-play]");
  if (play) play.onclick = () => {
    state.playing = !state.playing;
    if (timer) clearInterval(timer);
    if (state.playing) timer = setInterval(() => {
      state.time = Math.min(current().duration, state.time + 1);
      if (state.time >= current().duration) { state.playing = false; clearInterval(timer); }
      render();
    }, 700);
    render();
  };
  const draft = document.querySelector("[data-draft]");
  if (draft) draft.oninput = (e) => { state.draft = e.target.value; };
  const add = document.querySelector("[data-add]");
  if (add) add.onclick = addNote;
  const message = document.querySelector("[data-message]");
  if (message) message.oninput = (e) => { state.message = e.target.value; };
  const send = document.querySelector("[data-send]");
  if (send) send.onclick = sendMessage;
  document.querySelectorAll("[data-sample]").forEach((b) => b.onclick = () => {
    state.files.push({ name: "Sample batch", meta: "Brand refs + 3 selects · waiting on Nora" });
    setToast("Sample batch attached. Nora verifies before Sam sees it.");
  });
  const ai = document.querySelector("[data-ai]");
  if (ai) ai.onclick = runAi;
  const drive = document.querySelector("[data-drive]");
  if (drive) drive.onclick = pullDrive;
  const cal = document.querySelector("[data-cal]");
  if (cal) cal.onclick = stageCalendar;
  const notion = document.querySelector("[data-notion]");
  if (notion) notion.onclick = linkNotion;
  const mail = document.querySelector("[data-mail]");
  if (mail) mail.onclick = stageMail;
  const slack = document.querySelector("[data-slack]");
  if (slack) slack.onclick = postSlack;
  const frameio = document.querySelector("[data-frameio]");
  if (frameio) frameio.onclick = exportFrame;
  const close = document.querySelector("[data-close]");
  if (close) close.onclick = () => { state.modal = null; render(); };
  document.querySelectorAll("[data-frame]").forEach((b) => b.onclick = () => { state.frame = Number(b.dataset.frame); render(); });
  document.querySelectorAll("[data-shot]").forEach((b) => b.onclick = () => {
    const shot = state.shots.find((s) => s.id === b.dataset.shot);
    if (shot) shot.status = "covered";
    setToast("Hero setup marked covered. Shoot day is still planned.");
  });
  const line = document.querySelector("[data-line]");
  if (line) line.oninput = (e) => { state.line = e.target.value; };
  const addLine = document.querySelector("[data-add-line]");
  if (addLine) addLine.onclick = () => {
    if (!state.line || !state.line.trim()) return;
    state.script.push({ kind: "action", text: state.line.trim() });
    state.line = "";
    setToast("Line added. Ari still owns claims.");
  };
  const form = document.querySelector("[data-form]");
  if (form) form.onsubmit = (e) => { e.preventDefault(); requestChanges(state.modal, new FormData(form).get("note")); };
}

render();
