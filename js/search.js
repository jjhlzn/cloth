$(document).ready(function(){
  setSelectValueButtonsWidth()

  var searchFields = [
    {
      name: '分类',
      values: ['纬编单面', '纬编双面', '经编', '梭织平纹', '梭织斜纹', '梭织缎纹'],
      hasMultipleSelect: true,
    },
    {
      name: '成分',
      values: '人棉 羊毛 亚麻 莫代尔 人造丝 真丝 腈纶 天丝 铜氨 苎麻 醋酯纤维 竹纤维 金银纱 索罗娜 棉  再生涤  有机棉'.split(/\s+/),
      hasMultipleSelect: true,
    },
    
    {
      name: '名称',
      values: '双面布 空气层 汗布 氨纶汗布 氨纶小提花 氨纶横条布 鸟眼布 抽针双面布 珊瑚绒 桃皮绒 pk布 法兰绒'.split(/\s+/)
    },
    {
      name: '克重',
      values: ['10', '20', '30', '40', '50']
    },
    {
      name: '颜色',
      values: ['红色', '蓝色', '绿色', '橙色', '黑色', '白色']
    },
    {
      name: '关键字',
      values: ['关键字1', '关键字2', '关键字3']
    }, 
  ];

  for(var i = 0; i < searchFields.length; i++) {
	 
    $('#searchContainer').append(makeSearchField(searchFields[i]));
  }

  $('#searchContainer').append($('<div>', {'class': 'searchLine'}));

  $('#searchContainer .s_btn_more').click(function() {
    console.log(this);
    //console.log($($(this).parent().parent().children()[1]).children())
    var btnTxtDiv = $(this).children().first().children().first();
    var btnImg = $(this).children().first().children()[1];
    console.log(btnTxtDiv)

    var searchName = $(this).parent().parent().children()[0];
    var searchValues = $(this).parent().parent().children()[1];
    var lines = $($(this).parent().parent().children()[1]).children();
    if ($(this).hasClass('expanded')) {  //已经展开了
      $(this).removeClass('expanded')
      for(var i = 0; i < lines.length; i++) {
        if (i == 0) {
          $(lines[i]).show();
        } else {
          $(lines[i]).hide();
        }
      }

      //设置search_field的高度
      $(searchName).height(28);
      btnTxtDiv.html('更多&nbsp;');
      btnImg.src = 'images/down-arrow.png';
    } else {
      $(this).addClass('expanded')
      console.log(lines)
      for(var i = 0; i < lines.length; i++) {
        $(lines[i]).show();
      }

      //设置search_field的高度
      $(searchName).height($(searchValues).height());
      btnTxtDiv.html('收起&nbsp;');
      btnImg.src = 'images/up-arrow.png';
    }
    
  });

  $('#searchContainer .s_btn_multiple_select').click(function() {
    clickMutipleSelectBtn(this);
  });


  $('#searchContainer .s_item').click(function() {
    //console.log('item click');
    var selectValue = $(this).html();
    console.log(selectValue);
    var searchField = $(this).parent().parent().parent().children().first().html();
    searchField = searchField.substr(0, searchField.length - 1)
    console.log(searchField)
    var father = $(this).parent().parent().parent();
    addSearchValue(searchField, [selectValue], father)
    //隐藏这个分类
    
    father.hide();
  });



});


function clickMutipleSelectBtn(btn) {
    var self = btn;

    console.log(btn);
    //console.log($($(this).parent().parent().children()[1]).children())
    var btnTxtDiv = $(btn).children().first().children().first();
    var btnImg = $(btn).children().first().children()[1];
    console.log(btnTxtDiv)

    var searchName = $(btn).parent().parent().children()[0];
    var searchValues = $(btn).parent().parent().children()[1];
    var lines = $($(btn).parent().parent().children()[1]).children();
    if ($(btn).hasClass('expanded')) {  //已经展开了
      $(btn).removeClass('expanded')
      for(var i = 0; i < lines.length; i++) {
        if (i == 0) {
          $(lines[i]).show();
        } else {
          $(lines[i]).hide();
        }
      }

      //设置search_field的高度
      $(searchName).height(28);
      btnTxtDiv.html('更多&nbsp;');
      btnImg.src = 'images/down-arrow.png';
    } else {
      $(btn).addClass('expanded')
      Array(lines).forEach(function(item) {
        $(item).show();
      });

      //设置search_field的高度
      $(searchName).height($(searchValues).height());
      btnTxtDiv.html('收起&nbsp;');
      btnImg.src = 'images/up-arrow.png';
    }
}

function makeMoreLikeButton(text, clazz, imageUrl) {
  return $('<a>', {'href': '#', 'class': 's_btn ' + clazz})
  .append($('<div>', {'class': 's_btn_container_more'})
            .append($('<div>', {'class': 's_btn_name'}).html(text + "&nbsp;"))
            .append($('<img>',{'class': 's_btn_img', 'src': imageUrl})));
}

/**   创建搜索的一行 */
function makeSearchField(searchField) {
  if (!searchField)
	  return;
  var searchFieldName = searchField['name'];
  var searchValues = searchField['values'];
  var hasMultipleSelect = searchField['hasMultipleSelect'];
  //console.log(searchValues)
  var searchValuesDiv = $('<div>', {'class': 'search_values'});
  var groups = _.chunk(searchValues, 7);

  //值按钮
  for(var i = 0; i < groups.length; i++) {
    var valueLine = $('<div>', {'class': 'search_values_line', 'style': i != 0 ? 'display: none;' : ''});
    searchValuesDiv.append(valueLine);
    var group = groups[i];
    for(var j = 0; j < group.length; j++) {
      valueLine.append($('<input>', {'type': 'checkbox', 'style': 'display: none;', 'value': group[j]}))
        .append($('<a>', {'href': '#', 'class': 's_item'}).html(group[j]));
    }
  }

  //更多按钮
  var searchButtonsDiv = $('<div>', {'class': 'search_buttons'});
  if (groups.length > 1) {
    var searchButton = makeMoreLikeButton('更多', 's_btn_more', 'images/down-arrow.png');
    searchButtonsDiv.append(searchButton);                    
  }

  //多选按钮
  if (hasMultipleSelect) {
    var multiSelectBtn = makeMoreLikeButton('多选', 's_btn_multiple_select', 'images/plus.png');
    searchButtonsDiv.append(multiSelectBtn);           
  }


  var searchLine = $('<div>', {'class': 'searchLine'})
                    .append($('<div>', {'class': 'search_field'}).html(searchFieldName+':'))
                    .append(searchValuesDiv)
                    .append(searchButtonsDiv);

  return searchLine;
}

/**  点击搜索的一个按钮的值后，添加这个值  **/
function addSearchValue(searchFieldName, selectValues, father) {
  /*
  <a href="#" class="s_btn">
      <div class="s_btn_container"  id="test">
        <div class="s_btn_name" id="moreButton">
          <span id="name">tttt</span>
        </div>
        &nbsp;
        <img class="s_btn_img" src="images/close-red.png" />
      </div>
  </a>
  */
  var valueStr = '';
  for(var i = 0; i < selectValues.length; i++) {
    valueStr += selectValues[i] + ' ';
  }
  var div = $('<a>', {'href': '#', 'class': 's_btn', 'field': searchFieldName, 'values': selectValues})
                                                .append( $('<div>', {'class': 's_btn_container'})
                                                            .append($('<div>', {'class': 's_btn_name'}).append($('<span>').html(searchFieldName + '：' + valueStr)))
                                                            .append($('<span>').html('&nbsp;'))
                                                            .append($('<img>', {'class': 's_btn_img', 'src': 'images/close-red.png'})));

  div.click(function(){
    $(this).remove();
    father.show();
  });                                                          
  console.log(div)

  div.appendTo('#seletedValuesDiv');
}



function setSelectValueButtonsWidth() {
  $('#seletedValuesDiv .s_btn_container').each(function (i, item) {
    var span =  $($(item).children()[0]).children()[0];
    setSelectValueButtonWidth(span)
  });
}

function setSelectValueButtonWidth(button) {
  $(button).width( $(button).width() + 23 );
}


