(function(window) {

function xhr(url, cb) {
  var oReq = new XMLHttpRequest();
  oReq.addEventListener("load", function () {
    cb(this.responseText);
  });
  oReq.open("GET", url);
  oReq.send();
}

function get(id, cb) {
  var url = 'https://kawal-c1.appspot.com/api/c/';
  xhr(url + id + '?' + new Date().getTime(), function (res) {
    cb(JSON.parse(res));
  });
}

function $(selector) {
  return document.querySelectorAll(selector)[0];
}

function draw(cov) {
  var data = google.visualization.arrayToDataTable([
    ['Label', 'Value'],
    ['%TPS', cov],
  ]);
  var options = {
    width: 250,
    height: 250,
    minorTicks: 5,
  };

  var chart = new google.visualization.Gauge($('#chart'));
  chart.draw(data, options);

  $('#desc').style.display = 'block'
}

function stat() {
  get(0, function(c) {
    var total = 0;
    var cakupan = 0;
    for (var i=0; i<c.children.length; i++) {
      var ch = c.children[i];
      var id = ch[0];
      total += ch[2];
      var d = c.data[id]
      cakupan += d && d.sum && d.sum.cakupan || 0
    }
    var cov = Math.round(cakupan / total * 100)

    $('#cakupan').innerHTML = cakupan.toLocaleString('id', {useGrouping: true})
    $('#ntps').innerHTML = total.toLocaleString('id', {useGrouping: true})
    $('#cov').innerHTML = cov + '%'

    google.charts.load('current', {'packages':['gauge']});
    google.charts.setOnLoadCallback(function() {
      draw(cov);
    });
  });
}

window.kp_stat = stat;

})(window);

