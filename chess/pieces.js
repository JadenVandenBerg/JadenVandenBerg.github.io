function bishop(square, coords, dotThis, piece) {
  let possibleMoves = moves.bishop;
  dotAllMoves(piece, possibleMoves, coords, dotThis, square);
}
function rook(square, coords, dotThis, piece) {
  let possibleMoves = moves.rook;
  dotAllMoves(piece, possibleMoves, coords, dotThis, square);
}
function blackPawn(square, coords, dotThis, piece) {
  //checkEnPassant(coords, moveColor);
  dotAllMovesPawn(moves.blackPawn, piece, dotThis, coords);
}
function queen(square, coords, dotThis, piece) {
  let possibleMoves = moves.queen;
  dotAllMoves(piece, possibleMoves, coords, dotThis, square);
}
function whitePawn(square, coords, dotThis, piece) {
  dotAllMovesPawn(moves.whitePawn, piece, dotThis, coords);
}
function king_piece(square, coords, dotThis, piece) {
  let possibleMoves = moves.king();
  dotAllMoves(piece, possibleMoves, coords, dotThis, square);
}
function knight(square, coords, dotThis, piece) {
  let possibleMoves = moves.knight;
  dotAllMovesNoJump(piece, possibleMoves, coords, dotThis, square);
}
function superpawn(square, coords, dotThis, piece) {
  let possibleMoves = moves.superpawn.jump;
  let dontCheckJump = moves.superpawn.noJump;
  dotAllMoves(piece, possibleMoves, coords, dotThis, square);
  dotAllMovesNoJump(piece, dontCheckJump, coords, dotThis, square);
}