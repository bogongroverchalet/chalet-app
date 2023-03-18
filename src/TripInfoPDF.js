import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { Font, Page, Text, View, Document, StyleSheet, Image } from '@react-pdf/renderer'
import { PDFViewer } from '@react-pdf/renderer'
import openSans from 'npm-font-open-sans/fonts/Regular/OpenSans-Regular.ttf'
import openSansItalic from 'npm-font-open-sans/fonts/Italic/OpenSans-Italic.ttf'
import tripData from './trips.yaml'
import capitalize from 'capitalize'
import { useParams } from 'react-router-dom'
import Html from 'react-pdf-html'
import ReactMarkdown from 'react-markdown'

function Markdown({ children }) {
  return (
    <ReactMarkdown
      components={{
        a: ({ href, children }) => {
          return <a href={new URL(`${href}.pdf`, window.location.href).href}>{children}</a>
        },
        p: ({ children }) => <span className='p'>{children}</span>,
      }}
    >
      {children}
    </ReactMarkdown>
  )
}

const htmlStylesheet = {
  '*': {
    fontSize: 12,
  },
  '.p': {
    fontSize: 12,
  },
}

function HtmlSection({ children }) {
  return <Html stylesheet={htmlStylesheet}>{ReactDOMServer.renderToStaticMarkup(<Markdown>{children}</Markdown>)}</Html>
}

Font.register({ family: 'Open Sans', fonts: [{ src: openSans }, { src: openSansItalic, fontStyle: 'italic' }] })

const styles = StyleSheet.create({
  page: {
    fontFamily: 'Open Sans',
    fontSize: 12,
    flexDirection: 'row',
  },
  section: {
    padding: 10,
    width: '50%',
    margin: 'auto',
  },
  lastSection: {
    paddingRight: 30,
  },
  splitRow: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  splitRowSection: {
    width: '50%',
  },
  splitRowSectionWeather: {
    paddingRight: 8,
  },
  splitRowSectionTime: {
    paddingLeft: 8,
  },
  li: {
    display: 'flex',
    flexDirection: 'row',
  },
  bullet: {
    height: '100%',
  },
  heading: {
    fontSize: 24,
    marginBottom: 12,
    textAlign: 'center',
  },
  description: {
    marginBottom: 8,
  },
  longDescription: {
    marginBottom: 8,
  },
})

const TripDocument = ({ tripInfo } = {}) => {
  return (
    <Document>
      <Page size='A4' style={styles.page} orientation='landscape'>
        <View style={styles.section} fixed>
          <Image src='http://placekitten.com/g/400/400' />
        </View>
        <View style={[styles.section, styles.lastSection]}>
          <Text key='trip' style={[styles.heading, { marginTop: 12 }]} fixed>
            Trip: {tripInfo.name}
          </Text>
          <Text key='trip' style={{ marginBottom: 8, fontStyle: 'italic' }}>
            Difficulty level: {tripInfo['difficulty-level']}
          </Text>
          <Text key='desc' style={styles.description}>
            {tripInfo.description}
          </Text>
          {tripInfo['long-description'] && (
            <Text key='long-desc' style={styles.longDescription}>
              <HtmlSection>{tripInfo['long-description']}</HtmlSection>
            </Text>
          )}
          {tripInfo['hazards'] && (
            <View key='hazards' wrap={false}>
              <Text style={{ fontSize: 16, marginBottom: 8 }}>Hazards</Text>
              {tripInfo['hazards'].map((hazard) => (
                <ListItem key={hazard}>{hazard}</ListItem>
              ))}
            </View>
          )}
          <View key='turnback' wrap={false}>
            <View key='heading'>
              <Text style={{ fontSize: 16, marginBottom: 8, marginTop: 8 }}>Turnback points</Text>
            </View>
            <View key='contents' style={styles.splitRow}>
              {['weather', 'time'].map((type) => (
                <View key={type} style={[styles.splitRowSection, styles[`splitRowSection${capitalize(type)}`]]}>
                  <Text style={{ fontSize: 14, marginBottom: 4 }}>{capitalize(type)}</Text>
                  <View>
                    {tripInfo['turnback-points'][type].map((desc) => (
                      <ListItem key={desc}>{desc}</ListItem>
                    ))}
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>
      </Page>
    </Document>
  )
}

const ListItem = ({ children }) => {
  return (
    <View style={styles.li}>
      <View style={styles.bullet}>
        <Text>{'\u2022 '}</Text>
      </View>
      <HtmlSection>{children}</HtmlSection>
    </View>
  )
}
export default function TripInfoPDF({ tripInfo }) {
  const { tripName } = useParams()
  if (!tripInfo) {
    tripInfo = tripData.trips.find(({ name }) => name === tripName)
  }
  return (
    <PDFViewer style={{ height: '100vh', width: '100vw' }}>
      <TripDocument tripInfo={tripInfo} />
    </PDFViewer>
  )
}
