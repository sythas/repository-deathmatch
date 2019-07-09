<style>
  .outer {
    height: 720px;
    width: 1280px;
    background-image: url('./ryu.jpeg');
  }

  .inner {
    display: grid;
    justify-items: center; 
    align-items: end;
    grid-template-columns: repeat(2, 1fr);
  }

  p {
    text-align: center;
    font-size: 6rem;
    color: #bb0a1e;
  }

</style>

<section class="outer">
  <div class="inner">
    <slot name="player1"></slot>
    <slot name="player2"></slot>
  </div>
</section>
