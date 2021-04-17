<template>
  <div class="home">
    <navbar :account="account"></navbar>
    <div v-if="loading">Loading...</div>
    <template v-else>
      <files
        :files="files"
        @capture-file="captureFile"
        @upload-file="uploadFile"
      ></files>
    </template>
  </div>
</template>

<script>
import Web3 from 'web3'
import DStorage from '../abis/DStorage.json'
import Navbar from '@/components/Navbar'
import Files from '@/components/Files.vue'

export default {
  name: 'Home',
  components: {
    Navbar,
    Files
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
    },
    captureFile(event) {
      event.preventDefault()

      const file = event.target.files[0]
      const reader = new window.FileReader()

      reader.readAsArrayBuffer(file)
      reader.onloadend = () => {
        this.buffer = Buffer.from(reader.result)
        this.type = file.type
        this.name = file.name
        console.log('buffer', this.buffer)
      }
    },
    async uploadFile(description) {
      console.log('Submitting file to IPFS...')
      const ipfs = await this.$ipfs

      try {
        // Add file to the IPFS
        const result = await ipfs.add(this.buffer)
        console.log('IPFS result', result)

        this.loading = true
        // Assign value for the file without extension
        if (this.type === '') {
          this.type = 'none'
        }
        this.dstorage.methods.uploadFile(result.path, result.size, this.type, this.name, description).send({ from: this.account }).on('transactionHash', (hash) => {
          this.loading = false
          this.type = null
          this.name = null
          window.location.reload()
        }).on('error', (e) => {
          window.alert('Error')
          this.loading = false
        })
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
