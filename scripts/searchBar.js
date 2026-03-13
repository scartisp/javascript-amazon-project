// Written by: Simion Cartis

export function search(searchBar, searchButton) {
  searchButton.addEventListener('click', () => {
    eventListenerLogic(searchBar);
  });
  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      eventListenerLogic(searchBar);
    }
  });
}

function eventListenerLogic(searchBar) {
  if (searchBar.value === '') {
    window.location.href = `amazon.html?search`
    return;
  }
  window.location.href = `amazon.html?search=${(searchBar.value).toLowerCase()}`
}