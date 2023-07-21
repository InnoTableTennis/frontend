<script lang="ts">
    import TournamentBracket from "$lib/components/bracket/TournamentBracket.svelte"
    let matches = [
    { firstPlayerName: 'John', secondPlayerName: 'Mike', firstPlayerScore: 1, secondPlayerScore: 2 },
    { firstPlayerName: 'Ron', secondPlayerName: 'Richard', firstPlayerScore: 2, secondPlayerScore: 3 },
    { firstPlayerName: 'Richard', secondPlayerName: 'Mike', firstPlayerScore: 5, secondPlayerScore: 0 },
    { firstPlayerName: 'Richard', secondPlayerName: 'Mike', firstPlayerScore: 5, secondPlayerScore: 0 }
  ];
</script>

<TournamentBracket />