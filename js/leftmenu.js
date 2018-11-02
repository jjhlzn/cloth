function changeMenu(id) {
  $( "#childMenu" ).html(id)
}


var childMenus = {}
childMenus["针织面料"] = ["纬编(A单面布)", "纬编(B双面布)", "经编"]
childMenus["梭织面料"] = ["平纹", "斜纹", "缎纹"]

function makeChildMenu(typeName) {
  var children = childMenus[typeName]
  var menuDiv = $('<div>')
  if (children) {
    children.forEach(function(item){
      var menu = $("<a>", {"href": "./index.html"}).html(item);
      menuDiv.append(menu)
    });
  } else {
    var menu = $("<a>", {"href": "./index.html"}).html("默认布料");
    menuDiv.append(menu)
  }
  console.log(menuDiv)
  return menuDiv
}

$(document).ready(function(){

  $("#leftmenu").css('position', 'relative');
  $("div div#mainMenu").css({
    'top': '-42px',
    'left': '0px'
  });

  $("div div#childMenu").css({
    'top': '0px',
    'left': '180px'
  });

  $( ".menuItemCombine" ).mouseover(function() {
    //console.log(this)
    if ($(this).hasClass('menuItem')) {
      var content = $(this).children().first().html()
      //$( "#childMenu" ).html(content)
      var childMenu = makeChildMenu(content)
      $( "#childMenu" ).empty()
      $('#childMenu').append(childMenu)
      $(this).addClass('menuItemSelected')
    }
    $( "#childMenu" ).show();
  });

  $( ".menuItemCombine" ).mouseleave(function() {
    if ($(this).hasClass('menuItem')) {
      //var content = $(this).children().first().html()
      //$( "#childMenu" ).html(content)
      $(this).removeClass('menuItemSelected')
    }
    $( "#childMenu" ).hide();
  });

})