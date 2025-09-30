import home from './home'
import service from './service'
import industry from './industry'
import siteSettings from './siteSettings'
import resource from './resource'
import about from './about'
import servicesPage from './servicesPage'
import industriesPage from './industriesPage'
import contact from './contact'
import compliance from './compliance'
import caseStudy from './caseStudy'
import whitePaper from './whitePaper'
import faq from './faq'
import glossary from './glossary'
import textSnippets from './textSnippets'

export const schemaTypes = [
  // Page schemas
  home,
  about,
  servicesPage,
  industriesPage,
  contact,

  // Content schemas
  service,
  industry,
  resource,
  caseStudy,
  whitePaper,
  faq,
  glossary,

  // System schemas
  compliance,
  siteSettings,
  textSnippets,
]