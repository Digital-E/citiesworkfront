const homeFields = `
  _id,
  title,
  content,
  filters,
  islands,
  "slug": slug.current
`

const aboutFields = `
  _id,
  title,
  content,
  textcolumnone,
  textcolumntwo,
  textcolumnthree,
  "slug": slug.current
`
const programFields = `
  _id,
  title,
  content,
  textcolumnone,
  textcolumntwo,
  textcolumnthree,
  "slug": slug.current
`
const applicationFields = `
  _id,
  title,
  content,
  "slug": slug.current,
  downloadLabelOne,
  downloadLabelTwo,
  "download": download.asset->url,
  subtitleOne,
  subtitleTwo,
  fields,
  submitButton,
  confirmationMessage,
  applicationOpen,
  applicationClosedMessage
`
const yearFields = `
  _id,
  _lang,
  title,
  content,
  textFieldOne,
  textFieldTwo,
  textFieldThree,
  textFieldFour,
  textFieldFive,
  images,
  "slug": slug.current
`

const artistFields = `
  _id,
  _lang,
  title,
  content,
  orderByLetter,
  textFieldOne,
  textFieldTwo,
  images,
  "slug": slug.current
`

const legalFields = `
  _id,
  title,
  content,
  text,
  "slug": slug.current
`

export const homeQuery = `
*[_type == "home"][0] {
  ${homeFields}
}
`

export const previewHomeQuery = `
*[_type == "home"] | order(_updatedAt desc)[0] {
  ${homeFields}
}
`

export const aboutQuery = `
*[_type == "about" && slug.current == $slug][0] {
  ${aboutFields}
}
`

export const previewAboutQuery = `
*[_type == "about" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${aboutFields}
}
`

export const programQuery = `
*[_type == "program" && slug.current == $slug][0] {
  ${programFields}
}
`

export const previewProgramQuery = `
*[_type == "program" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${programFields}
}
`

export const applicationQuery = `
*[_type == "application" && slug.current == $slug][0] {
  ${applicationFields}
}
`

export const previewApplicationQuery = `
*[_type == "application" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${applicationFields}
}
`

export const yearsQuery = `
*[_type == "years" && slug.current == $slug][0] {
  _lang,
  title,
  content,
  years,
  artists,
  slices,
  "slug": slug.current
}`

export const previewYearsQuery = `
*[_type == "years" && slug.current == $slug] | order(_updatedAt desc)[0] {
  _lang,
  title,
  content,
  slices,
  "slug": slug.current
}`

export const yearSlugsQuery = `
*[_type == "year" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const yearQuery = `
*[_type == "year" && slug.current == $slug][0] {
  ${yearFields}
}`

export const previewYearQuery = `
*[_type == "year" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${yearFields}
}`

export const artistsQuery = `
*[_type == "artists" && slug.current == $slug][0] {
  _lang,
  title,
  content,
  list,
  "slug": slug.current
}`

export const previewArtistsQuery = `
*[_type == "artists" && slug.current == $slug] | order(_updatedAt desc)[0] {
  _lang,
  title,
  content,
  list,
  "slug": slug.current
}`

export const artistSlugsQuery = `
*[_type == "artist" && defined(slug.current) && !(_id in path('drafts.**'))][].slug.current
`

export const artistQuery = `
*[_type == "artist" && slug.current == $slug][0] {
  ${artistFields}
}`

export const previewArtistQuery = `
*[_type == "artist" && slug.current == $slug] | order(_updatedAt desc)[0] {
  ${artistFields}
}`

export const allArtistsQuery = `
*[_type == "artist" && _lang == $lang && !(_id in path('drafts.**'))] {
  ${artistFields}
}`

export const menuQuery = `
*[_type == "menu"][0] {
  menuItems,
  cookietext,
  cookieaccept,
  cookierefuse
}
`

export const footerQuery = `
*[_type == "footer"][0] {
  textFieldOne,
  namePlaceholder,
  emailPlaceholder,
  submitButtonText,
  errorMessage,
  legalLabel
}
`

export const legalQuery = `
*[_type == "legal" && slug.current == $slug][0] {
    ${legalFields}
}
`

export const previewLegalQuery = `
*[_type == "legal" && slug.current == $slug] | order(_updatedAt desc)[0] {
    ${legalFields}
}
`