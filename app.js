// code by Lundin Matthews so call me maybe?

const mainView = document.getElementById('mainView')
const searchBox = document.getElementById('searchBox')
const searchButton = document.getElementById('searchButton')
const resetViewButton = document.getElementById('resetView')
const store = []

// defined on page load
axios.get('https://raw.githubusercontent.com/openfaas/store/master/store.json')
  .then((res) => { // create the store
    store.push(...res.data)
    runMainView(store, mainView)
  })
.catch((err) => { // if err let me know
  console.log(err)
})

const findMatches = (wordToMatch, someArray) => { // called by the displayMatches function
  return someArray.filter(item => { // helper function to filter for matches in the studentArray
    const regex = new RegExp(wordToMatch, 'gi') // uppper lower doesnt matter and case insinsitve
    return item.title.match(regex)
  })
}

const runMainView = (array, inject) => {
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

const searchMatchView = () => {
  const matchArray = findMatches(searchBox.value, store)
  runMainView(matchArray, mainView)
  searchBox.value = ''
}

const resetView = () => {
  runMainView(store, mainView)
}

searchButton.addEventListener('click', searchMatchView)
resetViewButton.addEventListener('click', resetView)
