import React from 'react'
import { hydrate } from 'react-dom'
// import 'sz-global-styles/src/styles/main.scss'
import { AuthorPage } from '../components/AuthorPage'

const rootNode = document.getElementById('root')
const rootData = JSON.parse(rootNode.dataset.react)

// If performance becomes a problem: only hydrate dynamic components
hydrate(<AuthorPage {...rootData} />, rootNode)
