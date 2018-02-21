// code by Lundin Matthews -- HKD987

const mainView = document.getElementById('mainView')
const searchBox = document.getElementById('searchBox')
const searchButton = document.getElementById('searchButton')
const resetViewButton = document.getElementById('resetView')
const store = [] // built on page load from the axios JSON pull.

fetch('https://raw.githubusercontent.com/openfaas/store/master/store.json')
  .then((blob) => blob.json())
  .then((res) => store.push(...res))
  .then(() => runMainView(store, mainView))
  .catch((err) => console.log(err))

// helper function to soft array for view
const findMatches = (wordToMatch, someArray) => {
  return someArray.filter(item => {
    const regex = new RegExp(wordToMatch, 'gi') // uppper lower doesnt matter and case insinsitve
    return item.title.match(regex)
  })
}

// main view build for app
const runMainView = (array, inject) => { // view function can be run with any array and item
  const html = array.map((item) => {
    return `<div class="column is-one-quarter">
              <div class="card">
                <header class="card-header">
                  <p class="card-header-title">${item.title}</p>
                  </header>
                  <div class="card-content">
                    <div class="content">
                      <p>${item.description}</p>
                    </div>
                  </div>
                <footer class="card-footer">
                  <a class="card-footer-item" href="${item.repo_url}">Repo URL</a>
                </footer>
              </div>
          </div>`
  }).join('')
  inject.innerHTML = html
}

// takes value from search box and builds new array then takes and builds new view
const searchMatchView = () => { // run to find search values and display items
  const matchArray = findMatches(searchBox.value, store)
  runMainView(matchArray, mainView) // use new array from above to build new view.
  searchBox.value = '' // reset search box
}

const resetView = () => runMainView(store, mainView)

searchButton.addEventListener('click', searchMatchView) // search for matches in the input box on page
resetViewButton.addEventListener('click', resetView)  // reset and view all
