//-----------------------------------------------------------------------------------------------------
    var clicked = false;
    var startX = 0;
    var startY = 0;
    var dblclick = false;

//LISTENER ON LOADED DOM-TREE
document.addEventListener('DOMContentLoaded', function(){
    
    var sticks = document.getElementsByClassName('stick');

    for (var stick of sticks){
        addListenersToStick(stick);
    }

//----------BUTTON CREATE NEW STICK--------------------------------------------------------------------
    var addButton = document. getElementById('add-stick');
    addButton.addEventListener('click', function(){
        
        var newStick = stick.cloneNode(true);
        newStick.classList.add('stick');
        newStick.style.top = '30px';
        newStick.style.left = '0px';

        newStick.childNodes[1].innerHTML = null;
        document.getElementById('root').appendChild(newStick);
        addListenersToStick(newStick);
        return false;
    });
});
//-----------LISTENERS---------------------------------------------------------------------------------
//
function addListenersToStick(stick) {
    stick.addEventListener('mousedown', stickMouseDown);
    stick.addEventListener('mousemove', stickMouseMove);
    stick.addEventListener('mouseup', stickMouseUp);
    stick.addEventListener('mouseout', stickMouseUp);
    stick.addEventListener('click', stickEdit);
    stick.childNodes[3].childNodes[5].addEventListener('click', cancelEditText);
    stick.childNodes[3].childNodes[3].addEventListener('click', saveEditText);
}
//-----------------------------------------------------------------------------------------------------
function stickMouseDown(event){
    clicked = true;
    startX = event.screenX;
    startY = event.screenY;
    }
//-----------------------------------------------------------------------------------------------------
function stickMouseMove(event){

    if (clicked === true){

        var positionX = event.screenX;
        var positionY = event.screenY;

        var finishX = positionX - startX;
        var finishY = positionY - startY;
        
        var top = parseInt(event.currentTarget.style.top);
        var left = parseInt(event.currentTarget.style.left);
        
        event.currentTarget.style.top = (top + finishY) + 'px';
        event.currentTarget.style.left = (left + finishX) + 'px';
        
        console.log('mouse move: X >>' + finishX + ', y >>' + finishY);

        startX = positionX;
        startY = positionY;
        }
    }
//-----------------------------------------------------------------------------------------------------
function stickMouseUp(){
    clicked = false;
    return false;
}
//-----------------------------------------------------------------------------------------------------
function stickEdit(event) {

    if (dblclick === true) {
        var text = event.currentTarget.childNodes[1];
        var edit = event.currentTarget.childNodes[3];

        var editText = text.innerHTML;

        edit.childNodes[1].value = editText;

        text.style.display = 'none';
        edit.style.display = 'block';

        dblclick = false;
    } else {
        setTimeout(function () {
            dblclick = false;
        }, 500);
    }

    dblclick = true;
}
//-----------------------------------------------------------------------------------------------------
function cancelEditText(event) {
    var button = event.currentTarget;
    var editBlock = button.parentNode;
    var textBlock = editBlock.previousSibling.previousSibling;

    editBlock.style.display = 'none';
    textBlock.style.display = 'block';

}
//-----------------------------------------------------------------------------------------------------
function saveEditText(event) {
    var button = event.currentTarget;
    var editBlock = button.parentNode;
    var textBlock = editBlock.previousSibling.previousSibling;
    
    var editedText = editBlock.childNodes[1].value;
    
    console.log(editedText);
    console.log(textBlock.style);

    textBlock.style.innerText = editedText;
    editBlock.style.display = 'none';
    textBlock.style.display = 'block';

}
//-----------------------------------------------------------------------------------------------------