<template>
  <div class="home">
    <navbar :account="account"></navbar>
    <div v-if="loading">Loading...</div>
    <template v-else>
      <div>Main</div>
    </template>
  </div>
</template>

<script>
import Web3 from 'web3'
import DStorage from '../abis/DStorage.json'
import Navbar from '@/components/Navbar'

export default {
  name: 'Home',
  components: {
    Navbar
  },
  data() {
    return {
      account: '',
      dstorage: null,
      files: [],
      loading: false,
      type: null,
      name: null
    }
  },
  created() {
    this.loadWeb3()
    this.loadBlockchainData()
  },
  methods: {
    async loadWeb3() {
      if (window.ethereum) {
        window.web3 = new Web3(window.ethereum)
        await window.ethereum.enable()
      } else if (window.web3) {
        window.web3 = new Web3(window.web3.currentProvider)
      } else {
        window.alert('Non-ethereum browser detected. Try MetaMask.')
      }
    },
    async loadBlockchainData() {
      const web3 = window.web3

      const accounts = await web3.eth.getAccounts()
      this.account = accounts[0]

      const networkId = await web3.eth.net.getId()
      const networkData = DStorage.networks[networkId]
      if (networkData) {
        this.dstorage = new web3.eth.Contract(DStorage.abi, networkData.address)
        this.filesCount = await this.dstorage.methods.fileCount().call()
        for (var i = this.filesCount; i >= 1; i--) {
          const file = await this.dstorage.methods.files(i).call()
          this.files = [...this.files, file]
        }
      } else {
        window.alert('DStorage contract not deployed to detected network.')
      }
    }
  }
}
</script>
