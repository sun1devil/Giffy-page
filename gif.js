


$(document).ready(function()
{
    // var header = $("<header></header>").text("Funny Crashes")
    var topics = ["snowboard fail", "bike fail", "skateboard fail", "cat fail"]
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
            $(document).bind('keypress', function(event)
            {
              if (event.keyCode === 13)
              {
                event.preventDefault();
                $("#fail-button").trigger("click");
              }  
        })  
})
var GIFFYAPIKEY = "g1d4gakXFH1MwChmMWq1CzN4xucfdwlc"
var GIFFYURL = "http://api.giphy.com/v1/gifs/search?api_key=" + GIFFYAPIKEY + "&q="
function giffy(subject)
{
    let finalurl = GIFFYURL + subject
    finalurl = encodeURI(finalurl)
    var images = $("#images")
    var images2 =$("#images2")
    images.empty()
    images2.empty()
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
            if (i < 5)
            {
                images.append(li)
            }
            else
            {
                images2.append(li)
            }
            
            
        }
    })
}   


