import elasticsearch from 'elasticsearch'

export const client = new elasticsearch.Client({
  host: 'elastic-21.hst.sznet.de:9200',
  log: 'error',
})
