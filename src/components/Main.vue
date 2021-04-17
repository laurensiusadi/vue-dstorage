<template>
  <div class="container-fluid mt-5 text-center">
    <div class="row">
      <main role="main" class="col-lg-12 ml-auto mr-auto" style="max-width: 1024px">
        <div class="content">
          <p>&nbsp;</p>
          <div class="card mb-3 mx-auto bg-dark" style="max-width: 512px;">
            <h2 class="text-white text-monospace bg-dark"><b><ins>Share File</ins></b></h2>
              <form onSubmit={(event) => {
                event.preventDefault()
                const description = this.fileDescription.value
                this.props.uploadFile(description)
              }} >
                  <div class="form-group">
                    <br></br>
                      <input
                        id="fileDescription"
                        type="text"
                        ref={(input) => { this.fileDescription = input }}
                        class="form-control text-monospace"
                        placeholder="description..."
                        required />
                  </div>
                <input type="file" onChange={this.props.captureFile} class="text-white text-monospace"/>
                <button type="submit" class="btn-primary btn-block"><b>Upload!</b></button>
              </form>
          </div>
          <p>&nbsp;</p>
          <table class="table-sm table-bordered text-monospace" style={{ width: '1000px', maxHeight: '450px'}}>
            <thead style={{ 'fontSize': '15px' }}>
              <tr class="bg-dark text-white">
                <th scope="col" style={{ width: '10px'}}>id</th>
                <th scope="col" style={{ width: '200px'}}>name</th>
                <th scope="col" style={{ width: '230px'}}>description</th>
                <th scope="col" style={{ width: '120px'}}>type</th>
                <th scope="col" style={{ width: '90px'}}>size</th>
                <th scope="col" style={{ width: '90px'}}>date</th>
                <th scope="col" style={{ width: '120px'}}>uploader/view</th>
                <th scope="col" style={{ width: '120px'}}>hash/view/get</th>
              </tr>
            </thead>
            { this.props.files.map((file, key) => {
              return(
                <thead style={{ 'fontSize': '12px' }} key={key}>
                  <tr>
                    <td>{file.fileId}</td>
                    <td>{file.fileName}</td>
                    <td>{file.fileDescription}</td>
                    <td>{file.fileType}</td>
                    <td>{convertBytes(file.fileSize)}</td>
                    <td>{moment.unix(file.uploadTime).format('h:mm:ss A M/D/Y')}</td>
                    <td>
                      <a
                        href={"https://etherscan.io/address/" + file.uploader}
                        rel="noopener noreferrer"
                        target="_blank">
                        {file.uploader.substring(0,10)}...
                      </a>
                      </td>
                    <td>
                      <a
                        href={"https://ipfs.infura.io/ipfs/" + file.fileHash}
                        rel="noopener noreferrer"
                        target="_blank">
                        {file.fileHash.substring(0,10)}...
                      </a>
                    </td>
                  </tr>
                </thead>
              )
            })}
          </table>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
export default {
  
}
</script>