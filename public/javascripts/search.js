var ul = document.getElementById("browseSearch")
var listTag = ul.getElementsByTagName('li')

for (let i = 0; i <= listTag.length - 1; i++) {
    console.log (listTag[i].innerHTML);
}