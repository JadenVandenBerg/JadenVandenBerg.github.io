const board = document.getElementById('board');
let boardSquares = ['a1','a2','a3','a4','a5','a6','a7','a8','b1','b2','b3','b4','b5','b6','b7','b8','c1','c2','c3','c4','c5','c6','c7','c8','d1','d2','d3','d4','d5','d6','d7','d8','e1','e2','e3','e4','e5','e6','e7','e8','f1','f2','f3','f4','f5','f6','f7','f8','g1','g2','g3','g4','g5','g6','g7','g8','h1','h2','h3','h4','h5','h6','h7','h8'];
function setUpBoard () {
  boardSquares.forEach(function(value) {
    document.getElementById(value).classList.remove(...document.getElementById(value).classList);
  });
  setTimeout(function() {
    wrookclass = document.getElementById('h1').classList[0];
    brookclass = document.getElementById('a1').classList[0];
    wkingclass = document.getElementById('h5').classList[0];
    bkingclass = document.getElementById('a5').classList[0];
  }, 1000);
  moveColor = 'white';
  function normalSet() {
    document.getElementById('g1').classList.add('whitePawn');
    document.getElementById('g2').classList.add('whitePawn');
    document.getElementById('g3').classList.add('whitePawn');
    document.getElementById('g4').classList.add('whitePawn');
    document.getElementById('g5').classList.add('whitePawn');
    document.getElementById('g6').classList.add('whitePawn');
    document.getElementById('g7').classList.add('whitePawn');
    document.getElementById('g8').classList.add('whitePawn');
    document.getElementById('h2').classList.add('whiteKnight');
    document.getElementById('h7').classList.add('whiteKnight');
    document.getElementById('h1').classList.add('whiteRook');
    document.getElementById('h8').classList.add('whiteRook');
    document.getElementById('h5').classList.add('whiteKing');
    document.getElementById('h4').classList.add('whiteQueen');
    document.getElementById('h6').classList.add('whiteBishop');
    document.getElementById('h3').classList.add('whiteBishop');
    document.getElementById('b1').classList.add('blackPawn');
    document.getElementById('b2').classList.add('blackPawn');
    document.getElementById('b3').classList.add('blackPawn');
    document.getElementById('b4').classList.add('blackPawn');
    document.getElementById('b5').classList.add('blackPawn');
    document.getElementById('b6').classList.add('blackPawn');
    document.getElementById('b7').classList.add('blackPawn');
    document.getElementById('b8').classList.add('blackPawn');
    document.getElementById('a2').classList.add('blackKnight');
    document.getElementById('a7').classList.add('blackKnight');
    document.getElementById('a1').classList.add('blackRook');
    document.getElementById('a8').classList.add('blackRook');
    document.getElementById('a5').classList.add('blackKing');
    document.getElementById('a4').classList.add('blackQueen');
    document.getElementById('a6').classList.add('blackBishop');
    document.getElementById('a3').classList.add('blackBishop');
  }
  normalSet();
}
//setUpBoard();
function checkPossibleMoves(square, dotThis) {
  let piece = document.getElementById(square).classList[0];
  let coords = convertSquareToCoords(`${square}`);
  let theCheckColor;
  if (piece == 'whitePawn' && selectNum == 0) {
    whitePawn(square, coords, dotThis, piece);
  }
  if (piece == 'blackPawn') {
    blackPawn(square, coords, dotThis, piece);
  }
  if (piece == 'whiteKnight' || piece == 'blackKnight') {
    knight(square, coords, dotThis, piece);
  }
  if (piece == 'whiteBishop' || piece == 'blackBishop') {
    bishop(square, coords, dotThis, piece);
  }
  if (piece == 'whiteRook' || piece == 'blackRook') {
    rook(square, coords, dotThis, piece);
  }
  if (piece == 'whiteQueen' || piece == 'blackQueen') {
    queen(square, coords, dotThis, piece);
  }
  if (piece == 'whiteKing' || piece == 'blackKing') {
    king_piece(square, coords, dotThis, piece);
  }
  if (piece == 'whiteSuperpawn' || piece == 'blackSuperpawn') {
    superpawn(square, coords, dotThis, piece);
  }
  //Bookmark
  if (moveColor == 'black') {
    theCheckColor == 'white';
  } else {
    theCheckColor == 'black';
  }
}
let king = {
  white: {
    move: false,
    rkmove: false,
    rqmove: false
  },
  black: {
    move: false,
    rkmove: false,
    rqmove: false
  }
}
let selectNum = 0;
let selectClass;
let prevSelect;
let selected;
let moveColor = 'white';
let moved;
let wrookclass, brookclass, wkingclass, bkingclass;
board.addEventListener('click', function(event) {
  selected = event.target.id;
  if (selected === '') {
    selected = event.target.parentElement.id;
  } else if (selected === 'board') {
  } else {
    selected = event.target.id;
  }
  if (selectNum == 0) {
    //console.log('Selected ' + selected);
    if (selected === '') {
      prevSelect = event.target.parentElement.id;
    } else if (selected === 'board') {
    } else {
      prevSelect = event.target.id;
    }
    selectClass = document.getElementById(selected).classList[0];
    if (moveColor == 'white' && selectClass.includes('white') || moveColor == 'black' && selectClass.includes('black')) {
      checkPossibleMoves(selected, true);
      selectNum = 1;
    }
  } else {
    selectNum = 0;
    moved = true;
    if (document.getElementById(selected).classList.contains('dotted')) {
      let reallyMove = false;
      //White & Black King
      let e = document.getElementById(prevSelect).classList;
      if (e.contains(wkingclass) || e.contains(bkingclass)) {
        let from = convertSquareToCoords(`${prevSelect}`);
        let to = convertSquareToCoords(`${selected}`);
        let move = false;
        if (checkCastle(to, 'white', 'king')) {dot([8,7]);}
        if (checkCastle(to, 'black', 'king')) {dot([1,7]);}
        if (checkCastle(to, 'black', 'queen')) {dot([1,3]);}
        if (checkCastle(to, 'white', 'queen')) {dot([8,3]);}
        if (checkCastle(to, 'white', 'king') && moveColor == 'white' || checkCastle(to, 'black', 'king') && moveColor == 'black' || checkCastle(to, 'white', 'queen') && moveColor == 'white' || checkCastle(to, 'black', 'queen') && moveColor == 'black') {
          if (from[1] + 2 == to[1]  && from[0] == to[0]) {
            if (document.getElementById(prevSelect).classList.toString().includes('white')) {
              if (checkCastle(to, 'white', 'king')) {
                document.getElementById('h6').classList.add(wrookclass);
                document.getElementById('h8').classList.remove(wrookclass);
                document.getElementById('h7').classList.add(wkingclass);
                document.getElementById('h5').classList.remove(wkingclass);
                switchMoveColor();
              }
            } else if (document.getElementById(prevSelect).classList.toString().includes('black')) {
              if (checkCastle(to, 'black', 'king')) {
                document.getElementById('a6').classList.add(brookclass);
                document.getElementById('a8').classList.remove(brookclass);
                document.getElementById('a7').classList.add(bkingclass);
                document.getElementById('a5').classList.remove(bkingclass);
                switchMoveColor();
              }
            }
          } else if (from[1] - 2 == to[1]  && from[0] == to[0]) {
            if (document.getElementById(prevSelect).classList.toString().includes('white')) {
              if (checkCastle(to, 'white', 'queen')) {
                document.getElementById('h4').classList.add(wrookclass);
                document.getElementById('h1').classList.remove(wrookclass);
                document.getElementById('h3').classList.add(wkingclass);
                document.getElementById('h5').classList.remove(wkingclass);
                switchMoveColor();
              }
            } else if (document.getElementById(prevSelect).classList.toString().includes('black')) {
              if (checkCastle(to, 'black', 'queen')) {
                document.getElementById('a4').classList.add(brookclass);
                document.getElementById('a1').classList.remove(brookclass);
                document.getElementById('a3').classList.add(bkingclass);
                document.getElementById('a5').classList.remove(bkingclass);
                switchMoveColor();
              }
            }
          } else {
            move = true;
          }
        } else {
          move = true;
        }
        if (move) {
          if (document.getElementById(prevSelect).classList.toString().includes('black')) {
            king.black.move = true;
            reallyMove = true;
          } else if (document.getElementById(prevSelect).classList.toString().includes('white')) {
            king.white.move = true;
            reallyMove = true;
          }
        }
      } else if (e.contains(wrookclass) || e.contains(brookclass)) {
        //White & Black Rook
        let from = convertSquareToCoords(`${prevSelect}`);
        let to = convertSquareToCoords(`${selected}`);
        let move = false;
        if (from[0] != to[0] || from[1] != to[1]) {
          move = true;
        }
        if (move) {
          if (document.getElementById(prevSelect).classList.toString().includes('black')) {
            if (document.getElementById(prevSelect).id == 'a8') {
              king.black.rkmove = true;
            } else if (document.getElementById(prevSelect).id == 'a1') {
              king.black.rkqmove = true;
            }
            if (document.getElementById(selected).classList.toString().includes('black')) {
            } else {
              movePiece(selected, prevSelect, selectClass, true);
            }
          } else if (document.getElementById(prevSelect).classList.toString().includes('white')) {
            if (document.getElementById(prevSelect).id == 'h8') {
              king.white.rkmove = true;
            } else if (document.getElementById(prevSelect).id == 'h1') {
              king.white.rkqmove = true;
            }
            if (document.getElementById(selected).classList.toString().includes('white')) {
            } else {
              reallyMove = true;
            }
          }
        }
      } else {
        reallyMove = true;
      }
      if (reallyMove) {
        movePiece(selected, prevSelect, selectClass, true);
        if (document.getElementById(selected).classList.toString().includes('whitePawn') && selected.includes('a')) {
          document.getElementById(selected).classList.remove('whitePawn');
          document.getElementById(selected).classList.add('whiteSuperpawn');
        } else if (document.getElementById(selected).classList.contains('blackPawn') && selected.includes('h')) {
          document.getElementById(selected).classList.remove('blackPawn');
          document.getElementById(selected).classList.add('blackSuperpawn');
        }
      }
    }
  }
  checkCheckWhiteAndBlack();
});