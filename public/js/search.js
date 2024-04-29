document.addEventListener('DOMContentLoaded',() => {
    const searchBtn = document.querySelector('.searchBtn');
    const searchBar = document.querySelector('.searchBar');
    const searchInput = document.getElementById('searchInput');
    const searchCloseBtn = document.getElementById('searchClose')
    searchBtn.addEventListener('click', () => {
      searchBar.classList.add('open');
      searchBtn.setAttribute('aria-expanded','true')
      searchInput.focus();
    });
  searchCloseBtn.addEventListener('click',() => {
     searchBar.classList.remove('open');
     searchBtn.setAttribute('aria-expanded', 'false');
  })
})