const path = require("path");
const functions = require("firebase-functions");
const next = require("next");
const admin = require("firebase-admin");
const cookie = require("cookie");

admin.initializeApp();

var dev = process.env.NODE_ENV !== "production";
var app = next({
  dev,
  conf: { distDir: `${path.relative(process.cwd(), __dirname)}/next` }
});
var handle = app.getRequestHandler();

exports.next = functions.https.onRequest((req, res) => {
  console.log("File: " + req.originalUrl); // log the page.js file that is being requested
  return app.prepare().then(() => handle(req, res));
});

exports.login = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const idToken = req.body.token.toString();
  const expiresIn = 60 * 60 * 24 * 5 * 1000; // 5 days
  var sessionCookie;
  try {
    sessionCookie = await admin
      .auth()
      .createSessionCookie(idToken, { expiresIn });
  } catch {
    res.status(401).json({
      error: "Unauthorized"
    });
    return;
  }

  // When current cookie's uid and setting cookie's uid is same, it renders correctly by SSR.
  // If no, it renders incorrectly because the first page which is rendered by ssr's session uses current cookie
  // but real session user want is setting cookie's one. It needs reloading to use correct cookie by SSR.
  const cookies = cookie.parse(req.headers.cookie || "");
  var needReload;
  try {
    const currentSession = await admin
      .auth()
      .verifySessionCookie(cookies.__session || "");
    const nextSession = await admin.auth().verifySessionCookie(sessionCookie);
    if (currentSession.uid == nextSession.uid) {
      needReload = false;
    } else {
      needReload = true;
    }
  } catch (error) {
    needReload = true;
  }

  const options = { maxAge: expiresIn, httpOnly: true, secure: true };
  res.cookie("__session", sessionCookie, options);
  res.status(200).json({
    success: true,
    need_reload: needReload
  });
});

exports.logout = functions.https.onRequest(async (req, res) => {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }
  const cookies = cookie.parse(req.headers.cookie || "");
  const sessionCookie = cookies.__session || "";
  res.clearCookie("__session");
  try {
    const decodedClaims = await admin.auth().verifySessionCookie(sessionCookie);
    await admin.auth().revokeRefreshTokens(decodedClaims.sub);
  } catch {
    res.status(200).json({ success: true });
    return;
  }
  res.status(200).json({ success: true });
});

exports.user = functions.https.onRequest(async (req, res) => {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method Not Allowed" });
    return;
  }

  const cookies = cookie.parse(req.headers.cookie || "");
  const sessionCookie = cookies.__session || "";
  var decodedClaims;
  try {
    decodedClaims = await admin.auth().verifySessionCookie(sessionCookie);
  } catch {
    res.status(401).json({ error: "Anauthorized" });
    return;
  }

  res.status(200).json({
    user: {
      id: decodedClaims.uid,
      name: decodedClaims.name
    }
  });
});
