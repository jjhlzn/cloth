function makeSearchField(searchFieldName, searchValues) {
  //console.log(searchValues)
  var searchValuesDiv = $('<div>', {'class': 'search_values'});
  var groups = _.chunk(searchValues, 9);
  for(var i = 0; i < groups.length; i++) {
    var valueLine = $('<div>', {'class': 'search_values_line', 'style': i != 0 ? 'display: none;' : ''});
    searchValuesDiv.append(valueLine);
    var group = groups[i];
    for(var j = 0; j < group.length; j++) {
      valueLine.append($('<a>', {'href': '#', 'class': 's_item'}).html(group[j]));
    }
  }

  var searchButtonsDiv = $('<div>', {'class': 'search_buttons'});
  if (groups.length > 1) {
    var searchButton = $('<a>', {'href': '#', 'class': 's_btn'})
                        .append($('<div>', {'class': 's_btn_container_more'})
                                  .append($('<div>', {'class': 's_btn_name'}).html("更多&nbsp;"))
                                  .append($('<img>',{'class': 's_btn_img', 'src': 'images/down-arrow.png'})));
    searchButtonsDiv.append(searchButton);                    
  }

  var searchLine = $('<div>', {'class': 'searchLine'})
                    .append($('<div>', {'class': 'search_field'}).html(searchFieldName+':'))
                    .append(searchValuesDiv)
                    .append(searchButtonsDiv);

  return searchLine;
}

function addSearchValue(searchFieldName, selectValues) {

}

$(document).ready(function(){

  $('#test').width($('#name').width() + 23)

  $('#seletedValuesDiv .s_btn_container').each(function (i, item) {
    var span =  $($(item).children()[0]).children()[0];
    $(item).width( $(span).width() + 23 );
  });


  var searchFields = [
    {
      name: '分类',
      values: ['纬编单面', '纬编双面', '经编', '梭织平纹', '梭织斜纹', '梭织缎纹']
    },
    {
      name: '成分',
      values: '人棉 羊毛 亚麻 莫代尔 人造丝 真丝 腈纶 天丝 铜氨 苎麻 醋酯纤维 竹纤维 金银纱 索罗娜 棉  再生涤  有机棉'.split(/\s+/)
    },
    
    {
      name: '名称',
      values: `双面布 空气层 汗布 氨纶汗布 氨纶小提花 氨纶横条布 鸟眼布 抽针双面布 珊瑚绒 桃皮绒 pk布 法兰绒 棉毛布 毛巾布 抽针罗纹罗马布 法国罗纹 华夫格  大华夫格 超柔绒 不倒绒  羊羔绒 
              色丁布 灯芯绒 蜜丝绒 天鹅绒 府绸 尼丝纺 涤丝纺 春亚纺 蕾丝布 网眼布 楼梯布 双珠地网眼 单珠地网眼`.split(/\s+/)
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
    var searchField = searchFields[i];
    $('#searchContainer').append(makeSearchField(searchField['name'], searchField['values']));
  }

  $('#searchContainer').append($('<div>', {'class': 'searchLine'}));

  $('#searchContainer .s_btn').click(function() {
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
      Array(lines).forEach(item => {
        $(item).show();
      });

      //设置search_field的高度
      $(searchName).height($(searchValues).height());
      btnTxtDiv.html('收起&nbsp;');
      btnImg.src = 'images/up-arrow.png';
    }
    
  });

  $('#searchContainer .s_item').click(function() {
    //console.log('item click');
    var selectValue = $(this).html();
    console.log(selectValue);
    var searchField = $(this).parent().parent().parent().children().first().html();
    searchField = searchField.substr(0, searchField.length - 1)
    console.log(searchField)
    addSearchValue(searchField, [selectValue])
  });

});


