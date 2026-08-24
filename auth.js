/* ============================================================
   NEW STREET — SHARED AUTH SESSION MODULE (auth.js)
   ============================================================
   Provides a client-side session layer for a fully static site.

   Storage keys:
     ns_users         — Object map: { [userId]: userRecord }
     ns_auth_session  — String: currently authenticated userId, or absent

   User record shape:
     { id, name, email, mobile, city, passwordHash, createdAt }

   Security note: passwords are hashed with a simple deterministic
   function (no crypto.subtle dependency needed for a static demo).
   For a production backend this module would be replaced by a
   server-side session / JWT flow.
   ============================================================ */

(function (global) {
  'use strict';

  /* ── STORAGE KEYS ─────────────────────────────────────────── */
  var USERS_KEY   = 'ns_users';
  var SESSION_KEY = 'ns_auth_session';

  /* ── HELPERS ──────────────────────────────────────────────── */

  /** Read all stored users as { [id]: record } */
  function getUsers() {
    try {
      return JSON.parse(localStorage.getItem(USERS_KEY)) || {};
    } catch (e) {
      return {};
    }
  }

  /** Persist the users map */
  function saveUsers(users) {
    try {
      localStorage.setItem(USERS_KEY, JSON.stringify(users));
    } catch (e) {
      console.warn('[NS Auth] Could not save users:', e);
    }
  }

  /** Generate a unique user ID */
  function generateId() {
    var ts   = Date.now().toString(36).toUpperCase();
    var rand = Math.random().toString(36).slice(2, 7).toUpperCase();
    return 'NS-' + ts + '-' + rand;
  }

  /**
   * Simple deterministic hash — NOT cryptographically secure.
   * Good enough for a client-side demo; replace with bcrypt on a real backend.
   */
  function hashPassword(password) {
    var hash = 0;
    var salt = 'ns_static_salt_2026';
    var str  = password + salt;
    for (var i = 0; i < str.length; i++) {
      var chr  = str.charCodeAt(i);
      hash     = ((hash << 5) - hash) + chr;
      hash    |= 0; // Convert to 32-bit int
    }
    return 'h' + Math.abs(hash).toString(36);
  }

  /* ── SESSION MANAGEMENT ───────────────────────────────────── */

  /**
   * Returns the authenticated user's profile object, or null if not logged in.
   * This is the single source of truth for "who is the current user".
   */
  function getSession() {
    try {
      var userId = localStorage.getItem(SESSION_KEY);
      if (!userId) return null;
      var users = getUsers();
      return users[userId] || null;
    } catch (e) {
      return null;
    }
  }

  /** Persist the session (store the authenticated userId) */
  function setSession(userId) {
    try {
      localStorage.setItem(SESSION_KEY, userId);
    } catch (e) {
      console.warn('[NS Auth] Could not save session:', e);
    }
  }

  /** Destroy the current session */
  function clearSession() {
    try {
      localStorage.removeItem(SESSION_KEY);
    } catch (e) {}
  }

  /* ── AUTH ACTIONS ─────────────────────────────────────────── */

  /**
   * Register a new user.
   * @param {Object} profile - { name, email, mobile, city, password }
   * @returns {Object} { success: true, userId, profile } | { success: false, error }
   */
  function register(profile) {
    var name     = (profile.name     || '').trim();
    var email    = (profile.email    || '').trim().toLowerCase();
    var mobile   = (profile.mobile   || '').trim().replace(/\D/g, '');
    var city     = (profile.city     || '').trim();
    var password = (profile.password || '');

    if (!name)     return { success: false, error: 'Full name is required.' };
    if (!email)    return { success: false, error: 'Email is required.' };
    if (!password) return { success: false, error: 'Password is required.' };

    var users = getUsers();

    // Check for duplicate email
    var existingIds = Object.keys(users);
    for (var i = 0; i < existingIds.length; i++) {
      var existing = users[existingIds[i]];
      if (existing.email === email) {
        return { success: false, error: 'An account with this email already exists. Please log in.' };
      }
    }

    var userId = generateId();
    var record = {
      id:           userId,
      name:         name,
      email:        email,
      mobile:       mobile,
      city:         city,
      passwordHash: hashPassword(password),
      createdAt:    new Date().toISOString()
    };

    users[userId] = record;
    saveUsers(users);
    setSession(userId);

    // Also write civic_user for backwards-compatibility with dashboard.js getStoredProfile()
    _syncLegacyKey(record);

    return { success: true, userId: userId, profile: record };
  }

  /**
   * Log in an existing user.
   * @param {string} identifier - email or mobile
   * @param {string} password
   * @returns {Object} { success: true, userId, profile } | { success: false, error }
   */
  function login(identifier, password) {
    identifier = (identifier || '').trim().toLowerCase();
    password   = password || '';

    if (!identifier) return { success: false, error: 'Please enter your email or mobile number.' };
    if (!password)   return { success: false, error: 'Please enter your password.' };

    var users  = getUsers();
    var ids    = Object.keys(users);
    var hash   = hashPassword(password);
    var found  = null;

    for (var i = 0; i < ids.length; i++) {
      var u = users[ids[i]];
      var matchEmail  = u.email === identifier;
      var matchMobile = u.mobile && u.mobile === identifier.replace(/\D/g, '');
      if ((matchEmail || matchMobile) && u.passwordHash === hash) {
        found = u;
        break;
      }
    }

    if (!found) {
      return { success: false, error: 'Invalid credentials. Please check your email/mobile and password.' };
    }

    setSession(found.id);
    _syncLegacyKey(found);
    return { success: true, userId: found.id, profile: found };
  }

  /**
   * Log out the current user.
   * Clears session and also clears the legacy civic_user key so the
   * dashboard cannot accidentally show stale data.
   * Then redirects to the landing page.
   */
  function logout() {
    clearSession();
    try {
      localStorage.removeItem('civic_user');
      localStorage.removeItem('userName');
      localStorage.removeItem('newStreetCitizenProfile');
    } catch (e) {}
    window.location.href = 'index.html';
  }

  /**
   * Route guard — call at the top of a protected page (e.g. dashboard).
   * If the user is not authenticated, redirect to register.html immediately.
   */
  function requireAuth() {
    if (!getSession()) {
      window.location.replace('register.html');
      // Throw to halt any further script execution on this page
      throw new Error('[NS Auth] Unauthenticated — redirecting to register.');
    }
  }

  /**
   * Call on auth pages (register, login).
   * If the user is already authenticated, skip to the dashboard.
   */
  function redirectIfAuthed() {
    if (getSession()) {
      window.location.replace('dashboard.html');
    }
  }

  /**
   * Navigate to the dashboard if authenticated, otherwise to register.
   * Use this for the Dashboard button on the landing page.
   */
  function dashboardOrRegister() {
    if (getSession()) {
      window.location.href = 'dashboard.html';
    } else {
      window.location.href = 'register.html';
    }
  }

  /* ── LEGACY COMPAT ────────────────────────────────────────── */

  /**
   * Write a civic_user-shaped record so the existing dashboard.js
   * getStoredProfile() function continues to work without modification.
   * The name/city values come from the auth session, not hardcoded values.
   */
  function _syncLegacyKey(record) {
    try {
      var nameParts  = (record.name || '').split(/\s+/);
      var firstName  = nameParts[0] || '';
      var lastName   = nameParts.slice(1).join(' ') || '';
      var legacyData = {
        firstName:   firstName,
        lastName:    lastName,
        name:        record.name,
        address:     record.city ? (record.city + ', India') : '',
        mobile:      record.mobile,
        city:        record.city,
        id:          record.id,
        email:       record.email,
        _nsAuthId:   record.id    // marker so dashboard.js knows this came from auth
      };
      localStorage.setItem('civic_user', JSON.stringify(legacyData));
      localStorage.setItem('userName', record.name);
    } catch (e) {}
  }

  /* ── PUBLIC API ───────────────────────────────────────────── */

  global.NS_Auth = {
    register:          register,
    login:             login,
    logout:            logout,
    getSession:        getSession,
    requireAuth:       requireAuth,
    redirectIfAuthed:  redirectIfAuthed,
    dashboardOrRegister: dashboardOrRegister
  };

}(window));
