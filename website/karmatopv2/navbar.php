<nav class="navbar navbar-expand-lg navbar-dark bg-dark">
  <a class="navbar-brand" href="index.php"><img src="https://images.discordapp.net/avatars/803579214553022484/27eeeaa2e847e45bba81c8a6f474847a.png?size=32"></a>
  <button class="navbar-toggler collapsed" type="button" data-toggle="collapse" data-target="#navbarColor02" aria-controls="navbarColor02" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>
  <div class="navbar-collapse collapse" id="navbarColor02" style="">
    <ul class="navbar-nav mr-auto">
      <li class="nav-item">
        <a class="nav-link" href="index.php">Startseite</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="karmatop.php">Karmatop</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="login.php">Controlpanel</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="bot.php">Bot</a>
      </li>
      <li class="nav-item">
        <a class="nav-link" href="https://discord.gg/t9Jny6ds3E">Join Discord</a>
      </li>
    </ul>
    <form class="form-inline my-2 my-lg-0">
      <input class="form-control mr-sm-2" type="text" placeholder="Suche">
      <button class="btn btn-secondary my-2 my-sm-0" type="submit">Suchen</button>
    </form>

    <script>
    const searchButton = document.getElementById('search-button');
    const searchInput = document.getElementById('search-input');
    searchButton.addEventListener('click', () => {
      const inputValue = searchInput.value;
      alert(inputValue);
    });
    </script>
  </div>
</nav>