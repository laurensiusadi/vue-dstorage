<template>
  <div class="container-fluid mt-5 text-center">
    <div class="row">
      <main role="main" class="col-lg-12 ml-auto mr-auto" style="max-width: 1024px">
        <div class="content">
          <p>&nbsp;</p>
          <div class="card mb-3 mx-auto bg-dark" style="max-width: 512px;">
            <h2 class="text-white text-monospace bg-dark"><b><ins>Share File</ins></b></h2>
              <form @submit.prevent="handleFormSubmit">
                <div class="form-group">
                  <input
                    id="fileDescription"
                    type="text"
                    v-model="fileDescription"
                    class="form-control text-monospace"
                    placeholder="description..."
                    required
                  />
                </div>
                <input type="file" @change="$emit('capture-file', $event)" class="text-white text-monospace"/>
                <button type="submit" class="btn-primary btn-block"><b>Upload!</b></button>
              </form>
          </div>
          <p>&nbsp;</p>
          <table class="table-sm table-bordered text-monospace" style="width: 1000px; max-height: 450px;">
            <thead style="font-size: 15px;">
              <tr class="bg-dark text-white">
                <th scope="col" style="width: 10px">id</th>
                <th scope="col" style="width: 200px">name</th>
                <th scope="col" style="width: 230px">description</th>
                <th scope="col" style="width: 120px">type</th>
                <th scope="col" style="width: 90px">size</th>
                <th scope="col" style="width: 90px">date</th>
                <th scope="col" style="width: 120px">uploader/view</th>
                <th scope="col" style="width: 120px">hash/view/get</th>
              </tr>
            </thead>
            <thead v-for="file in files" style="font-size: 12px" :key="file.key">
              <tr>
                <td>{{ file.fileId }}</td>
                <td>{{ file.fileName }}</td>
                <td>{{ file.fileDescription }}</td>
                <td>{{ file.fileType }}</td>
                <td>{{ convertBytes(file.fileSize) }}</td>
                <td>{{ formatUploadTime(file.uploadTime) }}</td>
                <td>
                  <a
                    :href="`https://etherscan.io/address/${file.uploader}`"
                    rel="noopener noreferrer"
                    target="_blank">
                    {{ file.uploader.substring(0,10) }}...
                  </a>
                  </td>
                <td>
                  <a
                    :href="`https://ipfs.infura.io/ipfs/${file.fileHash}`"
                    rel="noopener noreferrer"
                    target="_blank">
                    {{ file.fileHash.substring(0,10) }}...
                  </a>
                </td>
              </tr>
            </thead>
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { format, fromUnixTime } from 'date-fns'

export default {
  props: {
    files: Array
  },
  data() {
    return {
      fileDescription: ''
    }
  },
  methods: {
    handleFormSubmit(event) {
      this.$emit('upload-file', this.fileDescription)
    },
    formatUploadTime(time) {
      return format(fromUnixTime(time), 'hh:mm:ss MM/dd/yyyy')
    },
    convertBytes(bytes) {
      const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB']
      if (bytes === 0) return '0 Byte'
      const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)))
      return Math.round(bytes / Math.pow(1024, i), 2) + ' ' + sizes[i]
    }
  }
}
</script>
