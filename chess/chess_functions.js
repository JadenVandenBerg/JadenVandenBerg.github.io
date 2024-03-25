function convertSquareToCoords (square) {
  let string;
  if (document.getElementById(square) != null) {
    string = document.getElementById(square).id;
    let preY = string.charAt(0);
    let y;
    if (preY == 'a') {
      y = 1;
    } else if (preY == 'b') {
      y = 2;
    } else if (preY == 'c') {
      y = 3;
    } else if (preY == 'd') {
      y = 4;
    } else if (preY == 'e') {
      y = 5;
    } else if (preY == 'f') {
      y = 6;
    } else if (preY == 'g') {
      y = 7;
    } else {
      y = 8;
    }
    let x = string.charAt(1);
    return [parseInt(y), parseInt(x)];
  }
}
function convertCoordsToSquare (coords) {
  let letter;
  let invalid = false;
  let number = coords[1];
  if (coords[0] == 1) {
    letter = 'a';
  } else if (coords[0] == 2) {
    letter = 'b';
  } else if (coords[0] == 3) {
    letter = 'c';
  } else if (coords[0] == 4) {
    letter = 'd';
  } else if (coords[0] == 5) {
    letter = 'e';
  } else if (coords[0] == 6) {
    letter = 'f';
  } else if (coords[0] == 7) {
    letter = 'g';
  } else if (coords[0] == 8) {
    letter = 'h';
  } else {
    invalid = true;
  }
  if (number > 8) {
    invalid = true;
  }
  if (!invalid) {
    return letter.concat(number);
  } else {
    return false;
  }
}
function checkJump (from, to, selected, prevSelect) {
  let inter = [from[0] - to[0], from[1] - to[1]];
  let startSquare = prevSelect;
  let allowJump = "undecided";
  let jumpCoords = convertSquareToCoords(selected);
  if (jumpCoords == null) {
    allowJump = false;
  } else {
    let square;
    let Y = true;
    let X = true;
    if (from[0] == to[0]) {
      Y = false;
    }
    if (from[1] == to[1]) {
      X = false;
    }
    if (inter[0] <= 1 && inter[1] <= 1 && inter[0] >= -1 && inter[1] >= -1) {
      allowJump = true;
    } else {
      if (Y == true && X == false) {
        while (from[0] != to[0]) {
          if (from[0] >= to[0]) {
            from[0] = from[0] - 1;
            jumpCoords[0] = jumpCoords[0] + 1;
          } else {
            from[0] = from[0] + 1;
            jumpCoords[0] = jumpCoords[0] - 1;
          }
          square = convertCoordsToSquare(jumpCoords);
          if (square == startSquare) {
          } else {
            if (document.getElementById(square).classList.toString().includes('white') || document.getElementById(square).classList.toString().includes('black')) {
              allowJump = false;
            }
          }
        }
      } else if (Y == false && X == true) {
        while (from[1] != to[1]) {
          if (from[1] > to[1]) {
            from[1] = from[1] - 1;
            jumpCoords[1] = jumpCoords[1] + 1;
          } else {
            from[1] = from[1] + 1;
            jumpCoords[1] = jumpCoords[1] - 1;
          }
          square = convertCoordsToSquare(jumpCoords);
          if (square == startSquare) {
          } else {
            if (document.getElementById(square).classList.toString().includes('white') || document.getElementById(square).classList.toString().includes('black')) {
              allowJump = false;
            }
          }
        }
      } else if (Y == true && X == true) {
        while (from[1] != to[1]) {
          if (from[1] > to[1] && from[0] > to[0]) {
            from[1] = from[1] - 1;
            from[0] = from[0] - 1
            jumpCoords[1] = jumpCoords[1] + 1;
            jumpCoords[0] = jumpCoords[0] + 1;
          } else if (from[1] < to[1] && from[0] < to[0]) {
            from[1] = from[1] + 1;
            from[0] = from[0] + 1
            jumpCoords[1] = jumpCoords[1] - 1;
            jumpCoords[0] = jumpCoords[0] - 1;
          } else if (from[1] < to[1] && from[0] > to[0]) {
            from[1] = from[1] + 1;
            from[0] = from[0] - 1
            jumpCoords[1] = jumpCoords[1] - 1;
            jumpCoords[0] = jumpCoords[0] + 1;
          } else if (from[1] > to[1] && from[0] < to[0]) {
            from[1] = from[1] - 1;
            from[0] = from[0] + 1
            jumpCoords[1] = jumpCoords[1] + 1;
            jumpCoords[0] = jumpCoords[0] - 1;
          }
          square = convertCoordsToSquare(jumpCoords);
          if (square == startSquare) {
          } else {
            if (document.getElementById(square).classList.toString().includes('white') || document.getElementById(square).classList.toString().includes('black')) {
              allowJump = false;
            }
          }
        }
      }
    }
  }
  if (allowJump == 'undecided') {
    allowJump = true;
  }
  return allowJump;
}
function movePiece (s, ps, sc, realMove) {
  let select = document.getElementById(s);
  let mainClass = document.getElementById(s).classList[0];
  document.getElementById(s).classList.remove(...document.getElementById(s).classList);
  document.getElementById(s).classList.add(sc);
  document.getElementById(ps).classList.remove(sc);
  let a = document.getElementById(s);
  let color;
  let otherColor;
  if (a.classList.toString().includes('white')) {
    color = 'black';
    otherColor = 'white';
  } else if (a.classList.toString().includes('black')) {
    color = 'white';
    otherColor = 'black';
  }
  if (realMove) {
    checkCheckWhiteAndBlack();
    switchMoveColor();
    if (checkCheckmate(moveColor)) {
      endGame();
    }
  }
}function switchMoveColor() {
  let a = document.getElementById(selected);
  if (a.classList.toString().includes('white')) {
    moveColor = 'black';
  } else if (a.classList.toString().includes('black')) {
    moveColor = 'white';
  }
}
function checkKillPawn (coords, array, theMoveColor) {
  if (theMoveColor == null || theMoveColor == "") {
    theMoveColor = moveColor;
  }
  let endMoves = [];
  let includesColor;
  if (theMoveColor == 'white') {
    includesColor = 'black';
  } else {
    includesColor = 'white';
  }
  array.forEach(function(value) {
    let move = add(coords, value);
    let square = document.getElementById(convertCoordsToSquare(move));
    if (square == null) {
    } else {
      if (square.classList.toString().includes(includesColor)) {
        endMoves.push(move);
      }
    }
  });
  return endMoves;
}
function checkEnPassant (coords, color) {
  console.log('Hi')
}
function checkCastle(to, color, side) {
  if (to == '') {
    if (color == 'white') {
      if (side == 'king') {
        to = [8,7];
      } else if (side == 'queen') {
        to = [8,3];
      }
    } else if (color == 'black') {
      if (side == 'king') {
        to = [1,7];
      } else if (side == 'queen') {
        to = [1,3];
      }
    }
  }
  if (color == 'white') {
    if (convertCoordsToSquare(to) == 'h3' || convertCoordsToSquare(to) == 'h7') {
      if (king.white.move) {
        return false;
      } else {
        if (side == 'king') {
          if (king.white.rkmove == false) {
            if (document.getElementById('h6').classList.toString().includes('white') || document.getElementById('h6').classList.toString().includes('black')) {
              return false;
            } else {
              return true;
            }
          }
        } else if (side == 'queen') {
          if (king.white.rqmove == false) {
            if (document.getElementById('h4').classList.toString().includes('white') || document.getElementById('h4').classList.toString().includes('black') || document.getElementById('h2').classList.toString().includes('white') || document.getElementById('h2').classList.toString().includes('black')) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    }
  } else if (color == 'black') {
    if (convertCoordsToSquare(to) == 'a3' || convertCoordsToSquare(to) == 'a7') {
      if (king.black.move) {
        return false;
      } else {
        if (side == 'king') {
          if (king.black.rkmove == false) {
            if (document.getElementById('a6').classList.toString().includes('white') || document.getElementById('a6').classList.toString().includes('black')) {
              return false;
            } else {
              return true;
            }
          }
        } else if (side == 'queen') {
          if (king.black.rqmove == false) {
            if (document.getElementById('a4').classList.toString().includes('white') || document.getElementById('a4').classList.toString().includes('black') || document.getElementById('a2').classList.toString().includes('white') || document.getElementById('a2').classList.toString().includes('black')) {
              return false;
            } else {
              return true;
            }
          }
        }
      }
    }
  }
}
function add (a,b) {
  return [a[0] + b[0], a[1] + b[1]];
}
function subtract (a,b) {
  return [a[0] - b[0], a[1] - b[1]];
}
function includesWhiteOrBlack (item) {
  if (document.getElementById(item) != null) {
    if (document.getElementById(item).classList.toString().includes('white') || document.getElementById(item).classList.toString().includes('black')) {
      return true;
    } else {
      return false;
    }
  }
}
function includesColor (color, item) {
  if (document.getElementById(item) != null) {
    if (color == 'white') {
      if (document.getElementById(item).classList.toString().includes('white')) {
        return true;
      } else {
        return false;
      }
    } else if (color == 'black') {
      if (document.getElementById(item).classList.toString().includes('black')) {
        return true;
      } else {
        return false;
      }
    }
  }
}
function includesWhite (item) {
  if (document.getElementById(item) != null) {
    if (document.getElementById(item).classList.toString().includes('white')) {
      return true;
    } else {
      return false;
    }
  }
}
function includesBlack (item) {
  if (document.getElementById(item) != null) {
    if (document.getElementById(item).classList.toString().includes('black')) {
      return true;
    } else {
      return false;
    }
  }
}
function dot(value) {
  let bg = document.getElementById(convertCoordsToSquare(value));
  bg.style.backgroundColor = 'rgba(0, 95, 25, 0.8)';
  bg.classList.add('dotted');
  function e () {
    board.removeEventListener('click', e);
    document.getElementById(convertCoordsToSquare(value)).style.background = '';
    bg.classList.remove('dotted');
  }
  board.addEventListener('click', e);
}
function equalArray(a,b) { 
  return !!a && !!b && !(a<b || b<a);
}
function undot() {
  document.getElementById('board').click();
}
function isArrayInArray(array, item) {
  var string = JSON.stringify(item);
 
  var contains = array.some(function(a){
    return JSON.stringify(a) === string;
  });
  return contains;
}
function dummyMoveCheck(from, to) {
  if (document.getElementById(convertCoordsToSquare(from)).classList[0] != null) {
    let s = convertCoordsToSquare(to);
    let ps = convertCoordsToSquare(from);
    let mainClass = document.getElementById(s).classList[0];
    let sc = document.getElementById(ps).classList[0];
    document.getElementById(s).classList.remove(...document.getElementById(s).classList);
    document.getElementById(s).classList.add(sc);
    document.getElementById(ps).classList.remove(sc);
    let color;
    let check;
    function reverse() {
      document.getElementById(s).classList.remove(...document.getElementById(s).classList);
      document.getElementById(ps).classList.add(sc);
      document.getElementById(s).classList.remove(sc);
      if (mainClass != null) document.getElementById(s).classList.add(mainClass);
    }
    checkCheckWhiteAndBlack();
    if (moveColor == 'white') {
      color = 'black';
      check = whiteInCheck;
    } else {
      color = 'white';
      check = blackInCheck;
    }
    if (check) {
      reverse();
      return true;
    } else {
      reverse();
      return false;
    }
  } else {
    return false;
  }
}
let whiteInCheck = false;
let blackInCheck = false;
function checkCheckWhiteAndBlack() {
  let a = checkTotalPossibleMoves('white', false);
  let b = convertSquareToCoords(document.getElementsByClassName('blackKing')[0].id);
  if (isArrayInArray(a,b)) {
    blackInCheck = true;
  } else {
    blackInCheck = false;
  }
  let c = checkTotalPossibleMoves('black', false);
  let d = convertSquareToCoords(document.getElementsByClassName('whiteKing')[0].id);
  if (isArrayInArray(c,d)) {
    whiteInCheck = true;
  } else {
    whiteInCheck = false;
  }
  //console.log("whiteInCheck: " + whiteInCheck);
  //console.log("blackInCheck: " + blackInCheck);
}
function checkCheck(color) {
  let checkColor;
  let color2;
  if (color == 'black') {
    checkColor = 'blackKing';
    color2 = 'white';
  } else if (color == 'white') {
    checkColor = 'whiteKing';
    color2 = 'black';
  }
  let a = checkTotalPossibleMoves(color2, false);
  let b = convertSquareToCoords(document.getElementsByClassName(checkColor)[0].id);
  if (isArrayInArray(a,b)) {
    console.log(checkColor + ' Check');
    return true;
  } else {
    return false;
  }
}
function dotAllMoves(piece, possibleMoves, coords, dotThis, square) {
  let allowedMoves = [];
  let jumpCheckMoves = [];
  let number = 0;
  possibleMoves.forEach(function(value) {
    let move = add(coords, value);
    if (move[0] > 0 && move[0] < 9 && move[1] > 0 && move[1] < 9) {
      if (piece.includes('white') && !includesWhite(convertCoordsToSquare(move))) {
        jumpCheckMoves.push(move);
      } else if (piece.includes('black') && !includesBlack(convertCoordsToSquare(move))) {
        jumpCheckMoves.push(move);
      }
    }
  });
  jumpCheckMoves.forEach(function(value) {
    if (checkJump(convertSquareToCoords(square), value, convertCoordsToSquare(value), square)) {
      allowedMoves.push(value);
    }
  });
  allowedMoves.forEach(function(value) {
    if (document.getElementById(convertCoordsToSquare(value)) != null) {
      if (!dummyMoveCheck(coords, value) && piece.includes(moveColor)) {
        if(dotThis) { dot(value); }
        totalPossibleMovesReal.push(value);
      }
    }
  });
}
function dotAllMovesNoJump(piece, possibleMoves, coords, dotThis, square) {
  if (moveColor == 'white') {
    checkColor = 'black';
  } else {
    checkColor = 'white';
  }
  let allowedMoves = [];
  possibleMoves.forEach(function(value) {
    let move = add(coords, value);
    if (piece.includes('white') && !includesWhite(convertCoordsToSquare(move))) {
      allowedMoves.push(move);
    } else if (piece.includes('black') && !includesBlack(convertCoordsToSquare(move))) {
      allowedMoves.push(move);
    }
  });
  allowedMoves.forEach(function(value) {
    if (document.getElementById(convertCoordsToSquare(value)) != null) {
      if (!dummyMoveCheck(coords, value) && piece.includes(moveColor)) {
        if(dotThis) { dot(value); }
        totalPossibleMovesReal.push(value);
      }
    }
  });
}
function dotAllMovesPawn(pawn, piece, dotThis, coord, fromCheckMate) {
  let originalCoords = coord;
  let two = pawn.two;
  let one = pawn.one;
  let attackMoves = pawn.diagonal;
  let movesToBeDotted = [];
  let moveTwoNum;
  let KILLHAHAHA;
  let num;
  if (piece.includes('white')) {
    moveTwoNum = 7;
    num = -2;
    KILLHAHAHA = 'black';
  } else {
    moveTwoNum = 2;
    num = 2;
    KILLHAHAHA = 'white';
  }
  //Two Spaces
  let dontAddCoords = coord;
  let addCoords2 = add(one, coord);
  let addCoords = add(two, coord);
  let otherCoords;
  //One Space
  if (includesWhiteOrBlack(convertCoordsToSquare(addCoords2))) {
  } else {
    movesToBeDotted.push(addCoords2);
  }
  if (originalCoords[0] != moveTwoNum) {
  } else if (!includesWhiteOrBlack(convertCoordsToSquare(addCoords)) && checkJump(originalCoords, addCoords, convertCoordsToSquare(addCoords), convertCoordsToSquare(originalCoords))) {
    movesToBeDotted.push(addCoords);
    //movesToBeDotted.push(addCoords2);
  }
  //Attack!
  let attacky = checkKillPawn(subtract(addCoords2, one), pawn.diagonal);
  attacky.forEach(function(value) { 
    movesToBeDotted.push(value);
  });
  movesToBeDotted.forEach(function(value) {
    let a;
    if (coord[0] - num != moveTwoNum) {
      a = dummyMoveCheck(originalCoords, value);
    } else {
      a = dummyMoveCheck(subtract(addCoords,two), value);
    }
    if (!a && piece.includes(moveColor)) {
      let reallyReallyMove = true;
      if (fromCheckMate) {
        if (moveColor == 'white') {
          if (value[0] > originalCoords[0]) {
            reallyReallyMove = false;
          } else {
            reallyReallyMove = true;
          }
        } else if (moveColor == 'black') {
          if (value[0] < originalCoords[0]) {
            reallyReallyMove = false;
          } else {
            reallyReallyMove = true;
          }
        }
      } else {
        reallyReallyMove = true;
      }
      if (reallyReallyMove) {
        if(dotThis) { dot(value); }
        totalPossibleMovesReal.push(value);
      }
    }
  });
}
function checkTotalPossibleMoves(color, dotThis) { //Assumes you ARENT in Check
  let totalPossibleMoves = [];
  if (color == null) {
    color = 'white';
  }
  boardSquares.forEach(function(value) {
    let square = document.getElementById(value);
    let checkColor;
    if (moveColor == 'white') {
      checkColor = 'black';
      theCheckVar = whiteInCheck;
    } else {
      checkColor = 'white';
      theCheckVar = blackInCheck;
    }
    let piece = square.classList[0];
    if (includesColor(color, value)) {
      let coords = convertSquareToCoords(value);
      //Special Cases
      //Dont Check Jump
      //BOOKMARK
      if (piece.includes('Elephant') || piece.includes('Knight')) {
        let possibleMoves;
        if (piece == 'whiteKnight' || piece == 'blackKnight') {
          possibleMoves = moves.knight;
        } else if (piece == 'whiteElephant' || piece == 'blackElephant') {
          possibleMoves = moves.elephant;
        } else if (piece == 'white_superKnight' || piece == 'black_superKnight') {
          possibleMoves = moves.superKnight;
        } else if (piece == 'whiteLongKnight' || piece == 'blackLongKnight') {
          possibleMoves = moves.longKnight;
        } else {
          possibleMoves = [];
        }
        possibleMoves.forEach(function(value2) {
          let move = add(coords, value2);
          if (piece.includes(color) && !includesColor(color, convertCoordsToSquare(move))) {
            if (document.getElementById(convertCoordsToSquare(move)) != null) {
              if (dotThis) {dot(move)}
              totalPossibleMoves.push(move);
            }
          }
        });
      } //Pawn Special Case
      else if (piece.includes('Pawn') || piece.includes('pawn')) {
        let pawn2 = square.classList[0];
        let pawn;
        //Bookmark pawn
        if (pawn2 == 'whitePawn') {
          pawn = moves.whitePawn;
        } else if (pawn2 == 'blackPawn') {
          pawn = moves.blackPawn;
        }
        if (pawn != null) {
          let two = pawn.two;
          let one = pawn.one;
          let attackMoves = pawn.diagonal;
          let movesToBeDotted = [];
          let moveTwoNum;
          let KILLHAHAHA;
          if (piece.includes('white')) {
            KILLHAHAHA = 'white';
            moveTwoNum = 7;
          } else {
            KILLHAHAHA = 'black';
            moveTwoNum = 2;
          }
          let dontAddCoords = coords;
          let addCoords2 = add(one, coords);
          let addCoords = add(two, coords);
          let otherCoords;
          if (dontAddCoords[0] != moveTwoNum) {
            if (!includesWhiteOrBlack(convertCoordsToSquare(addCoords2))) {
              movesToBeDotted.push(addCoords2);
            }
          } else if (!includesWhiteOrBlack(convertCoordsToSquare(addCoords)) && checkJump(dontAddCoords, addCoords, convertCoordsToSquare(addCoords), convertCoordsToSquare(dontAddCoords))) {
            movesToBeDotted.push(addCoords);
            movesToBeDotted.push(addCoords2);
          }
          //Attack!
          let attacky = checkKillPawn(subtract(addCoords2, one), pawn.diagonal, KILLHAHAHA);
          attacky.forEach(function(value2) { 
            movesToBeDotted.push(value2);
          });
          movesToBeDotted.forEach(function(value2) {
            if (document.getElementById(convertCoordsToSquare(value2)) != null) {
              if (dotThis) {
                dot(value2);
              }
              totalPossibleMoves.push(value2);
            }
          });
        }
      }
      else if (piece.includes('Superpawn')) { //Check Jump and Dont SPECIAL CASE
        let jump, noJump;
        if (piece.includes('Superpawn')) {
          jump = moves.superpawn.jump;
          noJump = moves.superpawn.noJump;
        } else if (piece.includes('Princess')) {
          jump = moves.princess.jump;
          noJump = moves.princess.noJump;
        } else if (piece.includes('Empress')) {
          jump = moves.empress.jump;
          noJump = moves.empress.noJump;
        } else if (piece.includes('Amazon')) {
          jump = moves.amazon.jump;
          noJump = moves.amazon.noJump;
        }
        let allowedMoves = [];
        let jumpCheckMoves = [];
        let number = 0;
        jump.forEach(function(value2) {
          let move = add(coords, value2);
          if (move[0] > 0 && move[0] < 9 && move[1] > 0 && move[1] < 9) {
            if (piece.includes('white') && !includesWhite(convertCoordsToSquare(move))) {
              jumpCheckMoves.push(move);
            } else if (piece.includes('black') && !includesBlack(convertCoordsToSquare(move))) {
              jumpCheckMoves.push(move);
            }
          }
        });
        jumpCheckMoves.forEach(function(value2) {
          if (checkJump(convertSquareToCoords(square.id), value2, convertCoordsToSquare(value2), square.id)) {
            allowedMoves.push(value2);
          }
        });
        allowedMoves.forEach(function(value2) {
          if (document.getElementById(convertCoordsToSquare(value2)) != null) {
            if(dotThis) { dot(value2); }
            totalPossibleMoves.push(value2);
          }
        });
        noJump.forEach(function(value2) {
          let move = add(coords, value2);
          if (piece.includes(color) && !includesColor(color, convertCoordsToSquare(move))) {
            if (document.getElementById(convertCoordsToSquare(move)) != null) {
              if (dotThis) {dot(move)}
              totalPossibleMoves.push(move);
            }
          }
        });
      }
      else if (piece.includes('lite')) {
        totalPossibleMoves.push();
      }
      else { //No Special Case (Check Jump, ect)
        let possibleMoves;
        //BOOKMARK
        let piece2 = square.classList[0];
        if (piece2 == 'whiteBishop' || piece2 == 'blackBishop') {
          possibleMoves = moves.bishop;
        } else if (piece2 == 'whiteRook' || piece2 == 'blackRook') {
          possibleMoves = moves.rook;
        } else if (piece2.includes('Queen')) {
          possibleMoves = moves.queen;
        } else if (piece2 == 'whiteKing' || piece2 == 'blackKing') {
          possibleMoves = moves.king();
        } else {
          possibleMoves = [];
        }
        let allowedMoves = [];
        let jumpCheckMoves = [];
        let number = 0;
        possibleMoves.forEach(function(value2) {
          let move = add(coords, value2);
          if (move[0] > 0 && move[0] < 9 && move[1] > 0 && move[1] < 9) {
            if (piece.includes('white') && !includesWhite(convertCoordsToSquare(move))) {
              jumpCheckMoves.push(move);
            } else if (piece.includes('black') && !includesBlack(convertCoordsToSquare(move))) {
              jumpCheckMoves.push(move);
            }
          }
        });
        jumpCheckMoves.forEach(function(value2) {
          if (checkJump(convertSquareToCoords(square.id), value2, convertCoordsToSquare(value2), square.id)) {
            allowedMoves.push(value2);
          }
        });
        allowedMoves.forEach(function(value2) {
          if (document.getElementById(convertCoordsToSquare(value2)) != null) {
            if(dotThis) { dot(value2); }
            totalPossibleMoves.push(value2);
          }
        });
      }
    }
  });
  return totalPossibleMoves;
}
function addArrows() {
  boardSquares.forEach(function(value) {
    let square = document.getElementById(value);
    let classlist = square.classList;
    let arrowsContainer = document.createElement('table');
    arrowsContainer.classList.add('arrowsContainer');
    arrowsContainer.setAttribute('cellspacing', '0');
    if (classlist.contains('whitePawn') || classlist.contains('blackPawn')) {
      arrowsContainer.innerHTML = `<tr><td class='m_f1'></td><td class='a_l1-r1'></td></tr>`;
      document.getElementById(value).appendChild(arrowsContainer);
    }
  });
}
let totalPossibleMovesReal = [];
function checkCheckmate(color) {
  let colorInCheck;
  if (color == 'white') {
    colorInCheck = whiteInCheck;
  } else {
    colorInCheck = blackInCheck;
  }
  totalPossibleMovesReal = [];
  boardSquares.forEach(function(value) {
    let square = value;
    let coords = convertSquareToCoords(value);
    let piece = document.getElementById(square).classList[0];
    if (piece != null) {
      let dotThis = false;
      let possibleMoves;
      let checkTheJump;
      //BOOKMARK
      let special = false;
      if (piece == 'whiteRook' || piece == 'blackRook') {
        possibleMoves = moves.rook;
        checkTheJump = true;
      } else if (piece == 'whiteBishop' || piece == 'blackBishop') {
        possibleMoves = moves.bishop;
        checkTheJump = true;
      } else if (piece == 'whiteQueen' || piece == 'blackQueen') {
        possibleMoves = moves.queen;
        checkTheJump = true;
      } else if (piece == 'whiteKing' || piece == 'blackKing') {
        possibleMoves = moves.king();
        checkTheJump = true;
      } else if (piece == 'whiteKnight' || piece == 'blackKnight') {
        possibleMoves = moves.knight;
        checkTheJump = false;
      } else if (piece == 'whitePawn') {
        possibleMoves = moves.whitePawn;
        checkTheJump = true;
      } else if (piece == 'blackPawn') {
        possibleMoves = moves.blackPawn;
        checkTheJump = true;
      } else if (piece == 'whiteSuperpawn' || piece == 'blackSuperpawn') {
        possibleMoves = moves.superpawn;
        checkTheJump = false;
        special = true;
      }
      if (piece.includes(color)) {
        if (checkTheJump) {
          if (piece.includes('pawn') || piece.includes('Pawn')) {
            dotAllMovesPawn(possibleMoves, piece, dotThis, coords, true);
          } else {
            dotAllMoves(piece, possibleMoves, coords, dotThis, square);
          }
        } else if (!checkJump && !special) {
          dotAllMovesNoJump(piece, possibleMoves, coords, dotThis, square);
        }
        if (special) {
          let jump = possibleMoves.jump;
          let noJump = possibleMoves.noJump;
          dotAllMoves(piece, jump, coords, dotThis, square);
          dotAllMovesNoJump(piece, noJump, coords, dotThis, square);
        }
      }
    }
  });
  if (totalPossibleMovesReal.length == 0 && colorInCheck) {
    return true;
  } else {
    return false;
  }
}
function endGame() {
  console.log('GAME OVER!');
  let amongus = document.createElement('div');
  let amongsBtn = document.createElement('button');
  board.appendChild(amongus);
  amongus.classList.add('amongs');
  amongus.appendChild(amongsBtn);
  amongsBtn.classList.add('amongsBtn');
  if (moveColor == 'white') {
    amongusColor = 'Black';
  } else {
    amongusColor = 'White';
  }
  amongus.innerHTML = `${amongusColor} Wins!`;
  amongus.appendChild(amongsBtn);
  amongsBtn.innerHTML = `Close`;
  amongsBtn.addEventListener('click', function() {
    amongus.style.display = 'none';
  });
}
//TODO:
/* BUGS
* King trying to castle while not on back row (doenst let you move)
* Checkmate not working with lite king
* Castle broken (with two different rooks)
* Castle broken (if rook dies before it moves you can still castle)
* letting king go within pawn attack (first row)
* not letting king move two spaces when castling is impossible
* non normal pawns dont promote
*/