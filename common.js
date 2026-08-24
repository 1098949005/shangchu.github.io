
document.addEventListener('DOMContentLoaded', function() {
  var page = document.body.dataset.page;
  document.querySelectorAll('.sidebar a[data-page]').forEach(function(a) {
    if (a.dataset.page === page) { a.classList.add('active'); }
  });
  document.querySelectorAll('.sidebar details').forEach(function(d) {
    if (d.querySelector('a.active')) { d.setAttribute('open', ''); }
  });
  document.querySelectorAll('[data-open-modal]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      document.getElementById(btn.dataset.openModal).style.display = 'flex';
    });
  });
  document.querySelectorAll('[data-close-modal]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      btn.closest('.modal-overlay').style.display = 'none';
    });
  });
  document.querySelectorAll('[data-tab]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var group = btn.dataset.tabGroup;
      document.querySelectorAll('[data-tab][data-tab-group="' + group + '"]').forEach(function(b) { b.classList.remove('active'); });
      btn.classList.add('active');
      document.querySelectorAll('[data-tab-content][data-tab-group="' + group + '"]').forEach(function(s) { s.style.display = 'none'; });
      document.getElementById(btn.dataset.tab).style.display = 'block';
    });
  });
  var overlay = document.querySelector('.task-overlay');
  function openDrawer(el) {
    document.querySelectorAll('.drawer').forEach(function(d) { d.classList.remove('open'); });
    if (el) { el.classList.add('open'); }
    if (overlay) { overlay.classList.add('open'); }
  }
  function closeDrawers() {
    document.querySelectorAll('.drawer').forEach(function(d) { d.classList.remove('open'); });
    if (overlay) { overlay.classList.remove('open'); }
  }
  document.querySelectorAll('[data-open-drawer]').forEach(function(btn) {
    btn.addEventListener('click', function() {
      var target = document.getElementById(btn.dataset.openDrawer);
      if (target) { openDrawer(target); }
    });
  });
  document.querySelectorAll('[data-open-task]').forEach(function(btn) { btn.addEventListener('click', function() { openDrawer(document.querySelector('.task-drawer')); }); });
  document.querySelectorAll('[data-close-drawer]').forEach(function(btn) { btn.addEventListener('click', closeDrawers); });
  // Flyout submenu (e.g. 后厨报表二级菜单)
  document.querySelectorAll('.nav-flyout-trigger').forEach(function(trigger) {
    var toggle = trigger.querySelector('.flyout-toggle');
    var flyout = trigger.querySelector('.submenu-flyout');
    if (!toggle || !flyout) return;
    if (trigger.querySelector('.submenu-flyout a.active')) {
      flyout.classList.add('open');
      trigger.classList.add('open');
    }
    toggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      var isOpen = flyout.classList.contains('open');
      document.querySelectorAll('.submenu-flyout').forEach(function(f) { f.classList.remove('open'); });
      document.querySelectorAll('.nav-flyout-trigger').forEach(function(t) { t.classList.remove('open'); });
      if (!isOpen) {
        flyout.classList.add('open');
        trigger.classList.add('open');
      }
    });
  });
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.nav-flyout-trigger')) {
      document.querySelectorAll('.submenu-flyout').forEach(function(f) { f.classList.remove('open'); });
      document.querySelectorAll('.nav-flyout-trigger').forEach(function(t) { t.classList.remove('open'); });
    }
  });
  // User account dropdown menu
  var userTrigger = document.querySelector('[data-toggle-user-menu]');
  if (userTrigger) {
    userTrigger.addEventListener('click', function(e) {
      e.stopPropagation();
      var dd = document.getElementById('userDropdown');
      if (dd) { dd.classList.toggle('open'); }
    });
  }
  document.addEventListener('click', function(e) {
    if (!e.target.closest('.user-menu')) {
      var dd = document.getElementById('userDropdown');
      if (dd) { dd.classList.remove('open'); }
    }
  });
  document.querySelectorAll('[data-logout]').forEach(function(btn) {
    btn.addEventListener('click', function(e) {
      e.preventDefault();
      var dd = document.getElementById('userDropdown');
      if (dd) { dd.classList.remove('open'); }
      var logoutModal = document.getElementById('modal-logout');
      if (logoutModal) { logoutModal.style.display = 'flex'; }
    });
  });
});
