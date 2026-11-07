/**
 * Hasanboy_dev — Portfolio JavaScript
 * Responsive Menu, Glassmorphic Modal & Interactive Features
 * Google Account Authentication & Dynamic Projects Management System
 */

document.addEventListener('DOMContentLoaded', () => {
  // ====================================================
  // CONSTANTS & KEYS
  // ====================================================
  const OWNER_TG_USERNAME = 'khomidjonovh';
  const OWNER_TG_ID = '7034211289';
  const OWNER_PHONE_CLEAN = '774597750';
  const ADMIN_EMAIL = 'hasanboy.azizjonovich@gmail.com';
  const AUTH_STORAGE_KEY = 'hasanboy_portfolio_admin_auth';
  const CUSTOM_PROJECTS_KEY = 'hasanboy_portfolio_custom_projects';
  const TRASH_STORAGE_KEY = 'hasanboy_portfolio_deleted_archive';

  // ====================================================
  // 1. TOAST BILDIRISHNOMA TIZIMI
  // ====================================================
  const customToast = document.getElementById('customToast');
  const toastIcon = document.getElementById('toastIcon');
  const toastTitle = document.getElementById('toastTitle');
  const toastMessage = document.getElementById('toastMessage');
  let toastTimer = null;

  function showToast(title, message, type = 'success') {
    if (!customToast) return;
    if (toastTimer) clearTimeout(toastTimer);

    toastTitle.textContent = title;
    toastMessage.textContent = message;

    if (type === 'error') {
      toastIcon.className = 'toast-icon toast-error';
      toastIcon.textContent = '✕';
    } else {
      toastIcon.className = 'toast-icon';
      toastIcon.textContent = '✓';
    }

    customToast.classList.add('is-shown');
    toastTimer = setTimeout(() => {
      customToast.classList.remove('is-shown');
    }, 3800);
  }

  // ====================================================
  // 2. MOBIL MENYU (HAMBURGER & DRAWER)
  // ====================================================
  const mobileMenuBtn = document.getElementById('mobileMenuBtn');
  const mobileNavDrawer = document.getElementById('mobileNavDrawer');
  const mobileNavOverlay = document.getElementById('mobileNavOverlay');
  const mobileDrawerClose = document.getElementById('mobileDrawerClose');
  const mobileLinks = document.querySelectorAll('.mobile-nav-link, .btn-drawer, .btn-cv-drawer');

  function openMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.add('is-open');
    if (mobileNavOverlay) mobileNavOverlay.classList.add('is-open');
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.add('is-active');
      mobileMenuBtn.setAttribute('aria-expanded', 'true');
    }
    mobileNavDrawer.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMobileMenu() {
    if (!mobileNavDrawer) return;
    mobileNavDrawer.classList.remove('is-open');
    if (mobileNavOverlay) mobileNavOverlay.classList.remove('is-open');
    if (mobileMenuBtn) {
      mobileMenuBtn.classList.remove('is-active');
      mobileMenuBtn.setAttribute('aria-expanded', 'false');
    }
    mobileNavDrawer.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  if (mobileMenuBtn) {
    mobileMenuBtn.addEventListener('click', () => {
      const isOpen = mobileNavDrawer && mobileNavDrawer.classList.contains('is-open');
      if (isOpen) {
        closeMobileMenu();
      } else {
        openMobileMenu();
      }
    });
  }

  if (mobileDrawerClose) mobileDrawerClose.addEventListener('click', closeMobileMenu);
  if (mobileNavOverlay) mobileNavOverlay.addEventListener('click', closeMobileMenu);

  mobileLinks.forEach(link => {
    link.addEventListener('click', closeMobileMenu);
  });

  // ====================================================
  // 3. ASOSIY GLASSMORPHISM MODAL OYNASI
  // ====================================================
  const modalOverlay = document.getElementById('glassModalOverlay');
  const modalCloseBtn = document.getElementById('glassModalCloseBtn');
  const modalCloseSecondary = document.getElementById('modalCloseSecondaryBtn');
  const modalTitle = document.getElementById('modalTitle');
  const modalSubtitle = document.getElementById('modalSubtitle');
  const modalBody = document.getElementById('modalBody');
  const modalPrimaryBtn = document.getElementById('modalPrimaryBtn');

  function openModal(data) {
    if (!modalOverlay) return;
    if (modalTitle) modalTitle.textContent = data.title || 'Hasanboy Homidjonov';
    if (modalSubtitle) modalSubtitle.textContent = data.subtitle || 'Full-Stack & Python Developer';
    if (modalBody) modalBody.innerHTML = data.contentHtml || '';

    if (modalPrimaryBtn) {
      if (data.primaryBtn) {
        modalPrimaryBtn.style.display = 'inline-flex';
        modalPrimaryBtn.href = data.primaryBtn.url;
        modalPrimaryBtn.innerHTML = `<span>${data.primaryBtn.text}</span> ↗`;
      } else {
        modalPrimaryBtn.style.display = 'none';
      }
    }

    modalOverlay.classList.add('is-open');
    modalOverlay.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeModal() {
    if (!modalOverlay) return;
    modalOverlay.classList.remove('is-open');
    modalOverlay.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (modalCloseBtn) modalCloseBtn.addEventListener('click', closeModal);
  if (modalCloseSecondary) modalCloseSecondary.addEventListener('click', closeModal);

  if (modalOverlay) {
    modalOverlay.addEventListener('click', (e) => {
      if (e.target === modalOverlay) closeModal();
    });
  }

  // ====================================================
  // 4. TELEGRAM AUTH & ADMIN BOSHQARUV TIZIMI
  // ====================================================
  const authModal = document.getElementById('adminAuthModal');
  const authModalCloseBtn = document.getElementById('authModalCloseBtn');
  const adminToolbar = document.getElementById('adminToolbar');
  const headerConnectBtn = document.getElementById('headerConnectBtn');
  const headerConnectIcon = document.getElementById('headerConnectIcon');
  const headerConnectTitle = document.getElementById('headerConnectTitle');
  const headerConnectTag = document.getElementById('headerConnectTag');
  const drawerConnectBtn = document.getElementById('drawerConnectBtn');
  const drawerConnectIcon = document.getElementById('drawerConnectIcon');
  const drawerConnectTitle = document.getElementById('drawerConnectTitle');
  const drawerConnectTag = document.getElementById('drawerConnectTag');
  const tgModalDynamicBody = document.getElementById('tgModalDynamicBody');

  // Asl telefon SVG ikonkasi (qimirlab turuvchi)
  const defaultPhoneSvgIcon = `
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round" class="phone-ring-svg">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"/>
    </svg>
  `;

  // Faqat Hasanboy (@KhomidjonovH, ID: 7034211289) profili orqali kirilganda admin ruxsatini berish
  function getAdminAuth() {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!data) return null;
      const parsed = JSON.parse(data);
      if (parsed && parsed.role === 'admin') {
        const u = (parsed.username || '').replace('@', '').trim().toLowerCase();
        const id = (parsed.userId || '').toString().trim();
        const p = (parsed.phone || '').replace(/[\s+-]/g, '');
        const email = (parsed.email || '').trim().toLowerCase();

        if (
          parsed.isOwner === true ||
          u === OWNER_TG_USERNAME ||
          id === OWNER_TG_ID ||
          p.includes(OWNER_PHONE_CLEAN) ||
          email === ADMIN_EMAIL.toLowerCase()
        ) {
          return parsed;
        }
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  // Boshqa akkaunt bilan (Mehmon) kiritilganmi?
  function getGuestAuth() {
    try {
      const data = localStorage.getItem(AUTH_STORAGE_KEY);
      if (!data) return null;
      const parsed = JSON.parse(data);
      if (parsed && parsed.role === 'guest') {
        return parsed;
      }
      return null;
    } catch (e) {
      return null;
    }
  }

  function setAdminAuth(profile) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    updateAuthUI();
  }

  function setGuestAuth(profile) {
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(profile));
    updateAuthUI();
  }

  function clearAdminAuth() {
    localStorage.removeItem(AUTH_STORAGE_KEY);
    updateAuthUI();
  }

  function removeDeleteButtonsFromCards() {
    const delButtons = document.querySelectorAll('.btn-delete-project');
    delButtons.forEach(btn => btn.remove());
  }

  // Sayt ko'rinishini foydalanuvchi holatiga moslash
  function updateAuthUI() {
    const admin = getAdminAuth();
    const guest = getGuestAuth();

    if (admin) {
      // 1. FOYDALANUVCHI HASANBOY (EGA / ADMIN)
      document.body.classList.add('admin-mode-active');
      if (adminToolbar) adminToolbar.style.display = 'block';
      ensureDeleteButtonsOnCards();

      // Header "Bog'lanish" tugmasini aktiv holatga keltirish
      if (headerConnectBtn) {
        headerConnectBtn.classList.add('is-connected');
        if (headerConnectIcon) headerConnectIcon.innerHTML = `<img src="images/icon.jpg" class="nav-cta-avatar-thumb" alt="Hasanboy">`;
        if (headerConnectTitle) headerConnectTitle.textContent = 'Hasanboy (Ega)';
        if (headerConnectTag) headerConnectTag.textContent = 'Admin • Faol';
      }

      // Drawer CTA
      if (drawerConnectBtn) {
        drawerConnectBtn.classList.add('is-connected');
        if (drawerConnectIcon) drawerConnectIcon.innerHTML = `<img src="images/icon.jpg" class="nav-cta-avatar-thumb" alt="Hasanboy">`;
        if (drawerConnectTitle) drawerConnectTitle.textContent = 'Hasanboy (Ega)';
        if (drawerConnectTag) drawerConnectTag.textContent = 'Admin • Faol';
      }
    } else if (guest) {
      // 2. FOYDALANUVCHI BOSHQA AKKAUNT (MEHMON)
      // Loyihalarni qo'shish va o'chirish KO'RSATILMAYDI! Sof chiroyli sayt ko'rinadi!
      document.body.classList.remove('admin-mode-active');
      if (adminToolbar) adminToolbar.style.display = 'none';
      removeDeleteButtonsFromCards();

      const displayGuestName = guest.username || 'Mehmon';

      if (headerConnectBtn) {
        headerConnectBtn.classList.add('is-connected');
        if (headerConnectIcon) headerConnectIcon.innerHTML = `<span style="font-size:16px;">👤</span>`;
        if (headerConnectTitle) headerConnectTitle.textContent = displayGuestName;
        if (headerConnectTag) headerConnectTag.textContent = 'Mehmon • Bog\'langan';
      }

      if (drawerConnectBtn) {
        drawerConnectBtn.classList.add('is-connected');
        if (drawerConnectIcon) drawerConnectIcon.innerHTML = `<span style="font-size:16px;">👤</span>`;
        if (drawerConnectTitle) drawerConnectTitle.textContent = displayGuestName;
        if (drawerConnectTag) drawerConnectTag.textContent = 'Mehmon • Bog\'langan';
      }
    } else {
      // 3. MEHMON BOG'LANISHNI BOSMAGAN (STANDART HOLAT)
      // Hech qanday boshqaruv yoki o'chirish tugmalari yo'q, sayt toza ko'rinadi
      document.body.classList.remove('admin-mode-active');
      if (adminToolbar) adminToolbar.style.display = 'none';
      removeDeleteButtonsFromCards();

      if (headerConnectBtn) {
        headerConnectBtn.classList.remove('is-connected');
        if (headerConnectIcon) headerConnectIcon.innerHTML = defaultPhoneSvgIcon;
        if (headerConnectTitle) headerConnectTitle.textContent = 'Bog\'lanish';
        if (headerConnectTag) headerConnectTag.textContent = '';
      }

      if (drawerConnectBtn) {
        drawerConnectBtn.classList.remove('is-connected');
        if (drawerConnectIcon) drawerConnectIcon.innerHTML = defaultPhoneSvgIcon;
        if (drawerConnectTitle) drawerConnectTitle.textContent = 'Bog\'lanish';
        if (drawerConnectTag) drawerConnectTag.textContent = '';
      }
    }
  }

  // Modal ichidagi kontentni dinamik tarzda yangilash
  function renderAuthModalBody() {
    if (!tgModalDynamicBody) return;
    const admin = getAdminAuth();

    if (admin) {
      // 1. HASANBOY (EGA / ADMIN) HISOBI AVTOMATIK ANIQLANGAN HOLAT
      tgModalDynamicBody.innerHTML = `
        <div class="tg-connected-view">
          <div class="tg-connected-badge">
            <span class="tg-sticker tg-anim-fire">👑</span>
            <span>Loyiha Egasi (Hasanboy Homidjonov) hisobi faol</span>
          </div>

          <div class="contact-methods-grid">
            <a href="https://t.me/KhomidjonovH" target="_blank" rel="noopener noreferrer" class="contact-method-card contact-method-tg">
              <div class="contact-method-left">
                <span class="contact-method-icon tg-sticker tg-anim-bot">✈️</span>
                <div class="contact-method-text">
                  <strong>Telegram profilim</strong>
                  <small>@KhomidjonovH • Doimiy Online</small>
                </div>
              </div>
              <span class="contact-method-arrow">↗</span>
            </a>
            <a href="tel:+998774597750" class="contact-method-card contact-method-phone">
              <div class="contact-method-left">
                <span class="contact-method-icon tg-sticker tg-anim-zap">📞</span>
                <div class="contact-method-text">
                  <strong>Telefon raqamim</strong>
                  <small>+998 77 459 77 50</small>
                </div>
              </div>
              <span class="contact-method-arrow">↗</span>
            </a>
            <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hasanboy.azizjonovich@gmail.com" target="_blank" rel="noopener noreferrer" class="contact-method-card contact-method-email">
              <div class="contact-method-left">
                <span class="contact-method-icon tg-sticker tg-anim-chart">✉️</span>
                <div class="contact-method-text">
                  <strong>Email pochtam</strong>
                  <small>hasanboy.azizjonovich@gmail.com</small>
                </div>
              </div>
              <span class="contact-method-arrow">↗</span>
            </a>
          </div>

          <div class="tg-connected-actions" style="margin-top: 10px;">
            <button type="button" class="btn btn-primary" id="modalAddProjShortcutBtn" style="justify-content: center; padding: 12px;">
              <span class="tg-sticker tg-anim-rocket">🚀</span>
              <span>＋ Yangi Loyiha Qo'shish</span>
            </button>
            <button type="button" class="btn btn-ghost" id="modalTrashShortcutBtn" style="justify-content: center; padding: 12px;">
              <span class="tg-sticker tg-anim-tools">🗑️</span>
              <span>O'chirilganlar Arxivi</span>
            </button>
            <button type="button" class="btn btn-logout-admin" id="modalLogoutBtn" style="justify-content: center; padding: 11px; margin-top: 2px;">
              <span>Chiqish (Mehmon rejimiga o'tish)</span>
            </button>
          </div>
        </div>
      `;
    } else {
      // 2. MEHMONLAR UCHUN TOZA, TEZKOR VA XAVFSIZ ALOQA MODALI
      // HECH QANDAY OCHIQ BOSIB KIRADIGAN TUGMA YO'Q - FAQAT HASANBOY BILAN BOG'LANISH YO'LLARI
      tgModalDynamicBody.innerHTML = `
        <div class="contact-methods-grid">
          <!-- 1. TELEGRAM: TO'G'RI TELEGRAMGA KIRGIZIB YUBORADI -->
          <a href="https://t.me/KhomidjonovH" target="_blank" rel="noopener noreferrer" class="contact-method-card contact-method-tg">
            <div class="contact-method-left">
              <span class="contact-method-icon tg-sticker tg-anim-bot">✈️</span>
              <div class="contact-method-text">
                <strong>Telegram orqali bog'lanish</strong>
                <small>@KhomidjonovH • Doimiy Online</small>
              </div>
            </div>
            <span class="contact-method-arrow">↗</span>
          </a>

          <!-- 2. TELEFON: TO'G'RI QO'NG'IROQ QILISHGA KIRGIZIB YUBORADI -->
          <a href="tel:+998774597750" class="contact-method-card contact-method-phone">
            <div class="contact-method-left">
              <span class="contact-method-icon tg-sticker tg-anim-zap">📞</span>
              <div class="contact-method-text">
                <strong>Qo'ng'iroq qilish</strong>
                <small>+998 77 459 77 50</small>
              </div>
            </div>
            <span class="contact-method-arrow">↗</span>
          </a>

          <!-- 3. EMAIL: TO'G'RI XAT YOZISHGA KIRGIZIB YUBORADI -->
          <a href="https://mail.google.com/mail/?view=cm&fs=1&to=hasanboy.azizjonovich@gmail.com" target="_blank" rel="noopener noreferrer" class="contact-method-card contact-method-email">
            <div class="contact-method-left">
              <span class="contact-method-icon tg-sticker tg-anim-chart">✉️</span>
              <div class="contact-method-text">
                <strong>Email orqali yozish</strong>
                <small>hasanboy.azizjonovich@gmail.com</small>
              </div>
            </div>
            <span class="contact-method-arrow">↗</span>
          </a>
        </div>
      `;
    }
  }

  function openAuthModal() {
    if (!authModal) return;
    renderAuthModalBody();
    authModal.classList.add('is-open');
    authModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeAuthModal() {
    if (!authModal) return;
    authModal.classList.remove('is-open');
    authModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (authModalCloseBtn) authModalCloseBtn.addEventListener('click', closeAuthModal);

  if (authModal) {
    authModal.addEventListener('click', (e) => {
      if (e.target === authModal) closeAuthModal();
    });
  }

  // "Bog'lanish" tugmalari bosilganda to'g'ridan-to'g'ri Telegram Auth modalini ochish
  if (headerConnectBtn) {
    headerConnectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      openAuthModal();
    });
  }

  if (drawerConnectBtn) {
    drawerConnectBtn.addEventListener('click', (e) => {
      e.preventDefault();
      closeMobileMenu();
      openAuthModal();
    });
  }

  function showAuthAlert(message, type = 'error') {
    const alertBox = document.getElementById('authAlertBox');
    if (!alertBox) return;
    alertBox.className = `tg-alert-box alert-${type}`;
    alertBox.innerHTML = message;
    alertBox.style.display = 'block';
  }

  // Telegram hisobni solishtirish va autentifikatsiya qilish
  function handleAccountVerification() {
    const inputEl = document.getElementById('tgAccountInput');
    const val = inputEl ? inputEl.value.trim() : '';
    if (!val) {
      showToast('Xatolik', 'Iltimos, Telegram username yoki ID kiriting.', 'error');
      return;
    }

    const clean = val.replace('@', '').toLowerCase();
    if (clean === OWNER_TG_USERNAME || clean === OWNER_TG_ID || clean.includes(OWNER_PHONE_CLEAN)) {
      // 1. Hisob egasi (Hasanboy) tanildi
      setAdminAuth({
        role: 'admin',
        isOwner: true,
        name: 'Hasanboy Homidjonov',
        username: '@KhomidjonovH',
        userId: OWNER_TG_ID,
        phone: '+998 77 459 77 50',
        channel: 'Hasanboy | Dev',
        picture: 'images/icon.jpg',
        loginAt: new Date().toISOString()
      });
      closeAuthModal();
      showToast('Xush kelibsiz, Hasanboy!', 'Hisobingiz tasdiqlandi. Yangi loyiha qo\'shish va o\'chirish imkoniyati faollashtirildi!');
      const projEl = document.getElementById('projects');
      if (projEl) {
        setTimeout(() => projEl.scrollIntoView({ behavior: 'smooth', block: 'start' }), 250);
      }
    } else {
      // 2. Boshqa hisob (Mehmon)
      const formattedUser = val.startsWith('@') ? val : `@${val}`;
      setGuestAuth({
        role: 'guest',
        isOwner: false,
        username: formattedUser,
        loginAt: new Date().toISOString()
      });
      closeAuthModal();
      showToast('Mehmon sifatida bog\'landingiz', `Siz (${formattedUser}) hisobi bilan kirdingiz. Loyihalarni qo'shish va o'chirish faqat hisob egasiga ochiq.`);
    }
  }

  // Dinamik modal ichidagi hodisalarni boshqarish (Event Delegation)
  if (tgModalDynamicBody) {
    tgModalDynamicBody.addEventListener('click', (e) => {
      // 1. Tekshirish va bog'lash tugmasi
      if (e.target.closest('#tgVerifyAccountBtn')) {
        handleAccountVerification();
        return;
      }

      // 2. Hasanboy hisobini bog'lash (Ega sifatida tasdiqlash)
      if (e.target.closest('#quickLoginAdminBtn') || e.target.closest('.btn-tg-connect-owner')) {
        setAdminAuth({
          role: 'admin',
          isOwner: true,
          name: 'Hasanboy Homidjonov',
          username: '@KhomidjonovH',
          userId: OWNER_TG_ID,
          phone: '+998 77 459 77 50',
          channel: 'Hasanboy | Dev',
          picture: 'images/icon.jpg',
          loginAt: new Date().toISOString()
        });

        closeAuthModal();
        showToast('Xush kelibsiz, Hasanboy!', 'Profilingiz (ID: 7034211289) doimiy bog\'landi! Qaytib kirganingizda ham loyiha qo\'shish va o\'chirish doimiy saqlanadi.');

        const projEl = document.getElementById('projects');
        if (projEl) {
          setTimeout(() => {
            projEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 250);
        }
        return;
      }

      // 3. Modal ichidagi shortcut tugmalar
      if (e.target.closest('#modalAddProjShortcutBtn')) {
        closeAuthModal();
        openAddProjectModal();
        const projEl = document.getElementById('projects');
        if (projEl) projEl.scrollIntoView({ behavior: 'smooth', block: 'start' });
        return;
      }

      if (e.target.closest('#modalTrashShortcutBtn')) {
        closeAuthModal();
        openTrashModal();
        return;
      }

      // 4. Modal ichidagi Chiqish tugmasi
      if (e.target.closest('#modalLogoutBtn')) {
        clearAdminAuth();
        closeAuthModal();
        showToast('Hisobdan chiqildi', 'Sayt oddiy mehmon ko\'rinishiga qaytarildi.');
        return;
      }

      // 5. Mehmon hisobidan chiqish / boshqa hisobga o'tish
      if (e.target.closest('#modalSwitchAccountBtn')) {
        clearAdminAuth();
        renderAuthModalBody();
        showToast('Chiqildi', 'Boshqa hisob bilan bog\'lanishingiz mumkin.');
        return;
      }
    });
  }

  // Enter tugmasi bosilganda ham hisobni tekshirish
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && e.target && e.target.id === 'tgAccountInput') {
      e.preventDefault();
      handleAccountVerification();
    }
  });



  // Maxfiy ochish usullari (Qulaylik uchun):
  // 1. Logo ustiga ketma-ket 3 marta bosilganda
  const siteLogo = document.querySelector('.logo');
  let logoClickCount = 0;
  let logoClickTimer = null;
  if (siteLogo) {
    siteLogo.addEventListener('click', () => {
      logoClickCount++;
      if (logoClickTimer) clearTimeout(logoClickTimer);
      if (logoClickCount >= 3) {
        logoClickCount = 0;
        openAuthModal();
      } else {
        logoClickTimer = setTimeout(() => {
          logoClickCount = 0;
        }, 1200);
      }
    });
  }

  // 2. Klaviatura kombinatsiyasi: Ctrl + Shift + A
  document.addEventListener('keydown', (e) => {
    if (e.ctrlKey && e.shiftKey && (e.key === 'A' || e.key === 'a')) {
      e.preventDefault();
      openAuthModal();
    }
  });

  // 3. Footer dagi copyright ustiga ikki marta bosilganda
  const footerCopy = document.querySelector('.footer-copy');
  if (footerCopy) {
    footerCopy.addEventListener('dblclick', openAuthModal);
  }

  // 4. URL parametri orqali avtomatik ochish (?admin, ?auth, ?login)
  try {
    const urlParams = new URLSearchParams(window.location.search);
    if (urlParams.has('admin') || urlParams.has('auth') || urlParams.has('login')) {
      setTimeout(() => {
        openAuthModal();
      }, 350);
    }
  } catch (e) {}

  // Chiqishni boshqarish (Toolbar, header yoki drawer dan)
  document.addEventListener('click', (e) => {
    if (e.target.closest('#toolbarLogoutBtn') || e.target.closest('#logoutBtn') || e.target.closest('#drawerLogoutBtn')) {
      clearAdminAuth();
      showToast('Hisobdan chiqildi', 'Sayt oddiy mehmon ko\'rinishiga o\'tkazildi.');
    }
  });

  // ====================================================
  // 5. LOYIHALARNI BOSHQARISH (QO'SHISH, O'CHIRISH, SAQLASH)
  // ====================================================
  const projectGrid = document.getElementById('projectGrid');
  const openAddProjectModalBtn = document.getElementById('openAddProjectModalBtn');
  const addProjectModal = document.getElementById('addProjectModal');
  const addProjectModalCloseBtn = document.getElementById('addProjectModalCloseBtn');
  const cancelAddProjectBtn = document.getElementById('cancelAddProjectBtn');
  const addNewProjectForm = document.getElementById('addNewProjectForm');

  // Form inputlari
  const newProjUrl = document.getElementById('newProjUrl');
  const newProjDesc = document.getElementById('newProjDesc');
  const newProjTitle = document.getElementById('newProjTitle');
  const newProjBadge = document.getElementById('newProjBadge');
  const newProjTags = document.getElementById('newProjTags');
  const toggleAdvancedFieldsBtn = document.getElementById('toggleAdvancedFieldsBtn');
  const advancedFieldsBox = document.getElementById('advancedFieldsBox');

  // Preview elementlari
  const prevTitle = document.getElementById('prevTitle');
  const prevBadge = document.getElementById('prevBadge');
  const prevDesc = document.getElementById('prevDesc');
  const prevTags = document.getElementById('prevTags');
  const prevLinkText = document.getElementById('prevLinkText');

  function openAddProjectModal() {
    if (!addProjectModal) return;
    if (addNewProjectForm) addNewProjectForm.reset();
    updateLivePreview();
    addProjectModal.classList.add('is-open');
    addProjectModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeAddProjectModal() {
    if (!addProjectModal) return;
    addProjectModal.classList.remove('is-open');
    addProjectModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (openAddProjectModalBtn) openAddProjectModalBtn.addEventListener('click', openAddProjectModal);
  if (addProjectModalCloseBtn) addProjectModalCloseBtn.addEventListener('click', closeAddProjectModal);
  if (cancelAddProjectBtn) cancelAddProjectBtn.addEventListener('click', closeAddProjectModal);

  if (addProjectModal) {
    addProjectModal.addEventListener('click', (e) => {
      if (e.target === addProjectModal) closeAddProjectModal();
    });
  }

  if (toggleAdvancedFieldsBtn) {
    toggleAdvancedFieldsBtn.addEventListener('click', () => {
      if (advancedFieldsBox.style.display === 'none') {
        advancedFieldsBox.style.display = 'flex';
        toggleAdvancedFieldsBtn.innerHTML = '<span>Sozlamalarni berkitish</span> ▴';
      } else {
        advancedFieldsBox.style.display = 'none';
        toggleAdvancedFieldsBtn.innerHTML = '<span>Sozlamalarni tahrirlash</span> ▾';
      }
    });
  }

  // SMART AUTO-ANALYSIS ENGINE (Havola va ma'lumotga qarab o'zi tahlil qiladi)
  function analyzeProjectInput(urlText, descText) {
    const url = (urlText || '').trim();
    const desc = (descText || '').trim();
    const lower = (url + ' ' + desc).toLowerCase();

    // 1. Host va domenni ajratish
    let hostName = '';
    let cleanSlug = '';
    try {
      if (url.startsWith('http://') || url.startsWith('https://')) {
        const parsed = new URL(url);
        hostName = parsed.hostname;
        cleanSlug = hostName.split('.')[0];
      } else if (url.includes('.')) {
        cleanSlug = url.split('.')[0].replace(/^https?:\/\//, '');
      }
    } catch (e) {
      cleanSlug = '';
    }

    // Nomni chiroyli shaklga keltirish
    function formatSlug(slug) {
      if (!slug) return '';
      return slug
        .replace(/[-_]+/g, ' ')
        .split(' ')
        .map(w => w.charAt(0).toUpperCase() + w.slice(1))
        .join(' ');
    }

    let detectedTitle = formatSlug(cleanSlug);

    // 2. Toifa va Badge aniqlash
    let detectedBadge = 'Veb Loyiha';
    let detectedBadgeClass = 'badge-web';
    let detectedLinkText = 'Platformani ko\'rish';

    if (lower.includes('telegram') || lower.includes('t.me') || lower.includes('bot') || lower.includes('boti')) {
      detectedBadge = 'Telegram Bot';
      detectedBadgeClass = 'badge-bot';
      detectedLinkText = 'Botni ochish';
      if (!detectedTitle || detectedTitle.length < 3) detectedTitle = 'Telegram Boti';
      else if (!detectedTitle.toLowerCase().includes('bot')) detectedTitle += ' — Telegram Boti';
    } else if (lower.includes('english') || lower.includes('ingliz') || lower.includes('writing') || lower.includes('grammar') || lower.includes('quiz') || lower.includes('test') || lower.includes('sinov')) {
      detectedBadge = lower.includes('test') || lower.includes('quiz') ? 'English & Test Platform' : 'English Learning Platform';
      detectedBadgeClass = 'badge-web';
      if (!detectedTitle || detectedTitle.length < 3) detectedTitle = 'English Learning Platformasi';
      else if (!detectedTitle.toLowerCase().includes('ingliz') && !detectedTitle.toLowerCase().includes('english') && !detectedTitle.toLowerCase().includes('test')) {
        detectedTitle += ' — Ingliz Tili Platformasi';
      }
    } else if (lower.includes('ai') || lower.includes('gemini') || lower.includes('gpt') || lower.includes('saas') || lower.includes('recruitment')) {
      detectedBadge = 'AI & SaaS Platform';
      detectedBadgeClass = 'badge-web';
      if (!detectedTitle) detectedTitle = 'AI Intelligent Platform';
    } else if (lower.includes('github') || lower.includes('repo') || lower.includes('kod') || lower.includes('masalalar')) {
      detectedBadge = 'JavaScript Lab';
      detectedBadgeClass = 'badge-web';
      detectedLinkText = 'GitHub Repozitoriya';
      if (!detectedTitle) detectedTitle = 'Dasturlash Kodlar Hubi';
    } else {
      if (!detectedTitle) detectedTitle = 'Yangi Zamonaviy Loyiha';
    }

    // 3. Teglarni avtomatik aniqlash
    const tagsSet = new Set();

    // Hosting bo'yicha teglar
    if (hostName.includes('onrender.com')) tagsSet.add('Web App');
    if (hostName.includes('base44.app') || lower.includes('base44')) tagsSet.add('Base44');
    if (hostName.includes('netlify.app') || lower.includes('netlify')) tagsSet.add('Netlify');
    if (hostName.includes('github.com') || lower.includes('github')) tagsSet.add('GitHub');
    if (hostName.includes('t.me') || lower.includes('telegram')) tagsSet.add('Telegram API');
    if (hostName.includes('vercel.app') || lower.includes('vercel')) tagsSet.add('Vercel');

    // Mavzu bo'yicha teglar
    if (lower.includes('english') || lower.includes('ingliz')) tagsSet.add('English Learning');
    if (lower.includes('test') || lower.includes('quiz') || lower.includes('sinov')) tagsSet.add('Interactive Quiz');
    if (lower.includes('grammar') || lower.includes('grammatika')) tagsSet.add('Grammar Mastery');
    if (lower.includes('writing') || lower.includes('insho')) tagsSet.add('Writing & Essay');
    if (lower.includes('ai') || lower.includes('gemini')) tagsSet.add('Gemini AI');
    if (lower.includes('python')) tagsSet.add('Python');
    if (lower.includes('javascript') || lower.includes('js')) tagsSet.add('JavaScript');
    if (lower.includes('node') || lower.includes('express')) tagsSet.add('Node.js');
    if (lower.includes('react')) tagsSet.add('React');
    if (lower.includes('html') || lower.includes('css')) tagsSet.add('HTML5 & CSS3');
    if (lower.includes('bot')) tagsSet.add('Automation');
    if (lower.includes('ta\'lim') || lower.includes('edtech')) tagsSet.add('EdTech');
    if (lower.includes('full-stack') || lower.includes('fullstack')) tagsSet.add('Full-Stack');
    if (lower.includes('baza') || lower.includes('sql') || lower.includes('database')) tagsSet.add('Database');

    if (tagsSet.size === 0) {
      tagsSet.add('Web App');
      tagsSet.add('Responsive UI');
    }

    return {
      title: detectedTitle,
      badge: detectedBadge,
      badgeClass: detectedBadgeClass,
      tags: Array.from(tagsSet),
      linkText: detectedLinkText
    };
  }

  function updateLivePreview() {
    const url = newProjUrl ? newProjUrl.value.trim() : '';
    const desc = newProjDesc ? newProjDesc.value.trim() : '';
    const analysis = analyzeProjectInput(url, desc);

    // Agar foydalanuvchi maxsus maydonlarni o'zi kiritmagan bo'lsa, avtomatik to'ldiramiz
    const currentManualTitle = newProjTitle ? newProjTitle.value.trim() : '';
    const currentManualBadge = newProjBadge ? newProjBadge.value.trim() : '';
    const currentManualTags = newProjTags ? newProjTags.value.trim() : '';

    const finalTitle = currentManualTitle || analysis.title || 'Loyiha nomi bu yerda aks etadi';
    const finalBadge = currentManualBadge || analysis.badge;
    const finalDesc = desc || 'Loyiha havolasi, nomi va qisqacha ma\'lumot kiritilganda, ko\'rinish avtomatik shakllanadi.';
    const finalTags = currentManualTags ? currentManualTags.split(',').map(t => t.trim()).filter(Boolean) : analysis.tags;

    if (prevTitle) prevTitle.textContent = finalTitle;
    if (prevBadge) {
      prevBadge.textContent = finalBadge;
      prevBadge.className = `badge-type ${analysis.badgeClass}`;
    }
    if (prevDesc) prevDesc.textContent = finalDesc;
    if (prevLinkText) prevLinkText.textContent = analysis.linkText;

    if (prevTags) {
      prevTags.innerHTML = finalTags.map(t => `<span class="tech-tag">${t}</span>`).join(' ');
    }
  }

  if (newProjUrl) {
    newProjUrl.addEventListener('input', () => {
      const url = newProjUrl.value.trim();
      if (url && newProjTitle && !newProjTitle.value.trim()) {
        const analysis = analyzeProjectInput(url, newProjDesc ? newProjDesc.value : '');
        newProjTitle.value = analysis.title;
      }
      updateLivePreview();
    });
  }
  if (newProjDesc) newProjDesc.addEventListener('input', updateLivePreview);
  if (newProjTitle) newProjTitle.addEventListener('input', updateLivePreview);
  if (newProjBadge) newProjBadge.addEventListener('input', updateLivePreview);
  if (newProjTags) newProjTags.addEventListener('input', updateLivePreview);

  // Kartochkalar ustida "O'chirish" tugmasini ta'minlash
  function ensureDeleteButtonsOnCards() {
    const cards = document.querySelectorAll('.project-card');
    cards.forEach(card => {
      if (card.classList.contains('preview-card')) return;
      const topRow = card.querySelector('.project-card-top');
      if (topRow && !topRow.querySelector('.btn-delete-project')) {
        const delBtn = document.createElement('button');
        delBtn.type = 'button';
        delBtn.className = 'btn-delete-project';
        delBtn.title = 'Loyihani o\'chirish';
        delBtn.innerHTML = `
          <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
            <polyline points="3 6 5 6 21 6"></polyline>
            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
          </svg>
          <span>O'chirish</span>
        `;
        topRow.appendChild(delBtn);
      }
    });
  }

  // Umumiy loyihalar sonini yangilash (agar stat pill mavjud bo'lsa)
  function updateProjectsCount() {
    const statEl = document.getElementById('projectsCountStat');
    if (!statEl || !projectGrid) return;
    const visibleCards = projectGrid.querySelectorAll('.project-card:not([style*="display: none"])');
    statEl.textContent = `${visibleCards.length}+ Namunaviy Ishlar`;
  }

  // Yangi loyiha kartochkasining HTML shablonini yasash
  function createProjectCardHtml(proj) {
    const isAuthed = !!getAdminAuth();
    const tagsHtml = (proj.tags || []).map(t => `<span class="tech-tag">${t}</span>`).join('\n            ');
    const deleteBtnHtml = isAuthed ? `
            <button type="button" class="btn-delete-project" title="Loyihani o'chirish">
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="3 6 5 6 21 6"></polyline>
                <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
              </svg>
              <span>O'chirish</span>
            </button>` : '';

    return `
        <!-- DYNAMIC PROJECT: ${proj.title} -->
        <article class="project-card just-added" data-project-id="${proj.id}">
          <div class="project-card-top">
            <span class="badge-type ${proj.badgeClass || 'badge-web'}">${proj.badge}</span>
            ${deleteBtnHtml}
          </div>
          <h3 class="project-title">${proj.title}</h3>
          <p class="project-desc">
            <span class="desc-text">${proj.desc}</span>
            <button type="button" class="btn-card-more" aria-label="Batafsil ma'lumot">... batafsil</button>
          </p>
          <div class="tech-tags">
            ${tagsHtml}
          </div>
          <a href="${proj.link}" class="project-link" target="_blank" rel="noopener noreferrer">
            ${proj.linkText} <span aria-hidden="true">↗</span>
          </a>
        </article>
    `;
  }

  // Yangi loyihani saqlash va qo'shish
  if (addNewProjectForm) {
    addNewProjectForm.addEventListener('submit', (e) => {
      e.preventDefault();

      const url = newProjUrl.value.trim();
      const title = (newProjTitle && newProjTitle.value.trim()) || '';
      const desc = newProjDesc.value.trim();

      if (!url || !title || !desc) {
        showToast('Xatolik', 'Iltimos, havola (URL), loyiha nomi va qisqacha ma\'lumotni to\'ldiring.', 'error');
        return;
      }

      const analysis = analyzeProjectInput(url, desc);
      const badge = (newProjBadge && newProjBadge.value.trim()) || analysis.badge;
      const tags = (newProjTags && newProjTags.value.trim())
        ? newProjTags.value.split(',').map(t => t.trim()).filter(Boolean)
        : analysis.tags;

      const newProject = {
        id: `proj-${Date.now()}`,
        title: title,
        badge: badge,
        badgeClass: analysis.badgeClass,
        desc: desc,
        tags: tags,
        link: url,
        linkText: analysis.linkText,
        createdAt: new Date().toISOString()
      };

      // 1. LocalStorage ga yozish
      let customProjects = [];
      try {
        customProjects = JSON.parse(localStorage.getItem(CUSTOM_PROJECTS_KEY)) || [];
      } catch (err) {
        customProjects = [];
      }
      customProjects.unshift(newProject);
      localStorage.setItem(CUSTOM_PROJECTS_KEY, JSON.stringify(customProjects));

      // 2. DOM ga eng boshiga qo'shish
      if (projectGrid) {
        projectGrid.insertAdjacentHTML('afterbegin', createProjectCardHtml(newProject));
      }

      updateProjectsCount();
      closeAddProjectModal();
      showToast('Muvaffaqiyatli qo\'shildi!', `"${newProject.title}" loyihangiz portfolio'ga kiritildi.`);

      // Yangi qo'shilgan kartochkaga silliq scroll qilish
      const justAddedEl = projectGrid?.querySelector(`[data-project-id="${newProject.id}"]`);
      if (justAddedEl) {
        justAddedEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }
    });
  }

  // ====================================================
  // O'CHIRILGAN LOYIHALAR ARXIVI (RECYCLE BIN) TIZIMI
  // ====================================================
  const trashBadgeCount = document.getElementById('trashBadgeCount');
  const deletedProjectsModal = document.getElementById('deletedProjectsModal');
  const openTrashModalBtn = document.getElementById('openTrashModalBtn');
  const trashModalCloseBtn = document.getElementById('trashModalCloseBtn');
  const closeTrashSecondaryBtn = document.getElementById('closeTrashSecondaryBtn');
  const emptyTrashBtn = document.getElementById('emptyTrashBtn');
  const trashListContainer = document.getElementById('trashListContainer');

  function getDeletedArchive() {
    try {
      const data = localStorage.getItem(TRASH_STORAGE_KEY);
      return data ? JSON.parse(data) : [];
    } catch (e) {
      return [];
    }
  }

  function saveDeletedArchive(archive) {
    localStorage.setItem(TRASH_STORAGE_KEY, JSON.stringify(archive));
    updateTrashCountBadge();
  }

  function updateTrashCountBadge() {
    if (!trashBadgeCount) return;
    const count = getDeletedArchive().length;
    trashBadgeCount.textContent = count;
  }

  function openTrashModal() {
    if (!deletedProjectsModal) return;
    renderTrashList();
    deletedProjectsModal.classList.add('is-open');
    deletedProjectsModal.setAttribute('aria-hidden', 'false');
    document.body.classList.add('modal-open');
  }

  function closeTrashModal() {
    if (!deletedProjectsModal) return;
    deletedProjectsModal.classList.remove('is-open');
    deletedProjectsModal.setAttribute('aria-hidden', 'true');
    document.body.classList.remove('modal-open');
  }

  if (openTrashModalBtn) openTrashModalBtn.addEventListener('click', openTrashModal);
  if (trashModalCloseBtn) trashModalCloseBtn.addEventListener('click', closeTrashModal);
  if (closeTrashSecondaryBtn) closeTrashSecondaryBtn.addEventListener('click', closeTrashModal);

  if (deletedProjectsModal) {
    deletedProjectsModal.addEventListener('click', (e) => {
      if (e.target === deletedProjectsModal) closeTrashModal();
    });
  }

  // O'chirilgan loyihalar ro'yxatini chiqarish
  function renderTrashList() {
    if (!trashListContainer) return;
    const archive = getDeletedArchive();

    if (archive.length === 0) {
      trashListContainer.innerHTML = `
        <div class="trash-empty-state">
          <span class="trash-empty-icon">📂</span>
          <strong>O'chirilgan loyihalar mavjud emas</strong>
          <p>Siz o'chirgan har qanday loyiha nomi va linki bilan bu yerda saqlanadi.</p>
        </div>
      `;
      if (emptyTrashBtn) emptyTrashBtn.style.display = 'none';
      return;
    }

    if (emptyTrashBtn) emptyTrashBtn.style.display = 'inline-flex';

    trashListContainer.innerHTML = archive.map(item => {
      const tagsStr = (item.tags || []).join(', ');
      return `
        <div class="trash-item-card" data-project-id="${item.id}">
          <div class="trash-item-left">
            <span class="badge-type ${item.badgeClass || 'badge-web'}">${item.badge || 'Loyiha'}</span>
            <h4 class="trash-item-title">${item.title}</h4>
            <a href="${item.link}" class="trash-item-link" target="_blank" rel="noopener noreferrer">
              ${item.link} ↗
            </a>
            <div class="trash-item-meta">
              <span>🕒 O'chirilgan: ${item.deletedAt || 'Yaqinda'}</span>
              ${tagsStr ? `<span class="trash-item-tags">🏷️ ${tagsStr}</span>` : ''}
            </div>
          </div>
          <div class="trash-item-actions">
            <button type="button" class="btn-restore-project" data-project-id="${item.id}" title="Loyihani qayta tiklash">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                <polyline points="1 4 1 10 7 10"></polyline>
                <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10"></path>
              </svg>
              <span>Tiklash</span>
            </button>
          </div>
        </div>
      `;
    }).join('');
  }

  // Tanlangan loyihani qayta tiklash
  function restoreProject(projectId) {
    const archive = getDeletedArchive();
    const item = archive.find(p => p.id === projectId);
    if (!item) return;

    // Arxivdan o'chirish
    const updatedArchive = archive.filter(p => p.id !== projectId);
    saveDeletedArchive(updatedArchive);

    // DOM ga qaytarish
    if (projectGrid) {
      projectGrid.insertAdjacentHTML('afterbegin', createProjectCardHtml(item));
    }

    // Custom project larda saqlash
    try {
      let customProjects = JSON.parse(localStorage.getItem(CUSTOM_PROJECTS_KEY)) || [];
      if (!customProjects.some(p => p.id === item.id)) {
        customProjects.unshift(item);
        localStorage.setItem(CUSTOM_PROJECTS_KEY, JSON.stringify(customProjects));
      }
    } catch (e) {}

    renderTrashList();
    updateProjectsCount();
    showToast('Qayta tiklandi!', `"${item.title}" loyihasi portfolioingizga muvaffaqiyatli qaytarildi.`);

    const restoredEl = projectGrid?.querySelector(`[data-project-id="${item.id}"]`);
    if (restoredEl) {
      restoredEl.scrollIntoView({ behavior: 'smooth', block: 'center' });
    }
  }

  // Qayta tiklash tugmasini tinglash (Event Delegation)
  document.addEventListener('click', (e) => {
    const restoreBtn = e.target.closest('.btn-restore-project');
    if (!restoreBtn) return;
    e.stopPropagation();

    const projectId = restoreBtn.getAttribute('data-project-id');
    if (projectId) {
      restoreProject(projectId);
    }
  });

  // Arxivni butunlay tozalash
  if (emptyTrashBtn) {
    emptyTrashBtn.addEventListener('click', () => {
      const confirmed = window.confirm('O\'chirilganlar arxivini butunlay tozalamoqchimisiz?');
      if (!confirmed) return;

      saveDeletedArchive([]);
      renderTrashList();
      showToast('Arxiv tozalandi', 'Barcha o\'chirilgan yozuvlar tozalandi.');
    });
  }

  // Loyihani o'chirish va to'liq arxivga saqlash (Event Delegation)
  document.addEventListener('click', (e) => {
    const delBtn = e.target.closest('.btn-delete-project');
    if (!delBtn) return;
    e.stopPropagation();

    // Faqat Hasanboy hisobi orqali ruxsat beriladi
    if (!getAdminAuth()) {
      showToast('Ruxsat yo\'q', 'Loyihani o\'chirish uchun avval tizimga kiring.', 'error');
      return;
    }

    const card = delBtn.closest('.project-card');
    if (!card) return;

    const projectId = card.getAttribute('data-project-id') || `proj-${Date.now()}`;
    const titleEl = card.querySelector('.project-title');
    const badgeEl = card.querySelector('.badge-type');
    const descTextEl = card.querySelector('.desc-text') || card.querySelector('.project-desc');
    const linkEl = card.querySelector('.project-link');
    const tagsEls = card.querySelectorAll('.tech-tag');

    const title = titleEl ? titleEl.textContent.trim() : 'Loyiha';
    const badge = badgeEl ? badgeEl.textContent.trim() : 'Loyiha';
    const badgeClass = badgeEl ? badgeEl.className.replace('badge-type', '').trim() : 'badge-web';
    const desc = descTextEl ? descTextEl.textContent.replace('... batafsil', '').trim() : '';
    const link = linkEl ? linkEl.getAttribute('href') : '#';
    const linkText = linkEl ? linkEl.textContent.replace('↗', '').trim() : 'Platformani ko\'rish';
    const tags = Array.from(tagsEls).map(t => t.textContent.trim());

    const confirmed = window.confirm(`Haqiqatan ham "${title}" loyihasini o'chirmoqchimisiz?\n\n(U "O'chirilganlar" arxiviga nomi va linki bilan saqlanadi va istalgan payt qayta tiklashingiz mumkin)`);
    if (!confirmed) return;

    // Arxivga to'liq ma'lumotlari bilan saqlash
    const archiveItem = {
      id: projectId,
      title: title,
      badge: badge,
      badgeClass: badgeClass,
      desc: desc,
      link: link,
      linkText: linkText,
      tags: tags,
      deletedAt: new Date().toLocaleString('uz-UZ')
    };

    const archive = getDeletedArchive();
    const filteredArchive = archive.filter(p => p.id !== projectId);
    filteredArchive.unshift(archiveItem);
    saveDeletedArchive(filteredArchive);

    // Custom project lardan o'chirish
    try {
      let customProjects = JSON.parse(localStorage.getItem(CUSTOM_PROJECTS_KEY)) || [];
      customProjects = customProjects.filter(p => p.id !== projectId);
      localStorage.setItem(CUSTOM_PROJECTS_KEY, JSON.stringify(customProjects));
    } catch (err) {}

    // Silliq yo'qolish animatsiyasi
    card.style.transition = 'all 0.35s cubic-bezier(0.4, 0, 0.2, 1)';
    card.style.opacity = '0';
    card.style.transform = 'scale(0.85) translateY(15px)';

    setTimeout(() => {
      card.remove();
      updateProjectsCount();
      showToast('Arxivga saqlandi', `"${title}" o'chirildi va nomi & havolasi bilan saqlab qo'yildi.`);
    }, 320);
  });

  // ====================================================
  // 6. AVTOMATIK AKKAUNTNI SOLISHTIRIB TANIB OLISH VA DASTLABKI YUKLASH
  // ====================================================
  function checkAutoAuth() {
    // 1. Agar avvaldan localStorage da saqlangan bo'lsa (bir marta bog'langach, qaytib kirganda ham doimiy saqlanadi)
    if (getAdminAuth()) return;

    // 2. Telegram WebApp orqali ochilgan bo'lsa (ID: 7034211289 yoki username: khomidjonovh)
    try {
      const tgUser = window.Telegram?.WebApp?.initDataUnsafe?.user;
      if (tgUser) {
        const uid = String(tgUser.id || '');
        const uname = (tgUser.username || '').toLowerCase();
        if (uid === OWNER_TG_ID || uname === OWNER_TG_USERNAME) {
          setAdminAuth({
            role: 'admin',
            isOwner: true,
            name: `${tgUser.first_name || 'Hasanboy'} ${tgUser.last_name || ''}`.trim(),
            username: tgUser.username ? `@${tgUser.username}` : '@KhomidjonovH',
            userId: uid || OWNER_TG_ID,
            phone: '+998 77 459 77 50',
            channel: 'Hasanboy | Dev',
            picture: 'images/icon.jpg',
            loginAt: new Date().toISOString()
          });
          return;
        } else {
          setGuestAuth({
            role: 'guest',
            isOwner: false,
            name: `${tgUser.first_name || 'Mehmon'} ${tgUser.last_name || ''}`.trim(),
            username: tgUser.username ? `@${tgUser.username}` : `ID: ${uid}`,
            userId: uid,
            loginAt: new Date().toISOString()
          });
          return;
        }
      }
    } catch (e) {}

    // 3. URL parametrlari orqali tekshirish (?admin, #admin, ?id=7034211289)
    try {
      const urlParams = new URLSearchParams(window.location.search);
      const hash = window.location.hash;
      const paramId = urlParams.get('id');
      const paramUser = (urlParams.get('user') || '').replace('@', '').toLowerCase();
      const hasAdmin = urlParams.has('admin') || hash === '#admin' || hash === '#7034211289';

      if (hasAdmin || paramId === OWNER_TG_ID || paramUser === OWNER_TG_USERNAME) {
        setAdminAuth({
          role: 'admin',
          isOwner: true,
          name: 'Hasanboy Homidjonov',
          username: '@KhomidjonovH',
          userId: OWNER_TG_ID,
          phone: '+998 77 459 77 50',
          channel: 'Hasanboy | Dev',
          picture: 'images/icon.jpg',
          loginAt: new Date().toISOString()
        });
        return;
      } else if (paramUser && paramUser !== OWNER_TG_USERNAME) {
        setGuestAuth({
          role: 'guest',
          isOwner: false,
          username: `@${paramUser}`,
          loginAt: new Date().toISOString()
        });
        return;
      }
    } catch (e) {}
  }

  function initDynamicProjects() {
    checkAutoAuth();
    // 1. Arxivdagi o'chirilgan kartochkalarni DOM dan olib tashlash
    try {
      const archive = getDeletedArchive();
      archive.forEach(item => {
        const el = document.querySelector(`.project-card[data-project-id="${item.id}"]`);
        if (el) el.remove();
      });
    } catch (err) {}

    // 2. Foydalanuvchi qo'shgan maxsus loyihalarni grid ga joylashtirish
    try {
      const customProjects = JSON.parse(localStorage.getItem(CUSTOM_PROJECTS_KEY)) || [];
      const archiveIds = getDeletedArchive().map(p => p.id);
      if (projectGrid && Array.isArray(customProjects)) {
        customProjects.forEach(proj => {
          if (!archiveIds.includes(proj.id) && !projectGrid.querySelector(`[data-project-id="${proj.id}"]`)) {
            projectGrid.insertAdjacentHTML('afterbegin', createProjectCardHtml(proj));
          }
        });
      }
    } catch (err) {}

    updateTrashCountBadge();
    updateProjectsCount();
    updateAuthUI();
  }

  initDynamicProjects();

  // ====================================================
  // 7. "MEN HAQIMDA" HERO TUGMASI
  // ====================================================
  const openAboutBtn = document.getElementById('openAboutModalBtn');

  if (openAboutBtn) {
    openAboutBtn.addEventListener('click', () => {
      openModal({
        title: 'Hasanboy Homidjonov',
        subtitle: 'Full-Stack Developer & Python Bot Mutaxassisi',
        contentHtml: `
          <div class="modal-section-block">
            <span class="section-tag-pill tag-blue">👤 Shaxsiy Ma'lumot</span>
            <h4 class="modal-section-heading">Men haqimda to'liq</h4>
            <p class="modal-paragraph modal-lead">
              Salom! Men Hasanboy — 3 yildan beri zamonaviy dasturlash olamida faol izlanib, toza arxitekturaga ega <strong>Full-Stack veb-platformalar</strong> hamda yuqori yuklamaga bardoshli <strong>Telegram botlar</strong> ishlab chiqib kelmoqdaman.
            </p>
            <p class="modal-paragraph">
              Hozirda <strong>TATU Farg'ona filiali</strong>da Axborot texnologiyalari yo'nalishida ta'lim olmoqdaman, <strong>Najot Ta'lim</strong> akademiyasida IT va dasturlash bo'yicha amaliyot o'taganman hamda <strong>Cambridge</strong> o'quv markazida ingliz tilini (IELTS &amp; General) chuqur o'rganmoqdaman.
            </p>
          </div>

          <div class="modal-section-block">
            <span class="section-tag-pill tag-green"><span class="tg-sticker tg-anim-user">🎓</span> O'qish &amp; Amaliyot</span>
            <h4 class="modal-section-heading">Ta'lim va Professional Tajriba</h4>
            <div class="modal-edu-list">
              <div class="modal-edu-card edu-tatu">
                <span class="edu-card-icon"><span class="tg-sticker tg-anim-user">🎓</span></span>
                <div class="edu-card-info">
                  <strong>TATU Farg'ona filiali</strong>
                  <span class="edu-card-desc">Axborot texnologiyalari (5-semestr talabasi). Dasturiy ta'minot injiniringi va algoritmlar.</span>
                </div>
              </div>
              <div class="modal-edu-card edu-najot">
                <span class="edu-card-icon"><span class="tg-sticker tg-anim-zap">⚡</span></span>
                <div class="edu-card-info">
                  <strong>Najot Ta'lim IT Akademiyasi</strong>
                  <span class="edu-card-desc">Full-Stack veb dasturlash va murakkab loyihalar bo'yicha intensiv ta'lim.</span>
                </div>
              </div>
              <div class="modal-edu-card edu-cambridge">
                <span class="edu-card-icon"><span class="tg-sticker tg-anim-globe">🇬🇧</span></span>
                <div class="edu-card-info">
                  <strong>Cambridge O'quv Markazi</strong>
                  <span class="edu-card-desc">Ingliz tili (Writing, Speaking, Grammar) — xalqaro miqyosdagi EdTech loyihalar bilan ishlash darajasi.</span>
                </div>
              </div>
            </div>
          </div>

          <div class="modal-section-block">
            <span class="section-tag-pill tag-purple"><span class="tg-sticker tg-anim-tools">🛠️</span> Stack &amp; Texnologiyalar</span>
            <h4 class="modal-section-heading">Amaliy Ko'nikmalarim</h4>
            <div class="modal-tech-pills">
              <span class="modal-pill pill-blue">React.js &amp; Frontend</span>
              <span class="modal-pill pill-blue">JavaScript (ES6+)</span>
              <span class="modal-pill pill-blue">HTML5 &amp; CSS3</span>
              <span class="modal-pill pill-blue">Responsive Web UI/UX</span>
              <span class="modal-pill pill-green">Python (Aiogram 2.x &amp; 3.x)</span>
              <span class="modal-pill pill-green">Telegram Bot API &amp; Webhooks</span>
              <span class="modal-pill pill-purple">MySQL Ma'lumotlar Bazasi</span>
              <span class="modal-pill pill-purple">REST API &amp; JSON</span>
              <span class="modal-pill pill-amber">Git &amp; GitHub</span>
            </div>
          </div>

          <div class="modal-section-block">
            <h4 class="modal-section-heading"><span class="tg-sticker tg-anim-chart">📄</span> Rasmiy Rezyume (CV)</h4>
            <p class="modal-paragraph">
              Mening to'liq ma'lumotlarim, tajribam va aloqa vositalarim jamlangan rezyumeni PDF formatida yuklab olishingiz mumkin:
            </p>
            <div class="modal-inline-cv">
              <a href="hasanboy.pdf" download class="btn btn-cv" target="_blank">
                <span class="btn-cv-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                    <polyline points="14 2 14 8 20 8"/>
                    <line x1="12" y1="18" x2="12" y2="12"/>
                    <polyline points="9 15 12 18 15 15"/>
                  </svg>
                </span>
                <span class="btn-cv-content">
                  <span class="btn-cv-title">hasanboy.pdf yuklab olish</span>
                  <span class="btn-cv-tag">PDF • To'liq Rezyume</span>
                </span>
              </a>
            </div>
          </div>
        `,
        primaryBtn: {
          text: "Telegram orqali bog'lanish",
          url: "https://t.me/KhomidjonovH"
        }
      });
    });
  }

  // ====================================================
  // 8. LOYIHALAR BATAFSIL TUGMALARI (EVENT DELEGATION)
  // ====================================================
  document.addEventListener('click', (e) => {
    const btn = e.target.closest('.btn-card-more');
    if (!btn) return;
    e.stopPropagation();

    const card = btn.closest('.project-card');
    if (!card) return;

    const titleEl = card.querySelector('.project-title');
    const badgeEl = card.querySelector('.badge-type');
    const descTextEl = card.querySelector('.desc-text') || card.querySelector('.project-desc');
    const tagsEls = card.querySelectorAll('.tech-tag');
    const linkEl = card.querySelector('.project-link');

    const title = titleEl ? titleEl.textContent.trim() : 'Loyiha ma\'lumoti';
    const badge = badgeEl ? badgeEl.textContent.trim() : 'Loyiha';
    const desc = descTextEl ? descTextEl.textContent.replace('... batafsil', '').trim() : '';
    const linkUrl = linkEl ? linkEl.getAttribute('href') : '#';
    const linkText = linkEl ? linkEl.textContent.replace('↗', '').trim() : 'Platformani ochish';

    let tagsHtml = '';
    tagsEls.forEach(tag => {
      tagsHtml += `<span class="modal-pill pill-blue">${tag.textContent.trim()}</span>`;
    });

    openModal({
      title: title,
      subtitle: `Toifa: ${badge}`,
      contentHtml: `
        <div class="modal-section-block">
          <span class="section-tag-pill tag-blue"><span class="tg-sticker tg-anim-rocket">🚀</span> Loyiha tavsifi</span>
          <p class="modal-paragraph modal-lead">${desc}</p>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-heading"><span class="tg-sticker tg-anim-tools">🛠️</span> Ishlatilgan Texnologiyalar</h4>
          <div class="modal-tech-pills">
            ${tagsHtml}
          </div>
        </div>

        <div class="modal-section-block">
          <h4 class="modal-section-heading"><span class="tg-sticker tg-anim-zap">🔗</span> To'g'ridan-to'g'ri havola</h4>
          <p class="modal-paragraph">
            Ushbu loyiha internet tarmog'ida jonli ishlamoqda. Sinab ko'rish uchun quyidagi tugmani bosing:
          </p>
        </div>
      `,
      primaryBtn: {
        text: linkText,
        url: linkUrl
      }
    });
  });

  // ====================================================
  // 9. ESCAPE BILAN BARCHA MODALLARNI YOPISH
  // ====================================================
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
      if (modalOverlay && modalOverlay.classList.contains('is-open')) closeModal();
      if (authModal && authModal.classList.contains('is-open')) closeAuthModal();
      if (addProjectModal && addProjectModal.classList.contains('is-open')) closeAddProjectModal();
      if (deletedProjectsModal && deletedProjectsModal.classList.contains('is-open')) closeTrashModal();
      if (mobileNavDrawer && mobileNavDrawer.classList.contains('is-open')) closeMobileMenu();
    }
  });

  // ====================================================
  // 10. SCROLL VA YUQORIGA QAYTISH TUGMASI
  // ====================================================
  const scrollTopBtn = document.getElementById('scrollToTopBtn');
  const siteHeader = document.getElementById('siteHeader');

  window.addEventListener('scroll', () => {
    const scrollY = window.scrollY;

    if (siteHeader) {
      if (scrollY > 30) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    }

    if (scrollTopBtn) {
      if (scrollY > 350) {
        scrollTopBtn.classList.add('is-visible');
      } else {
        scrollTopBtn.classList.remove('is-visible');
      }
    }
  }, { passive: true });

  if (scrollTopBtn) {
    scrollTopBtn.addEventListener('click', () => {
      window.scrollTo({
        top: 0,
        behavior: 'smooth'
      });
    });
  }

  // ====================================================
  // 11. FOOTER SOCIAL LINKS SEQUENTIAL WAVE ANIMATION
  // ====================================================
  function initSequentialSocialWave() {
    const container = document.querySelector('.footer-social-wrap') || document.querySelector('.footer-links');
    if (!container) return;
    const links = Array.from(container.querySelectorAll('.footer-link'));
    if (!links.length) return;

    let currentIdx = 0;
    let isHovered = false;
    let timerId = null;

    function clearAllWave() {
      links.forEach(l => l.classList.remove('is-wave-active'));
    }

    container.addEventListener('mouseenter', () => {
      isHovered = true;
      clearAllWave();
      if (timerId) clearTimeout(timerId);
    });

    container.addEventListener('mouseleave', () => {
      isHovered = false;
      if (timerId) clearTimeout(timerId);
      timerId = setTimeout(triggerNextWave, 600);
    });

    // Har bir tugma faqat YAKKA O'ZI navbati bilan ko'tariladi:
    // Hech qachon ikkita tugma bir vaqtda qimirlamaydi yoki yonmaydi!
    // Tugma ko'tarilganda ichidagi stiker/ikonkasi ham Telegram stikeri kabi o'ynab turadi!
    function triggerNextWave() {
      if (isHovered || document.hidden) {
        clearAllWave();
        timerId = setTimeout(triggerNextWave, 800);
        return;
      }

      // Qat'iy: avval barcha tugmalarni tozalaymiz
      clearAllWave();

      const activeLink = links[currentIdx];
      if (activeLink) {
        activeLink.classList.add('is-wave-active');
      }

      currentIdx = (currentIdx + 1) % links.length;

      // 950ms ko'tarilib nur sochib va ichidagi stikeri o'ynab turgach, sekin 0.3s da joyiga qaytadi
      timerId = setTimeout(() => {
        clearAllWave();
        // 400ms tinch oraliq: barcha tugmalar tinch holatda turadi, so'ng navbatdagi sayt tugmasiga o'tadi
        timerId = setTimeout(triggerNextWave, 400);
      }, 950);
    }

    // Dastlabki start
    timerId = setTimeout(triggerNextWave, 600);
  }

  initSequentialSocialWave();
});
