// start the function with click
document.querySelector('#showme').onclick = function(){
    //val = document.getElementById('search_box').value
    document.querySelector("#textbox").style.display = "none";
    //document.querySelector("#results").style.display = "block";
    document.getElementById('results').innerHTML = "<img src='https://icongr.am/feather/sunrise.svg?size=128&color=ede62c'></img>"
    document.getElementById('results').innerHTML += "<br><br>kimi5 is working on it ..."
//fetch data from python endpoint
fetch('/davinci', {
    headers : {
        'Content-Type' : 'application/json'
    },
    method: 'POST',
    body: JSON.stringify({
      "val": document.getElementById('search_box').value
    })
  })
  .then(response => response.json())
  .then(data => {
    //display return JSON
    console.log(data);
    document.querySelector("#reset").style.display = "block";
    document.getElementById('results').innerHTML = data['message']['val']
  })
}


document.querySelector('#reset').onclick = function(){
    document.querySelector("#reset").style.display = "none";
    document.querySelector("#results").style.display = "none";
    document.querySelector("#textbox").style.display = "block";
    window.location = "/search";
    document.getElementById('query').value = "";
}