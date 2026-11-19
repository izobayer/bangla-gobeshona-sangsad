(function () {
  'use strict';

  const toggle = document.querySelector('.menu-toggle');
  const nav = document.querySelector('.primary-nav');

  function setMenu(open) {
    toggle.setAttribute('aria-expanded', String(open));
    toggle.querySelector('.sr-only').textContent = open ? 'মেনু বন্ধ করুন' : 'মেনু খুলুন';
    nav.classList.toggle('is-open', open);
    document.body.classList.toggle('menu-open', open);
  }

  toggle.addEventListener('click', function () {
    setMenu(toggle.getAttribute('aria-expanded') !== 'true');
  });

  nav.addEventListener('click', function (event) {
    if (event.target.closest('a')) setMenu(false);
  });

  document.addEventListener('keydown', function (event) {
    if (event.key === 'Escape') {
      setMenu(false);
      toggle.focus();
    }
  });

  window.addEventListener('resize', function () {
    if (window.innerWidth > 960) setMenu(false);
  });

  const galleryItems = Array.from(document.querySelectorAll('.gallery-item'));
  const lightbox = document.getElementById('gallery-lightbox');
  const lightboxImage = lightbox.querySelector('img');
  const lightboxCaption = lightbox.querySelector('figcaption');
  let activeImage = 0;

  function showGalleryImage(index) {
    activeImage = (index + galleryItems.length) % galleryItems.length;
    const item = galleryItems[activeImage];
    const source = item.querySelector('img');
    lightboxImage.src = source.src;
    lightboxImage.alt = source.alt;
    lightboxCaption.textContent = item.dataset.caption;
  }

  galleryItems.forEach(function (item, index) {
    item.addEventListener('click', function () {
      showGalleryImage(index);
      lightbox.showModal();
    });
  });

  lightbox.querySelector('.lightbox-prev').addEventListener('click', function () {
    showGalleryImage(activeImage - 1);
  });

  lightbox.querySelector('.lightbox-next').addEventListener('click', function () {
    showGalleryImage(activeImage + 1);
  });

  lightbox.querySelector('.lightbox-close').addEventListener('click', function () {
    lightbox.close();
  });

  lightbox.addEventListener('click', function (event) {
    if (event.target === lightbox) lightbox.close();
  });

  lightbox.addEventListener('keydown', function (event) {
    if (event.key === 'ArrowLeft') showGalleryImage(activeImage - 1);
    if (event.key === 'ArrowRight') showGalleryImage(activeImage + 1);
  });

  const revealItems = document.querySelectorAll('.reveal');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add('is-visible'); });
  }

  document.getElementById('year').textContent = new Date().getFullYear().toLocaleString('bn-BD', { useGrouping: false });
})();
