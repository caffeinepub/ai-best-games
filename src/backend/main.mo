import Array "mo:core/Array";
import Text "mo:core/Text";
import Time "mo:core/Time";
import Int "mo:core/Int";

actor {
  type Game = {
    title : Text;
    genre : Text;
    rating : Nat8;
    description : Text;
    releaseYear : Nat16;
    developer : Text;
    imageUrl : Text;
  };

  let games : [Game] = [
    {
      title = "The Legend of Zelda: Breath of the Wild";
      genre = "Action-adventure";
      rating = 98;
      description = "An open-world adventure game set in the vast kingdom of Hyrule where players can explore freely and solve puzzles.";
      releaseYear = 2017;
      developer = "Nintendo";
      imageUrl = "https://example.com/zelda.jpg";
    },
    {
      title = "The Witcher 3: Wild Hunt";
      genre = "Role-playing";
      rating = 94;
      description = "An epic RPG where you play as Geralt of Rivia, a monster hunter, exploring a rich fantasy world and making impactful choices.";
      releaseYear = 2015;
      developer = "CD Projekt";
      imageUrl = "https://example.com/witcher3.jpg";
    },
    {
      title = "Super Mario Odyssey";
      genre = "Platformer";
      rating = 97;
      description = "A 3D platformer featuring Mario exploring various kingdoms to rescue Princess Peach from Bowser.";
      releaseYear = 2017;
      developer = "Nintendo";
      imageUrl = "https://example.com/marioodyssey.jpg";
    },
    {
      title = "Red Dead Redemption 2";
      genre = "Action-adventure";
      rating = 96;
      description = "A western-themed action-adventure game set in an open world environment and played from a third-person perspective.";
      releaseYear = 2018;
      developer = "Rockstar Games";
      imageUrl = "https://example.com/rdr2.jpg";
    },
    {
      title = "Minecraft";
      genre = "Sandbox";
      rating = 93;
      description = "A sandbox game where players can build, explore, and survive in a blocky, procedurally generated 3D world.";
      releaseYear = 2011;
      developer = "Mojang";
      imageUrl = "https://example.com/minecraft.jpg";
    },
  ];

  public query ({ caller }) func getAllGames() : async [Game] {
    games;
  };

  public query ({ caller }) func filterByGenre(genre : Text) : async [Game] {
    games.filter(func(game) { game.genre.contains(#text genre) });
  };

  public query ({ caller }) func searchByTitle(searchTerm : Text) : async [Game] {
    let searchPattern = #text (searchTerm.toLower());
    games.filter(
      func(game) {
        game.title.toLower().contains(searchPattern);
      }
    );
  };

  public query ({ caller }) func getPickOfTheDay() : async Game {
    let dayIndex = (Time.now() / 86_400_000_000_000) % games.size();
    games[dayIndex.toNat()];
  };
};
