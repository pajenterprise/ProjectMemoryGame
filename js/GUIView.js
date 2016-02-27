/**
 * Created by SamuelSahonero on 2/23/2016.
 */
var GUIView = function()
{
    this.myBoard = null;
};

GUIView.prototype.readPlayer = function()
{
    var player = new Player();
    //Get all data of html file
    return player;
};

GUIView.prototype.readBoardDimension = function()
{
   /* var dimension = prompt('Enter the dimension of the board', 'i.e. 6');
    if (dimension != null) {
        return dimension;
    }*/
    var dimensionBoard = document.getElementsByName('board_dim')[0].value;
    return dimensionBoard;
};


GUIView.prototype.showBoard = function(boardToPlay)
{
    this.myBoard = boardToPlay;
    //Second time--> Quit table-->Clear
    //First time

    var cells = this.myBoard.returnCells();
    var cols = this.myBoard.dimension;
    var rows = this.myBoard.dimension;
    //var rowActual, colActual;
    //var table2 = document.createElement('table');
    //table2.setAttribute('align','center');
    var table2 =$('<table></table>');
    table2.attr('align','center');


    var newButton,textButton;
    var tr2,td2;
    var cellIsHidden;

    for (var i = 0; i < rows; i++)
    {
        //tr2 = document.createElement('tr');
        tr2=$('<tr></tr>');

        for (var j = 0; j < cols; j++)
        {
            //Add a button
            //newButton = document.createElement('button');
            newButton=$('<button></button>');
            cellIsHidden = cells[i][j].showState();

            if (cellIsHidden)
            {// Create a text node with the cell value
                //textButton = document.createTextNode(cells[i][j].hiddenCharacter);
                textButton=cells[i][j].hiddenCharacter;
            }
            else
            {
                //textButton = document.createTextNode(cells[i][j].character);
                textButton=cells[i][j].character;
            }

            /*newButton.appendChild(textButton);
            newButton.setAttribute('row',i);
            newButton.setAttribute('col',j);
            newButton.setAttribute('class','buttonGame');*/
            newButton.text(textButton);
            newButton.attr('row',i);
            newButton.attr('col',j);
            newButton.attr('class','buttonGame');
            //If it isn't the wild card cell
            var charToFill=cells[i][j].character;
            if (charToFill != this.myBoard.CHARACTER_CELL_IN_BLANK) {
                //newButton.addEventListener('click', this.displayOneCell);
                newButton.on('click', this.displayOneCell);
            }
            //Put on td
            //td2 = document.createElement('td');
            //td2.appendChild(newButton);
            //tr2.appendChild(td2);
            td2=$('<td></td>');
            td2.append(newButton);
            tr2.append(td2);

        }

        //table2.appendChild(tr2);
        table2.append(tr2);
    }

    //document.body.appendChild(table2);
    $('body').append(table2);

};


GUIView.prototype.displayOneCell=function(eventClick)
{

        var rowActual = eventClick.currentTarget.getAttribute('row');
        var colActual = eventClick.currentTarget.getAttribute('col');
        var figure = playGame.myBoard.returnOneCell(rowActual, colActual);
        var textContent = figure.getCharacter();
        //removeEventListener
        var myButtonPath = 'button[row="'+ rowActual+'"][col="'+ colActual +'"]';
        var myButtonObject = jQuery('table').find(myButtonPath);
        myButtonObject.text(textContent);
        //RemoveListener
        myButtonObject.off('click', playGame.viewByGUI.displayOneCell);
        //e.target.removeEventListener('click', this.displayOneCell);
        playGame.numberOfClicks++;

        switch (playGame.numberOfClicks)
        {
            case 1:
                playGame.figure1 = figure;
                playGame.row1 = rowActual;
                playGame.col1 = colActual;

                break;

            case 2:
                playGame.figure2 = figure;
                playGame.row2 = rowActual;
                playGame.col2 = colActual;
                playGame.compareCells();

                break;

            default:
                var char1 = playGame.figure1.getCharacter();
                var char2 = playGame.figure2.getCharacter();

                if (char1 != char2)
                {
                    playGame.viewByGUI.hideSelectedButtons();

                }

                playGame.figure1 = figure;
                playGame.row1 = rowActual;
                playGame.col1 = colActual;
                playGame.numberOfClicks = 1;
                break;
        }
};
/*
* @param string msg This is the message for display into a textarea
*/
GUIView.prototype.printMessage = function()
{
    var textMessage = $('textarea');
    textMessage.text(arguments[0]);
};

GUIView.prototype.hideSelectedButtons = function()
{
    //First Cell
    playGame.myBoard.hiddenOneCell(playGame.row1, playGame.col1);
    var myButtonPath = 'button[row="'+ playGame.row1+'"][col="'+ playGame.col1 +'"]';
    var myButtonObject = jQuery('table').find(myButtonPath);
    myButtonObject.text(playGame.figure1.hiddenCharacter);
    //addListener
    myButtonObject.on('click', playGame.viewByGUI.displayOneCell);


    //Second Cell
    playGame.myBoard.hiddenOneCell(playGame.row2, playGame.col2);
    myButtonPath = 'button[row="'+ playGame.row2+'"][col="'+ playGame.col2 +'"]';
    myButtonObject = jQuery('table').find(myButtonPath);
    myButtonObject.text(playGame.figure2.hiddenCharacter);
    //addListener
    myButtonObject.on('click', playGame.viewByGUI.displayOneCell);

};