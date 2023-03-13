class Game {
  constructor() {}

  getState() {
    var gameStateRef = database.ref("gameState");
    gameStateRef.on("value", function(data) {
      gameState = data.val();
    });
  }

  update(state) {
    database.ref("/").update({
      gameState: state
    });
  }

  start() {
    player = new Player();
    playerCount = player.getCount();

    form = new Form();
    form.display();

    car1 = createSprite(width / 2 - 50, height - 100);
    car1.addImage("car1", car1_img);
    car1.scale = 0.07;

    car2 = createSprite(width / 2 + 100, height - 100);
    car2.addImage("car2", car2_img);
    car2.scale = 0.07;

    cars = [car1, car2];
  }

  handleElements() {
    form.hide();
    form.titleImg.position(40, 50);
    form.titleImg.class("gameTitleAfterEffect");
  }

  play() {
    this.handleElements();
    Player.getPlayersInfo();
    if (allPlayers !== undefined) {
      image(track, 0, -height * 5, width, height * 6); // imagem da trilha
      var index = 0;
      // loop for-in para atribuir uma posição a cada carro
      for (var plr in allPlayers) {
        //add 1 para o indice toda vez que for um loop
        index = index + 1;
        //busca os dados do banco de dados para posicionar os jogadores na tela
        var x = allPlayers[plr].positionX;
        var y = height - allPlayers[plr].positionY;
        cars[index - 1].position.x = x;
        cars[index - 1].position.y = y;
      }
      if (keyIsDown(UP_ARROW)) { //movimento do carro com a seta de cima
       player.positionY += 10;
       player.update();
      }
      drawSprites();
    }
  }
}
