


$(document).ready(function()
{
    // var header = $("<header></header>").text("Funny Crashes")
    var topics = ["snowboard fail", "bike fail", "skateboard fail"]
    var buttons = $("#buttons")
    for (let i = 0; i < topics.length; i++)
    {
        let button = $("<li>" + topics[i] + "</li>")
        buttons.append(button)
    }
    buttons.on("click", function (event)
        {
            $("#images").empty()
            console.log(event.target.innerHTML)
            var subject = event.target.innerHTML
            giffy(subject)
        })
    $("#images").on("click", function(event)
        {
            let stillurl = $(event.target).data("still")
            let animatedUrl = $(event.target).data("animated")
            let src = event.target.src
            if (src === stillurl)
                event.target.src = animatedUrl
            else 
                event.target.src = stillurl
        }
        )
    $("#fail-button").on("click", function(event)
        {
            let newTopic = $("#user-text").val()
            newTopic += " fail"
            topics.push(newTopic)
            let button = $("<li>" + newTopic + "</li>")
            buttons.append(button)
            $("#user-text").val("") 
        })
})
var GIFFYAPIKEY = "g1d4gakXFH1MwChmMWq1CzN4xucfdwlc"
var GIFFYURL = "http://api.giphy.com/v1/gifs/search?api_key=" + GIFFYAPIKEY + "&q="
function giffy(subject)
{
    let finalurl = GIFFYURL + subject
    finalurl = encodeURI(finalurl)
    var images = $("#images")
    $.get(finalurl, function(data)
    {
        // console.log(data["data"][0])
        for (let i=0; i < 10; i++)
        {
            console.log(data["data"][i]["images"]["fixed_height_still"]["url"])
            console.log(data["data"][i]["images"]["fixed_height"]["url"])
            console.log(data["data"][i]["rating"])
            let urlstillimage = data["data"][i]["images"]["fixed_height_still"]["url"]
            let urlgifimage = data["data"][i]["images"]["fixed_height"]["url"]
            let rating = data["data"][i]["rating"]
            let li = $("<li></li>")
            let stillimage = $("<img></img>")
            stillimage.data("animated", urlgifimage)
            stillimage.data("still", urlstillimage)
            let ratingText = $('<p></p>')
            ratingText.text(rating)
            stillimage.attr("src", urlstillimage)
            li.append(stillimage)
            li.append(ratingText)
            images.append(li)
        }
    })
}   

{/* <img src="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-still="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200_s.gif" data-animate="https://media1.giphy.com/media/3o85xkQpyMlnBkpB9C/200.gif" data-state="still" class="gif">
  

<img src="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-still="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200_s.gif" data-animate="https://media2.giphy.com/media/8rFQp4kHXJ0gU/200.gif" data-state="still" class="gif">

<img src="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-still="https://media3.giphy.com/media/W6LbnBigDe4ZG/200_s.gif" data-animate="https://media3.giphy.com/media/W6LbnBigDe4ZG/200.gif" data-state="still" class="gif">


<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/3.2.1/jquery.min.js"></script>
<script type="text/javascript">
  $(".gif").on("click", function() {
    // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
    var state = $(this).attr("data-state");
    // If the clicked image's state is still, update its src attribute to what its data-animate value is.
    // Then, set the image's data-state to animate
    // Else set src to the data-still value
    if (state === "still") {
      $(this).attr("src", $(this).attr("data-animate"));
      $(this).attr("data-state", "animate");
    } else {
      $(this).attr("src", $(this).attr("data-still"));
      $(this).attr("data-state", "still");
    }
  });
</script> */}


// //onclick of submit, call Giffy for text submit, displayimages and create new button clear textbox//
// var failButton = $("#fail-button")
// var userText = $("#user-text")
// failButton.on("click", function (event)
// {
//     topics.push(userText)
//     buttons.append(userText)
// })

// {
//     $("#images").empty()
//     console.log(event.target.innerHTML)
//     var subject = event.target.innerHTML
//     giffy(subject)
// }

