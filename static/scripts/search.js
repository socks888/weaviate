document.querySelector('#searchme').onclick = function(){
    document.getElementById('result').innerHTML = "<img src='https://icongr.am/feather/sunrise.svg?size=128&color=ede62c'></img>"
    document.getElementById('result').innerHTML += "<br><br> kiyomi is working on it ..."
  //fetch data from python endpoint
  fetch('/query', {
    headers : {
        'Content-Type' : 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "val": document.getElementById('query').value
    })
  })
  .then(response => response.json())
  .then(data => {
    //display return JSON
    console.log(data);
    document.getElementById('headline').style.display = "block";
    length = data['data']['result_length']
    console.log(length)
    // if length = 0 then says so, otherwise do the loop 
    if (length == 0) {
      html = '<p> No returns for this search. Try again, please. </p>' 
      document.getElementById('result').innerHTML = html
    } else {
    html =  '<ul>'
    for (let i = 0; i < length; i++) {
      html += '<li><button onclick=my_func("'+ data['data']['resp'][i]['_additional']['id'] +'")>More</li>'
      html += '<li>' + data['data']['resp'][i]['content'].slice(0, 250) + '</li>'
     
      document.getElementById('result').innerHTML = html
    }
    html += '</ul>'
  }
  })
  }


  function my_func(id){
    fetch('/resume', {
      headers : {
          'Content-Type' : 'application/json'
      },
      method: 'POST',
      body: JSON.stringify({
        "val": id
      })
    })
    .then(response => response.json())
    .then(data => {
      //display return JSON
      console.log(data);
      html = '<div>'
      html += data['data']['resp'] 
      html += '<div>'
      document.getElementById('result').innerHTML = html
})
}