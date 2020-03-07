const { series, src, dest } = require('gulp')
const del = require('del')
const zip = require('gulp-zip')

function clean () {
  return del('/dist/**')
}

function build () {
  return src(['*.js', '!gulpfile.js'])
    .pipe(zip('release.zip'))
    .pipe(dest('dist'))
}
/*
function commit () {
  return src('dist/*')
    .pipe(git.add())
    .pipe(git.commit('zipped micro'))
}

// push to release branch the commit made by commit task
function push () {
  return src('dist/*')
    .pipe(git.push('origin', 'release'))
}

// makes a tag with the version in semver standard
function tag () {
  return src('./src/*.js')
    .pipe(version(__dirname, './package.json'))
    .pipe(dest('./dist'))
    .pipe(push('origin', 'release', { args: '--tags' }))
}
*/

exports.default = series(clean, build)
