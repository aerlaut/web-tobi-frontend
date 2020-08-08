let auth = function (history) {
  // Check for token
  if (!localStorage.getItem('token')) {
    localStorage.clear()
    history.push('/login')
    return false
  }

  return true
}
// Get function to get page data
let getPageData = function () {
  let url = null
  let handler = null

  if (arguments.length == 1) {
    url = window.location.pathname
    handler = arguments[0]
  } else if (arguments.length == 2) {
    url = arguments[0]
    handler = arguments[1]
  }

  fetch(`${process.env.REACT_APP_API_URL}${url}`) // url includes beginning '/'
    .then((res) => {
      if (!res.ok) {
        throw new Error()
      }
      return res.json()
    })
    .then((res) => {
      handler(res)
    })
    .catch((err) => console.error(err))
}

export { auth, getPageData }
