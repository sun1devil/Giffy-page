


$(document).ready(function(){
    // var header = $("<header></header>").text("Funny Crashes")
    var topics = ["funny snowboard fall", "funny bike crashes", " funny skateboard crashes"]
    var buttons = $("#buttons")
    for (let i = 0; i < topics.length; i++){
        let button = $("<li>" + topics[i] + "</li>")
        buttons.append(button)
    }
    buttons.on("click", function (event){
        $("#images").empty()
        console.log(event.target.innerHTML)
        var subject = event.target.innerHTML
        giffy(subject)
    })

})
var GIFFYAPIKEY = "g1d4gakXFH1MwChmMWq1CzN4xucfdwlc"
var GIFFYURL = "http://api.giphy.com/v1/gifs/search?api_key=" + GIFFYAPIKEY + "&q="
function giffy(subject){
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
            let gifimage = data["data"][i]["images"]["fixed_height"]["url"]
            let li = $("<li></li>")
            let image = $("<img></img>")
            let rating = $('<p>"rating"</p>')
            image.attr("src", urlstillimage)
            li.append(image)
            images.append(li)
            rating.append(rating)
        }
    })

    
    return true
}
