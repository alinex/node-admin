// Add gravatar icon link as `avatar` to the service data.
// This needs the `email` present in the service data to work.

const crypto = require('crypto')

// Setup

// The Gravatar image service
const gravatarUrl = 'https://www.gravatar.com/avatar'
// Set the default to 60 pixel and mystery man image
const query = 's=60&d=mm'

module.exports = function (options = {}) { // eslint-disable-line no-unused-vars
  return async context => {
    const { email } = context.data
    if (email) {
      // Gravatar uses MD5 hashes from an email address to get the image
      const hash = crypto.createHash('md5').update(email.toLowerCase()).digest('hex')
      context.data.avatar = `${gravatarUrl}/${hash}?${query}`
    }
    return context
  }
}
