let text = "";

function loop(item, index) {
  text += `<button type="button" class="btn btn-primary"><a  style="text-decoration:none; color:white" target="_blank" href="${item["url"]}">Story ${index+1}</a></button>`;
  // text += `<button type="button" class="btn"><a  style="text-decoration:none;" target="_blank" href="${item['url']}">BUTTON ${index}</a</button> <br>`;
}

let usr_id = "";
let url = "";

function display(){

document.getElementById('loader').style.opacity="1";

}
function hide(){

document.getElementById('loader').style.opacity="0";

}


function usr_i() {
  display();
  text="";
  let parent = document.getElementById('try');
  let var1   = parent.getElementsByTagName('button');
  
  for(var i = var1.length; i--;) {
      var1[i].parentNode.removeChild(var1[i]);
  }

  let user_name = document.getElementById("usr_name_id").value;
  fetch(
    "https://instagram-stories1.p.rapidapi.com/v1/get_user_id?username=" +
      user_name,
    {
      method: "GET",
      headers: {
        "x-rapidapi-host": "instagram-stories1.p.rapidapi.com",
        "x-rapidapi-key": "a7c3efb5eemsh9a6a6f335e95d17p12ce36jsn6060446d995e",
      },
    }
  )
    .then((response) => {if (response.status >= 200 && response.status <= 299) {
      return response.json();
    } else {
      console.log("error");
    }})
    .then((data) => {
      usr_id = data.user_id;
      console.log(usr_id);

      fetch(
        "https://instagram-stories1.p.rapidapi.com/v1/get_stories?userid=" +
          usr_id,
        {
          method: "GET",
          headers: {
            "x-rapidapi-host": "instagram-stories1.p.rapidapi.com",
            "x-rapidapi-key":
              "a7c3efb5eemsh9a6a6f335e95d17p12ce36jsn6060446d995e",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          hide();
          url = data.downloadLinks;

          url.forEach(loop);

          document.getElementById("try").innerHTML = text;
        })
        .catch((err) => {
          console.error(err);
        });
    })
    .catch((err) => {
      console.error(err);
    });
}
