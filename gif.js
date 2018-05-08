

//load page elements before performing functions//
$(document).ready(function()
{
//    Declare Variable to populate array and  button id//
    var topics = ["snowboard fail", "bike fail", "skateboard fail", "cat fail", "baseball fail"]
    var buttons = $("#buttons")
    // for loop to cover the array and add a button to container// 
    for (let i = 0; i < topics.length; i++)
    {
        let button = $("<li>" + topics[i] + "</li>")
        buttons.append(button)
    }
    //listener for a click of images and clear content to be ready for next set produced by function giffy.
    buttons.on("click", function (event)
        {
            $("#images").empty()
            // console.log(event.target.innerHTML)
            var subject = event.target.innerHTML
            giffy(subject)
        })
        // start with static image on click. When image data is still url from API, switch to animated else go back to still.  
    $("#images").on("click", function(event)
        {
            let stillurl = $(event.target).data("still")
            let animatedUrl = $(event.target).data("animated")
            let src = event.target.src
            if (src === stillurl)
                event.target.src = animatedUrl
            else 
                event.target.src = stillurl
        })    
        $("#images2").on("click", function(event)
        {
            let stillurl = $(event.target).data("still")
            let animatedUrl = $(event.target).data("animated")
            let src = event.target.src
            if (src === stillurl)
                event.target.src = animatedUrl
            else 
                event.target.src = stillurl
        })
        //listen for click of fail button, create new topic, append "fail"and push to the array. create new button with the users text
    $("#fail-button").on("click", function(event)
        {
            let newTopic = $("#user-text").val()
            newTopic += " fail"
            topics.push(newTopic)
            let button = $("<li>" + newTopic + "</li>")
            buttons.append(button)
            $("#user-text").val("") 
        })
            //trigger a click of fail button when user hits enter
            $(document).bind('keypress', function(event)
            {
              if (event.keyCode === 13)
              {
                event.preventDefault();
                $("#fail-button").trigger("click");
              }  
        })  
})
//Variables used to store and concatenate URL and API key
var GIFFYAPIKEY = "g1d4gakXFH1MwChmMWq1CzN4xucfdwlc"
var GIFFYURL = "http://api.giphy.com/v1/gifs/search?api_key=" + GIFFYAPIKEY + "&q="
// Primary logic for accessing giphy and pulling in content
function giffy(subject)
// initial setup and placeholder for images based on subject text
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
        // Run loop 10 times extracting still, animated url's and rating upon retrieval place them in placeholders. 
        for (let i=0; i < 10; i++)
        {
        //     console.log(data["data"][i]["images"]["fixed_height_still"]["url"])
        //     console.log(data["data"][i]["images"]["fixed_height"]["url"])
        //     console.log(data["data"][i]["rating"])
            // based on giphy requirements grab content for each [i] and dynamically place on page based on tags
            let urlstillimage = data["data"][i]["images"]["fixed_height_still"]["url"]
            let urlgifimage = data["data"][i]["images"]["fixed_height"]["url"]
            let rating = data["data"][i]["rating"]
            // list to place images
            let li = $("<li></li>")
            let stillimage = $("<img></img>")
            stillimage.data("animated", urlgifimage)
            stillimage.data("still", urlstillimage)
            let ratingText = $('<p></p>')
            ratingText.text(rating)
            stillimage.attr("src", urlstillimage)
            li.append(stillimage)
            li.append(ratingText)
            // Seperating images by 5 and appending to 2 different buckets. made my css easier.
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


