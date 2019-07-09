<script>
  export let currentHP
  export let maxHP
</script>

<style>
  progress {
    -webkit-appearance: none;
    appearance: none;
    height: 40px;
    width: 100%;
  }

  progress::-webkit-progress-bar {
    background-color: red;
    border-radius: 2px;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.25) inset;
  }

  progress::-webkit-progress-value {
    background-color: yellow;
    border-radius: 2px; 
  }
</style>

<progress max={maxHP} value={currentHP}></progress>
