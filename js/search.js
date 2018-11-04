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

});


function clickSearchItemWhenMutileSelect() {
  //console.log('clickSearchItemWhenMutileSelect')

  //console.log(this.tagName)
 // console.log(this);
  var checkbox = $(this).parent().children().first();
  console.log(checkbox)

  if (this.tagName != 'INPUT') {
    checkbox.prop('checked', !checkbox.prop('checked'));
  }
  console.log('checked = ' + checkbox.prop('checked'))

  var ancestor = $(this).parent().parent().parent().parent();
  console.log(ancestor)
  setConfirmBtnState(ancestor);
  
}

function clickSearchItemWhenNormal() {
  //console.log('clickSearchItemWhenNormal')
  console.log(this);
  var selectValue = $(this).html();
  console.log(selectValue);
  var ancestor = $(this).parent().parent().parent().parent();
  var searchFieldName = ancestor.children().first().html();
  searchFieldName = searchFieldName.substr(0, searchFieldName.length - 1)
  console.log("fieldName: " + searchFieldName)

  addSearchValue(searchFieldName, [selectValue], ancestor)
  //隐藏这个分类
  
  ancestor.hide();
}

function clickMutipleSelectBtn() {
    //console.log($($(this).parent().parent().children()[1]).children())
    var searchName = $(this).parent().parent().children()[0];
    var searchValues = $(this).parent().parent().children()[1];
    var lines = $($(this).parent().parent().children()[1]).children();
    var ancestor = $(this).parent().parent();
    
    $(this).addClass('expanded')
    for(var i = 0; i < lines.length; i++) {
      $(lines[i]).show();
    }
    //设置search_field的高度
    ancestor.find("input[type='checkbox']").show();
    ancestor.find(".s_item").off('click').click((clickSearchItemWhenMutileSelect));
    ancestor.find('.m_select_confirm_div').show();
    console.log(ancestor.find('.m_select_confirm_div').height())
    $(searchName).height($(searchValues).height() + ancestor.find('.m_select_confirm_div').height());
    ancestor.find('.s_btn').hide();

    setSearchFieldToInitial(ancestor);
}

function setConfirmBtnState(lineDiv) {
  //console.log(lineDiv.find("input[type='checkbox']"))
  console.log(lineDiv.find("input[type='checkbox']"))

  var hasChecked = false;
  lineDiv.find("input[type='checkbox']").each(function(item){
      if ($(item).prop('checked')) {
        hasChecked = true;
      }
  });

  console.log('hasChecked = ' + hasChecked)
  console.log(lineDiv.find("input[type='checkbox']:checked").length)
  if (lineDiv.find("input[type='checkbox']:checked").length > 0) {
    lineDiv.find('.m_select_div_btn_confirm').removeClass('m_select_div_btn_inactive');
  } else {
    lineDiv.find('.m_select_div_btn_confirm').addClass('m_select_div_btn_inactive');
  }
}



function setSearchFieldToInitial(lineDiv) {
  lineDiv.find("input[type='checkbox']").prop('checked', false);
  setConfirmBtnState(lineDiv);
}

function clickConfirmMultipleSelectBtn() {
  console.log(this);
  var ancestor = $(this).parent().parent();
  var searchFieldName = ancestor.children().first().html();
  searchFieldName = searchFieldName.substr(0, searchFieldName.length - 1);
  var selectBoxes = ancestor.find("input[type='checkbox']:checked");
  var values = [];
  selectBoxes.each(function(index, item) {
    values.push(item.value);
  });
  //console.log(values);
  addSearchValue(searchFieldName, values, ancestor);
  closeSearchLineDiv(this)

  ancestor.hide();
}

function clickCancelMutileSelectBtn() {
  closeSearchLineDiv(this)
}

function closeSearchLineDiv(btn) {
  var searchName = $(btn).parent().parent().children()[0];
  var searchValues = $(btn).parent().parent().children()[1];
  var lines = $($(btn).parent().parent().children()[1]).children();
  var ancestor = $(btn).parent().parent();
  
  $(btn).removeClass('expanded')
  for(var i = 0; i < lines.length; i++) {
    if (i != 0) {
      $(lines[i]).hide();
    }
  }
  //设置search_field的高度
  ancestor.find("input[type='checkbox']").hide();
  ancestor.find(".s_item").off('click').click(clickSearchItemWhenNormal);
  ancestor.find('.m_select_confirm_div').hide();
  console.log($(searchValues).height())
  $(searchName).height($(searchValues).height() - 8);
  ancestor.find('.s_btn').show();
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
      var itemDiv = $('<a>', {'href': '#', 'class': 's_item'}).html(group[j]);
      var checkBox = $('<input>', {'type': 'checkbox', 'style': 'display: none;', 'value': group[j]});
      valueLine.append($('<div>')
                          .append(checkBox)
                          .append(itemDiv));
      itemDiv.click(clickSearchItemWhenNormal);
      checkBox.click(clickSearchItemWhenMutileSelect);
      
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
    multiSelectBtn.click(clickMutipleSelectBtn)
    searchButtonsDiv.append(multiSelectBtn);        

  }



  var searchLine = $('<div>', {'class': 'searchLine'})
                    .append($('<div>', {'class': 'search_field'}).html(searchFieldName+':'))
                    .append(searchValuesDiv)
                    .append(searchButtonsDiv);

  //在多选的时候，确认或取消
  /*
  <div class="m_select_confirm_div"> 
          <div class="m_select_div_btn ">确认</div> 
          <div class="m_select_div_btn m_select_div_btn_cancel">取消</div>
        </div>
  */
 if (hasMultipleSelect) {
    var confirmBtn = $('<div>', {'class': 'm_select_div_btn m_select_div_btn_confirm'}).html('确认');
    var cancelBtn = $('<div>', {'class': 'm_select_div_btn m_select_div_btn_cancel'}).html('取消');
    var mselectConfirmDiv = $('<div>', {'class': 'm_select_confirm_div', 'style': 'display: none;'})
                              .append(confirmBtn)
                              .append(cancelBtn);

    confirmBtn.click(clickConfirmMultipleSelectBtn);
    cancelBtn.click(clickCancelMutileSelectBtn);
    searchLine.append(mselectConfirmDiv);
 }
                 

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
  //console.log(div)

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


