//
//  DetailScreen
//
//  Displays the data response
//


function DetailScreen(data) {
    var win = Ti.UI.createWindow({
    	layout: "vertical",
    	backgroundColor: 'white'
    });
    var textArea = Ti.UI.createTextArea({
      borderWidth: 2,
      borderColor: '#bbb',
      borderRadius: 5,
      font: {fontSize:12},
      editable: false,
      textAlign: 'left',
      value: data,
      width: "100%", height : "100%"
    });
    win.add(textArea);
 
	return win;
};

module.exports = DetailScreen;