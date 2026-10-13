const sourceUrl = document.getElementById("sourceUrl");
const pasteBtn = document.getElementById("pasteBtn");
const clearBtn = document.getElementById("clearBtn");
const statusEl = document.getElementById("status");
const resultEl = document.getElementById("result");

const iosProfileLink = document.getElementById("iosProfileLink");
const iosTalkLink = document.getElementById("iosTalkLink");
const androidProfileLink = document.getElementById("androidProfileLink");
const androidTalkLink = document.getElementById("androidTalkLink");

const plotIdEl = document.getElementById("plotId");
const openIosProfileBtn = document.getElementById("openIosProfileBtn");
const openIosTalkBtn = document.getElementById("openIosTalkBtn");

const copyIosProfileBtn = document.getElementById("copyIosProfileBtn");
const copyIosTalkBtn = document.getElementById("copyIosTalkBtn");
const copyAndroidProfileBtn = document.getElementById("copyAndroidProfileBtn");
const copyAndroidTalkBtn = document.getElementById("copyAndroidTalkBtn");
const toast = document.getElementById("toast");

const UUID_RE = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 1600);
}

function extractPlotId(raw) {
  const value = raw.trim();
  if (!value) return null;
  if (UUID_RE.test(value)) return value;

  try {
    const url = new URL(value);
    const match = url.pathname.match(/\/plots\/([0-9a-f-]{36})(?:\/|$)/i);
    if (!match) return null;
    return UUID_RE.test(match[1]) ? match[1] : null;
  } catch {
    const match = value.match(/\/plots\/([0-9a-f-]{36})(?:\/|$)/i);
    if (!match) return null;
    return UUID_RE.test(match[1]) ? match[1] : null;
  }
}

function buildLinks(plotId) {
  const profilePath = encodeURIComponent(`ja/plots/${plotId}/profile`);
  const talkPath = encodeURIComponent(`plots/${plotId}`);

  return {
    iosProfile: `https://zeta-ai.app.link/beta/jp?%24ios_deeplink_path=${profilePath}`,
    iosTalk: `https://zeta-ai.app.link/beta/jp?%24ios_deeplink_path=${talkPath}`,
    androidProfile: `https://zeta-ai.app.link/beta/jp?%24android_deeplink_path=${profilePath}`,
    androidTalk: `https://zeta-ai.app.link/beta/jp?%24android_deeplink_path=${talkPath}`
  };
}

function updateResult() {
  const raw = sourceUrl.value;
  const id = extractPlotId(raw);

  if (!raw.trim()) {
    resultEl.classList.add("hidden");
    statusEl.textContent = "URLを貼ると自動で変換します。";
    statusEl.classList.remove("error");
    return;
  }

  if (!id) {
    resultEl.classList.add("hidden");
    statusEl.textContent = "Zetaのプロット共有URLを確認してください。";
    statusEl.classList.add("error");
    return;
  }

  const links = buildLinks(id);

  iosProfileLink.value = links.iosProfile;
  iosTalkLink.value = links.iosTalk;
  androidProfileLink.value = links.androidProfile;
  androidTalkLink.value = links.androidTalk;

  openIosProfileBtn.href = links.iosProfile;
  openIosTalkBtn.href = links.iosTalk;
  plotIdEl.textContent = id;

  resultEl.classList.remove("hidden");
  statusEl.textContent = "変換できました。";
  statusEl.classList.remove("error");
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const temp = document.createElement("textarea");
    temp.value = text;
    temp.style.position = "fixed";
    temp.style.opacity = "0";
    document.body.appendChild(temp);
    temp.select();
    document.execCommand("copy");
    temp.remove();
  }
}

sourceUrl.addEventListener("input", updateResult);

pasteBtn.addEventListener("click", async () => {
  try {
    sourceUrl.value = await navigator.clipboard.readText();
    updateResult();
  } catch {
    showToast("貼り付けを許可してから試してください");
    sourceUrl.focus();
  }
});

clearBtn.addEventListener("click", () => {
  sourceUrl.value = "";
  updateResult();
  sourceUrl.focus();
});

copyIosProfileBtn.addEventListener("click", async () => {
  await copyText(iosProfileLink.value);
  showToast("iOS紹介リンクをコピーしました");
});

copyIosTalkBtn.addEventListener("click", async () => {
  await copyText(iosTalkLink.value);
  showToast("iOSトークリンクをコピーしました");
});

copyAndroidProfileBtn.addEventListener("click", async () => {
  await copyText(androidProfileLink.value);
  showToast("Android紹介リンクをコピーしました");
});

copyAndroidTalkBtn.addEventListener("click", async () => {
  await copyText(androidTalkLink.value);
  showToast("Androidトークリンクをコピーしました");
});

updateResult();
