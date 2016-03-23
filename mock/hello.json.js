module.exports = function*() {
  this.body = {
    success: true,
    result: 'hello ' + (this.query.name || 'world')
  };
};