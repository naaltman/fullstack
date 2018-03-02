function loadAjax(){
  var random_pug_url = "https://dog.ceo/api/breed/pug/images/random"
  var random_mp_url = "https://dog.ceo/api/breed/bulldog/images/random"
  var random_lp_url = "https://dog.ceo/api/breed/mastiff/bull/images/random"

  console.log("making fetch to", random_pug_url)

  fetch(random_pug_url)
    .then(resp=>{
      console.log(resp)
      resp.json()
        .then(json => {
          console.log(json)
          document.getElementById('random_pug')
            .src=json.message

          console.log(document.getElementById('random_pug'))
        })
        .catch()
    })
    .catch( error => console.log("ERROR" + error))

    fetch(random_mp_url)
      .then(resp=>{
        console.log(resp)
        resp.json()
          .then(json => {
            console.log(json)
            document.getElementById('random_bulldog')
              .src=json.message

            console.log(document.getElementById('random_bulldog'))
          })
          .catch()
      })
      .catch( error => console.log("ERROR" + error))

      fetch(random_lp_url)
        .then(resp=>{
          console.log(resp)
          resp.json()
            .then(json => {
              console.log(json)
              document.getElementById('random_mastiff')
                .src=json.message

              console.log(document.getElementById('random_mastiff'))
            })
            .catch()
        })
        .catch( error => console.log("ERROR" + error))
}


document.addEventListener("DOMContentLoaded", loadAjax)
