// used to create mock blobs from json for testing & mock API
const blobify = (data: any) => new Blob([JSON.stringify(data)], { type: 'application/json' })

export default blobify
