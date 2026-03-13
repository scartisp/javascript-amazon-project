// Written by: Simion Cartis

/**
 * function for retrieving whatever was typed in the search bar. Used for all pages with search bar
 * @param {object} searchBar the search bar object on the page
 * @param {object} searchButton the search button object on the page
 */
export function search(searchBar, searchButton) {
  searchButton.addEventListener('click', () => {
    eventListenerLogic(searchBar.value);
  });
  searchBar.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
      eventListenerLogic(searchBar.value);
    }
  });
}

/**
 * helper function that handles the logic of going to the home page with any potential serach params
 * @param {string} searchBarValue the value within the search bar object
 */
function eventListenerLogic(searchBarValue) {
  if (searchBarValue === '') {
    window.location.href = `amazon.html?search`
    return;
  }
  window.location.href = `amazon.html?search=${(searchBarValue).toLowerCase()}`
}