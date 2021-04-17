<template functional>
  <nav class="navbar navbar-dark bg-dark p-0 text-monospace">
    <a
      class="navbar-brand col-sm-3 col-md-2 mr-0"
      href="http://www.dappuniversity.com/bootcamp"
      target="_blank"
      rel="noopener noreferrer"
    >
      <img src="../assets/box.png" width="30" height="30" class="align-top" alt="" />
      D$t0r@g3
    </a>
    <ul class="navbar-nav px-3">
      <li>
        <small id="account">
          <a target="_blank"
              alt=""
              class="text-white"
              rel="noopener noreferrer"
              :href="`https://etherscan.io/address/${props.account}`">
            {{ props.account.substring(0,6) }}...{{ props.account.substring(38,42) }}
          </a>
        </small>
      </li>
    </ul>
  </nav>
</template>
