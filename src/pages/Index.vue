<template>
  <div>
    <b-jumbotron
      :fluid="true"
      header="English Cycle"
      lead="This App helps you to learn English well by reviewing again and again."
    >
      <p>As forgetting curve theory said if you review immediately after learned a new item, it will be hard to forget the item you learned.</p>
      <b-button variant="primary" href="#">Start Learning</b-button>
    </b-jumbotron>
    <div class="container-md py-5">
      <div class="row">
        <div class="col-md-6">
          <h2>Backlog</h2>
          <p>When you get a new item, like vocabulary, phrase, sentence and so on, you can put it into the backlog first, and learn it when you have a spare moment.</p>
        </div>
        <div class="col-md-6">
          <h2>Cycle</h2>
          <p>After you learned a new item and took note, in the cycle list, the item will be sorted by the number of times of reviewing from less to more. Then you can review the item you are not familiar with.</p>
        </div>
      </div>
    </div>
  </div>
</template>