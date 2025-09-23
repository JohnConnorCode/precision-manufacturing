// GROQ queries for Sanity content

export const pageBySlugQuery = `
*[_type == "page" && slug.current == $slug][0]{
  title,
  slug,
  hero {
    headline,
    subhead,
    media,
    cta
  },
  sections,
  seo {
    title,
    description,
    ogImage
  }
}`;

export const allPagesQuery = `
*[_type == "page"]{
  _id,
  title,
  slug
}`;

export const serviceBySlugQuery = `
*[_type == "service" && slug.current == $slug][0]{
  title,
  slug,
  intro,
  icon,
  capabilities,
  specHighlights,
  gallery,
  seo {
    title,
    description
  }
}`;

export const allServicesQuery = `
*[_type == "service"] | order(title asc){
  _id,
  title,
  slug,
  intro,
  icon
}`;

export const industryBySlugQuery = `
*[_type == "industry" && slug.current == $slug][0]{
  title,
  slug,
  problem,
  solution,
  tolerances,
  certifications,
  caseStudies,
  seo {
    title,
    description
  }
}`;

export const allIndustriesQuery = `
*[_type == "industry"] | order(title asc){
  _id,
  title,
  slug,
  problem
}`;

export const legalDocByTypeQuery = `
*[_type == "legalDoc" && type == $type][0]{
  type,
  title,
  body,
  file,
  version,
  effectiveDate
}`;

export const allPostsQuery = `
*[_type == "post"] | order(publishedAt desc)[0...10]{
  _id,
  title,
  slug,
  excerpt,
  tags,
  author,
  publishedAt,
  coverImage
}`;

export const postBySlugQuery = `
*[_type == "post" && slug.current == $slug][0]{
  title,
  slug,
  excerpt,
  body,
  tags,
  author,
  publishedAt,
  coverImage,
  seo {
    title,
    description
  }
}`;

export const siteSettingsQuery = `
*[_type == "siteSettings"][0]{
  siteName,
  logo,
  contactInfo,
  socials,
  defaultSEO
}`;