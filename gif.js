


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
            let rating = (data["data"][i]["rating"])
            let li = $("<li></li>")
            let stillimage = $("<img></img>")
            let gifimage = $("<img></img>")
            let ratingText = $('<p></p>')
            stillimage.attr("src", urlstillimage)
            gifimage.attr("src",urlgifimage)
            li.append(stillimage)
            console.log(gifimage)
            images.append(li)
            ratingText.append(rating)
            }
        })
}   
//Display rating//
// //Onclick of image play gif second click revert back to still//
// images.on("click", function (event){
//     console.log(true) 
//     })

//onclick of submit, call Giffy for text submit, displayimages and create new button//
